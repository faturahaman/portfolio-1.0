"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { PersonaSwitcher } from "@/components/ui/persona-switcher"
import { useLanguage } from "@/lib/language-context"
import { PROFILE } from "@/data/resume"

const DEV_NAV_LINKS = [
  { href: "#about", labelKey: "nav.about" },
  { href: "#experience", labelKey: "nav.experience" },
  { href: "#projects", labelKey: "nav.projects" },
  { href: "#skills", labelKey: "nav.skills" },
  { href: "#certifications", labelKey: "nav.certifications" },
]

const VIDEO_NAV_LINKS = [
  { href: "#reel", labelKey: "videoEditor.navReel" },
  { href: "#skills", labelKey: "videoEditor.navSkills" },
  { href: "#process", labelKey: "videoEditor.navProcess" },
]

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isVideo = pathname?.startsWith("/video-editor")
  const NAV_LINKS = isVideo ? VIDEO_NAV_LINKS : DEV_NAV_LINKS
  const homeHref = isVideo ? "/video-editor" : "/"

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
      <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* ── Left: brand + persona switcher ── */}
          <div className="flex items-center gap-3">
            <Link href={homeHref} className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              Riffatur.io
            </Link>
            {/* Persona switcher sits by the brand as an identity control,
                keeping the right-hand nav group from getting crowded. */}
            <div className="hidden sm:block">
              <PersonaSwitcher />
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <a
                key={href}
                href={href}
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {t(labelKey)}
              </a>
            ))}

            <a
              href={`mailto:${PROFILE.email}`}
              className="bg-black dark:bg-white text-white dark:text-black text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {t("nav.hireMe")}
            </a>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
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

          {/* Mobile right side: language + theme toggler + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <>
                <LanguageSwitcher />
                <AnimatedThemeToggler
                  variant="circle"
                  duration={500}
                  theme={currentTheme}
                  onThemeChange={(t) => setTheme(t)}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white transition-colors"
                />
              </>
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
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" onClick={closeMenu} aria-hidden="true" />
        </div>
      )}
      <div
        className={`fixed top-14 left-0 right-0 z-40 md:hidden bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          <div className="pb-3 mb-1 border-b border-gray-100 dark:border-gray-800" onClick={closeMenu}>
            <PersonaSwitcher withLabels />
          </div>
          {NAV_LINKS.map(({ href, labelKey }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-3 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {t(labelKey)}
            </a>
          ))}
          <div className="pt-2 pb-1">
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={closeMenu}
              className="block w-full text-center bg-black dark:bg-white text-white dark:text-black text-sm font-medium px-4 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {t("nav.hireMe")}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
