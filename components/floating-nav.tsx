"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 500)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 transition-opacity duration-200">
      <button
        onClick={scrollToTop}
        className="rounded-full border border-border/80 bg-background/80 backdrop-blur-md p-2.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200 shadow-sm"
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  )
}
