"use client"

import { useEffect, useMemo, useState } from "react"

type StatusKind = "available" | "busy" | "unavailable"

interface StatusConfig {
  status: StatusKind
  message: string
  location?: string
  lastUpdated: string
}

interface StatusIndicatorProps {
  className?: string
  initial?: StatusConfig
  showLocation?: boolean
  showUpdated?: boolean
  variant?: "compact" | "default" | "glass"
}

const STATUS_STYLES: Record<StatusKind, { label: string; dot: string; ring: string; text: string }> = {
  available: {
    label: "Available",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  busy: {
    label: "Busy",
    dot: "bg-amber-500",
    ring: "ring-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
  },
  unavailable: {
    label: "Unavailable",
    dot: "bg-rose-500",
    ring: "ring-rose-500/30",
    text: "text-rose-600 dark:text-rose-400",
  },
}

function timeAgo(iso: string) {
  try {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.max(1, Math.floor(diff / 60000))
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  } catch {
    return "just now"
  }
}

export function StatusIndicator({
  className = "",
  initial,
  showLocation = true,
  showUpdated = false,
  variant = "compact",
}: StatusIndicatorProps) {
  const [status, setStatus] = useState<StatusConfig>(
    initial ?? {
      status: "available",
      message: "Available for new opportunities",
      location: "NIT Agartala, India",
      lastUpdated: new Date().toISOString(),
    },
  )

  // Simulated dynamic status; replace with real API if needed
  // useEffect(() => {
  //   const updateStatus = () => {
  //     const hour = new Date().getHours()
  //     const isWorkingHours = hour >= 9 && hour <= 17
  //     setStatus((prev) => ({
  //       status: isWorkingHours ? "busy" : "available",
  //       message: isWorkingHours ? "Heads down on client work" : "Open to chat",
  //       location: prev.location,
  //       lastUpdated: new Date().toISOString(),
  //     }))
  //   }
  //   updateStatus()
  //   const id = setInterval(updateStatus, 60_000)
  //   return () => clearInterval(id)
  // }, [])

  const s = useMemo(() => STATUS_STYLES[status.status], [status.status])

  const isCompact = variant === "compact"
  const isGlass = variant === "glass"
  const containerClasses = [
    "inline-flex items-center rounded-full border transition-colors",
    isGlass
      ? "gap-1.5 px-2.5 py-1 text-xs border-border/50 supports-[backdrop-filter]:bg-background/20 bg-background/30 backdrop-blur-md shadow-sm"
      : isCompact
        ? "gap-1.5 px-2.5 py-1 text-xs border-border/60 bg-muted/40 hover:bg-muted/60 shadow-none backdrop-blur supports-[backdrop-filter]:bg-muted/50"
        : `gap-2 px-3 py-1.5 text-sm border-border bg-muted/60 hover:bg-muted shadow-sm ring-1 ${s.ring}`,
    className,
  ].join(" ")
  const dotSize = isCompact || isGlass ? "h-2 w-2" : "h-2.5 w-2.5"

  return (
    <div aria-live="polite" className={containerClasses}>
      {/* Dot + pulse */}
      <span className={`relative inline-flex ${dotSize}`}>
        <span className={`absolute inset-0 rounded-full ${s.dot} opacity-40 animate-ping`} />
        <span className={`relative inline-block ${dotSize} rounded-full ${s.dot}`} />
      </span>

      <span className={`font-medium ${s.text}`}>
        <span className="sr-only">Status: </span>
        {s.label}
      </span>

      <span className="text-muted-foreground">•</span>

      <span
        className={["leading-none", isCompact ? "text-xs truncate max-w-[14rem]" : "text-sm"].join(" ")}
        title={status.message}
      >
        {status.message}
      </span>

      {showLocation && status.location ? (
        <>
          <span className="text-muted-foreground">•</span>
          <span className={isCompact ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>
            {status.location}
          </span>
        </>
      ) : null}

      {showUpdated ? (
        <>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Updated {timeAgo(status.lastUpdated)}</span>
        </>
      ) : null}
    </div>
  )
}

