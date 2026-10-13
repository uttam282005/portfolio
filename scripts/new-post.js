#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const title = process.argv.slice(2).join(" ").trim()

if (!title) {
  console.log("\x1b[33mUsage: npm run new-post \"Title of the Post\"\x1b[0m")
  process.exit(1)
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)+/g, "")

const date = new Date().toISOString().split("T")[0]
const postsDir = path.join(process.cwd(), "content/posts")

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true })
}

const targetPath = path.join(postsDir, `${slug}.md`)

if (fs.existsSync(targetPath)) {
  console.error(`\x1b[31mError: Post already exists at ${targetPath}\x1b[0m`)
  process.exit(1)
}

const template = `---
title: "${title}"
date: "${date}"
description: "A short summary or abstract of what this article covers."
tags: ["Systems", "Go"]
published: true
---

Write your opening paragraph here. Start with the core problem or context.

## Heading 1

Add your technical explanation, architectural trade-offs, or code snippets here:

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Systems!")
}
\`\`\`

## Conclusion

Summarize the key takeaways and benchmarks.
`

fs.writeFileSync(targetPath, template, "utf-8")
console.log(`\x1b[32m✓ Created new post:\x1b[0m content/posts/${slug}.md`)
