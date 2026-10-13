import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { getAllPosts, getAllTags } from "@/lib/blog"
import { ThemeToggle } from "@/components/theme-toggle"
import { BlogSearchFilter } from "@/components/blog/blog-search-filter"
import { ArrowLeft, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical essays, postmortems, and notes on distributed systems, architecture, and systems engineering.",
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()
  const tags = await getAllTags()

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Atmosphere & Ambient Lighting */}
      <div className="absolute top-0 inset-x-0 h-[480px] pointer-events-none overflow-hidden -z-10 select-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[380px] bg-gradient-to-b from-stone-400/20 via-stone-300/5 to-transparent dark:from-zinc-500/15 dark:via-zinc-800/5 dark:to-transparent blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.35] dark:opacity-[0.2] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_70%,transparent_100%)]" />
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/#projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
            >
              Projects
            </Link>
            <Link
              href="/#open-source"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
            >
              OSS
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Editorial Container */}
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Elevated Editorial Header */}
        <div className="space-y-4 mb-10 pb-8 border-b border-border/70">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent-soft text-accent border border-accent/20 shadow-xs backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            <span>Essays & Systems Notes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-foreground leading-[1.15]">
            Writing
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl text-pretty">
            Engineering essays, postmortems, and technical notes covering distributed systems,
            low-latency architecture, concurrency primitives, and practical systems engineering.
          </p>

          {/* Author Byline Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-border shrink-0">
                <Image
                  src="/me.png"
                  alt="Uttam Raj"
                  width={20}
                  height={20}
                  className="object-cover"
                />
              </div>
              <span className="text-foreground font-medium">Uttam Raj</span>
            </div>
            <span className="text-border">•</span>
            <span>{posts.length} {posts.length === 1 ? "article published" : "articles published"}</span>
            <span className="text-border">•</span>
            <span>Systems & Backend</span>
          </div>
        </div>

        {/* Interactive Search, Topic Tag Filters & Vertically Stacked Editorial Entries */}
        <BlogSearchFilter initialPosts={posts} tags={tags} />
      </main>

      <footer className="mx-auto max-w-3xl px-6 py-12 border-t border-border/40 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Uttam Raj. Authored in Markdown.
      </footer>
    </div>
  )
}
