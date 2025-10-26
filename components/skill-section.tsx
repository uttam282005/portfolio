import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Category = {
  title: string
  items: string[]
}

const CATEGORIES: Category[] = [
  {
    title: "Languages & Runtimes",
    items: ["C", "C++", "Python", "TypeScript","Go", "JavaScript", "Node.js"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Next.js", "Express.js", "Hono", "Tailwind CSS", "Redux"],
  },
  {
    title: "Databases & Messaging",
    items: ["PostgreSQL", "Redis", "Firebase", "MongoDB"],
  },
  {
    title: "Cloud & Infra",
    items: ["AWS Lambda", "Docker", "Linux", "AWS", "Cloudfare", "Render", "Vercel", "Heroku"],
  },
  {
    title: "Testing & Quality",
    items: ["Jest", "Vitest", "ESLint", "Prettier"],
  },
  {
    title: "Dev & Tooling",
    items: ["Git", "GitHub Actions", "VS Code", "Neovim", "Emacs", "GDB"],
  },
  {
    title: "Core CS",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Operating Systems", "Computer Networks", "Databases"],
  },
]

export function SkillsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {CATEGORIES.map(({ title, items }) => (
        <Card key={title} className="p-5 md:p-6 border-border/60 transition-colors">
          <h3 className="text-sm font-medium text-foreground/90">{title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="rounded-md border border-border/50 bg-muted text-foreground/80"
              >
                {label}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
