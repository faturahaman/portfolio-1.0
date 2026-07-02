"use client"

import { lazy, Suspense } from "react"
import { useLanguage } from "@/lib/language-context"

// Lazy-load the carousel — it's below the fold and pulls in embla-carousel
const CertificationsCarousel = lazy(() =>
  import("./certifications-carousel").then((mod) => ({
    default: mod.CertificationsCarousel,
  }))
)

export function CertificationsSection() {
  const { t } = useLanguage()

  return (
    <section id="certifications" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="section-heading-reveal text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-10">
        {t("certifications.title")}
      </h2>

      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg border border-gray-200 dark:border-gray-800 p-4 space-y-3 h-28"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-4/5" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      }>
        <CertificationsCarousel />
      </Suspense>
    </section>
  )
}
