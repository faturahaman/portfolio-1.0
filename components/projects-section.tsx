"use client"

import { memo, useCallback, useEffect, useState, Suspense } from "react"
import { useGithubStore, type GithubRepo } from "@/store/github"
import { Star, GitFork, AlertCircle, RefreshCw, Globe, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LANG_COLORS, timeAgo, buildPageNumbers } from "@/lib/github-utils"

import dynamic from "next/dynamic"

// Dynamically import RepoModal only when needed to reduce initial bundle
const RepoModal = dynamic(() =>
  import("@/components/repo-modal").then((mod) => mod.RepoModal),
  { ssr: false }
)

const PER_PAGE = 6

/**
 * Run `task` once the browser is idle, returning a cancel function.
 * Falls back to a short timeout on browsers without requestIdleCallback.
 */
function onIdle(task: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(task, { timeout: 2000 })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(task, 200)
  return () => window.clearTimeout(id)
}

/** Card — Medium-style: typography-first, cover thumbnail right, minimal meta */
const RepoCard = memo(function RepoCard({
  repo,
  onSelect,
  t,
}: {
  repo: GithubRepo
  onSelect: (repo: GithubRepo) => void
  t: (key: string) => string
}) {
  const key = repo.full_name

  // Narrow selectors, not the whole store. Subscribing to the entire store made
  // every card re-render each time *any* repo's README resolved — six cards
  // times twelve store writes on a single page view.
  const coverImage = useGithubStore((s) => s.coverImageCache[key])
  const isReadmeFetched = useGithubStore((s) => s.readmeCache[key] !== undefined)
  const fetchReadme = useGithubStore((s) => s.fetchReadme)

  // Track *which* URL failed rather than a boolean, so a new cover image is
  // retried without needing an effect to reset the flag.
  const [failedCover, setFailedCover] = useState<string | null>(null)

  useEffect(() => {
    if (isReadmeFetched) return
    // Cover images are decorative. Let the browser get through the work that
    // actually moves LCP and TTI before spending connections on README bodies.
    return onIdle(() => {
      fetchReadme(repo)
    })
  }, [repo, isReadmeFetched, fetchReadme])

  const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#8b949e" : null
  const showCover = Boolean(coverImage) && coverImage !== failedCover

  return (
    <div
      className="group flex flex-row items-stretch w-full gap-4
        py-5 cursor-pointer
        border-b border-gray-100 dark:border-gray-800/60
        hover:border-gray-200 dark:hover:border-gray-700
        transition-colors duration-200"
      onClick={() => onSelect(repo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          // Without this, Space scrolls the page as well as opening the modal.
          e.preventDefault()
          onSelect(repo)
        }
      }}
    >
      {/* ── Left: text content ── */}
      <div className="flex flex-col justify-between flex-1 min-w-0">

        {/* Top: topics + title + description */}
        <div>
          {/* Topic pills (like Medium's "publication" tag) */}
          {repo.topics.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="text-[11px] font-medium
                    text-gray-500 dark:text-gray-400
                    bg-gray-100 dark:bg-gray-800
                    px-2.5 py-0.5 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Title — bold, hover underline like Medium */}
          <h3 className="font-bold text-[15px] sm:text-base leading-snug mb-1.5
            text-gray-900 dark:text-gray-100
            group-hover:underline decoration-gray-300 dark:decoration-gray-600
            underline-offset-2 transition-all line-clamp-2">
            {repo.name.replace(/-/g, " ")}
          </h3>

          {/* Description — muted subtitle */}
          <p className="text-[13px] text-gray-500 dark:text-gray-400
            leading-relaxed line-clamp-2">
            {repo.description ?? t("projects.noDescription")}
          </p>
        </div>

        {/* Bottom meta row — Medium-style dots separator */}
        <div className="flex items-center gap-0 mt-3 text-[12px] text-gray-400 dark:text-gray-500 flex-wrap">
          {/* Language */}
          {repo.language && (
            <>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: langColor ?? "#8b949e" }}
                />
                {repo.language}
              </span>
              <span className="mx-2 text-gray-300 dark:text-gray-600 select-none">·</span>
            </>
          )}

          {/* Stars */}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
          <span className="mx-2 text-gray-300 dark:text-gray-600 select-none">·</span>

          {/* Forks */}
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {repo.forks_count}
          </span>

          {/* Visibility badge */}
          <span className="mx-2 text-gray-300 dark:text-gray-600 select-none">·</span>
          <span className="capitalize text-gray-400 dark:text-gray-500">{repo.visibility}</span>

          {/* Timestamp — right-aligned like "X min read" */}
          <span className="ml-auto text-gray-400 dark:text-gray-500 flex-shrink-0">
            {timeAgo(repo.updated_at)}
          </span>
        </div>
      </div>

      {/* ── Right: cover thumbnail (Medium-style fixed box) ── */}
      {showCover && (
        <div className="flex-shrink-0 w-[100px] sm:w-[130px] h-auto self-start">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md
            bg-gray-100 dark:bg-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage!}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover
                transition-transform duration-500 ease-out
                group-hover:scale-105"
              onError={() => setFailedCover(coverImage ?? null)}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}

      {/* Homepage link — shown when no cover image */}
      {!showCover && repo.homepage && (
        <div className="flex-shrink-0 self-start mt-0.5">
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[11px] font-medium
              text-gray-400 dark:text-gray-500
              hover:text-gray-700 dark:hover:text-gray-300
              transition-colors"
            aria-label={`Visit live site for ${repo.name}`}
          >
            <Globe className="w-3.5 h-3.5" />
            {t("projects.live")}
          </a>
        </div>
      )}
    </div>
  )
})

