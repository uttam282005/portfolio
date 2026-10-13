"use client"

import { useEffect } from "react"

/**
 * Client enhancer for article interactions:
 * 1. Code copy buttons with 1.5s morphing feedback.
 * 2. Dynamic client-side Mermaid rendering fallback if diagrams
 *    were not pre-rendered at build time (e.g. in headless CI environments).
 */
export function ArticleEnhancer() {
  useEffect(() => {
    // 1. Copy Buttons
    const copyButtons = document.querySelectorAll<HTMLButtonElement>(".code-copy-button")
    copyButtons.forEach((btn) => {
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

    // 2. Client-side Mermaid Fallback (only runs if a diagram was not pre-rendered at build time)
    const clientDiagrams = document.querySelectorAll<HTMLElement>(".mermaid-client-render")
    if (clientDiagrams.length > 0) {
      import("mermaid").then(({ default: mermaid }) => {
        const isDark = document.documentElement.classList.contains("dark")
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: isDark
            ? {
                darkMode: true,
                primaryColor: "#17251f",
                primaryTextColor: "#eae6df",
                primaryBorderColor: "#4fc49e",
                lineColor: "#4fc49e",
                background: "transparent",
                mainBkg: "#17251f",
                nodeBorder: "#4fc49e",
                clusterBkg: "#15181c",
                clusterBorder: "#272b31",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }
            : {
                primaryColor: "#e6f2ee",
                primaryTextColor: "#20242b",
                primaryBorderColor: "#2c7a63",
                lineColor: "#2c7a63",
                background: "transparent",
                mainBkg: "#e6f2ee",
                nodeBorder: "#2c7a63",
                clusterBkg: "#faf8f5",
                clusterBorder: "#e8e3db",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              },
        })

        clientDiagrams.forEach(async (el, idx) => {
          const b64 = el.dataset.rawB64
          if (!b64) return
          try {
            const rawCode = atob(b64)
            const id = `client-mmd-${idx}-${Math.random().toString(36).slice(2, 7)}`
            const { svg } = await mermaid.render(id, rawCode)
            el.innerHTML = svg
          } catch (err) {
            console.error("Client mermaid render failed:", err)
            try {
              const rawCode = atob(b64)
              el.innerHTML = `<pre class="text-xs font-mono text-muted-foreground p-4 overflow-x-auto"><code>${rawCode}</code></pre>`
            } catch {}
          }
        })
      })
    }
  }, [])

  return null
}
