"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"

type Project = {
  title: string
  year: string
  description: string
  technologies: string[]
  projectUrl?: string
  githubUrl?: string
  imageUrl?: string
}

export function ProjectCard({
  title,
  year,
  description,
  technologies,
  projectUrl,
  githubUrl,
}: Project) {
  return (
    <Card
      className={cn(
        "group relative flex flex-col justify-between p-5 md:p-6 border border-border/60 bg-card/60 transition-all duration-200",
        "hover:border-foreground/30 hover:bg-card/90 hover:shadow-sm",
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium text-foreground tracking-tight">
            {projectUrl ? (
              <Link
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline underline-offset-4 decoration-muted-foreground"
              >
                {title}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </Link>
            ) : githubUrl ? (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline underline-offset-4 decoration-muted-foreground"
              >
                {title}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </Link>
            ) : (
              title
            )}
          </h3>
          <span className="font-mono text-xs text-muted-foreground px-2 py-0.5 rounded border border-border/60 bg-muted/40 shrink-0">
            {year}
          </span>
        </div>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 space-y-4 pt-3 border-t border-border/40">
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-0.5 rounded border border-border/50 bg-muted/30 text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs">
          {projectUrl && (
            <Link
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground hover:underline underline-offset-4"
              aria-label={`Open live project ${title}`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Live Demo</span>
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Open GitHub repo for ${title}`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}
