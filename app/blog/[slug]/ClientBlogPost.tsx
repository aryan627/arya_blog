'use client'

import { useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import NavHeader from '../../components/nav-header'

interface BlogPost {
  slug: string
  title: string
  date: string
  content: string
  tags: string[]
}

export default function ClientBlogPost({ post }: { post: BlogPost }) {
  const router = useRouter()

  const handleGoBack = () => {
    router.push('/blog')
  }

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-button terminal-button-red cursor-pointer" onClick={handleGoBack}></div>
        <div className="terminal-button terminal-button-yellow"></div>
        <div className="terminal-button terminal-button-green"></div>
      </div>
      <div className="terminal-content p-6">
        <NavHeader />
        <div className="mb-8">
          <Link 
            href="/blog"
            className="text-primary hover:text-primary-foreground transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.date && (
          <p className="text-muted-foreground mb-4">
            {format(parseISO(post.date), 'MMMM dd, yyyy')}
          </p>
        )}
        <div className="flex gap-2 mb-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="bg-primary/10 text-primary px-2 py-1 rounded text-sm hover:bg-primary/20 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
} 