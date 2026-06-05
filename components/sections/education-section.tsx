import { EDUCATION } from "@/data/resume"

export function EducationSection() {
  return (
    <section className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
        Education
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold leading-snug">{EDUCATION.degree}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">{EDUCATION.school}</p>
        </div>
        <div className="sm:text-right flex-shrink-0">
          <p className="text-sm text-gray-400 dark:text-gray-500">Graduated {EDUCATION.year}</p>
          <p className="text-sm font-semibold mt-0.5">GPA {EDUCATION.gpa}</p>
        </div>
      </div>
    </section>
  )
}
