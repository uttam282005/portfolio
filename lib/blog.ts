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
import { visit, SKIP } from "unist-util-visit"
import { toString } from "hast-util-to-string"

import { renderMermaidSync } from "./mermaid"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function remarkMermaid() {
  return (tree: any) => {
    visit(tree, "code", (node: any, index: number | undefined, parent: any) => {
      if (node.lang === "mermaid") {
        const rawCode = node.value.trim()
        const { light, dark, isFallback } = renderMermaidSync(rawCode)

        let diagramContent = ""
        if (isFallback) {
          const encoded = Buffer.from(rawCode, "utf-8").toString("base64")
          diagramContent = `
  <div class="p-6 sm:p-8 overflow-x-auto flex justify-center items-center bg-grid-pattern relative">
    <div class="mermaid-client-render w-full flex justify-center" data-raw-b64="${encoded}">
      <div class="flex items-center gap-2 text-xs font-mono text-muted-foreground animate-pulse py-4">
        <span>Rendering diagram...</span>
      </div>
    </div>
  </div>`
        } else {
          diagramContent = `
  <div class="p-6 sm:p-8 overflow-x-auto flex justify-center items-center bg-grid-pattern relative">
    <div class="diagram-svg-light dark:hidden w-full flex justify-center">
      ${light}
    </div>
    <div class="diagram-svg-dark hidden dark:flex w-full flex justify-center">
      ${dark}
    </div>
  </div>`
        }

        parent.children[index!] = {
          type: "html",
          value: `<figure class="diagram-figure not-prose my-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all" data-diagram="mermaid">
  <div class="code-block-header">
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1.5 opacity-60 mr-1">
        <span class="w-2 h-2 rounded-full bg-stone-400/40 dark:bg-stone-500/40"></span>
        <span class="w-2 h-2 rounded-full bg-stone-400/40 dark:bg-stone-500/40"></span>
        <span class="w-2 h-2 rounded-full bg-stone-400/40 dark:bg-stone-500/40"></span>
      </div>
      <span class="font-mono text-xs text-muted-foreground font-medium">Architecture Diagram</span>
    </div>
    <span class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-accent-soft text-accent border border-accent/20 font-semibold">MERMAID</span>
  </div>${diagramContent}
</figure>`,
        }
      }
    })
  }
}

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export interface ArticleNavigation {
  previous: PostMeta | null
  next: PostMeta | null
  related: PostMeta[]
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readTime: string
  published: boolean
  related?: string[]
}

export interface PostDetail {
  meta: PostMeta
  contentHtml: string
  toc: TocItem[]
  navigation: ArticleNavigation
}

const POSTS_DIR = path.join(process.cwd(), "content/posts")

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
        related: Array.isArray(data.related) ? data.related : undefined,
      }
    })
    .filter((post) => process.env.NODE_ENV === "development" || post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

function rehypeArticlePipeline(options: { toc: TocItem[] }) {
  return (tree: any) => {
    const occurrences = new Map<string, number>()
    options.toc = []

    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      // 1. Heading tree extraction & stable unique anchor IDs (Feature 2)
      if (["h2", "h3"].includes(node.tagName)) {
        const text = toString(node).trim()
        const raw = slugify(text) || "section"
        const count = occurrences.get(raw) || 0
        occurrences.set(raw, count + 1)
        const id = count === 0 ? raw : `${raw}-${count}`

        node.properties = node.properties || {}
        node.properties.id = id
        node.properties.className = [
          ...(Array.isArray(node.properties.className) ? node.properties.className : []),
          "group",
          "relative",
          "scroll-mt-24",
        ]

        options.toc.push({
          id,
          text,
          level: parseInt(node.tagName.slice(1), 10) as 2 | 3,
        })
      }

      // 2. Responsive Table Overflow (Feature 5)
      if (node.tagName === "table" && parent && typeof index === "number") {
        if (parent.properties?.className?.includes?.("table-wrapper")) {
          return
        }
        const wrapper = {
          type: "element",
          tagName: "div",
          properties: {
            className: ["table-wrapper", "overflow-x-auto", "my-8", "rounded-lg", "border", "border-border/60"],
          },
          children: [node],
        }
        parent.children[index] = wrapper
        return [SKIP, index + 1]
      }

      // 3. Accessible Media Captions (Feature 5)
      if (node.tagName === "img" && parent && parent.tagName === "p" && parent.children.length === 1) {
        const title = node.properties?.title as string | undefined
        const alt = node.properties?.alt as string | undefined

        node.properties.className = [
          ...(Array.isArray(node.properties.className) ? node.properties.className : []),
          "rounded-lg",
          "border",
          "border-border/60",
          "mx-auto",
          "max-w-full",
          "h-auto",
        ]

        if (title || alt) {
          parent.tagName = "figure"
          parent.properties = {
            className: ["my-8", "text-center", "breakout-media"],
          }
          parent.children.push({
            type: "element",
            tagName: "figcaption",
            properties: {
              className: ["mt-2.5", "text-xs", "text-muted-foreground", "text-center", "font-mono"],
            },
            children: [{ type: "text", value: title || alt }],
          })
          return SKIP
        }
      }
    })
  }
}

