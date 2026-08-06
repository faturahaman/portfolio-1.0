import Image from "next/image"
import { Mail } from "lucide-react"
import { PROFILE } from "@/data/resume"
import { getCombinedAltText, altTexts } from "@/lib/alt-text"
import { getT } from "@/lib/server-language"

const AVATAR = "/avatar.webp"

export async function VeHero() {
  const t = await getT()

  return (
    <section
      id="about"
      className="relative pt-16 sm:pt-20 pb-16 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      {/* CSS-only floating particles — reused from the dev hero */}
      <span aria-hidden="true" className="hero-particle text-gray-300 dark:text-gray-700" style={{ width: 6, height: 6, left: '8%', bottom: '30%', animationDuration: '6s', animationDelay: '0s' }} />
      <span aria-hidden="true" className="hero-particle text-gray-300 dark:text-gray-700" style={{ width: 4, height: 4, left: '20%', bottom: '20%', animationDuration: '8s', animationDelay: '1.5s' }} />
      <span aria-hidden="true" className="hero-particle text-gray-400 dark:text-gray-600" style={{ width: 5, height: 5, left: '75%', bottom: '25%', animationDuration: '7s', animationDelay: '0.8s' }} />
      <span aria-hidden="true" className="hero-particle text-gray-300 dark:text-gray-700" style={{ width: 3, height: 3, left: '88%', bottom: '40%', animationDuration: '9s', animationDelay: '2.2s' }} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-10">
        {/* Single avatar, repositioned with `order` — see hero-section.tsx for
            why this isn't two hidden/sm:hidden <Image> elements. */}
        <div className="flex justify-center sm:order-2 sm:justify-end sm:flex-shrink-0">
          <div className="relative w-28 h-28 sm:w-56 sm:h-56">
            <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800" />
            <Image
              src={AVATAR}
              alt={getCombinedAltText(altTexts.profilePicture)}
              fill
              sizes="(max-width: 640px) 7rem, 14rem"
              className="object-cover rounded-full"
              priority
              quality={80}
              fetchPriority="high"
            />
          </div>
        </div>

        {/* ── Left: text content ── */}
        <div className="flex-1 min-w-0 text-center sm:text-left sm:order-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">
            {t("videoEditor.heroAvailable")}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4 sm:mb-6 whitespace-pre-line">
            {t("videoEditor.heroTitle")}
          </h1>

          <p className="text-lg sm:text-2xl text-gray-500 dark:text-gray-300 font-light mb-5 sm:mb-6 leading-relaxed">
            {t("videoEditor.heroRole")}
          </p>

          <p className="max-w-xl mx-auto sm:mx-0 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-7 sm:leading-8">
            {t("videoEditor.heroTagline")}
          </p>

          {/* CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-sm">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <Mail className="w-4 h-4" />
              {t("videoEditor.heroGetInTouch")}
            </a>

            <a
              href="#reel"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex-shrink-0"
            >
              {t("videoEditor.heroViewReel")} →
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
