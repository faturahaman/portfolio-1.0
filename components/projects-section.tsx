"use client"

import { useEffect, useState, lazy, Suspense } from "react"
import { useGithubStore, type GithubRepo } from "@/store/github"
import { Star, GitFork, AlertCircle, RefreshCw, Globe, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LANG_COLORS, timeAgo } from "@/lib/github-utils"

// Dynamically import RepoModal only when needed to reduce initial bundle
const RepoModal = lazy(() =>
  import("@/components/repo-modal").then((mod) => ({ default: mod.RepoModal }))
)

/** Card — cover image as background fading right→left */
function RepoCard({
  repo,
  onClick,
  t,
}: {
  repo: GithubRepo
  onClick: () => void
  t: (key: string) => string
}) {
  const { coverImageCache, readmeCache, fetchReadme } = useGithubStore()
  const key = repo.full_name
  const coverImage = coverImageCache[key]
  const isReadmeFetched = readmeCache[key] !== undefined
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (!isReadmeFetched) fetchReadme(repo)
  }, [repo, isReadmeFetched, fetchReadme])

  useEffect(() => { setImgError(false) }, [coverImage])

  const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#8b949e" : null
  const showCover = Boolean(coverImage && !imgError)

  return (
    <div
      className="group relative rounded-xl border border-gray-100 dark:border-gray-800
        overflow-hidden cursor-pointer
        hover:border-gray-300 dark:hover:border-gray-600
        hover:shadow-lg dark:hover:shadow-black/40
        transition-all duration-300
        bg-white dark:bg-[#161616]"
      style={{ minHeight: "9rem" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}
    >
      {/* ── Background cover image (right side, fades left) ── */}
      {showCover && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage!}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-right
              transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
          {/* Gradient overlay — light mode */}
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              background:
                "linear-gradient(to right, #ffffff 38%, #ffffffcc 62%, transparent 100%)",
            }}
          />
          {/* Gradient overlay — dark mode */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "linear-gradient(to right, #161616 38%, #161616cc 62%, transparent 100%)",
            }}
          />
        </>
      )}

      {/* ── Foreground content ── */}
      <div className="relative z-10 p-5 flex flex-col h-full">

        {/* Repo name + visibility */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base leading-snug
            group-hover:text-black dark:group-hover:text-white
            transition-colors line-clamp-1">
            {repo.name}
          </h3>
          <span className="text-[10px] border border-gray-200 dark:border-gray-700
            text-gray-400 dark:text-gray-500 px-2 py-0.5 rounded-full
            flex-shrink-0 mt-0.5 capitalize bg-white/80 dark:bg-[#161616]/80">
            {repo.visibility}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed
          line-clamp-2 mb-4 min-h-[2.5rem]">
          {repo.description ?? t("projects.noDescription")}
        </p>

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="text-[11px] bg-gray-100/90 dark:bg-gray-700/50
                  text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 3 && (
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                +{repo.topics.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer row */}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: langColor ?? "#8b949e" }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {repo.forks_count}
          </span>
          <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
        </div>

        {/* Live site pill */}
        {repo.homepage && (
          <div className="mt-3">
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium
                text-gray-600 dark:text-gray-300
                bg-gray-100 dark:bg-gray-800
                px-2.5 py-1 rounded-full
                hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe className="w-3 h-3" />
              {t("projects.liveSite")}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const { t } = useLanguage()
  const { repos, reposFetched, reposLoading, reposError, fetchRepos } = useGithubStore()
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null)
  const [page, setPage] = useState(1)

  const PER_PAGE = 6
  const totalPages = Math.ceil(repos.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const visible = repos.slice(start, start + PER_PAGE)

  useEffect(() => { fetchRepos() }, [fetchRepos])

  // Reset to page 1 when repos change
  useEffect(() => { setPage(1) }, [repos.length])

  function goTo(p: number) {
    setPage(p)
    // Scroll section back into view smoothly
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Build page number list with ellipsis
  function pageNumbers(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | "…")[] = [1]
    if (page > 3) pages.push("…")
    for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) {
      pages.push(p)
    }
    if (page < totalPages - 2) pages.push("…")
    pages.push(totalPages)
    return pages
  }

  return (
    <section id="projects" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {t("projects.title")}
        </h2>
        {reposFetched && repos.length > 0 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {start + 1}–{Math.min(start + PER_PAGE, repos.length)} of {repos.length} repos
          </span>
        )}
      </div>

      {/* Loading skeleton */}
      {reposLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: PER_PAGE }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden p-5 space-y-3"
              style={{ minHeight: "9rem" }}
            >
              <div className="flex justify-between gap-2">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/5" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-12" />
              </div>
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-4/5" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3 mt-auto" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {reposError && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <AlertCircle className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Failed to load repositories</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{reposError}</p>
          </div>
          <button
            onClick={() => fetchRepos()}
            className="flex items-center gap-2 text-sm border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full hover:border-gray-400 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Repo grid */}
      {!reposLoading && !reposError && repos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visible.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onClick={() => setSelectedRepo(repo)}
                t={t}
              />
            ))}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1">
              {/* Prev */}
              <button
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
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
              {pageNumbers().map((p, i) =>
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
                    aria-current={p === page ? "page" : undefined}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all
                      ${p === page
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
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
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
          <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        </Suspense>
      )}
    </section>
  )
}
