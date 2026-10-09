import Link from "next/link"
import type { Metadata } from "next"
import { getAllPosts, getAllTags } from "@/lib/blog"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Clock, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical essays, postmortems, and notes on distributed systems, architecture, and systems engineering.",
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()
  const tags = await getAllTags()

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
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

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Intro */}
        <div className="space-y-3 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Writing
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Notes, benchmarks, and deep dives on distributed systems, systems programming, and software engineering.
          </p>
        </div>

        {/* Tags bar if any tags exist */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-10 pb-6 border-b border-border/40">
            <span className="text-xs text-muted-foreground mr-1.5 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Topics:
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full border border-border/60 bg-muted/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Posts List */}
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm py-12 text-center">
            No published posts found. Create a markdown file in <code className="text-xs bg-muted px-1.5 py-0.5 rounded">content/posts/</code> to publish your first post.
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col items-start p-5 -mx-5 rounded-lg transition-colors hover:bg-muted/40 border border-transparent hover:border-border/50"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mb-2">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-medium text-foreground tracking-tight group-hover:underline underline-offset-4 decoration-stone-400">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                {post.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {post.description}
                  </p>
                )}

                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-3xl px-6 py-12 border-t border-border/40 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Uttam Raj. Authored in Markdown.
      </footer>
    </div>
  )
}
