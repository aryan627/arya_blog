'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavHeader() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-4 mb-8 text-primary">
      <Link 
        href="/" 
        className={`hover:text-primary-foreground transition-colors ${
          pathname === '/' ? 'text-primary-foreground' : ''
        }`}
      >
        ~/home
      </Link>
      <Link 
        href="/blog" 
        className={`hover:text-primary-foreground transition-colors ${
          pathname.startsWith('/blog') ? 'text-primary-foreground' : ''
        }`}
      >
        ~/blog
      </Link>
    </nav>
  )
} 