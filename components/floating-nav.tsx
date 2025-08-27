"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronUp } from "lucide-react"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const sections = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "writing", label: "Writing" },
    { id: "now", label: "Now" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset
      setIsVisible(scrollY > 400)

      // Update active section
      const scrollPosition = scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 flex flex-col gap-3 sm:gap-4">
      {/* Section Navigation */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full border border-gray-200/80 dark:border-gray-700/80 p-2 sm:p-3">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${
                activeSection === section.id
                  ? "bg-blue-500"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              title={section.label}
            />
          ))}
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full border border-gray-200/80 dark:border-gray-700/80 p-2.5 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        title="Scroll to top"
      >
        <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  )
}
