import Link from "next/link"
import { Github, GitPullRequest, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
      "Replaced redundant environment variable lookups with a centralized envConfig object; removed deprecated EnvironmentVariablesService.",
      "Enhanced Metrics utility with strict validation and warning logs for invalid or conflicting default dimensions to prevent silent bugs in shared serverless contexts.",
      "Added targeted unit tests covering edge cases and logging behavior; maintained 100% test coverage for the Metrics module.",
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
        <Card key={idx} className="border-border/60 bg-card/50 transition-colors hover:border-foreground/30">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-base font-medium text-foreground">
                <span className="inline-flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {c.repo}
                </span>
              </CardTitle>
              <div className="flex items-center gap-1.5">
                {c.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs rounded border border-border/50 bg-muted/40 px-2 py-0.5 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{c.title}</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="mb-4 list-disc space-y-1.5 pl-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {c.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/40">
              {c.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:underline underline-offset-4"
                >
                  <GitPullRequest className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  <span>{l.label}</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
