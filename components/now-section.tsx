"use client"

import { Book, Code, Target, Calendar } from "lucide-react"
import Link from "next/link"

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
      description: "A comprehensive guide to operating systems, covering topics like process management, memory management, and file systems.",
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
      progress: 3,
      startDate: "2025-07-01",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "book":
        return <Book className="w-4 h-4" />
      case "skill":
        return <Code className="w-4 h-4" />
      case "project":
        return <Target className="w-4 h-4" />
      case "goal":
        return <Target className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "book":
        return "text-blue-600 dark:text-blue-400"
      case "skill":
        return "text-green-600 dark:text-green-400"
      case "project":
        return "text-purple-600 dark:text-purple-400"
      case "goal":
        return "text-orange-600 dark:text-orange-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const formatStartDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
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
    <section id="now" className="scroll-mt-20">
      <h2 className="text-2xl font-light mb-8 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-3">
        Now
      </h2>

      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          What I'm currently focused on learning, building, and exploring. Updated regularly to reflect my current
          interests and growth areas.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedItems).map(([type, items]) => (
          <div key={type}>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 capitalize flex items-center gap-2">
              <span className={getTypeColor(type)}>{getIcon(type)}</span>
              {type === "book" ? "Reading" : type === "skill" ? "Learning" : type === "project" ? "Building" : "Goals"}
            </h3>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.link ? (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                      {formatStartDate(item.startDate)}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">{item.description}</p>

                  {item.progress !== undefined && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            type === "book"
                              ? "bg-blue-500"
                              : type === "skill"
                                ? "bg-green-500"
                                : type === "project"
                                  ? "bg-purple-500"
                                  : "bg-orange-500"
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Inspired by{" "}
          <Link
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Derek Sivers' Now page movement
          </Link>
          . A snapshot of what I'm focused on right now, rather than a permanent bio.
        </p>
      </div>
    </section>
  )
}
