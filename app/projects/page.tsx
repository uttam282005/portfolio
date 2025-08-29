"use client"

import { useState } from "react"
import { LayoutGrid, List } from "lucide-react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { FadeInSection } from "@/components/fade-in-section"
import { projects } from "@/lib/info"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ScrollProgress } from "@/components/scroll-progress"
import { ProjectCard } from "@/components/project-card" // Named import for ProjectCard
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"


export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")

  return (
    <FadeInSection>
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <SmoothScroll />
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
          <main>
            <FadeInSection>
              <section className="space-y-8">
                {/* Header row: title + view toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/"
                      aria-label="Back to Home"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Home</span>
                    </Link>
                  </div>

                  <div className="inline-flex items-center gap-3">
                    <ThemeToggle />

                    <div className="inline-flex items-center gap-1 rounded-md border border-border/50 p-1">
                      <button
                        type="button"
                        aria-label="Grid view"
                        aria-pressed={view === "grid"}
                        onClick={() => setView("grid")}
                        className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${view === "grid"
                          ? "bg-primary/15 text-foreground shadow-sm ring-1 ring-primary/25"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        <LayoutGrid className="h-4 w-4" />
                        <span className="hidden sm:inline">Grid</span>
                      </button>
                      <button
                        type="button"
                        aria-label="List view"
                        aria-pressed={view === "list"}
                        onClick={() => setView("list")}
                        className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${view === "list"
                          ? "bg-primary/15 text-foreground shadow-sm ring-1 ring-primary/25"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        <List className="h-4 w-4" />
                        <span className="hidden sm:inline">List</span>
                      </button>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-foreground">Projects ({projects.length})</h2>

                <LayoutGroup>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {view === "grid" ? (
                      <motion.div
                        key="grid"
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
                      >
                        {projects.map((project) => (
                          <motion.div
                            key={project.title}
                            layout
                            layoutId={`project-${project.title}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                          >
                            <ProjectCard {...project} />
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="list"
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="space-y-8"
                      >
                        {projects.map((project) => (
                          <motion.div
                            key={project.title}
                            layout
                            layoutId={`project-${project.title}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                          >
                            <ProjectCard {...project} />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </LayoutGroup>
              </section>
            </FadeInSection>
          </main>
          <FadeInSection>
            <footer className="mt-24 pt-8 border-t border-border/30">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  © {new Date().getFullYear()} Uttam Raj. Built with Next.js.
                </p>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Back to Home
                </Link>
              </div>
            </footer>
          </FadeInSection>
        </div>
      </div>
    </FadeInSection>
  )
}
