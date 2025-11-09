import Image from 'next/image'
import { auth } from '@/auth'
import { LogoutButton } from './logout-button'
import { LoginButton } from './login-button'

export async function UserInfo() {
  const session = await auth()

  if (!session?.user) {
    return <LoginButton />
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || '사용자'}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <span className="text-sm font-medium">{session.user.name}</span>
      </div>
      <LogoutButton />
    </div>
  )
}
