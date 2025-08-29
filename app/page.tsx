
import Link from "next/link"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { NowSection } from "@/components/now-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { OpenSourceSection } from "@/components/open-source-section"
import { SkillsSection } from "@/components/skill-section"
import { ResumeDownload } from "@/components/resume-download"
import { GitHubActivity } from "@/components/github-activity"
import { ScrollProgress } from "@/components/scroll-progress"
import { StatusIndicator } from "@/components/status-indicator"
import { SmoothScroll } from "@/components/smooth-scroll"
import { StaggerChildren } from "@/components/stagger-children"
import { FadeInSection } from "@/components/fade-in-section"

const projects = [
  {
    title: "Custom Unix Shell",
    year: "2025",
    description:
      "A custom Unix shell written in C. Features a POSIX-compliant interface and supports features like process management, command execution and file system operations.",
    technologies: ["C", "POSIX", "Process Management", "Command Execution", "File System Operations"],
    githubUrl: "https://github.com/uttam282005/shell-from-scratch",
    imageUrl: "/github.png",
    liveDemo: false,
  },

  {
    title: "Gist: AI-Powered Blogging Platform",
    year: "2024",
    description:
      "A full-stack blogging platform featuring AI-assisted content interaction. Integrated  summarization and a RAG-powered chatbot to boost engagement and reduce reading time.",
    technologies: ["React", "TypeScript", "Python", "LangChain", "RAG", "Hono"],
    projectUrl: "https://gist-3jc.pages.dev",
    imageUrl: "/gist.png",
    githubUrl: "https://github.com/uttam282005/gist",
  },
]

const blogPosts = [
  {
    title: "From DOM Manipulation to React",
    link: "https://medium.com/@uttam282005/from-dom-manipulation-to-react-simplifying-dynamic-web-development-307a7a54370a",
    date: "Mar 2024",
    desc: "How React abstracts imperative DOM work via the virtual DOM and diffing, with hands‑on examples.",
  },
]

export default function Home() {
  return (
    <FadeInSection>
      <main className="min-h-screen bg-background">
        <ScrollProgress />
        <SmoothScroll />
        {/* Top Nav */}
        <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex items-center gap-6 justify-between py-3">
              <Link href="/" className="font-semibold text-foreground">
                Uttam Raj
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                {[
                  ["#about", "About"],
                  ["#skills", "Skills"],
                  ["#projects", "Projects"],
                  ["#open-source", "OSS"],
                  ["#writing", "Writing"],
                  ["#now", "Now"],
                  ["#contact", "Contact"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                ))}
              </nav>
              {/* Group ThemeToggle with Resume button on the right */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-600/90 text-white">
                  <Link
                    href="https://drive.google.com/file/d/1xzL5jndnS13-gt7-5LRwGEbCi1BO5XiD/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20 space-y-20">
          {/* Hero */}
          <header className="space-y-5">
            <h1 className="text-balance text-4xl md:text-5xl font-bold tracking-tight">
              {"Backend Engineer building "}
              <span className="underline decoration-blue-500 decoration-2 underline-offset-4">
                {"distributed systems"}
              </span>
              {" and "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                {"AI-native platforms."}
              </span>
            </h1>

            {/* keep the rest of hero content */}
            <p className="text-pretty text-muted-foreground leading-relaxed">
              I care about reliability, performance, and developer experience. Previously built a POSIX-style shell,
              AI-assisted blogging tools, and platform primitives across the stack.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#projects"
                className="text-sm text-blue-600 hover:underline underline-offset-4"
              >
                View projects
              </Link>
              <Link
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </header>

          {/* About */}
          <section id="about" className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-foreground/80">
              <span className="block size-1.5 rounded-full bg-blue-600" />
              About
            </div>
            <Card className="p-6 border-border/60">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a prefinal‑year B.Tech student in Computational Mathematics at NIT Agartala. I enjoy building
                  high‑performance backends and exploring the internals of operating systems, networks, and distributed
                  systems.
                </p>
                <p>
                  I’ve shipped a POSIX‑style shell, full‑stack AI products, and developer tools using React, TypeScript,
                  Python, and Hono. I also practice competitive programming and have solved 800+ problems across
                  platforms.
                </p>
              </div>
            </Card>
          </section>

          {/* Skills */}
          <section id="skills" className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-foreground/80">
              <span className="block size-1.5 rounded-full bg-blue-600" />
              Skills
            </div>
            <SkillsSection />
          </section>

          {/* Projects */}
          <section id="projects" className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-foreground/80">
              <span className="block size-1.5 rounded-full bg-blue-600" />
              Featured Projects
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>
            <div className="pt-1">
              <Link href="/projects" className="text-sm text-blue-600 hover:underline underline-offset-4">
                View all →
              </Link>
            </div>
          </section>

          {/* GitHub Activity */}
          <section id="github-activity" className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-foreground/80">
              <span className="block size-1.5 rounded-full bg-blue-600" />
              GitHub Activity
            </div>
            <Card className="p-6 border-border/60">
              <GitHubActivity />
            </Card>
          </section>

          {/* Open Source */}
          <section id="open-source" className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-foreground/80">
              <span className="block size-1.5 rounded-full bg-blue-600" />
              Open Source Contributions
            </div>
            <OpenSourceSection />
          </section>
          {/* Writing */}

          <section id="writing" className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-foreground/80">
              <span className="block size-1.5 rounded-full bg-blue-600" />
              Recent Writing
            </div>
            <div className="space-y-4">
              {blogPosts.map(({ title, date, desc, link }) => (
                <Card key={title} className="p-5 md:p-6 border-border/60 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-pretty text-base md:text-lg font-medium">
                      <Link
                        href={link}
                        className="hover:underline underline-offset-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {title}
                      </Link>
                    </h3>
                    <time className="text-xs text-muted-foreground font-mono flex-shrink-0">{date}</time>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Now */}
          <section id="now" className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-foreground/80">
              <span className="block size-1.5 rounded-full bg-blue-600" />
              Now
            </div>
            <NowSection />
          </section>

          {/* Contact */}
          <section id="contact" className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-foreground/80">
              <span className="block size-1.5 rounded-full bg-blue-600" />
              Contact
            </div>
            <Card className="p-6 border-border/60">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["mailto:ura282005@gmail.com", "Mail"],
                  ["https://github.com/uttam282005", "GitHub"],
                  ["https://www.linkedin.com/in/uttam-raj-050709269/", "LinkedIn"],
                  ["https://x.com/raj_uttam2005", "Twitter"],
                ].map(([href, label]) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 rounded-md border border-border/50 px-3 py-3 hover:border-border transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="block size-1.5 rounded-full bg-blue-600" />
                    <span className="text-sm text-foreground">{label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-6">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Interested in working together?</h4>
                  <p className="text-xs text-muted-foreground">Download my resume or drop me a line.</p>
                </div>
                <ResumeDownload />
              </div>
            </Card>
          </section>

          {/* Footer */}
          <footer className="pt-4 pb-10 text-center text-sm text-muted-foreground border-t border-border/50">
            © {new Date().getFullYear()} Uttam Raj. Built with Next.js.
          </footer>
        </div>
      </main >
    </FadeInSection>
  )
}

