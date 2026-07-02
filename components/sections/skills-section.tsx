"use client"

import { SKILLS } from "@/data/resume"
import { useLanguage } from "@/lib/language-context"

export function SkillsSection() {
  const { t } = useLanguage()

  const skillCategories: Record<string, string> = {
    "Programming Languages": t("skills.programmingLanguages"),
    "Frontend": t("skills.frontend"),
    "Backend": t("skills.backend"),
    "Database": t("skills.database"),
    "Tools & DevOps": t("skills.toolsDevOps"),
  }

  return (
    <section id="skills" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="section-heading-reveal text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-10">
        {t("skills.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {SKILLS.map(({ category, items }, idx) => (
          <div key={category} className={`reveal-child reveal-delay-${Math.min(idx + 1, 5)}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
              {skillCategories[category] || category}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="skill-badge text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
