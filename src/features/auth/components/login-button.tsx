'use client'

import { login } from '../actions/auth'
import { Button } from '@/components/ui/button'

type LoginButtonProps = {
  redirectTo?: string
  className?: string
}

export function LoginButton({ redirectTo = '/', className }: LoginButtonProps) {
  return (
    <form action={login}>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <Button type="submit" variant="default" className={className} data-testid="github-login-button">
        GitHub으로 로그인
      </Button>
    </form>
  )
}
