"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useGithubStore, type GithubRepo } from "@/store/github"
import { X, Star, GitFork, ExternalLink, Globe } from "lucide-react"
import { getCombinedAltText, altTexts } from "@/lib/alt-text"
import { LANG_COLORS, timeAgo } from "@/lib/github-utils"
import { useLanguage } from "@/lib/language-context"
import { lockBodyScroll } from "@/lib/scroll-lock"

interface RepoModalProps {
  repo: GithubRepo
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function RepoModal({ repo, onClose }: RepoModalProps) {
  const { t } = useLanguage()
  const key = repo.full_name

  // Field-level selectors instead of the whole store — otherwise every README
  // that resolves anywhere on the page re-renders this markdown tree.
  const readme = useGithubStore((s) => s.readmeCache[key])
  const coverImage = useGithubStore((s) => s.coverImageCache[key])
  const fetchReadme = useGithubStore((s) => s.fetchReadme)

  // "Not in the cache yet" is the honest loading condition. `readmeLoading[key]`
  // is still undefined during the tick between mount and the fetch starting,
  // which briefly rendered the "no README" empty state before the skeleton.
  const loading = readme === undefined

  const [failedCoverImage, setFailedCoverImage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClose = useCallback(() => {
    if (closeTimerRef.current) return
    setIsOpen(false)
    closeTimerRef.current = setTimeout(onClose, 300)
  }, [onClose])

  useEffect(() => {
    fetchReadme(repo)
  }, [repo, fetchReadme])

  useEffect(() => {
    const releaseScroll = lockBodyScroll()
    return () => {
      releaseScroll()
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  // Move focus into the dialog on open and hand it back to whatever opened it
  // on close. Without this, `aria-modal` was a claim the markup didn't honour:
  // keyboard focus stayed on the page behind the overlay.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const firstFocusable =
      dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    firstFocusable?.focus()
    return () => previouslyFocused?.focus?.()
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
        return
      }
      if (e.key !== "Tab") return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      // Wrap at the edges so Tab can't walk out into the page behind.
      if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
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

  const modalContent = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={dialogRef}
        className={`relative w-full sm:max-w-[1100px] h-[92dvh] sm:h-[88dvh] bg-white dark:bg-[#121212] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 sm:translate-y-4 sm:scale-[0.98] opacity-0"
        }`}
      >
        {/* ── Close button ── */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md shadow-sm sm:shadow-none"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── LEFT SIDEBAR (Info Repo) ── */}
        <div className="flex-shrink-0 sm:w-80 flex flex-col border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-800/60 bg-gray-50/50 dark:bg-[#181818] overflow-y-auto max-h-[40dvh] sm:max-h-none custom-scrollbar">
          
          {/* Cover Image */}
          {showCover && (
            <div className="w-full shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt={getCombinedAltText(altTexts.repositoryPreview(repo.name))}
                className="w-full h-32 sm:h-48 object-cover"
                onError={() => setFailedCoverImage(coverImage)}
              />
            </div>
          )}

          {/* Repo info */}
          <div className="flex flex-col flex-1 px-6 py-6">
            <div className="mb-5 pr-6 sm:pr-0">
              <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-300 mb-2 font-bold uppercase tracking-widest">
                <span>faturahaman</span>
                <span>/</span>
              </div>
              <h2
                id="modal-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight break-words font-sans"
              >
                {repo.name}
              </h2>
              {repo.description && (
                <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed">
                  {repo.description}
                </p>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              {repo.language && (
                <span className="flex items-center gap-1.5 font-medium">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: langColor ?? "#8b949e" }}
                  />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {repo.forks_count}
              </span>
            </div>
            
            <div className="text-xs text-gray-400 dark:text-gray-500 mb-6">
              {t("projects.updated")} {timeAgo(repo.updated_at)}
            </div>

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {repo.topics.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300 px-3 py-1.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex-1 hidden sm:block min-h-[2rem]" />

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold px-4 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {t("projects.viewOnGitHub")}
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-4 py-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {t("projects.liveDemo")}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: README (Medium Style) ── */}
        <div className="flex-1 min-h-0 min-w-0 flex flex-col bg-white dark:bg-[#121212]">
          <div className="px-6 sm:px-10 py-5 border-b border-gray-100 dark:border-gray-800/60 flex-shrink-0 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md sticky top-0 z-10">
            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
              {t("projects.readme")}.md
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-10 py-8 custom-scrollbar">
            {loading ? (
              <div className="space-y-4 animate-pulse max-w-[680px] mx-auto">
                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded w-2/3 mb-8" />
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-4/5" />
                <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded w-full my-8" />
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
              </div>
            ) : readme ? (
              <div className="max-w-[680px] mx-auto pb-16">
                <div
                  className="prose sm:prose-lg dark:prose-invert max-w-none break-words
                    font-serif text-[#242424] dark:text-[rgba(255,255,255,0.84)]
                    
                    prose-headings:font-sans prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-[rgba(255,255,255,0.9)] prose-headings:tracking-tight prose-headings:mt-10 prose-headings:mb-4
                    
                    prose-p:leading-[1.8] sm:prose-p:text-[20px] prose-p:mb-6
                    
                    prose-a:text-inherit prose-a:underline prose-a:decoration-gray-300 dark:prose-a:decoration-gray-600 prose-a:underline-offset-4 hover:prose-a:decoration-black dark:hover:prose-a:decoration-white prose-a:transition-colors
                    
                    prose-blockquote:border-l-[3px] prose-blockquote:border-black dark:prose-blockquote:border-white prose-blockquote:bg-transparent prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:font-italic prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:my-8
                    
                    prose-code:font-mono prose-code:text-[0.8em] prose-code:bg-[#f2f2f2] dark:prose-code:bg-[rgba(255,255,255,0.1)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-[#242424] dark:prose-code:text-[rgba(255,255,255,0.84)]
                    prose-code:before:content-none prose-code:after:content-none
                    
                    prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
                    
                    prose-img:w-full prose-img:rounded-md prose-img:my-10 prose-img:border prose-img:border-gray-100 dark:prose-img:border-gray-800
                    prose-hr:border-gray-200 dark:prose-hr:border-gray-800/60 prose-hr:my-12
                    
                    [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_li]:leading-[1.8] sm:[&_li]:text-[20px]
                    [&_ol]:list-decimal [&_ol]:pl-5
                    
                    [&_table]:w-full [&_table]:text-sm sm:[&_table]:text-base [&_table]:font-sans [&_th]:border-b [&_td]:border-b [&_th]:border-gray-200 dark:[&_th]:border-gray-800 [&_td]:border-gray-200 dark:[&_td]:border-gray-800 [&_th]:p-3 [&_td]:p-3 [&_th]:text-left"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      pre({ children }) {
                        return (
                          <div className="my-8 overflow-x-auto bg-[#f9f9f9] dark:bg-[rgba(255,255,255,0.05)] p-5 sm:p-6 rounded-md border border-gray-100 dark:border-white/5">
                            <pre className="text-sm sm:text-[15px] font-mono leading-[1.6] text-[#242424] dark:text-[rgba(255,255,255,0.84)] min-w-full inline-block custom-scrollbar m-0">
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
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-5">
                  <span className="text-2xl opacity-60">📄</span>
                </div>
                <h3 className="text-xl font-bold font-sans text-gray-900 dark:text-white mb-2">{t("projects.noReadme")}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-serif max-w-sm mx-auto">
                  {t("projects.noReadmeDesc")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}