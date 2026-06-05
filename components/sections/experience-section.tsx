import { EXPERIENCE, type ExperienceEntry } from "@/data/resume"

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  return (
    <article>
      <div className="flex flex-col gap-0.5 mb-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-lg sm:text-xl font-bold leading-snug">{entry.title}</h3>
          <span className="text-sm text-gray-400 dark:text-gray-500 sm:whitespace-nowrap flex-shrink-0">
            {entry.period}
          </span>
        </div>
      </div>

      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
        {entry.company}
      </p>

      <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-6 sm:leading-7">
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
            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
        Work Experience
      </h2>
      <div className="space-y-12 sm:space-y-14">
        {EXPERIENCE.map((entry, i) => (
          <ExperienceItem key={i} entry={entry} />
        ))}
      </div>
    </section>
  )
}
