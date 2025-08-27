"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  subtle?: boolean
}

export function FadeInSection({ children, className = "", delay = 0, subtle = true }: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          } else {
            setIsVisible(true)
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px",
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  const getTransformClass = () => {
    if (subtle) {
      return `transition-opacity duration-500 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`
    }

    const base = "transition-all duration-500 ease-out"
    return `${base} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
  }

  return (
    <div ref={ref} className={`${getTransformClass()} ${className}`}>
      {children}
    </div>
  )
}
