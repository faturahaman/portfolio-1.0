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

  const langColor = repo.language
    ? LANG_COLORS[repo.language] ?? "#8b949e"
    : null

  const showCover = Boolean(coverImage && !imgError)

  return (
    <div
      className="
        group relative
        h-[320px]
        w-full
        rounded-xl
        border border-gray-100 dark:border-gray-800
        overflow-hidden
        cursor-pointer
        bg-white dark:bg-[#161616]
        hover:border-gray-300 dark:hover:border-gray-600
        hover:shadow-lg dark:hover:shadow-black/40
        transition-all duration-300
      "
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
    >
      {showCover && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage!}
            alt={getCombinedAltText(altTexts.repositoryBackground(repo.name))}
            className="
              absolute inset-0
              w-full h-full
              object-cover object-right
              transition-transform duration-500
              group-hover:scale-105
            "
            onError={() => setImgError(true)}
            loading="lazy"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #ffffff 38%, #ffffffcc 62%, transparent 100%)",
            }}
          />

          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "linear-gradient(to right, #161616 38%, #161616cc 62%, transparent 100%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="
              font-semibold
              text-base
              leading-snug
              line-clamp-1
              group-hover:text-black
              dark:group-hover:text-white
              transition-colors
            "
          >
            {repo.name}
          </h3>

          <span
            className="
              flex-shrink-0
              mt-0.5
              px-2 py-0.5
              rounded-full
              text-[10px]
              capitalize
              border border-gray-200 dark:border-gray-700
              text-gray-500 dark:text-gray-400
              bg-white/80 dark:bg-[#161616]/80
            "
          >
            {repo.visibility}
          </span>
        </div>

        {/* Description */}
        <p
          className="
            text-sm
            text-gray-500 dark:text-gray-300
            leading-relaxed
            line-clamp-2
            h-[40px]
            max-w-[65%]
          "
        >
          {repo.description ?? "No description provided."}
        </p>

        {/* Topics */}
        <div className="h-[32px] mt-3 mb-3">
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="
                    text-[11px]
                    px-2 py-0.5
                    rounded-full
                    bg-gray-100/90
                    dark:bg-gray-700/50
                    text-gray-600
                    dark:text-gray-300
                  "
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
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: langColor ?? "#8b949e",
                  }}
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

            <span className="ml-auto">
              {timeAgo(repo.updated_at)}
            </span>
          </div>

          {/* Live Site Slot */}
          <div className="mt-3 h-[28px]">
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="
                  inline-flex items-center gap-1.5
                  px-2.5 py-1
                  rounded-full
                  text-[11px]
                  font-medium
                  text-gray-600 dark:text-gray-300
                  bg-gray-100 dark:bg-gray-800
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors
                "
              >
                <Globe className="w-3 h-3" />
                Live site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}