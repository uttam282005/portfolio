import Link from "next/link"
import { ProjectCard } from "@/components/project-card"
import { Card } from "@/components/ui/card"
import { NowSection } from "@/components/now-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { OpenSourceSection } from "@/components/open-source-section"
import { SkillsSection } from "@/components/skill-section"
import { FloatingNav } from "@/components/floating-nav"
import { projects } from "@/lib/info"
import { getAllPosts } from "@/lib/blog"
import { ArrowUpRight, Clock, ArrowRight, Github, Mail, Linkedin, Twitter, FileText } from "lucide-react"

export default async function Home() {
  const allPosts = await getAllPosts()
  const recentPosts = allPosts.slice(0, 3)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FloatingNav />

      {/* Clean Minimalist Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-center justify-between py-3.5">
            <Link
              href="/"
              className="font-medium text-sm sm:text-base tracking-tight hover:opacity-80 transition-opacity"
            >
              Uttam Raj
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link
                href="#projects"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </Link>
              <Link
                href="#open-source"
                className="text-muted-foreground hover:text-foreground transition-colors hidden xs:inline"
              >
                OSS
              </Link>
              <Link
                href="#writing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Writing
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="https://drive.google.com/file/d/1xzL5jndnS13-gt7-5LRwGEbCi1BO5XiD/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1.5 rounded-md border border-border/60 bg-muted/30 hover:bg-muted/70 hover:border-foreground/30 text-foreground transition-colors"
              >
                <span>CV</span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 space-y-16 sm:space-y-20">
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="space-y-3">
            <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
              Systems & Backend Engineer
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
              Engineering distributed systems and low-latency backends.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Hi, I&apos;m Uttam. I study Computational Mathematics at NIT Agartala. I focus on distributed coordination, concurrency, memory efficiency in C++20 and Go, and open-source infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="block size-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for backend engineering roles
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
            <Link
              href="#projects"
              className="text-foreground font-medium hover:underline underline-offset-4 inline-flex items-center gap-1"
            >
              Explore projects ↓
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              Read essays →
            </Link>
            <span className="text-border">•</span>
            <Link
              href="https://github.com/uttam282005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              GitHub ↗
            </Link>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Featured Projects
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Systems architecture, distributed coordination, and performance engineering.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <span>All projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects
              .filter((p) => p.showInMain)
              .map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
          </div>
        </section>

        {/* Open Source */}
        <section id="open-source" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Open Source Contributions
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Refactoring and hardening developer tools and runtime libraries.
              </p>
            </div>
            <Link
              href="/open-source"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <OpenSourceSection />
        </section>

        {/* Writing / Blog Posts */}
        <section id="writing" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Writing
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Technical write-ups, deep dives, and architectural notes.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <span>All essays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No published essays yet.</p>
            ) : (
              recentPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="p-5 border-border/60 bg-card/50 hover:bg-card/90 hover:border-foreground/30 transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h3 className="text-base font-medium text-foreground tracking-tight group-hover:underline underline-offset-4 decoration-muted-foreground">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground shrink-0">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {post.description}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2 py-0.5 rounded border border-border/50 bg-muted/30 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Technical Skills */}
        <section id="skills" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Technical Stack & Systems
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Languages, runtimes, and engineering tooling I work with daily.
            </p>
          </div>

          <SkillsSection />
        </section>

        {/* About Section */}
        <section id="about" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              About
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Background, focus, and core principles.
            </p>
          </div>

          <Card className="p-5 sm:p-6 border-border/60 bg-card/50">
            <div className="space-y-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                I am an engineer drawn to problems where correctness, latency, and system stability intersect. Currently pursuing my degree in Computational Mathematics at the National Institute of Technology (NIT) Agartala, I combine mathematical rigor with low-level systems programming.
              </p>
              <p>
                My projects revolve around building foundational components from scratch—such as an in-memory limit order book matching engine in C++20 with custom memory pools, distributed coordinators in Go, and custom POSIX shell environments.
              </p>
              <p>
                Beyond individual projects, I actively contribute to developer ecosystems like AWS Lambda Powertools, solve competitive programming problems, and write technical essays documenting the architectural trade-offs I discover along the way.
              </p>
            </div>
          </Card>
        </section>

        {/* Now Section */}
        <section id="now" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Now
            </h2>
          </div>

          <NowSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Get in Touch
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Open to conversations about distributed systems, backend engineering, and new opportunities.
            </p>
          </div>

          <Card className="p-5 sm:p-6 border-border/60 bg-card/50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Email", href: "mailto:ura282005@gmail.com", icon: Mail },
                { label: "GitHub", href: "https://github.com/uttam282005", icon: Github },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/uttam-raj-050709269/", icon: Linkedin },
                { label: "Twitter / X", href: "https://x.com/raj_uttam2005", icon: Twitter },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-md border border-border/60 bg-muted/20 hover:bg-muted/60 hover:border-foreground/30 transition-all text-xs font-medium text-foreground"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>Looking for my complete background and experience?</span>
              <Link
                href="https://drive.google.com/file/d/1xzL5jndnS13-gt7-5LRwGEbCi1BO5XiD/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground hover:underline underline-offset-4 font-mono font-medium"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Resume ↗</span>
              </Link>
            </div>
          </Card>
        </section>

        {/* Minimal Footer */}
        <footer className="pt-8 pb-12 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Uttam Raj. Engineered with precision.</p>
          <div className="flex items-center gap-4">
            <Link href="#projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Writing
            </Link>
            <Link href="https://github.com/uttam282005" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
