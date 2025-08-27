import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScrollProgress } from "@/components/scroll-progress"
import { FadeInSection } from "@/components/fade-in-section"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ProjectCard } from "@/components/project-card"
import { ArrowLeft } from "lucide-react"

const projects = [
  {
    title: "Custom Unix Shell",
    year: "2025",
    description:
      "A custom Unix shell written in C. Features a POSIX-compliant interface and supports features like process management, command execution and file system operations.",
    technologies: ["C", "POSIX", "Process Management", "Command Execution", "File System Operations"],
    projectUrl: "https://github.com/uttam282005/shell-from-scratch",
    githubUrl: "https://github.com/uttam282005/shell-from-scratch",
    imageUrl: "/github.png",
    liveDemo: false,
  },
  {
    title: "Gist: AI-Powered Blogging Platform",
    year: "2024",
    description:
      "A full-stack blogging platform featuring AI-assisted content interaction. Integrated LangChain-based summarization and a RAG-powered chatbot to boost engagement and reduce reading time.",
    technologies: ["React", "TypeScript", "Python", "LangChain", "RAG", "Hono"],
    projectUrl: "https://gist-3jc.pages.dev",
    imageUrl: "/gist.png",
    githubUrl: "https://github.com/uttam282005/gist",
  },
  {
    title: "URL Shortening CLI Tool",
    year: "2024",
    description:
      "A command-line URL shortener built using Express.js and MongoDB. Supports validation via Zod, CLI interaction through Python's argparse, and uses secure env-based config management.",
    technologies: ["Python", "Express.js", "MongoDB", "Zod"],
    projectUrl: "https://github.com/uttam282005/url-shortner-cli-tool",
    githubUrl: "https://github.com/uttam282005/url-shortner-cli-tool",
    imageUrl: "/github.png",
  },
  {
    title: "MindCare: Mental Health Platform",
    year: "2024",
    description:
      "Mental health platform offering quiz-based assessments, AI-generated feedback, and user progress tracking. Increased average session time with a chat assistant and personalized recommendations.",
    technologies: ["Next.js", "TypeScript", "Firebase", "React"],
    projectUrl: "https://github.com/uttam282005/mindU",
    githubUrl: "https://github.com/uttam282005/mindU",
    imageUrl: "/mindcare.png",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <SmoothScroll />

      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <FadeInSection>
          <header className="mb-24">
            <div className="flex items-start justify-between mb-12">
              <div className="space-y-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">All Projects</h1>
                  <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                    A comprehensive collection of my work spanning systems programming, full-stack development, and AI
                    integration.
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </header>
        </FadeInSection>

        <main>
          <FadeInSection>
            <section className="space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Projects ({projects.length})</h2>
                <div className="text-sm text-muted-foreground">{projects.length} total projects</div>
              </div>
              <div className="space-y-12">
                {projects.map((project) => (
                  <ProjectCard key={project.title} {...project} />
                ))}
              </div>
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
  )
}
