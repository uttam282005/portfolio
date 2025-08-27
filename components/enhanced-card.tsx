"use client"

import type React from "react"

interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: "sm" | "md" | "lg"
  border?: boolean
}

export function EnhancedCard({
  children,
  className = "",
  hover = false,
  padding = "lg",
  border = true,
}: EnhancedCardProps) {
  const paddingClasses = {
    sm: "p-6",
    md: "p-8",
    lg: "p-10",
  }

  const baseClasses = `
    bg-white dark:bg-gray-900 
    rounded-2xl 
    transition-colors duration-200
    ${border ? "border border-gray-200 dark:border-gray-800" : ""}
    ${hover ? "hover:border-gray-300 dark:hover:border-gray-700" : ""}
    ${paddingClasses[padding]}
  `

  return <div className={`${baseClasses} ${className}`}>{children}</div>
}
