import { unstable_cache } from 'next/cache'
import { eq, desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { posts } from '@/lib/db/schema'
import type { CreatePostInput } from '../schemas/create-post.schema'

const POSTS_LIST_TAG = 'posts:list'
const POSTS_DETAIL_TAG = 'posts:detail'

const authorColumns = {
  id: true,
  name: true,
  email: true,
  image: true,
}

const fetchAllPosts = async () => {
  return db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    with: {
      author: {
        columns: authorColumns,
      },
    },
  })
}

const fetchPostById = async (id: string) => {
  return db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: {
      author: {
        columns: authorColumns,
      },
    },
  })
}

const getAllPostsCached = unstable_cache(fetchAllPosts, ['posts:list'], {
  tags: [POSTS_LIST_TAG],
})

const getPostByIdCached = unstable_cache(fetchPostById, ['posts:detail'], {
  tags: [POSTS_DETAIL_TAG],
})

export class PostService {
  static LIST_TAG = POSTS_LIST_TAG
  static DETAIL_TAG = POSTS_DETAIL_TAG

  /**
   * 게시글 생성
   */
  static async create(data: CreatePostInput, userId: string) {
    const [post] = await db
      .insert(posts)
      .values({
        ...data,
        authorId: userId,
      })
      .returning()

    return post
  }

  /**
   * 게시글 목록 조회 (캐시)
   */
  static async getAll() {
    return getAllPostsCached()
  }

  /**
   * 게시글 상세 조회 (캐시)
   */
  static async getById(id: string) {
    return getPostByIdCached(id)
  }

  /**
   * 게시글 상세 조회 (캐시 미사용)
   */
  static async getByIdRaw(id: string) {
    return fetchPostById(id)
  }

  /**
   * 게시글 수정
   */
  static async update(id: string, data: CreatePostInput, userId: string) {
    const post = await this.getByIdRaw(id)
    if (!post) {
      throw new Error('게시글을 찾을 수 없습니다')
    }
    if (post.authorId !== userId) {
      throw new Error('수정 권한이 없습니다')
    }

    const [updated] = await db
      .update(posts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning()

    return updated
  }

  /**
   * 게시글 삭제
   */
  static async delete(id: string, userId: string) {
    const post = await this.getByIdRaw(id)
    if (!post) {
      throw new Error('게시글을 찾을 수 없습니다')
    }
    if (post.authorId !== userId) {
      throw new Error('삭제 권한이 없습니다')
    }

    await db.delete(posts).where(eq(posts.id, id))
  }
}
