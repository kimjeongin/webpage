'use client'

import { logout } from '../actions/auth'
import { Button } from '@/components/ui/button'

type LogoutButtonProps = {
  redirectTo?: string
  className?: string
}

export function LogoutButton({ redirectTo = '/', className }: LogoutButtonProps) {
  return (
    <form action={logout}>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <Button type="submit" variant="outline" className={className}>
        로그아웃
      </Button>
    </form>
  )
}
