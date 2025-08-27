"use client"

import { Circle, MapPin, Clock } from "lucide-react"

export function EnhancedStatus() {
  const status = {
    status: "available",
    message: "Available for new opportunities",
    location: "India",
    lastUpdated: new Date().toISOString(),
  }

  const formatLastUpdated = () => {
    const date = new Date(status.lastUpdated)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 py-3 rounded-xl border transition-all duration-300 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800`}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <Circle className="w-3 h-3 fill-current text-green-500" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-20" />
        </div>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Available
        </span>
      </div>

      <div className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-600" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span className="text-xs sm:text-sm">{status.message}</span>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="text-xs sm:text-sm">{status.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span className="text-xs sm:text-sm">{formatLastUpdated()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
