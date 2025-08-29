
"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ImageIcon } from "lucide-react"

type Project = {
  title: string
  year: string
  description: string
  technologies: string[]
  projectUrl?: string
  githubUrl?: string
  imageUrl?: string
}

export function ProjectCard({ title, year, description, technologies, projectUrl, githubUrl, imageUrl }: Project) {
  return (
    <Card
      className={cn(
        "group relative p-5 md:p-6 border-border/50 transition-all",
        "hover:shadow-sm hover:-translate-y-0.5 hover:border-border focus-within:ring-1 focus-within:ring-blue-600/20",
      )}
    >
      {/* Optional thumbnail */}
      <div className="mb-4">
        <div className="aspect-[3/2] relative overflow-hidden rounded-md bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`${title} preview`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base md:text-lg font-semibold text-foreground text-pretty">
          {projectUrl ? (
            <Link
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <Badge className="bg-blue-600 text-white hover:bg-blue-600/90">{year}</Badge>
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {technologies.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border/60 bg-muted px-2.5 py-1 text-xs text-foreground/80"
          >
            {t}
          </span>
        ))}
      </div>

      {(projectUrl || githubUrl) && (
        <div className="mt-5 flex items-center gap-4 text-sm">
          {projectUrl && (
            <Link
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:underline underline-offset-4"
              aria-label={`Open live project ${title}`}
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Open GitHub repo for ${title}`}
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          )}
        </div>
      )}
    </Card>
  )
}

