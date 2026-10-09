"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")

    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement

    if (newTheme === "dark") {
      root.classList.add("dark")
      root.style.colorScheme = "dark"
    } else {
      root.classList.remove("dark")
      root.style.colorScheme = "light"
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    return (
      <div className="p-1.5 sm:p-2 rounded-md border border-border/50 bg-muted/20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 sm:p-2 rounded-md border border-border/60 bg-muted/30 hover:bg-muted/70 hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-all duration-200 focus:outline-none"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      ) : (
        <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      )}
    </button>
  )
}