function RepoSkeleton() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: PER_PAGE }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex flex-row items-start gap-4 py-5 border-b border-gray-100 dark:border-gray-800/60"
        >
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3 mt-1" />
          </div>
          <div className="flex-shrink-0 w-[100px] sm:w-[130px] aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export function ProjectsSection() {
  const { t } = useLanguage()

  const repos = useGithubStore((s) => s.repos)
  const reposFetched = useGithubStore((s) => s.reposFetched)
  const reposError = useGithubStore((s) => s.reposError)
  const fetchRepos = useGithubStore((s) => s.fetchRepos)

  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null)
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(repos.length / PER_PAGE))
  // Clamp during render instead of resetting from an effect. If the repo list
  // shrinks while the user sits on a high page, they land on the last valid
  // page immediately rather than seeing one empty frame first.
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PER_PAGE
  const visible = repos.slice(start, start + PER_PAGE)

  useEffect(() => { fetchRepos() }, [fetchRepos])

  const goTo = useCallback((p: number) => {
    setPage(p)
    // Scroll section back into view smoothly
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handleSelect = useCallback((repo: GithubRepo) => setSelectedRepo(repo), [])
  const handleClose = useCallback(() => setSelectedRepo(null), [])

  // The skeleton also covers the first render, before the effect has had a
  // chance to flip `reposLoading` — previously that tick rendered nothing.
  const isLoading = !reposFetched && !reposError
  const isEmpty = reposFetched && repos.length === 0

  return (
    <section id="projects" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {t("projects.title")}
        </h2>
        {reposFetched && repos.length > 0 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {start + 1}–{Math.min(start + PER_PAGE, repos.length)} {t("projects.repoCounter")}
          </span>
        )}
      </div>

      {/* Loading skeleton — Medium-style single column */}
      {isLoading && <RepoSkeleton />}

      {/* Error */}
      {reposError && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <AlertCircle className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">{t("projects.failedToLoad")}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{reposError}</p>
          </div>
          <button
            onClick={() => fetchRepos()}
            className="flex items-center gap-2 text-sm border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full hover:border-gray-400 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t("projects.retry")}
          </button>
        </div>
      )}

      {/* Fetched successfully but nothing to show */}
      {isEmpty && (
        <p className="py-16 text-center text-sm text-gray-500 dark:text-gray-400">
          {t("projects.noDescription")}
        </p>
      )}

      {/* Repo grid */}
      {!isLoading && !reposError && repos.length > 0 && (
        <>
          <div className="flex flex-col">
            {visible.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onSelect={handleSelect}
                t={t}
              />
            ))}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1">
              {/* Prev */}
              <button
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-9 h-9 flex items-center justify-center rounded-full
                  border border-gray-200 dark:border-gray-700
                  text-gray-500 dark:text-gray-400
                  hover:border-gray-400 dark:hover:border-gray-500
                  hover:text-black dark:hover:text-white
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              {buildPageNumbers(currentPage, totalPages).map((p, i) =>
                p === "…" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 dark:text-gray-600 select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goTo(p)}
                    aria-label={`Page ${p}`}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all
                      ${p === currentPage
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white"
                      }`}
                  >
                    {p}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-9 h-9 flex items-center justify-center rounded-full
                  border border-gray-200 dark:border-gray-700
                  text-gray-500 dark:text-gray-400
                  hover:border-gray-400 dark:hover:border-gray-500
                  hover:text-black dark:hover:text-white
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal — wrapped in Suspense for lazy loading */}
      {selectedRepo && (
        <Suspense fallback={null}>
          <RepoModal repo={selectedRepo} onClose={handleClose} />
        </Suspense>
      )}
    </section>
  )
}
