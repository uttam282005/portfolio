"use client"

import React, { useEffect, useRef, useState } from "react"

interface StaggerChildrenProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
  subtle?: boolean
}

export function StaggerChildren({ children, staggerDelay = 50, className = "", subtle = true }: StaggerChildrenProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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
  }, [])

  const childrenArray = React.Children.toArray(children)

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`transition-opacity duration-400 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
