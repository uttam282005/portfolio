"use client"

import { useState } from "react"
import { Download, Check } from "lucide-react"

export function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create download link
      const link = document.createElement("a")
      link.href = "/Uttam_Raj_Resume.pdf"
      link.download = "Uttam_Raj_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
    >
      {isDownloading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Downloading...
        </>
      ) : downloaded ? (
        <>
          <Check className="w-4 h-4" />
          Downloaded!
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download Resume
        </>
      )}
    </button>
  )
}
