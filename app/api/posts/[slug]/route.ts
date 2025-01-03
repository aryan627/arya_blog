import { getBlogPostsWithDetails } from '@/app/utils/getBlogPostsWithDetails'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fullPath = path.join(postsDirectory, `${params.slug}.md`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)

    return NextResponse.json({
      slug: params.slug,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
      content: content
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    )
  }
} 