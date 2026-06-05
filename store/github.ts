import { create } from "zustand"
import { extractReadmeImage } from "@/lib/readme-utils"

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  visibility: string
  default_branch: string
}

interface GithubStore {
  // Repos list
  repos: GithubRepo[]
  reposFetched: boolean
  reposLoading: boolean
  reposError: string | null

  // README cache: key = repo full_name
  readmeCache: Record<string, string>
  readmeLoading: Record<string, boolean>
  readmeError: Record<string, string | null>

  // Cover image cache: key = repo full_name, value = url | null
  coverImageCache: Record<string, string | null>

  // Actions
  fetchRepos: () => Promise<void>
  fetchReadme: (repo: GithubRepo) => Promise<void>
}

const GITHUB_USERNAME = "faturahaman"

export const useGithubStore = create<GithubStore>((set, get) => ({
  repos: [],
  reposFetched: false,
  reposLoading: false,
  reposError: null,

  readmeCache: {},
  readmeLoading: {},
  readmeError: {},
  coverImageCache: {},

  fetchRepos: async () => {
    if (get().reposFetched) return

    set({ reposLoading: true, reposError: null })
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=30&sort=updated`,
        { headers: { Accept: "application/vnd.github+json" } }
      )
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
      const data: GithubRepo[] = await res.json()
      const filtered = data
        .filter((r) => r.visibility === "public")
        .sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
      set({ repos: filtered, reposFetched: true, reposLoading: false })
    } catch (err) {
      set({
        reposError: err instanceof Error ? err.message : "Failed to fetch repos",
        reposLoading: false,
      })
    }
  },

  fetchReadme: async (repo: GithubRepo) => {
    const key = repo.full_name
    // Already cached — skip
    if (get().readmeCache[key] !== undefined) return

    set((s) => ({
      readmeLoading: { ...s.readmeLoading, [key]: true },
      readmeError: { ...s.readmeError, [key]: null },
    }))

    try {
      const branch = repo.default_branch ?? "main"
      const candidates = ["README.md", "readme.md", "Readme.md"]
      let content: string | null = null

      for (const filename of candidates) {
        const url = `https://raw.githubusercontent.com/${key}/${branch}/${filename}`
        const res = await fetch(url)
        if (res.ok) {
          content = await res.text()
          break
        }
      }

      // Extract cover image from README
      const coverImage = content
        ? extractReadmeImage(content, key, branch)
        : null

      set((s) => ({
        readmeCache: { ...s.readmeCache, [key]: content ?? "" },
        readmeLoading: { ...s.readmeLoading, [key]: false },
        coverImageCache: { ...s.coverImageCache, [key]: coverImage },
      }))
    } catch (err) {
      set((s) => ({
        readmeCache: { ...s.readmeCache, [key]: "" },
        readmeLoading: { ...s.readmeLoading, [key]: false },
        readmeError: {
          ...s.readmeError,
          [key]: err instanceof Error ? err.message : "Failed to fetch README",
        },
        coverImageCache: { ...s.coverImageCache, [key]: null },
      }))
    }
  },
}))
