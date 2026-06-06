'use client'

import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CERTIFICATIONS } from '@/data/resume'

// Ekstract SVG icon sebagai component terpisah untuk avoid re-render
function CertBadgeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black transition-colors"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

const MASK_GRADIENT = 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'

export function CertificationsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })

  const [isMobile, setIsMobile] = useState(true)

  const checkScreen = useCallback(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  useEffect(() => {
    checkScreen()
    const resizeObserver = new ResizeObserver(checkScreen)
    resizeObserver.observe(document.documentElement)
    
    return () => {
      resizeObserver.disconnect()
    }
  }, [checkScreen])

  // Memoize mask style untuk avoid recalculation
  const maskStyle = useMemo(() => ({
    maskImage: MASK_GRADIENT,
    WebkitMaskImage: MASK_GRADIENT,
  }), [])

  return (
    <div className="space-y-4">
      <div 
        className="overflow-hidden relative"
        style={maskStyle}
        ref={emblaRef}
      >
        <div className="flex gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="flex-shrink-0 min-w-0 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="flex flex-col h-full py-4 px-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group cursor-grab active:cursor-grabbing">
                {/* Badge Icon */}
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mb-3 group-hover:bg-black dark:group-hover:bg-white transition-colors">
                  <CertBadgeIcon />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium leading-snug line-clamp-2">
                    {cert.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {cert.issuer}
                  </p>
                </div>

                {/* Year */}
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
