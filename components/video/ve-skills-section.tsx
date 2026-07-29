import { VIDEO_SKILLS } from "@/data/video-editor"
import { getT } from "@/lib/server-language"

export async function VeSkillsSection() {
  const t = await getT()

  return (
    <section id="skills" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="section-heading-reveal text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-10">
        {t("videoEditor.skillsTitle")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {VIDEO_SKILLS.map(({ category, titleKey, items }, idx) => (
          <div key={category} className={`reveal-child reveal-delay-${Math.min(idx + 1, 5)}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
              {t(titleKey)}
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
