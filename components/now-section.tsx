"use client"

import Link from "next/link"
import { Book, Code, Target, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface NowItem {
  type: "book" | "skill" | "project" | "goal"
  title: string
  description: string
  link?: string
  startDate: string
}

export function NowSection() {
  const currentItems: NowItem[] = [
    {
      type: "book",
      title: "Operating Systems: Three Easy Pieces (OSTEP)",
      description:
        "Deep-diving into virtualization, memory virtualization (paging & TLBs), and concurrency bugs.",
      startDate: "2025-01-01",
    },
    {
      type: "skill",
      title: "Distributed Systems & Consensus",
      description: "Implementing consensus algorithms (Raft) and RPC-based coordinator-worker pipelines in Go.",
      startDate: "2025-09-01",
    },
    {
      type: "skill",
      title: "Low-Latency Systems in C++",
      description: "Designing lock-free data structures, memory pools, and cache-friendly data layouts.",
      startDate: "2025-08-20",
    },
    {
      type: "goal",
      title: "Open Source Contributions",
      description: "Contributing to core developer tooling and runtime performance libraries.",
      startDate: "2025-07-01",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "book":
        return <Book className="w-3.5 h-3.5 text-muted-foreground" />
      case "skill":
        return <Code className="w-3.5 h-3.5 text-muted-foreground" />
      default:
        return <Target className="w-3.5 h-3.5 text-muted-foreground" />
    }
  }

  const getLabel = (type: string) => {
    switch (type) {
      case "book":
        return "Reading"
      case "skill":
        return "Exploring"
      default:
        return "Focus"
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm leading-relaxed">
        A snapshot of what I am actively reading, building, and exploring right now. Inspired by{" "}
        <Link
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:underline underline-offset-4 inline-flex items-center gap-0.5"
        >
          Derek Sivers&apos; Now page
          <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
        </Link>
        .
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {currentItems.map((item, idx) => (
          <Card key={idx} className="p-4 border-border/60 bg-card/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  {getIcon(item.type)}
                  <span>{getLabel(item.type)}</span>
                </span>
              </div>
              <h4 className="text-sm font-medium text-foreground">
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
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
