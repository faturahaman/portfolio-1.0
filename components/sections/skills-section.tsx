import { SKILLS } from "@/data/resume"

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
        Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {SKILLS.map(({ category, items }) => (
          <div key={category}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
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
