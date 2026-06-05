import { CERTIFICATIONS } from "@/data/resume"

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 border-b border-gray-200 dark:border-gray-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
        Certifications
      </h2>

      <div className="space-y-4">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.name}
            className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-black dark:group-hover:bg-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-medium">{cert.name}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{cert.issuer}</p>
              </div>
            </div>
            <span className="text-sm text-gray-400 dark:text-gray-500 flex-shrink-0">{cert.year}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
