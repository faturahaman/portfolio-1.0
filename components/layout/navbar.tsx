"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const currentTheme = (resolvedTheme as "light" | "dark") ?? "light"

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">Riffatur.io</span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
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

          {/* Mobile right side: theme toggler + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <AnimatedThemeToggler
                variant="circle"
                duration={500}
                theme={currentTheme}
                onThemeChange={(t) => setTheme(t)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white transition-colors"
              />
            )}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" />
        </div>
      )}
      <div
        className={`fixed top-14 left-0 right-0 z-40 md:hidden bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-3 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {label}
            </a>
          ))}
          <div className="pt-2 pb-1">
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={closeMenu}
              className="block w-full text-center bg-black dark:bg-white text-white dark:text-black text-sm font-medium px-4 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Hire me
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
