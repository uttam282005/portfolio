
"use client"

import Link from "next/link"
import { Book, Code, Target, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

interface NowItem {
  type: "book" | "skill" | "project" | "goal"
  title: string
  description: string
  progress?: number
  link?: string
  startDate: string
}

export function NowSection() {
  const currentItems: NowItem[] = [
    {
      type: "book",
      title: "Operating Systems - Three Easy Pieces (3rd Edition)",
      description:
        "A comprehensive guide to operating systems, covering topics like process management, memory management, and file systems.",
      progress: 50,
      startDate: "2025-01-01",
    },
    {
      type: "skill",
      title: "Systems programming",
      description: "Exploring concurrency and network programming.",
      progress: 40,
      startDate: "2025-01-01",
    },
    {
      type: "skill",
      title: "Distributed systems",
      description: "Exploring Distributed Systems",
      progress: 0,
      startDate: "2025-09-01",
    },
    {
      type: "skill",
      title: "Computer networks",
      description: "Exploring network programming and computer networks.",
      progress: 70,
      startDate: "2025-08-20",
    },
    {
      type: "project",
      title: "Multithreaded proxy web server",
      description: "Implementing a multi threaded proxy web server most probably in C",
      progress: 10,
      startDate: "2025-08-29",
    },
    {
      type: "goal",
      title: "Open Source Contributions",
      description: "Contributing to  meaningful open source projects this quarter.",
      progress: 30,
      startDate: "2025-07-01",
    },
  ]

  const getIcon = (type: string) => {
    const iconClass = "w-4 h-4 text-muted-foreground"
    switch (type) {
      case "book":
        return <Book className={iconClass} />
      case "skill":
        return <Code className={iconClass} />
      case "project":
        return <Target className={iconClass} />
      case "goal":
        return <Target className={iconClass} />
      default:
        return <Calendar className={iconClass} />
    }
  }

  const formatStartDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const sectionColor = (type: string) => {
    switch (type) {
      case "book":
        return "bg-sky-600" // Reading
      case "skill":
        return "bg-emerald-600" // Learning
      case "project":
        return "bg-amber-600" // Building
      case "goal":
        return "bg-rose-600" // Goals
      default:
        return "bg-blue-600"
    }
  }

  const groupedItems = currentItems.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = []
      acc[item.type].push(item)
      return acc
    },
    {} as Record<string, NowItem[]>,
  )

  return (
    <div className="space-y-8">
      <div className="mb-2">
        <p className="text-muted-foreground leading-relaxed">
          What I&apos;m currently focused on learning, building, and exploring. Updated regularly to reflect my current
          interests and growth areas.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedItems).map(([type, items]) => (
          <div key={type}>
            <h3 className="text-sm font-medium text-foreground mb-3 capitalize flex items-center gap-2">
              <span className={`block size-1.5 rounded-full ${sectionColor(type)}`} />
              {type === "book" ? "Reading" : type === "skill" ? "Learning" : type === "project" ? "Building" : "Goals"}
            </h3>

            <div className="space-y-3">
              {items.map((item, index) => (
                <Card key={index} className="p-4 border-border/60">
                  <div className="flex items-start justify-between mb-2 gap-4">
                    <div className="flex items-start gap-2">
                      {getIcon(type)}
                      <h4 className="font-medium">
                        {item.link ? (
                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-4"
                          >
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h4>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono flex-shrink-0">
                      {formatStartDate(item.startDate)}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                  {item.progress !== undefined && (
                    <div className="mt-3 space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${sectionColor(type)} transition-all duration-300`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          Inspired by{" "}
          <Link
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline underline-offset-4"
          >
            Derek Sivers&apos; Now page movement
          </Link>
          . A snapshot of what I&apos;m focused on right now, rather than a permanent bio.
        </p>
      </div>
    </div>
  )
}

