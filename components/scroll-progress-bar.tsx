/**
 * ScrollProgressBar
 * A 2px fixed bar at the top of the viewport that fills left-to-right
 * as the user scrolls. Purely CSS driven via animation-timeline: scroll(root).
 * Only renders in supporting browsers (the CSS @supports block handles display).
 */
export function ScrollProgressBar() {
  return <div className="scroll-progress-bar" aria-hidden="true" />
}
