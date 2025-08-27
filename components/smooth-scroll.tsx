"use client"

import { useEffect } from "react"

export function SmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (link && link.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()

        const targetId = link.getAttribute("href")?.substring(1)
        const targetElement = targetId ? document.getElementById(targetId) : null

        if (targetElement) {
          const headerOffset = 80
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })

          // Update URL
          if (typeof window !== "undefined") {
            window.history.pushState(null, "", `#${targetId}`)
          }
        }
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return null
}
