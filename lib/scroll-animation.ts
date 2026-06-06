'use client'

import { useEffect } from 'react'

/**
 * Scroll Animation Hook
 * Provides fade-in/fade-out animation for scroll-fade-section elements on all browsers
 */
export function useScrollAnimations() {
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-fade-section')
    
    if (!sections.length) return

    // Check if browser supports View Transitions API
    const supportsViewTransitions = CSS.supports('animation-timeline', 'view()')
    
    // If browser supports native View Transitions, don't add listeners
    if (supportsViewTransitions) {
      return
    }

    // Fallback: Use Intersection Observer for older browsers
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
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

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])
}
