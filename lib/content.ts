import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const typeToDirectory = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparison',
  'faq': 'content/faq'
}

export type ContentType = keyof typeof typeToDirectory

export interface ContentItem {
  slug: string
  title: string
  description: string
  type: ContentType
  date?: string
  content: string
  targetKeywords?: string[]
  ideaName?: string
  status?: string
}

function getContentDirectory(type: ContentType): string {
  return path.join(process.cwd(), typeToDirectory[type])
}

export async function getAllPosts(type: ContentType): Promise<ContentItem[]> {
  try {
    const contentDir = getContentDirectory(type)
    const files = fs.readdirSync(contentDir)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const slug = file.replace(/\.md$/, '')
        return await getPostBySlug(type, slug)
      })
    )
    
    return posts.filter(Boolean).sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    // Content directory doesn't exist yet
    return []
  }
}

export async function getPostBySlug(type: ContentType, slug: string): Promise<ContentItem | null> {
  try {
    const contentDir = getContentDirectory(type)
    const filePath = path.join(contentDir, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      type,
      date: data.date || null,
      content: contentHtml,
      targetKeywords: data.targetKeywords || [],
      ideaName: data.ideaName || null,
      status: data.status || null
    }
  } catch (error) {
    return null
  }
}

export async function getAllSlugs(type: ContentType): Promise<string[]> {
  try {
    const contentDir = getContentDirectory(type)
    const files = fs.readdirSync(contentDir)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''))
  } catch (error) {
    return []
  }
}