function rehypeCodeHeaderPipeline() {
  const langDisplayMap: Record<string, string> = {
    go: "Go",
    ts: "TypeScript",
    typescript: "TypeScript",
    js: "JavaScript",
    javascript: "JavaScript",
    py: "Python",
    python: "Python",
    sh: "Bash",
    bash: "Bash",
    json: "JSON",
    html: "HTML",
    css: "CSS",
    md: "Markdown",
    text: "Plain Text",
  }

  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      const isFigure =
        node.tagName === "figure" &&
        node.properties &&
        ("data-rehype-pretty-code-figure" in node.properties ||
          "dataRehypePrettyCodeFigure" in node.properties)

      if (isFigure) {
        let title = ""
        const titleIndex = node.children.findIndex(
          (c: any) =>
            c.tagName === "figcaption" &&
            c.properties &&
            ("data-rehype-pretty-code-title" in c.properties ||
              "dataRehypePrettyCodeTitle" in c.properties)
        )
        if (titleIndex !== -1) {
          title = toString(node.children[titleIndex]).trim()
          node.children.splice(titleIndex, 1)
        }

        const preNode = node.children.find((c: any) => c.tagName === "pre")
        const rawLang =
          preNode?.properties?.["data-language"] ||
          preNode?.properties?.dataLanguage ||
          "text"
        const langName =
          langDisplayMap[String(rawLang).toLowerCase()] || String(rawLang).toUpperCase()

        const headerNode = {
          type: "element",
          tagName: "div",
          properties: { className: ["code-block-header"] },
          children: [
            {
              type: "element",
              tagName: "div",
              properties: { className: ["flex", "items-center", "gap-2"] },
              children: [
                {
                  type: "element",
                  tagName: "div",
                  properties: { className: ["flex", "items-center", "gap-1.5", "opacity-60", "mr-1"] },
                  children: [
                    { type: "element", tagName: "span", properties: { className: ["w-2", "h-2", "rounded-full", "bg-stone-400/40", "dark:bg-stone-500/40"] }, children: [] },
                    { type: "element", tagName: "span", properties: { className: ["w-2", "h-2", "rounded-full", "bg-stone-400/40", "dark:bg-stone-500/40"] }, children: [] },
                    { type: "element", tagName: "span", properties: { className: ["w-2", "h-2", "rounded-full", "bg-stone-400/40", "dark:bg-stone-500/40"] }, children: [] },
                  ],
                },
                ...(title
                  ? [
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["text-xs", "font-mono", "text-foreground", "font-medium", "mr-1.5"] },
                        children: [{ type: "text", value: title }],
                      },
                    ]
                  : []),
                {
                  type: "element",
                  tagName: "span",
                  properties: { className: ["font-mono", "uppercase", "text-[10px]", "tracking-wider", "px-2", "py-0.5", "rounded", "border", "border-accent/20", "bg-accent-soft", "text-accent", "font-semibold"] },
                  children: [{ type: "text", value: langName }],
                },
              ],
            },
            {
              type: "element",
              tagName: "button",
              properties: {
                className: ["code-copy-button"],
                type: "button",
                ariaLabel: "Copy code",
              },
              children: [
                {
                  type: "element",
                  tagName: "svg",
                  properties: {
                    className: ["copy-icon", "w-3.5", "h-3.5"],
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  },
                  children: [
                    { type: "element", tagName: "rect", properties: { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }, children: [] },
                    { type: "element", tagName: "path", properties: { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }, children: [] },
                  ],
                },
                {
                  type: "element",
                  tagName: "svg",
                  properties: {
                    className: ["check-icon", "w-3.5", "h-3.5", "hidden", "text-accent"],
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  },
                  children: [
                    { type: "element", tagName: "polyline", properties: { points: "20 6 9 17 4 12" }, children: [] },
                  ],
                },
                {
                  type: "element",
                  tagName: "span",
                  properties: { className: ["copy-text", "text-[11px]", "font-mono"] },
                  children: [{ type: "text", value: "Copy" }],
                },
              ],
            },
          ],
        }

        node.children.unshift(headerNode)
      }
    })
  }
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

  const tocCollector: { toc: TocItem[] } = { toc: [] }

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMermaid)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeArticlePipeline, tocCollector)
    .use(rehypePrettyCode, {
      theme: {
        dark: "github-dark-dimmed",
        light: "github-light",
      },
      keepBackground: false,
    })
    .use(rehypeCodeHeaderPipeline)
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
    related: Array.isArray(data.related) ? data.related : undefined,
  }

  const allPosts = await getAllPosts()
  const navigation = getArticleNavigation(slug, allPosts, meta)

  return {
    meta,
    contentHtml: processedContent.toString(),
    toc: tocCollector.toc,
    navigation,
  }
}

function getArticleNavigation(
  currentSlug: string,
  allPosts: PostMeta[],
  currentMeta: PostMeta
): ArticleNavigation {
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug)

  // Chronological navigation: allPosts is sorted newest -> oldest
  // next = newer article (index - 1), previous = older article (index + 1)
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const previous = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  // Related articles: prioritize explicit metadata, fallback to shared tag overlap
  let related: PostMeta[] = []
  const otherPosts = allPosts.filter((p) => p.slug !== currentSlug)

  if (currentMeta.related && currentMeta.related.length > 0) {
    related = otherPosts.filter((p) => currentMeta.related!.includes(p.slug))
  }

  if (related.length === 0) {
    const scored = otherPosts
      .map((post) => {
        const sharedTags = post.tags.filter((tag) => currentMeta.tags.includes(tag))
        return {
          post,
          sharedCount: sharedTags.length,
        }
      })
      .filter((item) => item.sharedCount > 0)
      .sort((a, b) => {
        if (b.sharedCount !== a.sharedCount) {
          return b.sharedCount - a.sharedCount
        }
        return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
      })

    related = scored.map((s) => s.post).slice(0, 3)
  }

  // If fewer than 2 related posts, backfill with most recent remaining posts
  if (related.length < 2) {
    const remaining = otherPosts.filter((p) => !related.some((r) => r.slug === p.slug))
    related = [...related, ...remaining.slice(0, 2 - related.length)]
  }

  return {
    previous,
    next,
    related: related.slice(0, 3),
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
