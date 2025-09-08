import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Uttam Raj - Software Engineer",
  icons: {
   icon: "/me.png"
  },
  description: "B.Tech student in Computational Mathematics at NIT Agartala. Passionate about building impactful systems, open source, and AI-driven platforms.",
  keywords: [
    "Uttam Raj", "software engineer", "developer", "competitive programmer", 
    "full-stack developer", "open source contributor", "AI projects", 
    "blogging platform", "linux", "Next.js", "React", "Hono", "portfolio", "backend engineer", "gen-ai"
  ],
  authors: [{ name: "Uttam Raj" }],
  openGraph: {
    title: "Uttam Raj - Software Engineer",
    description: "Portfolio of Uttam Raj – building full-stack systems, exploring system programming and AI tooling.",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var shouldBeDark = theme === 'dark' || (!theme && prefersDark);
                  
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Analytics/>
        {children}
      </body>
    </html>
  )
}
