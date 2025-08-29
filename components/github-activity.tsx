"use client"

import { useState, useEffect } from "react"
import { Github, GitCommit, Star, GitFork, RefreshCw } from "lucide-react"
import Link from "next/link"

interface GitHubEvent {
  id: string
  type: string
  repo: {
    name: string
    url: string
  }
  created_at: string
  payload: any
}

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
}

export function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)

  const username = "uttam282005"

  useEffect(() => {
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Use your API route to avoid CORS issues
      const timestamp = new Date().getTime()
      const [eventsRes, userRes] = await Promise.all([
        fetch(`/api/github/users/${username}/events/public?t=${timestamp}`),
        fetch(`/api/github/users/${username}?t=${timestamp}`),
      ])

      if (!eventsRes.ok || !userRes.ok) {
        throw new Error(`GitHub API request failed: Events ${eventsRes.status}, User ${userRes.status}`)
      }

      const eventsData = await eventsRes.json()
      const statsData = await userRes.json()

      const formattedEvents: GitHubEvent[] = eventsData.map((event: any) => ({
        id: event.id,
        type: event.type,
        repo: {
          name: event.repo.name,
          url: `https://github.com/${event.repo.name}`,
        },
        created_at: event.created_at,
        payload: event.payload,
      }))

      const formattedStats: GitHubStats = {
        public_repos: statsData.public_repos,
        followers: statsData.followers,
        following: statsData.following,
      }

      setEvents(formattedEvents)
      setStats(formattedStats)
      setLastFetch(new Date())
    } catch (err) {
      console.error('GitHub API Error:', err)
      setError(`Failed to fetch GitHub activity: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const formatEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case "PushEvent":
        const commitCount = event.payload.commits?.length || 1
        return `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""}`
      case "CreateEvent":
        return `Created ${event.payload.ref_type} ${event.payload.ref || event.payload.ref_type}`
      case "DeleteEvent":
        return `Deleted ${event.payload.ref_type} ${event.payload.ref}`
      case "IssuesEvent":
        return `${event.payload.action} issue: ${event.payload.issue?.title}`
      case "PullRequestEvent":
        return `${event.payload.action} pull request: ${event.payload.pull_request?.title}`
      case "WatchEvent":
        return "Starred repository"
      case "ForkEvent":
        return "Forked repository"
      case "PublicEvent":
        return "Made repository public"
      default:
        return event.type.replace("Event", "")
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return <GitCommit className="w-4 h-4" />
      case "WatchEvent":
        return <Star className="w-4 h-4" />
      case "ForkEvent":
        return <GitFork className="w-4 h-4" />
      default:
        return <Github className="w-4 h-4" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays}d ago`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Activity</h3>
          <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Activity</h3>
          <button
            onClick={fetchGitHubData}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            title="Retry"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Activity</h3>
        <button
          onClick={fetchGitHubData}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4 text-gray-400" />
        </button>
        {lastFetch && (
          <span className="text-xs text-gray-400 ml-auto">
            Updated {formatTimeAgo(lastFetch.toISOString())}
          </span>
        )}
      </div>

      {stats && (
        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>{stats.public_repos} repositories</span>
          <span>{stats.followers} followers</span>
          <span>{stats.following} following</span>
        </div>
      )}

      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-sm italic">
            No recent activity found
          </div>
        ) : (
          events.slice(0, 6).map((event) => (
            <div key={event.id} className="flex items-start gap-3 group">
              <div className="text-gray-500 dark:text-gray-500 mt-0.5">{getEventIcon(event.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {formatEventDescription(event)} in{" "}
                  <Link
                    href={event.repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {event.repo.name}
                  </Link>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {formatTimeAgo(event.created_at)}
                  {/* Debug: Show exact timestamp in development */}
                  {process.env.NODE_ENV === 'development' && (
                    <span className="ml-2 opacity-50">
                      ({new Date(event.created_at).toLocaleString()})
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
        <Link
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          View all activity on GitHub
          <Github className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
