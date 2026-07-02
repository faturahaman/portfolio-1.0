/**
 * ParallaxScene
 * Renders three fixed, blurred blobs that drift at different speeds relative
 * to page scroll using CSS animation-timeline: scroll(root).
 *
 * Completely CSS-driven — zero JS scroll listeners, zero layout thrashing.
 * Uses only transform (GPU-composited). Hidden for prefers-reduced-motion.
 */
export function ParallaxScene() {
  return (
    <div className="parallax-scene" aria-hidden="true">
      <div className="parallax-blob parallax-blob-1" />
      <div className="parallax-blob parallax-blob-2" />
      <div className="parallax-blob parallax-blob-3" />
    </div>
  )
}
