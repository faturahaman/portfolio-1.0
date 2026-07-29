import { PROCESS_STEPS } from "@/data/video-editor"
import { getT } from "@/lib/server-language"

export async function VeProcessSection() {
  const t = await getT()

  return (
    <section id="process" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="section-heading-reveal text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-10">
        {t("videoEditor.processTitle")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
        {PROCESS_STEPS.map(({ step, titleKey, descKey }, idx) => (
          <article
            key={step}
            className={`reveal-child reveal-delay-${Math.min(idx + 1, 5)} flex gap-4`}
          >
            <span className="text-2xl sm:text-3xl font-bold text-gray-300 dark:text-gray-600 leading-none flex-shrink-0">
              {step}
            </span>
            <div>
              <h3 className="text-lg font-bold mb-1.5">{t(titleKey)}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-6 sm:leading-7">
                {t(descKey)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
