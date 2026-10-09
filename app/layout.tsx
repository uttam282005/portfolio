import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Uttam Raj — Systems & Backend Engineer",
    template: "%s | Uttam Raj",
  },
  icons: {
    icon: "/me.png",
  },
  description:
    "Computational Mathematics student at NIT Agartala. Building distributed systems, high-performance C++20 engines, Go services, and open-source infrastructure.",
  keywords: [
    "Uttam Raj",
    "systems engineer",
    "backend engineer",
    "distributed systems",
    "Go",
    "C++20",
    "MapReduce",
    "matching engine",
    "concurrency",
    "Linux",
    "open source",
  ],
  authors: [{ name: "Uttam Raj" }],
  openGraph: {
    title: "Uttam Raj — Systems & Backend Engineer",
    description: "Computational Mathematics at NIT Agartala. Distributed systems, C++20 low-latency engines, Go microservices, and open-source infrastructure.",
    type: "website",
  },
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
      <body className="antialiased min-h-screen bg-background text-foreground transition-colors duration-200 selection:bg-neutral-200 dark:selection:bg-neutral-800">
        <Analytics />
        {children}
      </body>
    </html>
  )
}
