import fs from "fs"
import path from "path"
import crypto from "crypto"
import { execSync } from "child_process"

// Committed diagrams directory tracked by git for zero-dependency CI/CD builds
const DIAGRAMS_DIR = path.join(process.cwd(), "content/diagrams")
const TEMP_DIR = path.join(process.cwd(), ".cache/mermaid")

// Ensure directories exist
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true })
}
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true })
}

const lightThemeConfig = {
  theme: "base",
  themeVariables: {
    primaryColor: "#e6f2ee",
    primaryTextColor: "#20242b",
    primaryBorderColor: "#2c7a63",
    lineColor: "#2c7a63",
    secondaryColor: "#fdfcfa",
    tertiaryColor: "#faf8f5",
    background: "transparent",
    mainBkg: "#e6f2ee",
    nodeBorder: "#2c7a63",
    clusterBkg: "#faf8f5",
    clusterBorder: "#e8e3db",
    defaultLinkColor: "#2c7a63",
    titleColor: "#20242b",
    edgeLabelBackground: "#faf8f5",
    actorBkg: "#e6f2ee",
    actorBorder: "#2c7a63",
    actorTextColor: "#20242b",
    actorLineColor: "#2c7a63",
    signalColor: "#2c7a63",
    signalTextColor: "#20242b",
    labelBoxBkgColor: "#e6f2ee",
    labelBoxBorderColor: "#2c7a63",
    labelTextColor: "#20242b",
    loopTextColor: "#20242b",
    noteBorderColor: "#2c7a63",
    noteBkgColor: "#e6f2ee",
    noteTextColor: "#20242b",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
}

const darkThemeConfig = {
  theme: "base",
  themeVariables: {
    darkMode: true,
    primaryColor: "#17251f",
    primaryTextColor: "#eae6df",
    primaryBorderColor: "#4fc49e",
    lineColor: "#4fc49e",
    secondaryColor: "#15181c",
    tertiaryColor: "#0e1013",
    background: "transparent",
    mainBkg: "#17251f",
    nodeBorder: "#4fc49e",
    clusterBkg: "#15181c",
    clusterBorder: "#272b31",
    defaultLinkColor: "#4fc49e",
    titleColor: "#eae6df",
    edgeLabelBackground: "#15181c",
    actorBkg: "#17251f",
    actorBorder: "#4fc49e",
    actorTextColor: "#eae6df",
    actorLineColor: "#4fc49e",
    signalColor: "#4fc49e",
    signalTextColor: "#eae6df",
    labelBoxBkgColor: "#17251f",
    labelBoxBorderColor: "#4fc49e",
    labelTextColor: "#eae6df",
    loopTextColor: "#eae6df",
    noteBorderColor: "#4fc49e",
    noteBkgColor: "#17251f",
    noteTextColor: "#eae6df",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
}

const lightConfigPath = path.join(TEMP_DIR, "config-light.json")
const darkConfigPath = path.join(TEMP_DIR, "config-dark.json")

try {
  fs.writeFileSync(lightConfigPath, JSON.stringify(lightThemeConfig))
  fs.writeFileSync(darkConfigPath, JSON.stringify(darkThemeConfig))
} catch {}

export interface RenderedDiagram {
  light: string
  dark: string
  isFallback?: boolean
  rawCode?: string
}

function scopeSvg(svgContent: string, scopeId: string): string {
  return svgContent.replace(/my-svg/g, scopeId)
}

/**
 * Pre-renders a Mermaid code string to light and dark theme SVGs.
 *
 * 1. Checks content/diagrams/ (tracked in git) for pre-rendered SVGs.
 *    If present, reads them directly — zero dependency on Puppeteer in CI (Vercel).
 * 2. If missing and mmdc/Chromium is available (local dev), generates them
 *    and writes them to content/diagrams/.
 * 3. If mmdc is unavailable (cloud CI without Chromium), flags isFallback=true
 *    for dynamic client-side rendering with mermaid.js.
 */
export function renderMermaidSync(code: string): RenderedDiagram {
  const trimmed = code.trim()
  const hash = crypto.createHash("sha256").update(trimmed).digest("hex").slice(0, 16)

  const lightOutPath = path.join(DIAGRAMS_DIR, `${hash}-light.svg`)
  const darkOutPath = path.join(DIAGRAMS_DIR, `${hash}-dark.svg`)

  // 1. Return pre-rendered SVGs from git-tracked directory if available
  if (fs.existsSync(lightOutPath) && fs.existsSync(darkOutPath)) {
    try {
      return {
        light: fs.readFileSync(lightOutPath, "utf-8"),
        dark: fs.readFileSync(darkOutPath, "utf-8"),
        isFallback: false,
      }
    } catch (e) {
      // Continue to generation if reading fails
    }
  }

  // 2. Try compiling locally with mmdc
  const tempMmdPath = path.join(TEMP_DIR, `input-${hash}.mmd`)
  try {
    fs.writeFileSync(tempMmdPath, trimmed, "utf-8")

    // Generate light SVG
    execSync(
      `npx mmdc -i "${tempMmdPath}" -o "${lightOutPath}" -c "${lightConfigPath}" -b transparent --no-font-embed`,
      { stdio: "pipe" }
    )

    // Generate dark SVG
    execSync(
      `npx mmdc -i "${tempMmdPath}" -o "${darkOutPath}" -c "${darkConfigPath}" -b transparent --no-font-embed`,
      { stdio: "pipe" }
    )

    const lightRaw = fs.readFileSync(lightOutPath, "utf-8")
    const darkRaw = fs.readFileSync(darkOutPath, "utf-8")

    const lightScoped = scopeSvg(lightRaw, `mmd-${hash}-lt`)
    const darkScoped = scopeSvg(darkRaw, `mmd-${hash}-dk`)

    fs.writeFileSync(lightOutPath, lightScoped, "utf-8")
    fs.writeFileSync(darkOutPath, darkScoped, "utf-8")

    return {
      light: lightScoped,
      dark: darkScoped,
      isFallback: false,
    }
  } catch (err: any) {
    // In CI (e.g. Vercel) where Chromium is unavailable, mmdc will fail.
    // Return fallback flag so client-side mermaid.js or formatted code renders smoothly.
    console.warn(`[Mermaid] Build-time compile not available for ${hash}, falling back to client render:`, err.message)
    return {
      light: "",
      dark: "",
      isFallback: true,
      rawCode: trimmed,
    }
  } finally {
    if (fs.existsSync(tempMmdPath)) {
      try {
        fs.unlinkSync(tempMmdPath)
      } catch {}
    }
  }
}
