import { getBlogPostsWithDetails } from '@/app/utils/getBlogPostsWithDetails'

export async function generateStaticParams() {
  const posts = await getBlogPostsWithDetails()
  return posts.map((post) => ({
    slug: post.slug,
  }))
} 