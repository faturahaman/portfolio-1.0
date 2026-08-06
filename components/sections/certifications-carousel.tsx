'use client'

import { useMemo, useCallback, useSyncExternalStore } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CERTIFICATIONS } from '@/data/resume'
import { BadgeCheck } from 'lucide-react'

const CARD_STYLE = {
  bg: 'bg-gray-50 dark:bg-gray-800/40',
  text: 'text-gray-500 dark:text-gray-400',
  border: 'border-gray-200 dark:border-gray-800',
}

const MASK_GRADIENT =
  'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'

export function CertificationsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })

  // Embla is an external store, so read it as one. The previous effect had two
  // problems: the 'select' handler was never removed (a listener leaked on
  // every remount), and the snap list was captured once — so resizing the
  // window, which changes how many cards fit per snap, left a stale row of
  // dots that no longer matched the carousel.
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {}
      emblaApi.on('select', onStoreChange).on('reInit', onStoreChange)
      return () => {
        emblaApi.off('select', onStoreChange).off('reInit', onStoreChange)
      }
    },
    [emblaApi]
  )

  // Both snapshots are numbers, so they stay referentially stable across reads.
  const selectedIndex = useSyncExternalStore(
    subscribe,
    () => emblaApi?.selectedScrollSnap() ?? 0,
    () => 0
  )
  const snapCount = useSyncExternalStore(
    subscribe,
    () => emblaApi?.scrollSnapList().length ?? 0,
    () => 0
  )

  const maskStyle = useMemo(
    () => ({ maskImage: MASK_GRADIENT, WebkitMaskImage: MASK_GRADIENT }),
    []
  )

  return (
    <div className="space-y-5">
      {/* Carousel viewport */}
      <div className="overflow-hidden" style={maskStyle} ref={emblaRef}>
        <div className="flex gap-3">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="flex-shrink-0 min-w-0 basis-[85%] sm:basis-[42%] lg:basis-[30%]"
            >
              <div
                className={`
                  group relative flex flex-col h-full
                  rounded-xl border px-5 py-4
                  bg-white dark:bg-[#161616]
                  hover:shadow-md dark:hover:shadow-black/40
                  transition-all duration-300 cursor-grab active:cursor-grabbing
                  ${CARD_STYLE.border}
                `}
              >
                {/* Top row: issuer badge + year */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`
                      inline-flex items-center gap-1.5
                      text-[11px] font-semibold tracking-wide uppercase
                      px-2.5 py-1 rounded-full
                      ${CARD_STYLE.bg} ${CARD_STYLE.text}
                    `}
                  >
                    <BadgeCheck className="w-3 h-3" />
                    {cert.issuer}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {cert.year}
                  </span>
                </div>

                {/* Certificate name */}
                <p className="text-[14px] font-semibold leading-snug
                  text-gray-800 dark:text-gray-100
                  group-hover:text-black dark:group-hover:text-white
                  transition-colors line-clamp-3 flex-1">
                  {cert.name}
                </p>

                {/* Bottom accent line */}
                <div className="mt-4 h-[2px] rounded-full bg-gray-100 dark:bg-gray-800
                  opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {snapCount > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {Array.from({ length: snapCount }, (_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? 'w-4 h-1.5 bg-gray-700 dark:bg-gray-300'
                  : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
