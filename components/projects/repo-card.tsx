"use client"

import { useEffect, useState } from "react"
import { Star, GitFork, Globe, ExternalLink } from "lucide-react"
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
    if (!isReadmeFetched) fetchReadme(repo)
  }, [repo, isReadmeFetched, fetchReadme])

  useEffect(() => { setImgError(false) }, [coverImage])

  const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#8b949e" : null
  const showCover = Boolean(coverImage && !imgError)
  const accentColor = langColor ?? "#6b7280"

  return (
    <div
      className="group relative flex flex-row items-stretch w-full
        rounded-xl overflow-hidden cursor-pointer
        border border-gray-100 dark:border-gray-800/70
        bg-white dark:bg-[#161616]
        hover:border-gray-300 dark:hover:border-gray-700
        hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]
        dark:hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]
        transition-all duration-300"
      style={{ minHeight: "9.5rem" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}
    >
      {/* ── Left accent bar (language color) ── */}
      <div
        className="w-[3px] flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}
      />

      {/* ── Main content ── */}
      <div className="flex flex-col justify-between flex-1 min-w-0 px-4 py-4">

        {/* Top section */}
        <div className="space-y-1.5">
          {/* Name + visibility badge */}
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-semibold text-[15px] leading-snug
              text-gray-900 dark:text-gray-100
              group-hover:text-black dark:group-hover:text-white
              transition-colors truncate">
              {repo.name}
            </h3>
            <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full capitalize
              border border-gray-200 dark:border-gray-700/80
              text-gray-400 dark:text-gray-500
              bg-gray-50 dark:bg-gray-800/50">
              {repo.visibility}
            </span>
          </div>

          {/* Description */}
          <p className="text-[13px] text-gray-400 dark:text-gray-500
            leading-relaxed line-clamp-2 pr-2">
            {repo.description ?? "No description provided."}
          </p>
        </div>

        {/* Bottom meta row */}
        <div className="flex flex-wrap items-center gap-2.5 mt-3 text-[12px] text-gray-400 dark:text-gray-500">
          {/* Language */}
          {repo.language && (
            <span className="flex items-center gap-1.5 flex-shrink-0">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: langColor ?? "#8b949e" }}
              />
              <span className="font-medium text-gray-500 dark:text-gray-400">{repo.language}</span>
            </span>
          )}

          {/* Stars */}
          <span className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>

          {/* Forks */}
          <span className="flex items-center gap-1 flex-shrink-0">
            <GitFork className="w-3 h-3" />
            {repo.forks_count}
          </span>

          {/* Topic tags */}
          {repo.topics.slice(0, 2).map((topic) => (
            <span
              key={topic}
              className="hidden sm:inline-flex px-2 py-0.5 rounded-full
                text-[11px] font-medium
                bg-gray-100 dark:bg-gray-800/80
                text-gray-500 dark:text-gray-400
                border border-gray-200/60 dark:border-gray-700/50"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 2 && (
            <span className="hidden sm:inline text-[11px] text-gray-400 dark:text-gray-600">
              +{repo.topics.length - 2}
            </span>
          )}

          {/* Timestamp */}
          <span className="ml-auto flex-shrink-0">{timeAgo(repo.updated_at)}</span>
        </div>
      </div>

      {/* ── Right: cover image or homepage link ── */}
      {showCover ? (
        <div className="w-[140px] flex-shrink-0 relative overflow-hidden
          border-l border-gray-100 dark:border-gray-800/70
          bg-gray-50 dark:bg-gray-900/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage!}
            alt={getCombinedAltText(altTexts.repositoryBackground(repo.name))}
            className="absolute inset-0 w-full h-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
          {/* Subtle inner vignette */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 dark:to-black/20 pointer-events-none" />
        </div>
      ) : repo.homepage ? (
        <div className="w-[72px] flex-shrink-0 flex items-center justify-center
          border-l border-gray-100 dark:border-gray-800/70">
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-1.5
              text-[11px] font-medium
              text-gray-300 dark:text-gray-600
              hover:text-gray-700 dark:hover:text-gray-300
              transition-colors"
            aria-label={`Visit live site for ${repo.name}`}
          >
            <Globe className="w-4 h-4" />
            <span>Live</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>
      ) : null}
    </div>
  )
}
