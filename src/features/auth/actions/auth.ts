'use server'

import { signIn, signOut } from '@/auth'
import { sanitizeRelativeRedirect } from '../lib/redirect'

export async function login(formData: FormData) {
  const redirectTo = sanitizeRelativeRedirect(formData.get('redirectTo'))
  await signIn('github', { redirectTo })
}

export async function logout(formData: FormData) {
  const redirectTo = sanitizeRelativeRedirect(formData.get('redirectTo'))
  await signOut({ redirectTo })
}
