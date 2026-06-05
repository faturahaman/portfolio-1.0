import { STATS } from "@/data/resume"

export function StatsSection() {
  return (
    <section className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-3 gap-4 sm:gap-8">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center sm:text-left">
            <p className="text-2xl sm:text-4xl font-bold tracking-tight">{value}</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
