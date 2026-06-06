"use client"

import { useEffect, useState } from "react"
import { Star, GitFork, Globe } from "lucide-react"
import { useGithubStore, type GithubRepo } from "@/store/github"
import { LANG_COLORS, timeAgo } from "@/lib/github-utils"
import { getCombinedAltText, altTexts } from "@/lib/alt-text"

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
    if (!isReadmeFetched) {
      fetchReadme(repo)
    }
  }, [repo, isReadmeFetched, fetchReadme])

  useEffect(() => {
    setImgError(false)
  }, [coverImage])

  const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#8b949e" : null
  const showCover = Boolean(coverImage && !imgError)

  return (
    <div
      className="group
        flex flex-row items-stretch
        w-full h-[140px]
        rounded-xl
        border border-gray-100 dark:border-gray-800/80
        overflow-hidden
        cursor-pointer
        bg-white dark:bg-[#161616]
        hover:border-gray-200 dark:hover:border-gray-700
        hover:shadow-sm
        transition-all duration-200"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick()
      }}
    >
      {/* ── Text content ── */}
      <div className="flex flex-col justify-between flex-1 min-w-0 px-5 py-4">
        {/* Top: name + visibility */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-semibold text-[15px] leading-snug
              text-gray-900 dark:text-gray-100
              group-hover:text-black dark:group-hover:text-white
              transition-colors truncate">
              {repo.name}
            </h3>
            <span className="flex-shrink-0
              text-[10px] px-2 py-0.5 rounded-full capitalize
              border border-gray-200 dark:border-gray-700
              text-gray-400 dark:text-gray-500">
              {repo.visibility}
            </span>
          </div>
          <p className="text-[13px] text-gray-400 dark:text-gray-500
            leading-relaxed line-clamp-2">
            {repo.description ?? "No description provided."}
          </p>
        </div>

        {/* Bottom: meta row */}
        <div className="flex items-center gap-3 text-[12px] text-gray-400 dark:text-gray-500 mt-2">
          {repo.language && (
            <span className="flex items-center gap-1.5 flex-shrink-0">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
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
          {repo.topics.slice(0, 2).map((topic) => (
            <span
              key={topic}
              className="hidden sm:inline-flex
                text-[11px] px-2 py-0.5 rounded-full
                bg-gray-100 dark:bg-gray-800
                text-gray-500 dark:text-gray-400"
            >
              {topic}
            </span>
          ))}
          <span className="ml-auto flex-shrink-0">{timeAgo(repo.updated_at)}</span>
        </div>
      </div>

      {/* ── Cover image (right side, fixed width) ── */}
      {showCover ? (
        <div className="w-[160px] flex-shrink-0 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage!}
            alt={getCombinedAltText(altTexts.repositoryBackground(repo.name))}
            className="absolute inset-0 w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      ) : repo.homepage ? (
        /* No cover but has homepage — show subtle live site pill */
        <div className="w-[80px] flex-shrink-0 flex items-center justify-center border-l border-gray-100 dark:border-gray-800">
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-1
              text-[11px] font-medium
              text-gray-400 dark:text-gray-500
              hover:text-gray-700 dark:hover:text-gray-300
              transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Live</span>
          </a>
        </div>
      ) : null}
    </div>
  )
}
