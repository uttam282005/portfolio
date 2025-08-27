"use client"

import { useState, useEffect } from "react"
import { Github, GitCommit, Star, GitFork } from "lucide-react"
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

  const username = "uttam282005"

  useEffect(() => {
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    try {
      const [eventsRes, userRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}/events/public`),
        fetch(`https://api.github.com/users/${username}`),
      ])

      if (!eventsRes.ok || !userRes.ok) {
        throw new Error("GitHub API request failed")
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
    } catch (err) {
      setError("Failed to fetch GitHub activity")
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
        return `Created ${event.payload.ref_type} ${event.payload.ref}`
      case "IssuesEvent":
        return `${event.payload.action} issue: ${event.payload.issue?.title}`
      case "WatchEvent":
        return "Starred repository"
      case "ForkEvent":
        return "Forked repository"
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
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Activity</h3>
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
    return <div className="text-gray-500 dark:text-gray-500 text-sm">Unable to load GitHub activity</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Activity</h3>
      </div>

      {stats && (
        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>{stats.public_repos} repositories</span>
          <span>{stats.followers} followers</span>
          <span>{stats.following} following</span>
        </div>
      )}

      <div className="space-y-3">
        {events.slice(0, 4).map((event) => (
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
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formatTimeAgo(event.created_at)}</p>
            </div>
          </div>
        ))}
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
