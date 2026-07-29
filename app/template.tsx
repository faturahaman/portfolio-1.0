'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollAnimator } from '@/components/scroll-animator'

/**
 * Root template — unlike `layout.tsx`, this REMOUNTS on every route change
 * (e.g. the web-developer ↔ video-editor persona switch).
 *
 * Why this exists:
 *  1. `ScrollAnimator` re-runs here on each navigation, so the incoming page's
 *     `.reveal-child` / `.section-heading-reveal` observers get re-attached.
 *     (In a layout they'd only ever run once, leaving switched-to content stuck
 *     at opacity 0 until a manual refresh.)
 *  2. The fresh DOM subtree lets the CSS `animation-timeline: view()` sections
 *     ('.scroll-fade-section') bind correctly, just like a hard load — fixing
 *     the blank-until-refresh page after a persona switch.
 *  3. The wrapper plays a subtle enter animation on navigation.
 */

// Module scope survives template remounts, so we can tell a real client-side
// navigation apart from the very first load and only animate the former
// (keeps the initial paint / LCP untouched).
let prevPath: string | null = null

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isNavigation = prevPath !== null && prevPath !== pathname

  useEffect(() => {
    prevPath = pathname

    // Freshly-mounted scroll/view-timeline elements aren't always sampled by
    // the browser immediately after a soft navigation. Forcing one layout read
    // on the next frame nudges them to compute their real progress instead of
    // resting on the hidden 0% keyframe.
    const raf = requestAnimationFrame(() => {
      document.documentElement.getBoundingClientRect()
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return (
    <>
      <ScrollAnimator />
      <div className={isNavigation ? 'page-transition' : undefined}>
        {children}
      </div>
    </>
  )
}
