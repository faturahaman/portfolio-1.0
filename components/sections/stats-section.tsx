"use client"

import { STATS } from "@/data/resume"
import { useLanguage } from "@/lib/language-context"

export function StatsSection() {
  const { t } = useLanguage()

  const translatedStats = [
    { value: STATS[0].value, label: t("stats.projectsDelivered") },
    { value: STATS[1].value, label: t("stats.certificationsEarned") },
    { value: STATS[2].value, label: t("stats.onTimeDelivery") },
  ]

  return (
    <section className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-3 gap-4 sm:gap-8">
        {translatedStats.map(({ value, label }) => (
          <div key={label} className="text-center sm:text-left">
            <p className="text-2xl sm:text-4xl font-bold tracking-tight">{value}</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
