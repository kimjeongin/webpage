'use client'

import { useState, FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterSignupForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('업데이트를 메일로 받아보세요.')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!emailRegex.test(email)) {
      setStatus('error')
      setMessage('유효한 이메일 주소를 입력해주세요.')
      return
    }

    setStatus('loading')
    setMessage('구독 요청을 등록하는 중입니다...')

    // 실제 연동 대신 간단한 성공 시뮬레이션
    setTimeout(() => {
      setStatus('success')
      setMessage('구독 신청이 완료되었습니다! 다음 호 발행 시 메일을 보내드릴게요.')
      setEmail('')
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="newsletter-email">이메일 주소</Label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby="newsletter-help-text"
          autoComplete="email"
          disabled={status === 'loading'}
          required
        />
        <p
          id="newsletter-help-text"
          className="text-sm text-muted-foreground flex items-center gap-2"
          aria-live="polite"
        >
          {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          <span>{message}</span>
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? '구독 처리 중...' : '무료로 구독하기'}
      </Button>
    </form>
  )
}
