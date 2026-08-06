/**
 * Bilingual Alt Text for Images
 * Provides descriptive alt text in both English and Indonesian
 */

export const altTexts = {
  // One entry, not a mobile/desktop pair: the hero renders a single <Image>
  // that's repositioned with CSS, and the same picture should describe itself
  // the same way at every breakpoint.
  profilePicture: {
    en: "Muhamad Riffa Faturahman - Professional Web Developer Portrait",
    id: "Muhamad Riffa Faturahman - Potret Profesional Web Developer",
  },
  repositoryPreview: (repoName: string) => ({
    en: `${repoName} - GitHub Repository Project Preview`,
    id: `${repoName} - Pratinjau Proyek Repository GitHub`,
  }),
  repositoryBackground: (repoName: string) => ({
    en: `${repoName} - GitHub Repository Project Background`,
    id: `${repoName} - Latar Belakang Proyek Repository GitHub`,
  }),
}

/**
 * Get bilingual alt text with fallback to English
 */
export function getBilingualAltText(
  textObj: { en: string; id: string },
  locale: string = "en"
): string {
  return textObj[locale as keyof typeof textObj] || textObj.en
}

/**
 * Get combined bilingual alt text (English | Indonesian)
 */
export function getCombinedAltText(textObj: { en: string; id: string }): string {
  return `${textObj.en} | ${textObj.id}`
}
