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
    // Safety net: if IntersectionObserver is missing, reveal everything now
    // so no animated element is ever left stuck in its hidden start state.
    if (typeof IntersectionObserver === 'undefined') {
      document
        .querySelectorAll<Element>(
          '.scroll-fade-section, .reveal-child, .section-heading-reveal'
        )
        .forEach((el) => el.classList.add('is-visible'))
      return
    }

    // ── 1. Section reveal (.scroll-fade-section) ───────────────────────────
    // One-shot: reveal when the section enters the viewport, then keep it
    // visible. Runs in every browser (the previous CSS view-timeline approach
    // faded sections back out at the viewport edges, which left the lower
    // sections of short pages stuck transparent).
    const sections = document.querySelectorAll<Element>('.scroll-fade-section')
    let sectionObserver: IntersectionObserver | null = null

    if (sections.length) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              sectionObserver?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
      )

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
