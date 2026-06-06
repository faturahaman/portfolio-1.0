'use client'

import { useScrollAnimations } from '@/lib/scroll-animation'

/**
 * Scroll Animator Component
 * Initializes scroll-based animations for all scroll-fade-section elements
 */
export function ScrollAnimator() {
  useScrollAnimations()
  return null
}
