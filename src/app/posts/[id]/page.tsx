import { PostDetail } from '@/features/posts/components/post-detail'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Link href="/posts">
        <Button variant="outline" className="mb-6">← 목록으로</Button>
      </Link>

      <Suspense fallback={<div>로딩 중...</div>}>
        <PostDetail postId={id} />
      </Suspense>
    </div>
  )
}
