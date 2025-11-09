import { PostList } from '@/features/posts/components/post-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

export default function PostsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">게시판</h1>
        <Link href="/posts/create">
          <Button>글쓰기</Button>
        </Link>
      </div>

      <Suspense fallback={<div>로딩 중...</div>}>
        <PostList />
      </Suspense>
    </div>
  )
}
