"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronUp } from "lucide-react"

type Section = { id: string; label: string }

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  const sections: Section[] = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills"},
      { id: "projects", label: "Projects" },
      { id: "open-souce", label: "OSS"},
      { id: "writing", label: "Writing" },
      { id: "now", label: "Now" },
      { id: "contact", label: "Contact" },
    ],
    [],
  )

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (visible?.target?.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })

    observerRef.current = io
    return () => io.disconnect()
  }, [sections])

  const handleDotClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      history.replaceState(null, "", `#${id}`)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col gap-3 sm:gap-4
                 mb-[env(safe-area-inset-bottom)]"
    >
      {/* Section Navigation */}
      <nav
        aria-label="Section navigation"
        className="relative rounded-full border border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40
                   shadow-lg p-2 sm:p-3"
        role="navigation"
      >
        {/* vertical rail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-px bg-foreground/10"
        />
        <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={handleDotClick(section.id)}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none outline-none",
                  "focus-visible:ring-2 focus-visible:ring-blue-500/50",
                  isActive
                    ? "bg-blue-500 ring-2 ring-blue-500/30 shadow-[0_0_0_4px] shadow-blue-500/20 scale-110"
                    : "bg-foreground/30 hover:bg-foreground/60 hover:scale-110",
                ].join(" ")}
              >
                <span className="sr-only">{section.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="rounded-full border border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40
                   p-2.5 sm:p-3 text-muted-foreground hover:text-foreground transition-all duration-300
                   hover:-translate-y-1 motion-reduce:transform-none shadow-lg"
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
    </div>
  )
}

