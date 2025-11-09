import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string()
    .min(1, '제목을 입력해주세요')
    .max(200, '제목은 200자 이하여야 합니다')
    .trim(),

  content: z.string()
    .min(10, '내용은 최소 10자 이상이어야 합니다')
    .max(10000, '내용은 10000자 이하여야 합니다')
    .trim(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
