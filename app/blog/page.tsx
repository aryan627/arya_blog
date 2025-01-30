'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import NavHeader from '../components/nav-header'

import { Suspense } from 'react'

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
}

function BlogContent() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const searchParams = useSearchParams()
    const router = useRouter()
    const tag = searchParams.get('tag')

    useEffect(() => {
        setIsLoading(true)
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error fetching posts:', error)
                setIsLoading(false)
            })
    }, [])

    const filteredPosts = posts
        .filter(post => {
            const matchesTag = tag ? post.tags.includes(tag) : true
            const matchesSearch = searchQuery
                ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                : true
            return matchesTag && matchesSearch
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const handleGoBack = () => {
        router.push('/')
    }

    return (
        <div className="terminal-window">
            <div className="terminal-header">
                <div
                    className="terminal-button terminal-button-red cursor-pointer"
                    onClick={handleGoBack}
                ></div>
                <div className="terminal-button terminal-button-yellow"></div>
                <div className="terminal-button terminal-button-green"></div>
            </div>
            <div className="terminal-content p-6">
                <NavHeader />
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8 typing-effect mx-auto">Blog Posts</h1>
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search posts by title or tag..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                {tag && (
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-primary">Filtered by tag: </span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">{tag}</span>
                        <button
                            onClick={() => router.push('/blog')}
                            className="text-primary hover:text-primary-foreground transition-colors ml-2"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div>Loading posts...</div>
                ) : filteredPosts.length > 0 ? (
                    <ul className="space-y-6">
                        {filteredPosts.map(post => (
                            <li key={post.slug} className="border-b border-primary pb-4">
                                <Link href={`/blog/${post.slug}`} className="block hover:bg-secondary transition-colors p-4 rounded">
                                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                                    {post.date && (
                                        <p className="text-muted-foreground mb-2">
                                            {format(parseISO(post.date), 'MMMM dd, yyyy')}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="bg-primary/10 text-primary px-2 py-1 rounded text-sm cursor-pointer hover:bg-primary/20 transition-colors"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    router.push(`/blog?tag=${tag}`)
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-muted-foreground">
                        No posts found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}

export default function BlogPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogContent />
        </Suspense>
    )
}
