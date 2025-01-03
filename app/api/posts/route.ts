import { getBlogPostsWithDetails } from '@/app/utils/getBlogPostsWithDetails'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await getBlogPostsWithDetails()
    console.log('Found posts:', posts) // Debug log
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error getting posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
} 