// app/api/github/[...slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params
    const searchParams = request.nextUrl.searchParams
    
    // Reconstruct the GitHub API URL
    const githubPath = slug.join('/')
    const githubUrl = `https://api.github.com/${githubPath}`
    
    // Add query parameters if they exist
    const urlWithParams = new URL(githubUrl)
    searchParams.forEach((value, key) => {
      if (key !== 't') { // Skip our cache-busting parameter
        urlWithParams.searchParams.append(key, value)
      }
    })

    console.log('Proxying to GitHub API:', urlWithParams.toString())

    const response = await fetch(urlWithParams.toString(), {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'MyApp/1.0',
        // Add GitHub token if you have one (recommended for higher rate limits)
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      // Don't cache the response from GitHub
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: urlWithParams.toString()
      })
      
      return NextResponse.json(
        { error: `GitHub API returned ${response.status}: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Return the data with proper CORS headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })

  } catch (error) {
    console.error('API Route Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from GitHub API' },
      { status: 500 }
    )
  }
}
