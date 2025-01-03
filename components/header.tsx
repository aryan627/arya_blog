import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-black border-b border-primary">
      <nav className="container mx-auto px-4 py-6">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-primary hover:text-primary-foreground transition-colors text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-primary hover:text-primary-foreground transition-colors text-lg">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

