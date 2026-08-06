'use client'

/**
 * Reference-counted body scroll lock.
 *
 * The navbar drawer and the repo modal both used to write
 * `document.body.style.overflow` directly, so whichever unmounted first
 * restored scrolling for both — leaving the other one open over a scrollable
 * page. Counting the locks means the last one out is the one that unlocks.
 */

let lockCount = 0
let previousOverflow = ''

/** Locks body scroll. Returns a release function that is safe to call twice. */
export function lockBodyScroll(): () => void {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  lockCount++

  let released = false
  return () => {
    if (released) return
    released = true
    lockCount--
    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow
    }
  }
}
