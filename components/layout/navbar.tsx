"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { PROFILE } from "@/data/resume"

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
]

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const currentTheme = (resolvedTheme as "light" | "dark") ?? "light"

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">MRF.</span>

        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}

          <a
            href={`mailto:${PROFILE.email}`}
            className="bg-black dark:bg-white text-white dark:text-black text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Hire me
          </a>

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
  )
}
