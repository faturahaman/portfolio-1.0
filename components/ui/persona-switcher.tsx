'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Clapperboard } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

/**
 * Toggle between the two portfolio personas.
 * Icon pill (matches the LanguageSwitcher / theme toggle sizing) so it stays
 * compact next to the brand and doesn't crowd the navbar.
 *
 * `withLabels` renders text beside the icons — used inside the mobile drawer
 * where there's room and clarity matters more than compactness.
 */
export function PersonaSwitcher({ withLabels = false }: { withLabels?: boolean }) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const isVideo = pathname?.startsWith('/video-editor')

  const base =
    'flex items-center gap-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ' +
    (withLabels ? 'px-3 py-1.5' : 'px-2.5 py-1.5')
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
        title={t('persona.webDeveloper')}
        aria-label={t('persona.webDeveloper')}
        className={`${base} ${!isVideo ? active : inactive}`}
      >
        <Code className="w-4 h-4 flex-shrink-0" />
        {withLabels && <span>{t('persona.webDeveloper')}</span>}
      </Link>
      <Link
        href="/video-editor"
        aria-current={isVideo ? 'page' : undefined}
        title={t('persona.videoEditor')}
        aria-label={t('persona.videoEditor')}
        className={`${base} ${isVideo ? active : inactive}`}
      >
        <Clapperboard className="w-4 h-4 flex-shrink-0" />
        {withLabels && <span>{t('persona.videoEditor')}</span>}
      </Link>
    </div>
  )
}
