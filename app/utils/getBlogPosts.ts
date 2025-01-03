import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getBlogPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'))
  return files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(path.join(process.cwd(), 'posts', filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      title: frontmatter.title || 'Untitled',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    }
  })
} 