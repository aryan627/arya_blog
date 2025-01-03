import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { processMarkdown } from './markdownProcessor'

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content?: string;
}

export async function getBlogPostsWithDetails(includeContent = false) {
  const postsDirectory = path.join(process.cwd(), 'posts')
  
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }
  
  const files = fs.readdirSync(postsDirectory)
  const posts = await Promise.all(
    files
      .filter(filename => filename.endsWith('.md'))
      .map(async filename => {
        const slug = filename.replace('.md', '')
        const fullPath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        
        const { data: frontmatter, content, excerpt } = matter(fileContents, {
          excerpt: true,
          excerpt_separator: '---'
        })

        let processedContent
        if (includeContent && content) {
          processedContent = await processMarkdown(content.split('---')[1] || content)
        }

        return {
          slug,
          title: frontmatter.title || 'Untitled',
          date: frontmatter.date || '',
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          excerpt: excerpt?.trim() || '',
          ...(processedContent && { content: processedContent })
        }
      })
  )

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)
    
    const processedContent = await processMarkdown(content)

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
      excerpt: '',
      content: processedContent
    }
  } catch (error) {
    return null
  }
} 