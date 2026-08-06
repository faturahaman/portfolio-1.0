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
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=30&sort=updated`

/** raw.githubusercontent is case-sensitive, so the casing has to be guessed. */
const README_CANDIDATES = ["README.md", "readme.md", "Readme.md"]

/**
 * The projects grid renders six cards at once and each wants a cover image, so
 * six README downloads used to start simultaneously — competing with the hero
 * image and the app's own chunks for the browser's connection budget while the
 * page was still loading. Three at a time keeps the covers filling in quickly
 * without crowding out anything that matters more.
 */
const MAX_CONCURRENT_README_FETCHES = 3

let activeReadmeFetches = 0
const readmeQueue: Array<() => void> = []

function withReadmeConcurrencyLimit<T>(job: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const start = () => {
      activeReadmeFetches++
      job()
        .then(resolve, reject)
        .finally(() => {
          activeReadmeFetches--
          readmeQueue.shift()?.()
        })
    }

    if (activeReadmeFetches < MAX_CONCURRENT_README_FETCHES) start()
    else readmeQueue.push(start)
  })
}

/** Returns the first README that exists, or null if none of the casings do. */
async function fetchFirstReadme(
  repoFullName: string,
  branch: string
): Promise<string | null> {
  for (const filename of README_CANDIDATES) {
    const res = await fetch(
      `https://raw.githubusercontent.com/${repoFullName}/${branch}/${filename}`
    )
    if (res.ok) return res.text()
  }
  return null
}

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
    // `reposFetched` alone isn't enough: it only flips once the request has
    // come back, so two callers mounting in the same tick (or one component in
    // React Strict Mode) both got past the guard and fired duplicate requests
    // against an API that allows 60/hour per IP. `reposLoading` closes that gap
    // while still leaving the error path retryable.
    const { reposFetched, reposLoading } = get()
    if (reposFetched || reposLoading) return

    set({ reposLoading: true, reposError: null })
    try {
      const res = await fetch(REPOS_URL, {
        headers: { Accept: "application/vnd.github+json" },
      })
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
    const { readmeCache, readmeLoading } = get()

    // Cached, or already on its way. The in-flight half of this check matters:
    // a card and the modal for the same repo both call this, and the card's
    // effect can re-run before the first request resolves.
    if (readmeCache[key] !== undefined || readmeLoading[key]) return

    set((s) => ({
      readmeLoading: { ...s.readmeLoading, [key]: true },
      readmeError: { ...s.readmeError, [key]: null },
    }))

    try {
      // `||` not `??` — the API can return an empty string for default_branch.
      const branch = repo.default_branch || "main"
      const content = await withReadmeConcurrencyLimit(() =>
        fetchFirstReadme(key, branch)
      )

      // Extract cover image from README
      const coverImage = content ? extractReadmeImage(content, key, branch) : null

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
