'use server'

import { auth } from '@/auth'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createPostSchema } from '../schemas/create-post.schema'
import { PostService } from '../services/post.service'

// 반환 타입 정의
type FormState = {
  errors?: {
    title?: string[]
    content?: string[]
  }
  error?: string
} | null

export async function createPost(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // 인증 확인
    const session = await auth()

    if (!session?.user?.id) {
      return { error: '로그인이 필요합니다' }
    }

    // FormData를 객체로 변환
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
    }

    // Zod 검증
    const result = createPostSchema.safeParse(data)

    if (!result.success) {
      // Zod v4: flatten() 대신 z.flattenError() 사용
      const flattened = z.flattenError(result.error)
      return {
        errors: flattened.fieldErrors
      }
    }

    // 게시글 생성 (실제 사용자 ID 사용)
    const post = await PostService.create(result.data, session.user.id)

    // 캐시 무효화
    revalidateTag(PostService.LIST_TAG)
    revalidateTag(PostService.DETAIL_TAG)

    // 상세 페이지로 리다이렉트
    redirect(`/posts/${post.id}`)
  } catch (error) {
    console.error('게시글 작성 에러:', error)
    return {
      error: error instanceof Error ? error.message : '게시글 작성에 실패했습니다'
    }
  }
}
