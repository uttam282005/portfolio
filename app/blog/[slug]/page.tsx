import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <article className="space-y-8">
          {/* Article Header */}
          <header className="space-y-4 pb-8 border-b border-border/60">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={post.meta.date}>
                  {new Date(post.meta.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.meta.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-foreground leading-[1.25]">
              {post.meta.title}
            </h1>

            {post.meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 rounded border border-border/50 bg-muted/60 text-muted-foreground inline-flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Markdown HTML Content */}
          <div
            className="prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed
              prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-muted-foreground
              prose-li:text-muted-foreground
              prose-strong:text-foreground prose-strong:font-semibold
              prose-hr:border-border/60 prose-hr:my-8
              prose-blockquote:border-l-border prose-blockquote:text-muted-foreground prose-blockquote:font-normal"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-border/60 space-y-6">
            <div className="flex items-center justify-between text-sm">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all articles</span>
              </Link>
              <Link
                href="https://github.com/uttam282005"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-xs"
              >
                Written by Uttam Raj
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
