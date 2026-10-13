import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { ThemeToggle } from "@/components/theme-toggle"
import { ReadingProgress } from "@/components/reading-progress"
import { ArticleNavigationSection } from "@/components/blog/article-navigation"
import { ArticleEnhancer } from "@/components/blog/article-enhancer"
import { ArrowLeft, Calendar, Clock, Tag, Github, ArrowUpRight } from "lucide-react"

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
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Atmosphere & Ambient Lighting */}
      <div className="absolute top-0 inset-x-0 h-[480px] pointer-events-none overflow-hidden -z-10 select-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[380px] bg-gradient-to-b from-stone-400/20 via-stone-300/5 to-transparent dark:from-zinc-500/15 dark:via-zinc-800/5 dark:to-transparent blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.35] dark:opacity-[0.2] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_70%,transparent_100%)]" />
      </div>

      {/* Feature 3: Reading progress indicator (thin client component) */}
      <ReadingProgress />

      {/* Client enhancement island for code block copy buttons and mermaid diagrams */}
      <ArticleEnhancer />

      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
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

      {/* Main Container */}
      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Reading geometry column (approx 768px, 17px body text, 1.7 line height) */}
        <article className="w-full max-w-[768px] min-w-0 mx-auto">
          {/* Elevated Editorial Header */}
          <header className="space-y-6 pb-10 border-b border-border/70">
            {/* Topic Category Pill */}
            <div className="flex flex-wrap items-center gap-2">
              {post.meta.tags[0] && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent-soft text-accent border border-accent/20 shadow-xs backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {post.meta.tags[0]}
                </span>
              )}
              {post.meta.tags.slice(1).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-border/60 bg-muted/40 text-muted-foreground inline-flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5 opacity-60 text-accent" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-foreground leading-[1.18] text-balance">
              {post.meta.title}
            </h1>

            {/* Description */}
            {post.meta.description && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty pt-1">
                {post.meta.description}
              </p>
            )}

            {/* Author Byline Strip with Avatar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border/50">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/80 shadow-xs shrink-0">
                  <Image
                    src="/me.png"
                    alt="Uttam Raj"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground tracking-tight">Uttam Raj</div>
                  <div className="text-xs text-muted-foreground font-mono">Systems & Backend</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span className="inline-flex items-center gap-1.5 bg-muted/40 px-2.5 py-1 rounded-md border border-border/50">
                  <Calendar className="w-3.5 h-3.5 opacity-70" />
                  <time dateTime={post.meta.date}>
                    {new Date(post.meta.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-muted/40 px-2.5 py-1 rounded-md border border-border/50">
                  <Clock className="w-3.5 h-3.5 opacity-70" />
                  {post.meta.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Prose article body with reading geometry & media breakouts */}
          <div
            className="prose-editorial mt-10"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Chronological previous/next posts and related articles */}
          <ArticleNavigationSection navigation={post.navigation} />

          {/* Author Spotlight Card */}
          <div className="mt-16 p-6 sm:p-7 rounded-2xl border border-border/70 bg-card/40 dark:bg-card/25 backdrop-blur-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border/80 shadow-xs shrink-0">
                <Image
                  src="/me.png"
                  alt="Uttam Raj"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-foreground tracking-tight">Uttam Raj</div>
                <div className="text-xs text-muted-foreground font-mono">Systems & Backend Engineer</div>
                <p className="text-xs text-muted-foreground/90 max-w-md pt-0.5 leading-relaxed">
                  Computational Mathematics student at NIT Agartala. Writing about distributed systems, low-latency architecture, and systems programming in Go & C++20.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <Link
                href="https://github.com/uttam282005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 bg-muted/40 hover:bg-muted text-xs font-mono text-foreground hover:border-foreground/30 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
              </Link>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-14 pt-8 border-t border-border/60 space-y-6">
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
