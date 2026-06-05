"use client"

import { useEffect, useState } from "react"
import { Star, GitFork, Globe } from "lucide-react"
import { useGithubStore, type GithubRepo } from "@/store/github"
import { LANG_COLORS, timeAgo } from "@/lib/github-utils"

interface RepoCardProps {
  repo: GithubRepo
  onClick: () => void
}

export function RepoCard({ repo, onClick }: RepoCardProps) {
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
      {/* Background cover image fading right → left */}
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
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #ffffff 38%, #ffffffcc 62%, transparent 100%)" }}
          />
          <div
            className="absolute inset-0 hidden dark:block"
            style={{ background: "linear-gradient(to right, #161616 38%, #161616cc 62%, transparent 100%)" }}
          />
        </>
      )}

      {/* Foreground */}
      <div className="relative z-10 p-5 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base leading-snug group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-1">
            {repo.name}
          </h3>
          <span className="text-[10px] border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 capitalize bg-white/80 dark:bg-[#161616]/80">
            {repo.visibility}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4 min-h-[2.5rem] max-w-[65%]">
          {repo.description ?? "No description provided."}
        </p>

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {repo.topics.slice(0, 3).map((t) => (
              <span key={t} className="text-[11px] bg-gray-100/90 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
            {repo.topics.length > 3 && (
              <span className="text-[11px] text-gray-400 dark:text-gray-500">+{repo.topics.length - 3}</span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: langColor ?? "#8b949e" }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
          <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
          <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
        </div>

        {repo.homepage && (
          <div className="mt-3">
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe className="w-3 h-3" />
              Live site
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
