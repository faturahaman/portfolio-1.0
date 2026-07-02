'use client'

import { useEffect } from 'react'

/**
 * Scroll Animation Hook
 * Provides:
 * 1. fade-in/fade-out fallback for .scroll-fade-section (older browsers)
 * 2. Staggered reveal for .reveal-child elements
 * 3. Slide-in reveal for .section-heading-reveal elements
 */
export function useScrollAnimations() {
  useEffect(() => {
    // ── 1. scroll-fade-section fallback (non-Chrome browsers) ──────────────
    const sections = document.querySelectorAll<Element>('.scroll-fade-section')

    const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()')

    let sectionObserver: IntersectionObserver | null = null

    if (!supportsScrollTimeline && sections.length) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }

      sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('scroll-fade-out')
            entry.target.classList.add('scroll-fade-in')
          } else {
            entry.target.classList.remove('scroll-fade-in')
            entry.target.classList.add('scroll-fade-out')
          }
        })
      }, observerOptions)

      sections.forEach((section) => sectionObserver!.observe(section))
    }

    // ── 2. Staggered reveal children (.reveal-child) ───────────────────────
    const revealChildren = document.querySelectorAll<Element>('.reveal-child')
    let childObserver: IntersectionObserver | null = null

    if (revealChildren.length) {
      childObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              // Once visible, stop observing (one-shot reveal)
              childObserver?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
      )

      revealChildren.forEach((el) => childObserver!.observe(el))
    }

    // ── 3. Section heading slide-in (.section-heading-reveal) ─────────────
    const headings = document.querySelectorAll<Element>('.section-heading-reveal')
    let headingObserver: IntersectionObserver | null = null

    if (headings.length) {
      headingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              headingObserver?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
      )

      headings.forEach((el) => headingObserver!.observe(el))
    }

    return () => {
      sectionObserver?.disconnect()
      childObserver?.disconnect()
      headingObserver?.disconnect()
    }
  }, [])
}
