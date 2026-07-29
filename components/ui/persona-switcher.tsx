'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'

/**
 * Toggle between the two portfolio personas.
 * Styled to match the EN/ID LanguageSwitcher pill.
 */
export function PersonaSwitcher() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const isVideo = pathname?.startsWith('/video-editor')

  const base =
    'px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap'
  const active = 'bg-black dark:bg-white text-white dark:text-black'
  const inactive =
    'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'

  return (
    <div
      role="group"
      aria-label={t('persona.switchAriaLabel')}
      className="flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900/50"
    >
      <Link
        href="/"
        aria-current={!isVideo ? 'page' : undefined}
        className={`${base} ${!isVideo ? active : inactive}`}
      >
        {t('persona.webDeveloper')}
      </Link>
      <Link
        href="/video-editor"
        aria-current={isVideo ? 'page' : undefined}
        className={`${base} ${isVideo ? active : inactive}`}
      >
        {t('persona.videoEditor')}
      </Link>
    </div>
  )
}
