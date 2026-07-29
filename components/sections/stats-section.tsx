import { STATS } from "@/data/resume"
import { getT } from "@/lib/server-language"

export async function StatsSection() {
  const t = await getT()

  const translatedStats = [
    { value: STATS[0].value, label: t("stats.projectsDelivered") },
    { value: STATS[1].value, label: t("stats.certificationsEarned") },
    { value: STATS[2].value, label: t("stats.onTimeDelivery") },
  ]

  return (
    <section className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-3 gap-4 sm:gap-8">
        {translatedStats.map(({ value, label }, idx) => (
          <div key={label} className={`reveal-child reveal-delay-${idx + 1} text-center sm:text-left`}>
            <p className="text-2xl sm:text-4xl font-bold tracking-tight">{value}</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
