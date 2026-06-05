/**
 * Extract the first "meaningful" image from a README markdown string.
 *
 * Rules:
 * - Skips badge/shield URLs (shields.io, badge, img.shields, etc.)
 * - Skips tiny inline icons (usually < 30px indicated by width/height attrs)
 * - Resolves relative paths to raw.githubusercontent.com
 * - Returns null if nothing found
 */

const BADGE_PATTERNS = [
  /shields\.io/i,
  /badge/i,
  /img\.shields/i,
  /travis-ci/i,
  /circleci/i,
  /codecov/i,
  /sonarcloud/i,
  /snyk\.io/i,
  /npmjs\.com\/badge/i,
  /github\.com\/actions\/workflows/i,
  /github\.com\/badges/i,
  /forthebadge/i,
  /badgen\.net/i,
  /hits\.dwyl/i,
  /visitor-badge/i,
]

function isBadge(url: string): boolean {
  return BADGE_PATTERNS.some((p) => p.test(url))
}

/**
 * Convert a raw image URL from README to an absolute URL.
 * Handles: http(s) absolute, relative paths, and GitHub blob URLs.
 */
function resolveImageUrl(
  src: string,
  repoFullName: string,
  branch: string
): string {
  // Already absolute
  if (/^https?:\/\//i.test(src)) {
    // Convert github.com blob URLs to raw
    const blobMatch = src.match(
      /https?:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/([^/]+)\/(.*)/i
    )
    if (blobMatch) {
      return `https://raw.githubusercontent.com/${blobMatch[1]}/${blobMatch[2]}/${blobMatch[3]}`
    }
    return src
  }

  // Relative path — resolve against raw content base
  const cleanSrc = src.replace(/^\.\//, "")
  return `https://raw.githubusercontent.com/${repoFullName}/${branch}/${cleanSrc}`
}

export function extractReadmeImage(
  markdown: string,
  repoFullName: string,
  branch: string
): string | null {
  if (!markdown) return null

  // Match markdown images: ![alt](url) or ![alt](url "title")
  const mdImageRegex = /!\[([^\]]*)\]\(([^)"\s]+)(?:\s+"[^"]*")?\)/g
  // Match HTML img tags: <img src="..." />
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi

  const candidates: string[] = []

  let match: RegExpExecArray | null

  // Collect all markdown images
  mdImageRegex.lastIndex = 0
  while ((match = mdImageRegex.exec(markdown)) !== null) {
    candidates.push(match[2])
  }

  // Collect all HTML img src
  htmlImageRegex.lastIndex = 0
  while ((match = htmlImageRegex.exec(markdown)) !== null) {
    candidates.push(match[1])
  }

  for (const src of candidates) {
    if (!src || src.startsWith("data:")) continue
    if (isBadge(src)) continue

    const resolved = resolveImageUrl(src, repoFullName, branch)
    return resolved
  }

  return null
}
