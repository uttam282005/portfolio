
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ResumeDownload } from "@/components/resume-download"
import { GitHubActivity } from "@/components/github-activity"
import { NowSection } from "@/components/now-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { FadeInSection } from "@/components/fade-in-section"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ReadingTime } from "@/components/reading-time"
import { FloatingNav } from "@/components/floating-nav"
import { ProjectCard } from "@/components/project-card"
import { EnhancedStatus } from "@/components/enhanced-status"

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

export default function Home() {
  const aboutContent = `
    I'm a prefinal-year B.Tech student in Computational Mathematics at NIT Agartala, passionate about systems programming,
    full-stack development, and building tools that make an impact.

    I've built projects ranging from a custom Unix-like shell conforming to POSIX standards to AI-powered blogging platforms
    using LangChain and RAG. I enjoy working across the stack, with a deep interest in backend infrastructure,
    distributed systems, and developer tools.

    Outside of development, I'm active in competitive programming on platforms like Codeforces and LeetCode.
    I believe in clean code,
    strong fundamentals, and solving real-world problems with scalable, elegant solutions.
  `
  const blogPosts = [
    {
      title: "From DOM Manipulation to React: Simplifying Dynamic Web Development",
      link: "https://medium.com/@uttam282005/from-dom-manipulation-to-react-simplifying-dynamic-web-development-307a7a54370a",
      date: "Mar 2024",
      desc: "A beginner-friendly exploration of how React abstracts and improves traditional DOM manipulation using its reconciliation algorithm.",
      content:
        "This post breaks down the transition from manual DOM manipulation to using React, explaining how React's virtual DOM and diffing mechanism optimize rendering. Includes hands-on code examples and practical use cases to help beginners grasp the core concepts of React development.",
    },
  ]

  const featuredProjects = projects.slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <SmoothScroll />
      <FloatingNav />

      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <FadeInSection>
          <header className="mb-24">
            <div className="flex items-start justify-between mb-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">Uttam Raj</h1>
                  <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                    Backend-focused Software Engineer building distributed systems and AI-integrated platforms.
                  </p>
                </div>
                <EnhancedStatus />
              </div>
              <ThemeToggle />
            </div>
          </header>
        </FadeInSection>

        <FadeInSection>
          <nav className="mb-20">
            <div className="flex flex-wrap gap-8 pb-6 border-b border-border/30">
              {[
                ["#about", "About"],
                ["#projects", "Projects"],
                ["#writing", "Writing"],
                ["#now", "Now"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium relative group"
                >
                  {label}
                  <span className="absolute -bottom-6 left-0 w-0 h-px bg-foreground transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="https://drive.google.com/file/d/1xzL5jndnS13-gt7-5LRwGEbCi1BO5XiD/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-200 ml-auto"
              >
                Resume ↗
              </Link>
            </div>
          </nav>
        </FadeInSection>

        <main className="space-y-24">
          {/* About */}
          <FadeInSection>
            <section id="about" className="scroll-mt-24">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-foreground">About</h2>
                  <ReadingTime content={aboutContent} className="text-xs text-muted-foreground" />
                </div>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    I'm Uttam Raj, a third-year B.Tech student in Computational Mathematics at NIT Agartala. I'm
                    passionate about building{" "}
                    <span className="text-foreground font-medium">high-performance backend systems</span> and exploring
                    the deep internals of operating systems, networks, and distributed architectures.
                  </p>
                  <p>
                    My technical interests span from system-level programming to full-stack development. I've built a{" "}
                    <span className="text-foreground font-medium">POSIX-compliant Unix shell</span> from scratch and
                    developed several full-stack AI-powered web platforms using React, TypeScript, Python, and Hono. I
                    also enjoy competitive programming and have solved over{" "}
                    <span className="text-foreground font-medium">700 problems</span>
                    across platforms like Codeforces, LeetCode, and CodeChef.
                  </p>
                  <p>
                    When I'm not coding, I spend time reading technical blogs, writing about what I learn, or competing
                    in hackathons and contests.
                  </p>
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* Projects */}
          <FadeInSection>
            <section id="projects" className="scroll-mt-24">
              <div className="space-y-12">
                <h2 className="text-2xl font-semibold text-foreground">Featured Projects</h2>
                <div className="space-y-12">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                  ))}
                </div>
                <div className="flex justify-center pt-8">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/30 hover:border-border transition-colors duration-200 group"
                  >
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 text-sm font-medium">
                      View All Projects    
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* GitHub Activity */}
          <FadeInSection>
            <section id="github" className="scroll-mt-24">
              <div className="border border-border/30 rounded-lg p-6">
                <GitHubActivity />
              </div>
            </section>
          </FadeInSection>

          {/* Writing */}
          <FadeInSection>
            <section id="writing" className="scroll-mt-24">
              <div className="space-y-12">
                <h2 className="text-2xl font-semibold text-foreground">Recent Writing</h2>
                <div className="space-y-8">
                  {blogPosts.map(({ title, date, desc, content, link }) => (
                    <div key={title} className="group">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-medium text-foreground group-hover:text-muted-foreground transition-colors duration-200">
                            <Link href={link} className="hover:underline underline-offset-4">
                              {title}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground flex-shrink-0">
                            <ReadingTime content={content} />
                            <time className="font-mono">{date}</time>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* Now Section */}
          <FadeInSection>
            <NowSection />
          </FadeInSection>

          {/* Contact */}
          <FadeInSection>
            <section id="contact" className="scroll-mt-24">
              <div className="space-y-12">
                <h2 className="text-2xl font-semibold text-foreground">Let's Connect</h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ["mailto:ura282005@gmail.com", "Mail"],
                      ["https://github.com/uttam282005", "GitHub"],
                      ["https://www.linkedin.com/in/uttam-raj-050709269/", "LinkedIn"],
                      ["https://x.com/raj_uttam2005", "Twitter"],
                    ].map(([href, label]) => (
                      <Link
                        key={label}
                        href={href}
                        className="flex items-center gap-3 p-4 rounded-lg border border-border/30 hover:border-border transition-colors duration-200 group"
                      >
                        <div className="w-2 h-2 bg-muted-foreground rounded-full group-hover:bg-foreground transition-colors duration-200" />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 text-sm font-medium">
                          {label}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-8 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-foreground">Interested in working together?</h3>
                        <p className="text-muted-foreground text-sm">
                          Download my resume or get in touch to discuss opportunities.
                        </p>
                      </div>
                      <ResumeDownload />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeInSection>
        </main>

        <FadeInSection>
          <footer className="mt-24 pt-8 border-t border-border/30">
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} Uttam Raj. Built with Next.js.
            </p>
          </footer>
        </FadeInSection>
      </div>
    </div>
  )
}

