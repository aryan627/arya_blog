import { getBlogPost } from '@/app/utils/getBlogPostsWithDetails'
import ClientBlogPost from './ClientBlogPost'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return <ClientBlogPost post={post} />
}

