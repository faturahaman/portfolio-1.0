/** Shared GitHub/repo display utilities */

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#6b7280",
  JavaScript: "#9ca3af",
  PHP: "#6b7280",
  Python: "#9ca3af",
  Go: "#6b7280",
  CSS: "#9ca3af",
  HTML: "#6b7280",
  Vue: "#9ca3af",
  Rust: "#6b7280",
  Java: "#9ca3af",
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(months / 12)
  return `${years}y ago`
}

/** Build a page-number list with "…" ellipsis for large page counts */
export function buildPageNumbers(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const pages: (number | "…")[] = [1]
  if (page > 3) pages.push("…")
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) {
    pages.push(p)
  }
  if (page < totalPages - 2) pages.push("…")
  pages.push(totalPages)
  return pages
}
