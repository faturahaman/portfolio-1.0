import { PROFILE } from "@/data/resume"

export function CtaSection() {
  return (
    <section className="py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
        Let&apos;s work together
      </p>
      <h2 className="text-4xl font-bold mb-6">Got a project in mind?</h2>
      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
        I&apos;m open to freelance work, collaborations, and full-time opportunities.
      </p>
      <a
        href={`mailto:${PROFILE.email}`}
        className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        Get in touch
      </a>
    </section>
  )
}
