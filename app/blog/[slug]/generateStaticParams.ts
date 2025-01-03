import { getBlogPostsWithDetails } from '@/app/utils/getBlogPostsWithDetails'

export async function generateStaticParams() {
  const posts = getBlogPostsWithDetails()
  return posts.map((post) => ({
    slug: post.slug,
  }))
} 