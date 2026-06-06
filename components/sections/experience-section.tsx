"use client"

import { EXPERIENCE, type ExperienceEntry } from "@/data/resume"
import { useLanguage } from "@/lib/language-context"

const EXPERIENCE_ID: ExperienceEntry[] = [
  {
    title: "Magang — Application Support & Website Developer",
    company: "DISKOMINFO Kota Bogor",
    period: "Agu 2025 – Nov 2026",
    bullets: [
      "Mengembangkan website pemerintah resmi (kominfo.kotabogor.go.id) menggunakan React dan Laravel",
      "Membangun sistem CMS dengan 15+ fitur (CRUD, authentication, role management, dashboard)",
      "Mengembangkan dan mengintegrasikan 20+ REST API endpoints untuk admin panel",
      "Mengurangi waktu update konten sebesar 60–70% melalui otomasi CMS",
      "Mengelola data konten terstruktur (artikel, halaman, media) dengan efisiensi yang lebih baik",
    ],
    highlights: { 0: "kominfo.kotabogor.go.id", 3: "60–70%" },
    tags: ["React", "Laravel", "REST API", "CMS", "PHP"],
  },
  {
    title: "Magang — Application Support & Website Developer",
    company: "DISKOMINFO Kota Bogor",
    period: "Jan 2026 – Mar 2026",
    bullets: [
      "Mengembangkan sistem puskesmas multi-tenant yang mendukung 5+ tenants menggunakan NestJS dan Next.js",
      "Membangun dan memelihara 25+ REST API endpoints untuk operasi sistem dan integrasi data",
      "Mengoptimalkan performa database (MongoDB → MySQL), meningkatkan efisiensi query sebesar 30–40%",
      "Menerapkan authentication & authorization (JWT/RBAC) untuk akses multi-user yang aman",
      "Mengelola dan memproses 1000+ records data pemerintah dengan akurasi tinggi",
    ],
    highlights: { 0: "NestJS dan Next.js", 2: "30–40%" },
    tags: ["NestJS", "Next.js", "MongoDB", "MySQL", "JWT", "RBAC"],
  },
  {
    title: "Freelance Web Developer",
    company: "Bekerja Sendiri",
    period: "Jan 2024 – Sekarang",
    bullets: [
      "Mengembangkan 5+ aplikasi web untuk klien menggunakan JavaScript, PHP, dan MySQL",
      "Meningkatkan performa website menjadi skor PageSpeed 80–95+ melalui optimasi",
      "Membangun 10+ fitur custom termasuk sistem authentication, dashboard, dan integrasi API",
      "Mempertahankan tingkat pengiriman proyek 100% tepat waktu",
      "Berkolaborasi dengan klien untuk menerjemahkan kebutuhan menjadi solusi teknis yang scalable",
    ],
    highlights: { 1: "80–95+ PageSpeed score", 3: "100% tepat waktu" },
    tags: ["JavaScript", "PHP", "MySQL", "Performance", "API Integration"],
  },
]

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  return (
    <article>
      <div className="flex flex-col gap-0.5 mb-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-lg sm:text-xl font-bold leading-snug">{entry.title}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:whitespace-nowrap flex-shrink-0">
            {entry.period}
          </span>
        </div>
      </div>

      <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-4">
        {entry.company}
      </p>

      <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-6 sm:leading-7">
        {entry.bullets.map((bullet, i) => {
          const highlight = entry.highlights[i]
          return (
            <li key={i} className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
              {highlight ? (
                <span>
                  {bullet.split(highlight).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="font-medium text-black dark:text-white">{highlight}</span>
                      )}
                    </span>
                  ))}
                </span>
              ) : (
                bullet
              )}
            </li>
          )
        })}
      </ul>

      <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

export function ExperienceSection() {
  const { language, t } = useLanguage()
  const experiences = language === 'id' ? EXPERIENCE_ID : EXPERIENCE

  return (
    <section id="experience" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-10">
        {t("experience.title")}
      </h2>
      <div className="space-y-12 sm:space-y-14">
        {experiences.map((entry, i) => (
          <ExperienceItem key={i} entry={entry} />
        ))}
      </div>
    </section>
  )
}
