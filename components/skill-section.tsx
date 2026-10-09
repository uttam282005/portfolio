import { Card } from "@/components/ui/card"

type Category = {
  title: string
  items: string[]
}

const CATEGORIES: Category[] = [
  {
    title: "Systems & Languages",
    items: ["C", "C++20", "Go", "Python", "TypeScript", "POSIX / Linux", "Bash"],
  },
  {
    title: "Distributed Systems & Infra",
    items: ["MapReduce", "gRPC", "RPC Protocols", "Docker", "Linux Internals", "AWS Lambda"],
  },
  {
    title: "Databases & Storage",
    items: ["PostgreSQL", "Redis", "Memory Pools", "MongoDB"],
  },
  {
    title: "Backend & Web",
    items: ["Hono", "Express.js", "Node.js", "Next.js", "REST APIs"],
  },
  {
    title: "Core CS",
    items: ["Operating Systems", "Concurrency & Multithreading", "Data Structures & Algorithms", "Computer Networks"],
  },
  {
    title: "Developer Tooling",
    items: ["Git", "GitHub Actions", "GDB", "Valgrind", "Neovim", "Linux CLI"],
  },
]

export function SkillsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {CATEGORIES.map(({ title, items }) => (
        <Card key={title} className="p-4 sm:p-5 border-border/60 bg-card/50 transition-colors">
          <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{title}</h3>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {items.map((label) => (
              <span
                key={label}
                className="font-mono text-xs rounded border border-border/50 bg-muted/30 px-2 py-0.5 text-foreground/85"
              >
                {label}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
