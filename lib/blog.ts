import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeStringify from "rehype-stringify"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readTime: string
  published: boolean
}

export interface PostDetail {
  meta: PostMeta
  contentHtml: string
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  const fileNames = fs.readdirSync(POSTS_DIR)

  const posts: PostMeta[] = fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "")
      const filePath = path.join(POSTS_DIR, file)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data, content } = matter(fileContent)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || slug.replace(/-/g, " "),
        date: data.date ? String(data.date) : new Date().toISOString().split("T")[0],
        description: data.description || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readTime: stats.text,
        published: data.published !== false,
      }
    })
    .filter((post) => process.env.NODE_ENV === "development" || post.published)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

  return posts
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const mdPath = path.join(POSTS_DIR, `${slug}.md`)
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)

  const filePath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null
  if (!filePath) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: {
        dark: "github-dark-dimmed",
        light: "github-light",
      },
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const meta: PostMeta = {
    slug,
    title: data.title || slug.replace(/-/g, " "),
    date: data.date ? String(data.date) : new Date().toISOString().split("T")[0],
    description: data.description || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readTime: stats.text,
    published: data.published !== false,
  }

  return {
    meta,
    contentHtml: processedContent.toString(),
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tagCounts = new Map<string, number>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
}
