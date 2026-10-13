import fs from "fs"
import path from "path"
import crypto from "crypto"
import { execSync } from "child_process"

const CACHE_DIR = path.join(process.cwd(), ".cache/mermaid")

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
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

const lightConfigPath = path.join(CACHE_DIR, "config-light.json")
const darkConfigPath = path.join(CACHE_DIR, "config-dark.json")

fs.writeFileSync(lightConfigPath, JSON.stringify(lightThemeConfig))
fs.writeFileSync(darkConfigPath, JSON.stringify(darkThemeConfig))

export interface RenderedDiagram {
  light: string
  dark: string
}

function scopeSvg(svgContent: string, scopeId: string): string {
  return svgContent.replace(/my-svg/g, scopeId)
}

/**
 * Pre-renders a Mermaid code string to light and dark theme SVGs at build time.
 * Uses disk caching so repeat builds or pages are instantaneous.
 */
export function renderMermaidSync(code: string): RenderedDiagram {
  const trimmed = code.trim()
  const hash = crypto.createHash("sha256").update(trimmed).digest("hex").slice(0, 16)

  const lightOutPath = path.join(CACHE_DIR, `${hash}-light.svg`)
  const darkOutPath = path.join(CACHE_DIR, `${hash}-dark.svg`)

  // Return cached SVGs if already generated
  if (fs.existsSync(lightOutPath) && fs.existsSync(darkOutPath)) {
    return {
      light: fs.readFileSync(lightOutPath, "utf-8"),
      dark: fs.readFileSync(darkOutPath, "utf-8"),
    }
  }

  const tempMmdPath = path.join(CACHE_DIR, `input-${hash}.mmd`)
  fs.writeFileSync(tempMmdPath, trimmed, "utf-8")

  try {
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
    }
  } catch (err: any) {
    console.error(`Failed to compile Mermaid diagram ${hash}:`, err.message)
    // Fallback error placeholder
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 60"><text x="20" y="35" fill="currentColor" font-family="monospace" font-size="12">Mermaid diagram syntax error</text></svg>`
    return {
      light: fallbackSvg,
      dark: fallbackSvg,
    }
  } finally {
    if (fs.existsSync(tempMmdPath)) {
      try {
        fs.unlinkSync(tempMmdPath)
      } catch {}
    }
  }
}
