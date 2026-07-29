"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function BioParagraph() {
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
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          {expanded ? (
            <>
              {t("hero.hide")} <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              {t("hero.readMore")} <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
