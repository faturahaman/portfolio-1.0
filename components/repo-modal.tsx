"use client"

import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useGithubStore, type GithubRepo } from "@/store/github"
import { X, Star, GitFork, ExternalLink, Globe } from "lucide-react"

interface RepoModalProps {
  repo: GithubRepo
  onClose: () => void
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#6b7280",
  JavaScript: "#9ca3af",
  PHP: "#6b7280",
  Python: "#9ca3af",
  Go: "#6b7280",
  CSS: "#9ca3af",
  HTML: "#6b7280",
  Vue: "#9ca3af",
  Rust: "#6b7280",
  Java: "#9ca3af",
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years > 1 ? "s" : ""} ago`
}

export function RepoModal({ repo, onClose }: RepoModalProps) {
  const { readmeCache, readmeLoading, coverImageCache, fetchReadme } = useGithubStore()
  const key = repo.full_name
  const readme = readmeCache[key]
  const loading = readmeLoading[key]
  // undefined = not fetched yet, null = fetched but no image, string = url
  const coverImage = coverImageCache[key]
  const [coverError, setCoverError] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchReadme(repo)
  }, [repo, fetchReadme])

  // Reset cover error when repo changes
  useEffect(() => {
    setCoverError(false)
  }, [key])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  // Slide-in animation
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    panel.animate(
      [
        { transform: "translateY(40px)", opacity: "0" },
        { transform: "translateY(0)", opacity: "1" },
      ],
      { duration: 300, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "forwards" }
    )
  }, [])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#8b949e" : null
  const showCover = coverImage && !coverError

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-[#1a1a1a] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden opacity-0"
      >
        {/* ── Cover Image ── */}
        {showCover ? (
          <div className="relative w-full h-52 sm:h-64 flex-shrink-0 overflow-hidden rounded-t-2xl sm:rounded-t-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={`${repo.name} preview`}
              className="w-full h-full object-cover"
              onError={() => setCoverError(true)}
            />
            {/* gradient overlay so header text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Close button — floating on cover */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : null}

        {/* ── Header ── */}
        <div
          className={`flex items-start justify-between gap-4 px-4 sm:px-8 pb-6 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 ${
            showCover ? "pt-4 sm:pt-6" : "pt-6 sm:pt-8"
          }`}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-1.5 font-medium uppercase tracking-widest">
              <span>faturahaman</span>
              <span>/</span>
            </div>
            <h2
              id="modal-title"
              className="text-xl sm:text-2xl font-bold tracking-tight dark:text-white"
            >
              {repo.name}
            </h2>
            {repo.description && (
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                {repo.description}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: langColor ?? "#8b949e" }}
                  />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                {repo.forks_count}
              </span>
              <span>Updated {timeAgo(repo.updated_at)}</span>
            </div>

            {/* Topics */}
            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {repo.topics.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Close button — only show here when there's no cover image */}
          {!showCover && (
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors mt-0.5"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ── README Body ── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 sm:py-7">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-4/5" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
            </div>
          ) : readme ? (
            <div
              className="prose prose-base dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-a:text-gray-700 dark:prose-a:text-gray-300 prose-a:underline prose-a:underline-offset-2
                prose-code:text-gray-800 dark:prose-code:text-gray-200
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
                prose-pre:bg-gray-100 dark:prose-pre:bg-[#0d1117]
                prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800
                prose-pre:rounded-xl prose-pre:p-0
                prose-img:rounded-lg prose-img:mx-auto
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
                prose-hr:border-gray-200 dark:prose-hr:border-gray-800
                prose-table:text-sm
                [&_table]:w-full [&_th]:text-left [&_th]:pb-2 [&_td]:py-1.5
                [&_th]:border-b [&_th]:border-gray-200 dark:[&_th]:border-gray-700"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre({ children }) {
                    return (
                      <div className="relative my-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                        {/* macOS-style traffic lights */}
                        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <pre className="overflow-x-auto p-4 bg-white dark:bg-[#0d1117] text-gray-800 dark:text-gray-200 text-sm leading-relaxed m-0 rounded-none">
                          {children}
                        </pre>
                      </div>
                    )
                  },
                }}
              >
                {readme}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <p className="font-medium text-gray-600 dark:text-gray-400">No README found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                This repository doesn&apos;t have a README file yet.
              </p>
            </div>
          )}
        </div>

        {/* ── Footer actions ── */}
        <div className="flex items-center gap-3 px-4 sm:px-8 py-4 sm:py-5 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View on GitHub
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-5 py-2 rounded-full hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
