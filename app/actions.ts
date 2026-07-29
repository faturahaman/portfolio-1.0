
'use server'

import { cookies } from 'next/headers'
import type { LanguageCode } from '@/lib/translations'

export async function setLanguageCookie(lang: LanguageCode) {
  const cookieStore = await cookies()
  cookieStore.set('language', lang, { 
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })
}
