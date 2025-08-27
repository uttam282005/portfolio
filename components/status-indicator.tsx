"use client"

import { useState, useEffect } from "react"
import { Circle } from "lucide-react"

interface StatusConfig {
  status: "available" | "busy" | "unavailable"
  message: string
  location?: string
  lastUpdated: string
}

export function StatusIndicator() {
  const [status, setStatus] = useState<StatusConfig>({
    status: "available",
    message: "Available for new opportunities",
    location: "San Francisco, CA",
    lastUpdated: new Date().toISOString(),
  })

  useEffect(() => {
    // In a real implementation, you might fetch this from an API or CMS
    // For now, we'll simulate dynamic status
    const updateStatus = () => {
      const hour = new Date().getHours()
      const isWorkingHours = hour >= 9 && hour <= 17

      if (isWorkingHours) {
        setStatus({
          status: "busy",
          message: "Currently at TechCorp",
          location: "San Francisco, CA",
          lastUpdated: new Date().toISOString(),
        })
      } else {
        setStatus({
          status: "available",
          message: "Available for new opportunities",
          location: "San Francisco, CA",
          lastUpdated: new Date().toISOString(),
        })
      }
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status.status) {
      case "available":
        return "text-green-500"
      case "busy":
        return "text-yellow-500"
      case "unavailable":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusText = () => {
    switch (status.status) {
      case "available":
        return "Available"
      case "busy":
        return "Busy"
      case "unavailable":
        return "Unavailable"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 rounded-full text-sm">
      <Circle className={`w-2 h-2 fill-current ${getStatusColor()}`} />
      <span className="text-gray-700 dark:text-gray-300">{getStatusText()}</span>
      <span className="text-gray-500 dark:text-gray-500">•</span>
      <span className="text-gray-600 dark:text-gray-400">{status.message}</span>
    </div>
  )
}
