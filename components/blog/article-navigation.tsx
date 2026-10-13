import Link from "next/link"
import { ArticleNavigation } from "@/lib/blog"
import { ArrowLeft, ArrowRight, BookOpen, Clock, Tag } from "lucide-react"

interface ArticleNavigationProps {
  navigation: ArticleNavigation
}

/**
 * Server-rendered Article Navigation (Feature 4).
 * Provides chronological Previous/Next post navigation and tag-based Related Articles.
 */
export function ArticleNavigationSection({ navigation }: ArticleNavigationProps) {
  const { previous, next, related } = navigation
  const hasPrevOrNext = previous !== null || next !== null
  const hasRelated = related && related.length > 0

  if (!hasPrevOrNext && !hasRelated) {
    return null
  }

  return (
    <div className="mt-16 pt-10 border-t border-border/70 space-y-12 not-prose">
      {/* 1. Chronological Previous / Next Navigation */}
      {hasPrevOrNext && (
        <nav aria-label="Adjacent articles" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-border/70 bg-card/40 dark:bg-card/25 backdrop-blur-xs hover:border-border hover:bg-card/80 dark:hover:bg-card/50 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/25 transition-all duration-200"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono mb-2.5">
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Older Essay</span>
                </span>
                <h4 className="text-base font-semibold font-serif text-foreground tracking-tight group-hover:underline underline-offset-4 line-clamp-2 leading-snug">
                  {previous.title}
                </h4>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <span className="inline-flex items-center gap-1 bg-muted/40 px-2 py-0.5 rounded border border-border/50 text-[11px]">
                  <Clock className="w-3 h-3 opacity-70" />
                  {previous.readTime}
                </span>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-border/70 bg-card/40 dark:bg-card/25 backdrop-blur-xs hover:border-border hover:bg-card/80 dark:hover:bg-card/50 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/25 transition-all duration-200 text-right sm:col-start-2"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono mb-2.5 justify-end">
                  <span>Newer Essay</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <h4 className="text-base font-semibold font-serif text-foreground tracking-tight group-hover:underline underline-offset-4 line-clamp-2 leading-snug">
                  {next.title}
                </h4>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono justify-end">
                <span className="inline-flex items-center gap-1 bg-muted/40 px-2 py-0.5 rounded border border-border/50 text-[11px]">
                  <Clock className="w-3 h-3 opacity-70" />
                  {next.readTime}
                </span>
              </div>
            </Link>
          )}
        </nav>
      )}

      {/* 2. Related Articles by shared tags or metadata */}
      {hasRelated && (
        <section aria-labelledby="related-articles-title" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border/50">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <h3 id="related-articles-title" className="text-xs font-semibold tracking-wider text-muted-foreground uppercase font-mono">
              Related Reading
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-5 rounded-2xl border border-border/70 bg-card/40 dark:bg-card/25 backdrop-blur-xs hover:border-border hover:bg-card/80 dark:hover:bg-card/50 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/25 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-2">
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

                  <h4 className="text-base font-semibold font-serif text-foreground tracking-tight group-hover:underline underline-offset-4 line-clamp-2 leading-snug">
                    {post.title}
                  </h4>

                  {post.description && (
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </div>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground border border-border/40 inline-flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5 opacity-60" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
