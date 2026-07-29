import { lazy, Suspense } from "react"
import { getT } from "@/lib/server-language"

// Lazy-load the carousel — it's below the fold and pulls in embla-carousel
const CertificationsCarousel = lazy(() =>
  import("./certifications-carousel").then((mod) => ({
    default: mod.CertificationsCarousel,
  }))
)

export async function CertificationsSection() {
  const t = await getT()

  return (
    <section id="certifications" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="section-heading-reveal text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-10">
        {t("certifications.title")}
      </h2>

      <Suspense fallback={
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex-shrink-0 basis-[85%] sm:basis-[42%] lg:basis-[30%]
                rounded-xl border border-gray-100 dark:border-gray-800 px-5 py-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
                <div className="h-3 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-4/5" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/5" />
              <div className="h-[2px] bg-gray-100 dark:bg-gray-800 rounded-full mt-2" />
            </div>
          ))}
        </div>
      }>
        <CertificationsCarousel />
      </Suspense>
    </section>
  )
}
