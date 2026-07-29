import { cookies } from 'next/headers'
import { t as translate, type LanguageCode } from './translations'

export async function getServerLanguage(): Promise<LanguageCode> {
  const cookieStore = await cookies()
  const lang = cookieStore.get('language')?.value
  if (lang === 'id' || lang === 'en') {
    return lang
  }
  // Fallback language
  return 'en'
}

export async function getT() {
  const language = await getServerLanguage()
  return (path: string) => translate(path, language)
}
