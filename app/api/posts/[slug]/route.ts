import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const postsDirectory = path.join(process.cwd(), 'posts')
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data: frontmatter, content } = matter(fileContents)

        return NextResponse.json({
            slug: slug,
            title: frontmatter.title,
            date: frontmatter.date,
            tags: frontmatter.tags,
            content: content
        })
    } catch {
        return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
        )
    }
}
