import { PostService } from '../services/post.service'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { notFound } from 'next/navigation'

interface PostDetailProps {
  postId: string
}

export async function PostDetail({ postId }: PostDetailProps) {
  const post = await PostService.getById(postId)

  if (!post) {
    notFound()
  }

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="font-medium">{post.author.name}</span>
          <span>·</span>
          <span>{new Date(post.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {post.content}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
