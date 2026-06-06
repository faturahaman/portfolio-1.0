/**
 * Complete translations for the portfolio website
 * English and Indonesian (Bahasa Indonesia)
 */

export const translations = {
  nav: {
    about: { en: 'About', id: 'Tentang' },
    experience: { en: 'Experience', id: 'Pengalaman' },
    projects: { en: 'Projects', id: 'Proyek' },
    skills: { en: 'Skills', id: 'Skill' },
    certifications: { en: 'Certifications', id: 'Sertifikat' },
    hireMe: { en: 'Hire me', id: 'Hubungi Saya' },
  },
  hero: {
    availableForWork: { en: 'Available for work', id: 'Siap untuk berkolaborasi' },
    title: { en: 'Muhamad Riffa\nFaturahman', id: 'Muhamad Riffa\nFaturahman' },
    subtitle: { en: 'Website Developer', id: 'Web Developer' },
    bioShort: {
      en: 'Results-driven Web Developer with 1+ year of experience building modern web applications.',
      id: 'Web Developer yang passionate membangun aplikasi web modern dengan pengalaman 1+ tahun.',
    },
    bioFull: {
      en: 'Results-driven Web Developer with 1+ year of experience building modern web applications. Delivered 26+ projects including admin dashboards, REST APIs, CRUD systems, and responsive UIs. Earned 10+ competency certificates and recognized for strong problem-solving and building scalable apps with clean, efficient code.',
      id: 'Web Developer yang passionate membangun aplikasi web modern dengan pengalaman 1+ tahun. Sudah mengerjakan 26+ proyek mulai dari dashboard admin, REST API, sistem CRUD, hingga UI yang responsif. Punya 10+ sertifikat kompetensi dan dikenal dengan problem-solving yang kuat serta kemampuan membangun aplikasi yang scalable dengan kode yang clean dan efisien.',
    },
    readMore: { en: 'Read more', id: 'Baca lebih lanjut' },
    hide: { en: 'Hide', id: 'Sembunyikan' },
    getCV: { en: 'Get my CV', id: 'Download CV' },
  },
  stats: {
    projectsDelivered: { en: 'Projects Delivered', id: 'Proyek Selesai' },
    certificationsEarned: { en: 'Certifications Earned', id: 'Sertifikat Diraih' },
    onTimeDelivery: { en: 'On-Time Delivery', id: 'Tepat Waktu' },
  },
  experience: {
    title: { en: 'Experience', id: 'Pengalaman Kerja' },
    internship: { en: 'Internship', id: 'Magang' },
    freelance: { en: 'Freelance', id: 'Freelance' },
  },
  projects: {
    title: { en: 'Projects', id: 'Proyek' },
    visibility: { en: 'Visibility', id: 'Tipe' },
    noDescription: { en: 'No description provided.', id: 'Belum ada deskripsi' },
    liveSite: { en: 'Live site', id: 'Lihat Demo' },
    updated: { en: 'Updated', id: 'Update' },
    language: { en: 'Language', id: 'Bahasa' },
  },
  skills: {
    title: { en: 'Skills', id: 'Skill' },
    programmingLanguages: { en: 'Programming Languages', id: 'Bahasa Pemrograman' },
    frontend: { en: 'Frontend', id: 'Frontend' },
    backend: { en: 'Backend', id: 'Backend' },
    database: { en: 'Database', id: 'Database' },
    toolsDevOps: { en: 'Tools & DevOps', id: 'Tools & DevOps' },
  },
  education: {
    title: { en: 'Education', id: 'Pendidikan' },
    degree: { en: 'Degree', id: 'Program Studi' },
    school: { en: 'School', id: 'Institusi' },
    gpa: { en: 'GPA', id: 'GPA' },
  },
  certifications: {
    title: { en: 'Certifications', id: 'Sertifikat' },
  },
  cta: {
    subtitle: { en: "Let's work together", id: 'Mari berkolaborasi' },
    heading: { en: "Got a project in mind?", id: 'Ada proyek yang menarik?' },
    description: {
      en: "I'm always interested in hearing about new projects and opportunities. Let's connect!",
      id: 'Saya selalu tertarik mendengar tentang proyek dan peluang baru. Mari kita terhubung!',
    },
    getInTouch: { en: 'Get in touch', id: 'Hubungi Saya' },
  },
  footer: {
    copyright: { en: '© 2024 Muhamad Riffa Faturahman. All rights reserved.', id: '© 2024 Muhamad Riffa Faturahman. Semua hak dilindungi.' },
  },
} as const

export type TranslationKey = keyof typeof translations
export type LanguageCode = 'en' | 'id'

/**
 * Get translated text
 */
export function t(path: string, language: LanguageCode = 'en'): string {
  const keys = path.split('.')
  let value: any = translations

  for (const key of keys) {
    value = value?.[key]
  }

  if (typeof value === 'object' && 'en' in value && 'id' in value) {
    return value[language] || value.en || ''
  }

  return typeof value === 'string' ? value : ''
}
