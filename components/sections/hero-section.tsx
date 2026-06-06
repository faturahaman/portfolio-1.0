"use client"

import { useState } from "react"
import Image from "next/image"
import { Download, ChevronDown, ChevronUp } from "lucide-react"
import { PROFILE } from "@/data/resume"
import { getCombinedAltText, altTexts } from "@/lib/alt-text"
import { useLanguage } from "@/lib/language-context"

const GITHUB_AVATAR = `https://avatars.githubusercontent.com/${PROFILE.githubUsername}?v=4`

function BioParagraph() {
  const [expanded, setExpanded] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="max-w-xl mx-auto sm:mx-0">
      {/* Desktop: always show full bio */}
      <p className="hidden sm:block text-lg text-gray-600 dark:text-gray-300 leading-8">
        {t("hero.bioFull")}
      </p>

      {/* Mobile: collapsed by default */}
      <div className="sm:hidden">
        <p className="text-base text-gray-600 dark:text-gray-300 leading-7">
          {expanded ? t("hero.bioFull") : t("hero.bioShort")}
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        >
          {expanded ? (
            <>{t("hero.hide")} <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>{t("hero.readMore")} <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="pt-16 sm:pt-20 pb-16 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-10">

        {/* Photo — top center on mobile */}
        <div className="flex justify-center sm:hidden">
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800" />
            <Image
              src={GITHUB_AVATAR}
              alt={getCombinedAltText(altTexts.profilePictureMobile)}
              fill
              sizes="(max-width: 640px) 7rem, 100vw"
              className="object-cover rounded-full"
              priority
              quality={85}
              fetchPriority="high"
            />
          </div>
        </div>

        {/* ── Left: text content ── */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">
            {t("hero.availableForWork")}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4 sm:mb-6">
            {t("hero.title")}
          </h1>

          <p className="text-lg sm:text-2xl text-gray-500 dark:text-gray-300 font-light mb-5 sm:mb-6 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <BioParagraph />

          {/* Links + CV button */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 text-sm">
            {/* Get my CV */}
            <a
              href={PROFILE.cv}
              download
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              {t("hero.getCV")}
            </a>

            {/* Email */}
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors min-w-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{PROFILE.email}</span>
            </a>

            {/* LinkedIn */}
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── Right: profile photo (desktop only) ── */}
        <div className="hidden sm:flex flex-shrink-0 justify-end">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800" />
            <Image
              src={GITHUB_AVATAR}
              alt={getCombinedAltText(altTexts.profilePictureDesktop)}
              fill
              sizes="(max-width: 640px) 12rem, (max-width: 1024px) 14rem, 14rem"
              className="object-cover rounded-full"
              priority
              quality={75}
              fetchPriority="high"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
