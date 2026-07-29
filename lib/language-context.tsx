'use client'

import React, { createContext, useContext, useState } from 'react'
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
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const setLanguage = async (lang: Language) => {
    // Optimistic UI update
    setLanguageState(lang)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
    
    // Set cookie on server
    await setLanguageCookie(lang)
    
    // Refresh Server Components without losing client state
    startTransition(() => {
      router.refresh()
    })
  }

  const tFunc = (path: string): string => {
    return translate(path, language)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tFunc }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
