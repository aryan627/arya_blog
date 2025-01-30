import { getBlogPost } from '@/app/utils/getBlogPostsWithDetails'
import ClientBlogPost from './ClientBlogPost'

export default async function BlogPostPage(
    { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getBlogPost(slug)

    if (!post) {
        return <div>Post not found</div>
    }

    return <ClientBlogPost post={post} />
}
