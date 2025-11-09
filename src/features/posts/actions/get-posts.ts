'use server'

import { PostService } from '../services/post.service'

export async function getPosts() {
  return await PostService.getAll()
}
