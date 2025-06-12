import { NextRequest, NextResponse } from 'next/server'
import { trackCrawlerVisit } from '@split.dev/analytics/middleware'

export async function middleware(request: NextRequest) {
  // Add Split Analytics tracking
  if (process.env.SPLIT_API_KEY) {
    trackCrawlerVisit(request, {
      apiKey: process.env.SPLIT_API_KEY,
      debug: process.env.NODE_ENV === 'development'
    }).then((wasTracked) => {
      if (wasTracked && process.env.NODE_ENV === 'development') {
        console.log('✅ AI crawler tracked successfully')
      }
    }).catch((error) => {
      console.error('❌ Split Analytics error:', error)
    })
  }
  
  // Your existing middleware logic here...
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}