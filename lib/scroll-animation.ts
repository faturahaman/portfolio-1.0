'use client'

import { useEffect } from 'react'

/**
 * Scroll Animation Hook
 * Provides:
 * 1. One-shot reveal for .scroll-fade-section (fade + rise on enter)
 * 2. Staggered reveal for .reveal-child elements
 * 3. Slide-in reveal for .section-heading-reveal elements
 *
 * Runs from the root `template.tsx`, so it re-initializes on every navigation
 * (e.g. the persona switch). A MutationObserver additionally picks up sections
 * that mount later via `dynamic()` — their chunks resolve after this effect
 * runs on a soft navigation, so a one-time query would miss them and leave
 * them stuck hidden.
 */
export function useScrollAnimations() {
  useEffect(() => {
    // Respect reduced-motion: CSS already forces everything visible, so there's
    // nothing for the observers to do.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

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
    // sections of short pages stuck transparent). Created unconditionally —
    // and driven through the shared `wireUp` pass below — so sections that
    // mount later via dynamic() are still observed.
    let sectionObserver: IntersectionObserver | null = null
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

    // ── 2. Staggered reveal children (.reveal-child) ───────────────────────
    const childObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            childObserver.unobserve(entry.target) // one-shot reveal
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    // ── 3. Section heading slide-in (.section-heading-reveal) ─────────────
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            headingObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )

    // Track what we've already wired up so re-scans (MutationObserver) don't
    // double-observe the same node.
    const seen = new WeakSet<Element>()

    const wireUp = (el: Element) => {
      if (seen.has(el)) return
      seen.add(el)
      if (el.classList.contains('scroll-fade-section')) sectionObserver?.observe(el)
      if (el.classList.contains('reveal-child')) childObserver.observe(el)
      if (el.classList.contains('section-heading-reveal')) headingObserver.observe(el)
    }

    // Wire up the element itself (if it carries an animated class) plus any
    // animated descendants — querySelectorAll only matches descendants.
    const observeTree = (root: Element) => {
      wireUp(root)
      root
        .querySelectorAll<Element>(
          '.scroll-fade-section, .reveal-child, .section-heading-reveal'
        )
        .forEach(wireUp)
    }

    // Initial pass over whatever is already in the DOM.
    document
      .querySelectorAll<Element>(
        '.scroll-fade-section, .reveal-child, .section-heading-reveal'
      )
      .forEach(wireUp)

    // ── Catch sections that mount later via dynamic() ──────────────────────
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          observeTree(node as Element)
        })
      }
    })

    const main = document.getElementById('main-content') ?? document.body
    mutationObserver.observe(main, { childList: true, subtree: true })

    return () => {
      sectionObserver?.disconnect()
      childObserver.disconnect()
      headingObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
