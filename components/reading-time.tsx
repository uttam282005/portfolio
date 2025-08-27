"use client"

interface ReadingTimeProps {
  content: string
  className?: string
}

export function ReadingTime({ content, className = "" }: ReadingTimeProps) {
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes
  }

  const readingTime = calculateReadingTime(content)

  return <span className={`text-sm text-gray-500 dark:text-gray-500 ${className}`}>{readingTime} min read</span>
}
