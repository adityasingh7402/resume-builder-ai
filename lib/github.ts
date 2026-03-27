const BASE = 'https://api.github.com'

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  }
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  fork: boolean
  topics: string[]
  pushed_at: string
}

export async function getUserRepos(username: string): Promise<GithubRepo[]> {
  const res = await fetch(
    `${BASE}/users/${username}/repos?per_page=100&sort=pushed&type=owner`,
    { headers: headers(), next: { revalidate: 300 } }
  )

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`)
  }

  const repos: GithubRepo[] = await res.json()
  return repos.filter((r) => !r.fork)
}

export async function getRepoLanguages(fullName: string): Promise<Record<string, number>> {
  const res = await fetch(`${BASE}/repos/${fullName}/languages`, {
    headers: headers(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) return {}
  return res.json()
}

export async function getRepoReadme(fullName: string): Promise<string> {
  try {
    const res = await fetch(`${BASE}/repos/${fullName}/readme`, {
      headers: { ...headers(), Accept: 'application/vnd.github.raw+json' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return ''
    const text = await res.text()
    // truncate readme to keep tokens reasonable
    return text.slice(0, 2000)
  } catch {
    return ''
  }
}
