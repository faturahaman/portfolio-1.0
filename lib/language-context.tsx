'use client'

import React, { createContext, startTransition, useCallback, useContext, useMemo, useState } from 'react'
import { t as translate, LanguageCode } from '@/lib/translations'
import { useRouter } from 'next/navigation'
import { setLanguageCookie } from '@/app/actions'

type Language = LanguageCode

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => Promise<void>
  t: (path: string) => string
}

// Default context value untuk SSR
const defaultContextValue: LanguageContextType = {
  language: 'en',
  setLanguage: async () => {},
  t: (path: string) => translate(path, 'en'),
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children, initialLanguage = 'en' }: { children: React.ReactNode, initialLanguage?: Language }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  const router = useRouter()

  const setLanguage = useCallback(async (lang: Language) => {
    // Optimistic UI update
    setLanguageState(lang)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }

    // Set cookie on server
    await setLanguageCookie(lang)

    // Refresh Server Components without losing client state. Required because
    // the section components translate on the server via getT(). Kept inside a
    // transition so the swap streams in rather than flashing a fallback.
    startTransition(() => {
      router.refresh()
    })
  }, [router])

  const t = useCallback((path: string) => translate(path, language), [language])

  // Memoised so the value identity only changes when the language actually
  // does. A fresh object on every render pushed a new `t` identity into every
  // consumer, which defeats React.memo on anything that takes `t` as a prop.
  const value = useMemo<LanguageContextType>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
