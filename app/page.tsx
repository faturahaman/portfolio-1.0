"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { ProjectsSection } from "@/components/projects-section"

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // resolvedTheme accounts for "system"
  const currentTheme = (resolvedTheme as "light" | "dark") ?? "light"

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#242424] dark:text-[#ededed] font-sans transition-colors duration-300">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">MRF.</span>
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-black dark:hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">Skills</a>
            <a href="#certifications" className="hover:text-black dark:hover:text-white transition-colors">Certifications</a>
            <a
              href="mailto:faturahaman.r@gmail.com"
              className="bg-black dark:bg-white text-white dark:text-black text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Hire me
            </a>
            {/* Theme toggler — only render after mount to avoid hydration mismatch */}
            {mounted && (
              <AnimatedThemeToggler
                variant="circle"
                duration={500}
                theme={currentTheme}
                onThemeChange={(t) => setTheme(t)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white transition-colors"
              />
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6">

        {/* ── HERO ── */}
        <section id="about" className="pt-20 pb-16 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
            Available for work
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6">
            Muhamad Riffa<br />Faturahman
          </h1>
          <p className="text-2xl text-gray-500 dark:text-gray-400 font-light mb-8 leading-relaxed">
            Website Developer
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-8 max-w-2xl">
            Results-driven Web Developer with 1+ year of experience building modern web
            applications and digital solutions using Laravel, React, Next.js, JavaScript,
            PHP, MySQL, PostgreSQL, MongoDB, NestJS, and Docker.{" "}
            <span className="text-black dark:text-white font-medium">
              Delivered 26+ projects
            </span>{" "}
            including admin dashboards, REST APIs, CRUD systems, and responsive UIs.
            Earned 10+ competency certificates and recognized for strong problem-solving
            and building scalable apps with clean, efficient code.
          </p>
          <div className="mt-8 flex items-center gap-5 text-sm">
            <a
              href="mailto:faturahaman.r@gmail.com"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              faturahaman.r@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/muhamad-riffa-faturahman-71ba5a279"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-12 border-b border-gray-200 dark:border-gray-800 grid grid-cols-3 gap-8">
          {[
            { value: "26+", label: "Projects Delivered" },
            { value: "10+", label: "Certifications Earned" },
            { value: "100%", label: "On-Time Delivery" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-16 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
            Work Experience
          </h2>

          <div className="space-y-14">

            {/* Internship 2 */}
            <article>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="text-xl font-bold">Internship — Application Support & Website Developer</h3>
                <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">Aug 2025 – Nov 2026</span>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">DISKOMINFO Bogor City</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-base leading-7">
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Developed official government website{" "}
                  <span className="font-medium text-black dark:text-white">(kominfo.kotabogor.go.id)</span>{" "}
                  using React and Laravel
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Built CMS system with 15+ features (CRUD, authentication, role management, dashboard)
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Developed and integrated 20+ REST API endpoints for admin panel
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Reduced content update time by{" "}
                  <span className="font-medium text-black dark:text-white">60–70%</span> through CMS automation
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Managed structured content data (articles, pages, media) with improved efficiency
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {["React", "Laravel", "REST API", "CMS", "PHP"].map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Internship 1 */}
            <article>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="text-xl font-bold">Internship — Application Support & Website Developer</h3>
                <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">Jan 2026 – Mar 2025</span>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">DISKOMINFO Bogor City</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-base leading-7">
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Developed a multi-tenant puskesmas system supporting 5+ tenants using{" "}
                  <span className="font-medium text-black dark:text-white">NestJS and Next.js</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Built and maintained 25+ REST API endpoints for system operations and data integration
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Optimized database performance (MongoDB → MySQL), improving query efficiency by{" "}
                  <span className="font-medium text-black dark:text-white">30–40%</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Implemented authentication & authorization (JWT/RBAC) for secure multi-user access
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Managed and processed 1000+ records of government data with high accuracy
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {["NestJS", "Next.js", "MongoDB", "MySQL", "JWT", "RBAC"].map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Freelance */}
            <article>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="text-xl font-bold">Freelance Web Developer</h3>
                <span className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">Jan 2024 – Present</span>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Self-employed</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-base leading-7">
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Developed 5+ web applications for clients using JavaScript, PHP, and MySQL
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Improved website performance to{" "}
                  <span className="font-medium text-black dark:text-white">80–95+ PageSpeed score</span> through optimization
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Built 10+ custom features including authentication systems, dashboards, and API integrations
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Maintained{" "}
                  <span className="font-medium text-black dark:text-white">100% on-time</span> project delivery rate
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  Collaborated with clients to translate requirements into scalable technical solutions
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {["JavaScript", "PHP", "MySQL", "Performance", "API Integration"].map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <ProjectsSection />

        {/* ── SKILLS ── */}
        <section id="skills" className="py-16 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { category: "Programming Languages", items: ["PHP", "JavaScript", "Python", "Go"] },
              { category: "Frontend", items: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
              { category: "Backend", items: ["Laravel", "NestJS", "REST API"] },
              { category: "Database", items: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"] },
              { category: "Tools & DevOps", items: ["Git", "Docker", "Postman"] },
            ].map((group) => (
              <div key={group.category}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
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

        {/* ── EDUCATION ── */}
        <section className="py-16 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div>
              <h3 className="text-xl font-bold">Software Engineering and Game Development</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">SMK Analis Kimia Nusa Bangsa</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm text-gray-400 dark:text-gray-500">Graduated 2026</p>
              <p className="text-sm font-semibold mt-0.5">GPA 3.73</p>
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section id="certifications" className="py-16 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
            Certifications
          </h2>
          <div className="space-y-4">
            {[
              { name: "Back-End Development with JavaScript (Node.js)", issuer: "Dicoding", year: "2025" },
              { name: "Fundamental Front-End Web Development", issuer: "Dicoding", year: "2025" },
              { name: "JavaScript Programming Basics", issuer: "Dicoding", year: "2025" },
              { name: "Web Programming Fundamentals", issuer: "Dicoding", year: "2025" },
              { name: "MongoDB for Web Development", issuer: "Codepolitan", year: "2026" },
              { name: "Git & Version Control (GitHub)", issuer: "Dicoding", year: "2025" },
              { name: "PHP Programming", issuer: "Codepolitan", year: "2025" },
            ].map((cert) => (
              <div
                key={cert.name}
                className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-black dark:group-hover:bg-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

        {/* ── CTA ── */}
        <section className="py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            Let's work together
          </p>
          <h2 className="text-4xl font-bold mb-6">Got a project in mind?</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
            I'm open to freelance work, collaborations, and full-time opportunities.
          </p>
          <a
            href="mailto:faturahaman.r@gmail.com"
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Get in touch
          </a>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500">
          <p>© 2026 Muhamad Riffa Faturahman</p>
          <div className="flex items-center gap-6">
            <a href="mailto:faturahaman.r@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">Email</a>
            <a
              href="https://linkedin.com/in/muhamad-riffa-faturahman-71ba5a279"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
