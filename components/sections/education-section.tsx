import { GraduationCap } from "lucide-react"
import { EDUCATION } from "@/data/resume"
import { getT } from "@/lib/server-language"

export async function EducationSection() {
  const t = await getT()

  return (
    <section id="education" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="section-heading-reveal text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-10">
        {t("education.title")}
      </h2>

      <div className="flex flex-col gap-6">
        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className="reveal-child flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold leading-snug">{edu.degree}</h3>
                {edu.type && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                    {edu.type}
                  </span>
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm sm:text-base">{edu.school}</p>
            </div>
            <div className="sm:text-right flex-shrink-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
