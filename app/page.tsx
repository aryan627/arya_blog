'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Graph = dynamic(() => import('react-graph-vis'), { ssr: false })

interface BlogPost {
  slug: string;
  title: string;
  tags: string[];
}

export default function Home() {
  const router = useRouter()
  const [graphKey, setGraphKey] = useState(0)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    fetch('/api/posts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Invalid data format')
        setPosts(data)
      })
      .catch(error => {
        console.error('Error:', error)
        setError(error.message)
        setPosts([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const graph = {
    nodes: posts.map((post) => ({
      id: post.slug,
      label: post.title,
      title: post.title,
      tags: post.tags,
    })),
    edges: posts.flatMap((post) => 
      posts.filter(otherPost => 
        post.slug !== otherPost.slug &&
        post.tags.some(tag => otherPost.tags.includes(tag))
      ).map(otherPost => ({
        id: `${post.slug}-${otherPost.slug}`,
        from: post.slug,
        to: otherPost.slug
      }))
    ).filter((edge, index, self) => 
      index === self.findIndex(e => 
        (e.from === edge.from && e.to === edge.to) ||
        (e.from === edge.to && e.to === edge.from)
      )
    )
  }

  const options = {
    layout: {
      randomSeed: 42,
      improvedLayout: true
    },
    edges: {
      color: "#00ff00",
      width: 1,
      smooth: {
        type: 'continuous'
      }
    },
    nodes: {
      shape: 'dot',
      size: 8,
      color: {
        background: '#00ff00',
        border: '#00ff00',
        highlight: {
          background: '#ffffff',
          border: '#00ff00'
        },
        hover: {
          background: '#ffffff',
          border: '#00ff00'
        }
      },
      font: {
        size: 8,
        color: '#00ff00',
        strokeWidth: 0,
        strokeColor: '#000000'
      },
      borderWidth: 1,
      shadow: false,
      chosen: {
        node: function(values: any, id: string, selected: boolean, hovering: boolean) {
          values.borderWidth = hovering ? 2 : 1;
          values.size = hovering ? 12 : 8;
          values.font = {
            ...values.font,
            size: hovering ? 16 : 8,
            color: hovering ? '#ffffff' : '#00ff00'
          };
        }
      }
    },
    height: "400px",
    interaction: {
      hover: true,
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      hideEdgesOnZoom: true,
      zoomView: true,
      dragView: true
    },
    physics: {
      stabilization: true,
      barnesHut: {
        gravitationalConstant: -3000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0.1
      }
    }
  }

  const events = {
    select: function(event: { nodes: string[] }) {
      const { nodes } = event
      if (nodes.length > 0) {
        const selectedSlug = nodes[0]
        router.push(`/blog/${selectedSlug}`)
      }
    }
  }

  useEffect(() => {
    setGraphKey(prevKey => prevKey + 1)
  }, [])

  const handleGoBack = () => {
    window.close()
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
        <h1 className="text-4xl font-bold mb-8 typing-effect">Arya's Second Brain</h1>
        <p className="mb-6 text-lg">Explore some of the things I like to nerd out about.</p>
        <div className="graph-container mb-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading graph...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-destructive">
              <p>{error}</p>
            </div>
          ) : posts.length > 0 ? (
            <Graph key={graphKey} graph={graph} options={options} events={events} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No posts available. Check the posts directory.</p>
            </div>
          )}
        </div>
        <Link href="/blog" className="text-primary hover:text-primary-foreground transition-colors text-xl">
          Enter the Matrix &gt;
        </Link>
      </div>
    </div>
  )
}

