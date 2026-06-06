'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { t as translate, LanguageCode } from '@/lib/translations'

type Language = LanguageCode

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => string
}

// Default context value untuk SSR
const defaultContextValue: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (path: string) => translate(path, 'en'),
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage on client side
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null
    if (saved && (saved === 'en' || saved === 'id')) {
      setLanguageState(saved)
    } else {
      // Auto-detect from browser language
      const browserLang = navigator.language.startsWith('id') ? 'id' : 'en'
      setLanguageState(browserLang)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
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
