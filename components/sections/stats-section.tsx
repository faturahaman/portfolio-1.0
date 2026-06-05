import { STATS } from "@/data/resume"

export function StatsSection() {
  return (
    <section className="py-12 border-b border-gray-200 dark:border-gray-800 grid grid-cols-3 gap-8">
      {STATS.map(({ value, label }) => (
        <div key={label}>
          <p className="text-4xl font-bold tracking-tight">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
        </div>
      ))}
    </section>
  )
}
