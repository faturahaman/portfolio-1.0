'use client'

import { useLanguage } from '@/lib/language-context'

/**
 * No `mounted` guard here on purpose. The language comes from a cookie that the
 * server layout reads and hands to LanguageProvider as `initialLanguage`, so
 * server and client render identical markup — there was never a hydration
 * mismatch to protect against. The guard only produced a visible flash where
 * neither EN nor ID looked selected until after hydration.
 */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900/50">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          language === 'en'
            ? 'bg-black dark:bg-white text-white dark:text-black'
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
        }`}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          language === 'id'
            ? 'bg-black dark:bg-white text-white dark:text-black'
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
        }`}
        aria-label="Switch to Indonesian"
        title="Bahasa Indonesia"
      >
        ID
      </button>
    </div>
  )
}
