'use client'

import { useActionState } from 'react'
import { createPost } from '../actions/create-post'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function PostForm() {
  const [state, formAction, isPending] = useActionState(createPost, null)

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          placeholder="게시글 제목을 입력하세요"
          disabled={isPending}
          className="w-full"
        />
        {state?.errors?.title && (
          <p className="text-sm text-red-500">{state.errors.title[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="게시글 내용을 입력하세요"
          rows={15}
          disabled={isPending}
          className="w-full resize-none"
        />
        {state?.errors?.content && (
          <p className="text-sm text-red-500">{state.errors.content[0]}</p>
        )}
      </div>

      {state?.error && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{state.error}</p>
        </div>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? '작성 중...' : '게시글 작성'}
      </Button>
    </form>
  )
}
