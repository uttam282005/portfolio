"use client"

import { useEffect } from "react"

/**
 * Lightweight client enhancer for code copy buttons.
 * Mermaid diagrams and code block headers are 100% server-rendered at build time.
 */
export function ArticleEnhancer() {
  useEffect(() => {
    const copyButtons = document.querySelectorAll<HTMLButtonElement>(".code-copy-button")
    copyButtons.forEach((btn) => {
      // Prevent duplicate listener registration
      if (btn.dataset.initialized === "true") return
      btn.dataset.initialized = "true"

      btn.addEventListener("click", async () => {
        const figure = btn.closest("figure")
        const code = figure?.querySelector("code") || figure?.querySelector("pre")
        const textToCopy = code?.innerText || ""
        try {
          await navigator.clipboard.writeText(textToCopy)
          btn.classList.add("copied")
          const copyIcon = btn.querySelector(".copy-icon")
          const checkIcon = btn.querySelector(".check-icon")
          const copyText = btn.querySelector(".copy-text")

          copyIcon?.classList.add("hidden")
          checkIcon?.classList.remove("hidden")
          if (copyText) copyText.textContent = "Copied!"

          setTimeout(() => {
            btn.classList.remove("copied")
            copyIcon?.classList.remove("hidden")
            checkIcon?.classList.add("hidden")
            if (copyText) copyText.textContent = "Copy"
          }, 1500)
        } catch (err) {
          console.error("Failed to copy code to clipboard:", err)
        }
      })
    })
  }, [])

  return null
}
