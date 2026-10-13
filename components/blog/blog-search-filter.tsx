"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import { PostMeta } from "@/lib/blog"
import { Search, X, Tag, Clock, ArrowRight } from "lucide-react"

interface BlogSearchFilterProps {
  initialPosts: PostMeta[]
  tags: string[]
}

export function BlogSearchFilter({ initialPosts, tags }: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: Press "/" to focus search input, "Escape" to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault()
        searchInputRef.current?.focus()
      } else if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
        setSearchQuery("")
        searchInputRef.current?.blur()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Calculate tag counts
  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    initialPosts.forEach((post) => {
      post.tags.forEach((t) => {
        counts.set(t, (counts.get(t) || 0) + 1)
      })
    })
    return counts
  }, [initialPosts])

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return initialPosts.filter((post) => {
      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false
      }

      // Search query filter (matches title, description, or tags)
      if (query) {
        const matchesTitle = post.title.toLowerCase().includes(query)
        const matchesDescription = post.description.toLowerCase().includes(query)
        const matchesTag = post.tags.some((t) => t.toLowerCase().includes(query))
        return matchesTitle || matchesDescription || matchesTag
      }

      return true
    })
  }, [initialPosts, searchQuery, selectedTag])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTag(null)
  }

  const isFiltered = searchQuery.trim() !== "" || selectedTag !== null

  return (
    <div className="space-y-10">
      {/* Search and Filters Section */}
      <div className="space-y-5">
        {/* Search Input Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-foreground transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, description, or topic..."
            className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-border/70 bg-card/50 dark:bg-card/30 backdrop-blur-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-xs"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/70 bg-muted/60 border border-border/50 rounded pointer-events-none">
              /
            </kbd>
          </div>
        </div>

        {/* Topic Filters Bar */}
        {tags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-accent" />
                <span>Filter by topic</span>
              </span>
              {isFiltered && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-accent hover:underline transition-colors"
                >
                  Reset filters
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {/* All Posts Pill */}
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  selectedTag === null
                    ? "bg-accent-soft text-accent border-accent/40 font-medium shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-border/80 hover:bg-card/80"
                }`}
              >
                All ({initialPosts.length})
              </button>

              {/* Tag Pills */}
              {tags.map((tag) => {
                const count = tagCounts.get(tag) || 0
                const isSelected = selectedTag === tag
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all inline-flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-accent-soft text-accent border-accent/40 font-medium shadow-xs"
                        : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-border/80 hover:bg-card/80"
                    }`}
                  >
                    <span>{tag}</span>
                    <span
                      className={`text-[10px] font-mono ${
                        isSelected ? "text-accent/80" : "text-muted-foreground/80"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Results Count Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono pt-2 border-b border-border/40 pb-3">
          <span>
            {isFiltered
              ? `Showing ${filteredPosts.length} of ${initialPosts.length} articles`
              : `${initialPosts.length} articles published`}
          </span>
          {selectedTag && (
            <span className="inline-flex items-center gap-1">
              Topic: <strong className="text-accent">{selectedTag}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Styled Article Cards */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center space-y-3 rounded-2xl border border-dashed border-border/70 p-8">
          <p className="text-sm text-muted-foreground">
            No articles match your search criteria.
          </p>
          <button
            onClick={clearFilters}
            className="text-xs font-mono px-3 py-1.5 rounded-md border border-border/60 bg-muted/50 text-foreground hover:bg-muted transition-colors"
          >
            Clear search and topic filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative p-6 sm:p-7 rounded-2xl border border-border/70 bg-card/40 dark:bg-card/25 backdrop-blur-xs hover:border-border hover:bg-card/80 dark:hover:bg-card/50 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/25 transition-all duration-200 flex flex-col items-start"
            >
              {/* Meta bar: Date, Read Time, and Primary Category */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  {post.tags[0] && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-accent-soft text-accent border border-accent/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {post.tags[0]}
                    </span>
                  )}
                  <span className="text-border">•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <span className="inline-flex items-center gap-1.5 bg-muted/40 px-2.5 py-0.5 rounded-md border border-border/50 text-[11px]">
                  <Clock className="w-3 h-3 opacity-70" />
                  {post.readTime}
                </span>
              </div>

              {/* Title with link */}
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground tracking-tight group-hover:text-foreground underline-offset-4 leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              {/* Context description */}
              {post.description && (
                <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              )}

              {/* Tags and Read essay link */}
              <div className="mt-5 w-full flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/50">
                {post.tags.length > 1 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(1).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted/40 text-muted-foreground border border-border/50 hover:text-foreground hover:border-accent/40 hover:bg-muted/80 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                ) : <div />}

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-foreground/80 group-hover:text-accent transition-colors ml-auto"
                >
                  <span>Read essay</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
