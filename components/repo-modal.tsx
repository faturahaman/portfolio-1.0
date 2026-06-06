"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useGithubStore, type GithubRepo } from "@/store/github"
import { X, Star, GitFork, ExternalLink, Globe } from "lucide-react"
import { getCombinedAltText, altTexts } from "@/lib/alt-text"
import { LANG_COLORS, timeAgo } from "@/lib/github-utils"

interface RepoModalProps {
  repo: GithubRepo
  onClose: () => void
}

export function RepoModal({ repo, onClose }: RepoModalProps) {
  const { readmeCache, readmeLoading, coverImageCache, fetchReadme } = useGithubStore()
  const key = repo.full_name
  const readme = readmeCache[key]
  const loading = readmeLoading[key]
  // undefined = not fetched yet, null = fetched but no image, string = url
  const coverImage = coverImageCache[key]
  const [failedCoverImage, setFailedCoverImage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClose = useCallback(() => {
    if (closeTimerRef.current) return
    setIsOpen(false)
    closeTimerRef.current = setTimeout(onClose, 300)
  }, [onClose])

  useEffect(() => {
    fetchReadme(repo)
  }, [repo, fetchReadme])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleClose])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsOpen(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose()
  }

  const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#8b949e" : null
  const showCover = coverImage && coverImage !== failedCoverImage

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`relative w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-[#1a1a1a] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 sm:translate-y-4 sm:scale-[0.98] opacity-0"
        }`}
      >
        {/* ── Cover Image ── */}
        {showCover ? (
          <div className="relative w-full h-52 sm:h-64 flex-shrink-0 overflow-hidden rounded-t-2xl sm:rounded-t-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={getCombinedAltText(altTexts.repositoryPreview(repo.name))}
              className="w-full h-full object-cover"
              onError={() => setFailedCoverImage(coverImage)}
            />
            {/* gradient overlay so header text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Close button — floating on cover */}
            <button
              onClick={handleClose}
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
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-300">
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
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-full"
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
              onClick={handleClose}
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
