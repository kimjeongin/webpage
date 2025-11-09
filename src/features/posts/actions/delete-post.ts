'use server'

import { revalidatePath } from 'next/cache'
import { PostService } from '../services/post.service'

type DeleteResult = {
  success?: boolean
  error?: string
}

export async function deletePost(postId: string): Promise<DeleteResult> {
  try {
    // TODO: 인증 구현
    const userId = 'temp-user-id'

    await PostService.delete(postId, userId)

    revalidatePath('/posts')

    return { success: true }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : '삭제에 실패했습니다'
    }
  }
}
