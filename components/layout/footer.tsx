"use client"

import { PROFILE } from "@/data/resume"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
