import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Arya\'s Blog',
  description: 'A blog about technology and programming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}

