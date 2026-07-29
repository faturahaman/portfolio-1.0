'use client'

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { VIDEO_ITEMS, VIDEO_CATEGORIES, type VideoCategory } from "@/data/video-editor"
import { VideoEmbed } from "./video-embed"

type Filter = VideoCategory | "all"

export function VeReelSection() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Filter>("all")

  const items =
    filter === "all" ? VIDEO_ITEMS : VIDEO_ITEMS.filter((v) => v.category === filter)

  const catLabel = (cat: VideoCategory) =>
    t(VIDEO_CATEGORIES.find((c) => c.key === cat)?.labelKey ?? "")

  const tabBase =
    "text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors"
  const tabActive = "bg-black dark:bg-white text-white dark:text-black border-transparent"
  const tabIdle =
    "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"

  return (
    <section id="reel" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <p className="section-heading-reveal text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
        {t("videoEditor.reelSubtitle")}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t("videoEditor.reelHeading")}</h2>
      <p className="text-base text-gray-500 dark:text-gray-300 mb-8 max-w-xl">
        {t("videoEditor.reelDescription")}
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`${tabBase} ${filter === "all" ? tabActive : tabIdle}`}
        >
          {t("videoEditor.reelFilterAll")}
        </button>
        {VIDEO_CATEGORIES.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`${tabBase} ${filter === key ? tabActive : tabIdle}`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {items.map((item) => (
          <article key={item.id} className="flex flex-col gap-3">
            <VideoEmbed item={item} comingSoonLabel={t("videoEditor.reelComingSoon")} />
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-base font-bold leading-snug">{item.title}</h3>
                <span className="flex-shrink-0 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {catLabel(item.category)}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.software.map((sw) => (
                  <span
                    key={sw}
                    className="text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
