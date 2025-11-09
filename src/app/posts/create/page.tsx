import { PostForm } from '@/features/posts/components/post-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CreatePostPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <Link href="/posts">
          <Button variant="outline" className="mb-4">← 목록으로</Button>
        </Link>
        <h1 className="text-3xl font-bold">게시글 작성</h1>
      </div>

      <PostForm />
    </div>
  )
}
