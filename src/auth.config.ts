import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { env } from '@/lib/env'
import {
  DEFAULT_REDIRECT_PATH,
  resolveRedirectSegments,
} from '@/features/auth/lib/redirect'

const PROTECTED_ROUTES = ['/posts/create']
const AUTH_ROUTES = ['/login']

const authConfig = {
  adapter: DrizzleAdapter(db),
  session: { strategy: 'database' },
  trustHost: true,
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id
        session.user.name = session.user.name ?? user.name
        session.user.email = session.user.email ?? user.email
        session.user.image = session.user.image ?? user.image
      }
      return session
    },
    authorized({ request, auth }) {
      const pathname = request.nextUrl.pathname
      const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))
      const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

      if (isAuthRoute && auth?.user) {
        const fallbackRedirect =
          resolveRedirectSegments(request.nextUrl.searchParams.get('callbackUrl'), request.nextUrl.origin) ?? {
            pathname: DEFAULT_REDIRECT_PATH,
            search: '',
            hash: '',
          }
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = fallbackRedirect.pathname
        redirectUrl.search = fallbackRedirect.search
        redirectUrl.hash = fallbackRedirect.hash
        return NextResponse.redirect(redirectUrl)
      }

      if (isProtectedRoute && !auth?.user) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = '/login'
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.href)
        return NextResponse.redirect(loginUrl)
      }

      return true
    },
  },
} satisfies NextAuthConfig

export const protectedRoutes = PROTECTED_ROUTES
export const authRoutes = AUTH_ROUTES

export default authConfig
