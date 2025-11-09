import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { LoginButton } from '@/features/auth/components/login-button'
import {
  DEFAULT_REDIRECT_PATH,
  resolveRedirectSegments,
  stringifyRedirectSegments,
} from '@/features/auth/lib/redirect'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type SearchParams =
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>

type LoginPageProps = {
  searchParams?: SearchParams
}

export const metadata: Metadata = {
  title: '로그인 | Next.js 16 게시판',
  description: 'GitHub OAuth를 사용해 게시판에 로그인하세요.',
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth()

  const params = (await searchParams) ?? {}
  const headersList = headers()
  const protocol = headersList.get('x-forwarded-proto') ?? 'http'
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host') ?? 'localhost:3000'
  const origin = `${protocol}://${host}`

  const redirectSegments =
    resolveRedirectSegments(params.callbackUrl ?? params.redirectTo, origin) ?? {
      pathname: DEFAULT_REDIRECT_PATH,
      search: '',
      hash: '',
    }

  const redirectTo = stringifyRedirectSegments(redirectSegments)

  if (session?.user) {
    redirect(redirectTo)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">계정 로그인</CardTitle>
            <CardDescription>GitHub OAuth를 통해 게시판 기능을 이용할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LoginButton redirectTo={redirectTo} className="w-full" />
            <p className="text-xs text-muted-foreground text-center">
              GitHub 외 다른 OAuth 제공자도 쉽게 확장할 수 있도록 Auth.js 설정을 분리해두었습니다.
            </p>
            <div className="text-center text-sm">
              <Link href="/" className="text-primary hover:underline">
                홈으로 돌아가기
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
