import type { VideoItem } from "@/data/video-editor"

/**
 * Responsive video embed that auto-detects the platform from the URL.
 * Supports YouTube (watch/youtu.be/shorts), Vimeo, and a generic iframe
 * fallback. Instagram Reels are shown as a link-out card (IG blocks iframe
 * embedding without their blockquote script, which we intentionally avoid
 * loading to keep the bundle lean).
 *
 * A placeholder ("#") renders a "coming soon" tile instead of an empty frame.
 */

function toEmbedUrl(url: string): { src: string | null; kind: "iframe" | "link" | "placeholder" } {
  if (!url || url === "#") return { src: null, kind: "placeholder" }

  try {
    const u = new URL(url)

    // `new URL()` happily parses `javascript:`, `data:` and friends, and the
    // unknown-host branch below feeds whatever it gets straight into an iframe
    // `src`. The data file is hand-written today, but that's one typo away
    // from being a problem, so gate on the scheme up front.
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      return { src: null, kind: "placeholder" }
    }

    const host = u.hostname.replace(/^www\./, "")

    // YouTube — watch?v=, youtu.be/, shorts/
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v")
      if (v) return { src: `https://www.youtube.com/embed/${v}`, kind: "iframe" }
      const shorts = u.pathname.match(/^\/shorts\/([^/?]+)/)
      if (shorts) return { src: `https://www.youtube.com/embed/${shorts[1]}`, kind: "iframe" }
      const embed = u.pathname.match(/^\/embed\/([^/?]+)/)
      if (embed) return { src: `https://www.youtube.com/embed/${embed[1]}`, kind: "iframe" }
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1)
      if (id) return { src: `https://www.youtube.com/embed/${id}`, kind: "iframe" }
    }

    // Vimeo — vimeo.com/{id}
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.match(/(\d+)/)?.[1]
      if (id) return { src: `https://player.vimeo.com/video/${id}`, kind: "iframe" }
    }

    // Instagram Reels — link out (no iframe embedding without their script)
    if (host === "instagram.com" || host === "instagr.am") {
      return { src: url, kind: "link" }
    }

    // Unknown but valid URL — attempt a raw iframe
    return { src: url, kind: "iframe" }
  } catch {
    return { src: null, kind: "placeholder" }
  }
}

export function VideoEmbed({ item, comingSoonLabel }: { item: VideoItem; comingSoonLabel: string }) {
  const { src, kind } = toEmbedUrl(item.embedUrl)

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {kind === "iframe" && src ? (
        <iframe
          src={src}
          title={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : kind === "link" && src ? (
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <PlayIcon />
          <span className="text-sm font-medium">Instagram Reels ↗</span>
        </a>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
          <PlayIcon />
          <span className="text-xs font-medium uppercase tracking-widest">{comingSoonLabel}</span>
        </div>
      )}
    </div>
  )
}

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 8l6 4-6 4V8z" />
    </svg>
  )
}
