import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'

export async function processMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true
    })
    .use(rehypeHighlight)
    .use(rehypeStringify, {
      allowDangerousHtml: true
    })
    .process(content)

  return result.toString()
}

function all(h: any, node: any) {
  const values = []
  const children = node.children || []
  let index = -1
  
  while (++index < children.length) {
    const result = h(node, children[index], index)
    if (result) {
      values.push(result)
    }
  }
  
  return values
} 