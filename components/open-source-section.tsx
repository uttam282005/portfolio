import Link from "next/link"
import { Github, GitPullRequest, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Contribution = {
  repo: string
  title: string
  tech: string[]
  bullets: string[]
  links: { label: string; href: string }[]
}

const contributions: Contribution[] = [
  {
    repo: "AWS Lambda Powertools (TypeScript)",
    title: "Core observability library – Metrics utility refactors and validation",
    tech: ["TypeScript", "AWS Lambda", "Jest"],
    bullets: [
      "Replaced redundant environment variable lookups with a centralized envConfig object; removed deprecated EnvironmentVariablesService and all references.",
      "Enhanced Metrics utility with strict validation and warning logs for invalid or conflicting default dimensions to prevent silent bugs in shared contexts.",
      "Added 2 targeted unit tests for edge cases and logging behavior; ensured 100% test coverage for the Metrics module.",
    ],
    links: [
      { label: "PR #4188", href: "https://github.com/aws-powertools/powertools-lambda-typescript/pull/4188" },
      { label: "PR #4222", href: "https://github.com/aws-powertools/powertools-lambda-typescript/pull/4222" },
    ],
  },
]

export function OpenSourceSection() {
  return (
    <div className="grid gap-4">
      {contributions.map((c, idx) => (
        <Card key={idx} className="border-border/60 transition-colors hover:border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-pretty text-lg font-semibold">
                <span className="inline-flex items-center gap-2">
                  <Github className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  {c.repo}
                </span>
              </CardTitle>
              <div className="hidden items-center gap-2 sm:flex">
                {c.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{c.title}</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {c.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2">
              {/* Show tech badges on small screens */}
              <div className="flex flex-wrap items-center gap-2 sm:hidden">
                {c.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2">
                {c.links.map((l) => (
                  <Button key={l.href} asChild variant="link" className="px-0 text-primary">
                    <Link href={l.href} target="_blank" rel="noreferrer" aria-label={`Open ${l.label} in new tab`}>
                      <span className="inline-flex items-center gap-1">
                        <GitPullRequest className="h-4 w-4" aria-hidden="true" />
                        {l.label}
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                      </span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
