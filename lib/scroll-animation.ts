'use client'

import { useEffect } from 'react'

/**
 * Scroll Animation Hook
 *
 * Reveals `.scroll-fade-section`, `.reveal-child`, and `.section-heading-reveal`
 * elements once when they scroll into view (adds `.is-visible`, then stops
 * observing — one-shot, stays visible).
 *
 * Why a MutationObserver instead of a plain one-time scan:
 * ScrollAnimator lives in the root layout and its effect only runs once. On
 * client-side navigation (e.g. the persona switcher going / → /video-editor)
 * the new page's DOM is swapped in WITHOUT re-running this effect, and several
 * sections are `dynamic()`-imported so they mount a tick later still. A single
 * initial scan would miss all of them, leaving the new page stuck at
 * `opacity: 0` (blank until a hard refresh). The MutationObserver catches every
 * matching node added to the DOM afterwards — new routes and lazy chunks alike.
 */
const REVEAL_SELECTOR =
  '.scroll-fade-section, .reveal-child, .section-heading-reveal'

export function useScrollAnimations() {
  useEffect(() => {
    // Safety net: without IntersectionObserver, reveal everything immediately
    // so nothing is ever left stuck in its hidden start state.
    if (typeof IntersectionObserver === 'undefined') {
      document
        .querySelectorAll<Element>(REVEAL_SELECTOR)
        .forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target) // one-shot
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    // Observe every not-yet-revealed match currently in the DOM.
    const observeAll = () => {
      document.querySelectorAll<Element>(REVEAL_SELECTOR).forEach((el) => {
        if (!el.classList.contains('is-visible')) io.observe(el)
      })
    }

    observeAll()

    // Re-scan when new nodes are added (route changes, lazy-loaded sections).
    // Debounced with rAF so a burst of mutations triggers a single scan.
    let scheduled = false
    let rafId = 0
    const mo =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(() => {
            if (scheduled) return
            scheduled = true
            rafId = requestAnimationFrame(() => {
              scheduled = false
              observeAll()
            })
          })
        : null

    mo?.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo?.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
}
