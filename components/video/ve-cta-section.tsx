import { PROFILE } from "@/data/resume"
import { getT } from "@/lib/server-language"

export async function VeCtaSection() {
  const t = await getT()

  return (
    <section className="py-16 sm:py-20 text-center px-2">
      <p className="reveal-child reveal-delay-1 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
        {t("videoEditor.ctaSubtitle")}
      </p>
      <h2 className="reveal-child reveal-delay-2 text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
        {t("videoEditor.ctaHeading")}
      </h2>
      <p className="reveal-child reveal-delay-3 text-base sm:text-lg text-gray-500 dark:text-gray-300 max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8">
        {t("videoEditor.ctaDescription")}
      </p>
      <div className="reveal-child reveal-delay-4">
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-block bg-black dark:bg-white text-white dark:text-black px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          {t("videoEditor.ctaGetInTouch")}
        </a>
      </div>
    </section>
  )
}
