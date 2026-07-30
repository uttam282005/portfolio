'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeInSection } from '@/components/fade-in-section'
import { ScrollProgress } from '@/components/scroll-progress'
import { SmoothScroll } from '@/components/smooth-scroll'
import { FloatingNav } from '@/components/floating-nav'
import { Github, ExternalLink, GitPullRequest, GitMerge, AlertCircle, Loader2 } from 'lucide-react'

interface PR {
  id: number
  title: string
  url: string
  state: 'open' | 'closed'
  merged: boolean
  repository_url: string
  repo_name: string
  org_name: string
  merged_at: string | null
  created_at: string
  labels: Array<{ name: string }>
}

export default function OpenSourcePage() {
  const [prs, setPrs] = useState<PR[]>([])
  const [filteredPrs, setFilteredPrs] = useState<PR[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrg, setSelectedOrg] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [orgs, setOrgs] = useState<string[]>([])

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        setLoading(true)
        // Fetch PRs for the user 'uttam282005'
        const response = await fetch('/api/github/search/issues?q=author:uttam282005%20type:pr&sort=created&order=desc&per_page=100')
        
        if (!response.ok) {
          throw new Error('Failed to fetch PRs')
        }

        const data = await response.json()
        
        // Handle search results which have 'items' array
        const prsData = data.items || data
        
        // Process PRs to extract repo and org info
        const processedPrs = prsData.map((pr: any) => {
          // Extract repo info from repository_url or issue URL
          const repoMatch = pr.repository_url?.match(/repos\/([^/]+)\/([^/]+)$/)
          const repoName = repoMatch ? repoMatch[2] : pr.url?.split('/')[5] || 'unknown'
          const orgName = repoMatch ? repoMatch[1] : pr.url?.split('/')[4] || 'unknown'
          
          return {
            id: pr.id,
            title: pr.title,
            url: pr.html_url,
            state: pr.state,
            merged: pr.pull_request?.merged_at ? true : false,
            repository_url: pr.repository_url,
            repo_name: repoName,
            org_name: orgName,
            merged_at: pr.pull_request?.merged_at || null,
            created_at: pr.created_at,
            labels: pr.labels || [],
          }
        })

        setPrs(processedPrs)

        // Extract unique organizations
        const uniqueOrgs = Array.from(
          new Set(processedPrs.map((pr: PR) => pr.org_name))
        ).sort() as string[]
        
        setOrgs(uniqueOrgs)
        setError(null)
      } catch (err) {
        console.error('Error fetching PRs:', err)
        setError('Failed to load pull requests. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPullRequests()
  }, [])

  useEffect(() => {
    let filtered = prs

    if (selectedOrg !== 'all') {
      filtered = filtered.filter(pr => pr.org_name === selectedOrg)
    }

    if (selectedStatus !== 'all') {
      if (selectedStatus === 'merged') {
        filtered = filtered.filter(pr => pr.merged)
      } else if (selectedStatus === 'open') {
        filtered = filtered.filter(pr => pr.state === 'open' && !pr.merged)
      }
    }

    setFilteredPrs(filtered)
  }, [prs, selectedOrg, selectedStatus])

  const mergedCount = prs.filter(pr => pr.merged).length
  const openCount = prs.filter(pr => pr.state === 'open' && !pr.merged).length

  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <SmoothScroll />
      <FloatingNav />

      {/* Top Nav */}
      <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-6 justify-between py-3">
            <Link href="/" className="font-semibold text-foreground">
              Uttam Raj
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button asChild size="sm" variant="outline">
                <Link href="/">Back</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-14 md:py-20 space-y-12">
        {/* Header */}
        <FadeInSection>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl md:text-5xl font-bold tracking-tight">
              Open Source Contributions
            </h1>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              A showcase of my pull requests across various open source projects. Filter by organization and status to explore my contributions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <Card className="p-4 border-border/60">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{prs.length}</p>
                  <p className="text-xs text-muted-foreground">Total PRs</p>
                </div>
              </Card>
              <Card className="p-4 border-border/60">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{mergedCount}</p>
                  <p className="text-xs text-muted-foreground">Merged</p>
                </div>
              </Card>
              <Card className="p-4 border-border/60">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">{openCount}</p>
                  <p className="text-xs text-muted-foreground">Open</p>
                </div>
              </Card>
            </div>
          </div>
        </FadeInSection>

        {/* Filters */}
        <FadeInSection>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organization Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Organization</label>
                <select
                  value={selectedOrg}
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                >
                  <option value="all">All Organizations</option>
                  {orgs.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                >
                  <option value="all">All PRs</option>
                  <option value="merged">Merged</option>
                  <option value="open">Open</option>
                </select>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Content */}
        <FadeInSection>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-muted-foreground">Loading pull requests...</p>
              </div>
            </div>
          ) : error ? (
            <Card className="p-6 border-border/60 border-red-500/20 bg-red-500/5">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Error</p>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </div>
              </div>
            </Card>
          ) : filteredPrs.length === 0 ? (
            <Card className="p-8 border-border/60 text-center">
              <p className="text-muted-foreground">No pull requests found matching your filters.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredPrs.length} of {prs.length} pull requests
              </p>
              {filteredPrs.map((pr) => (
                <Card
                  key={pr.id}
                  className="p-5 md:p-6 border-border/60 hover:border-border transition-colors"
                >
                  <div className="space-y-3">
                    {/* Title and Status */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <Link
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pretty font-medium hover:underline underline-offset-2 break-words flex items-start gap-2"
                        >
                          <span className="flex-shrink-0 mt-0.5">
                            {pr.merged ? (
                              <GitMerge className="h-4 w-4 text-purple-600" />
                            ) : pr.state === 'open' ? (
                              <GitPullRequest className="h-4 w-4 text-green-600" />
                            ) : (
                              <GitPullRequest className="h-4 w-4 text-red-600" />
                            )}
                          </span>
                          <span>{pr.title}</span>
                        </Link>
                      </div>
                      <Link
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                      </Link>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Github className="h-3.5 w-3.5" />
                        {pr.org_name}/{pr.repo_name}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(pr.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {pr.merged_at && (
                        <>
                          <span>•</span>
                          <span>
                            Merged {new Date(pr.merged_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {pr.merged ? (
                        <Badge className="bg-purple-600/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                          <GitMerge className="h-3 w-3 mr-1" />
                          Merged
                        </Badge>
                      ) : pr.state === 'open' ? (
                        <Badge className="bg-green-600/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                          <GitPullRequest className="h-3 w-3 mr-1" />
                          Open
                        </Badge>
                      ) : (
                        <Badge className="bg-red-600/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800">
                          Closed
                        </Badge>
                      )}
                      {pr.labels.map((label) => (
                        <Badge
                          key={label.name}
                          variant="secondary"
                          className="text-xs"
                        >
                          {label.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </FadeInSection>

        {/* Footer */}
        <footer className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Uttam Raj. Built with Next.js.
        </footer>
      </div>
    </main>
  )
}
