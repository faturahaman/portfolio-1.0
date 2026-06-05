import Image from "next/image"
import { PROFILE } from "@/data/resume"

export function HeroSection() {
  return (
    <section
      id="about"
      className="pt-20 pb-16 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-10"
    >
      {/* ── Left: text content ── */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
          Available for work
        </p>

        <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6">
          Muhamad Riffa<br />Faturahman
        </h1>

        <p className="text-2xl text-gray-500 dark:text-gray-400 font-light mb-8 leading-relaxed">
          {PROFILE.title}
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-8 max-w-xl">
          {PROFILE.summary}{" "}
          <span className="text-black dark:text-white font-medium">Delivered 26+ projects</span>{" "}
          including admin dashboards, REST APIs, CRUD systems, and responsive UIs.
          Earned 10+ competency certificates and recognized for strong problem-solving
          and building scalable apps with clean, efficient code.
        </p>

        <div className="mt-8 flex items-center gap-5 text-sm">
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {PROFILE.email}
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* ── Right: profile photo ── */}
      <div className="flex-shrink-0 flex justify-center sm:justify-end">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          {/* Subtle circle backdrop */}
          <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800" />
          <Image
            src="/logo-no-bg.png"
            alt="Muhamad Riffa Faturahman"
            fill
            className="object-cover object-top rounded-full"
            priority
          />
        </div>
      </div>
    </section>
  )
}
