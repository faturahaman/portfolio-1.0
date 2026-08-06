# Performance notes — portfolio website

Current state of the performance-relevant decisions in this repo, and the
reasoning behind them. Update this when you change any of it.

## Assets

| Asset | What it is | Note |
| --- | --- | --- |
| `app/icon.png` | 96×96 favicon, ~5 KB | File-convention icon; Next emits the `<link>` with `sizes`/`type` |
| `app/apple-icon.png` | 180×180, white background, ~22 KB | Flattened — iOS composites transparency onto black |
| `public/og.png` | 1200×630 social card, ~107 KB | Only fetched by crawlers/social unfurlers, never by visitors |
| `public/avatar.webp` | 460×460 real WebP, ~10 KB | Served through `next/image`, never directly |
| `public/logo-no-bg.png` | 956×1087 source logo, ~803 KB | **Not referenced by the app.** Source for the icons above |

Regenerate the derived assets with `node scripts/gen-assets.mjs`.

Do not point `metadata.icons` at `logo-no-bg.png`. A favicon is fetched on every
page load, so an 803 KB one is 803 KB on every page load.

## Images

- The hero avatar is **one** `<Image>`, repositioned between mobile and desktop
  with flex `order`. Two elements toggled by `hidden`/`sm:hidden` both stay in
  the DOM, so `priority` on both emits two preloads and downloads two variants
  to paint one.
- Keep `quality` consistent across usages of the same source. Two different
  values produce two independent optimizer cache entries for the same picture.
- `next.config.ts` `images.qualities` is an allow-list. Anything not listed
  throws at request time — add a value there before using it.

## Preloading

`<Image priority>` emits its own `<link rel="preload">` pointing at
`/_next/image?url=…`. **Do not hand-write a preload for the raw file**: the page
never requests that URL, so it is a pure extra download. There used to be one
for `/avatar.webp` and it cost every visitor 146 KB for nothing.

GitHub hosts are `preconnect`ed (DNS + TCP + TLS), not `dns-prefetch`ed
(DNS only), because the projects section opens connections to them on mount.

## Fonts

The site renders in **Times New Roman**. There is no webfont: it ships with
Windows, macOS, iOS and Android, so there is no download, no FOUT and no swap-in
layout shift.

`--font-sans` is declared in exactly one place, `globals.css`. If you change it,
change the `body` rule in `layout.tsx`'s inlined critical CSS to match — that is
what paints first, and a disagreement between the two shows up as a reflow.

The repo previously loaded Outfit via `next/font/google` **under the same
variable name** that `@theme` used for Times New Roman. Custom-property
declarations in a cascade layer lose to unlayered ones regardless of order, and
`@theme` emits into `@layer theme` while `next/font` does not — so Outfit
silently won, and the site rendered sans-serif even though two separate rules
said Times New Roman. If you ever reintroduce a webfont, give it its own
variable (`--font-outfit`) and reference it from `--font-sans`; never let two
files own the same token.

> Note: `repo-modal.tsx` sets `font-serif` on the README prose, which resolves
> to Tailwind's default serif stack (`ui-serif, Georgia, …`), not Times New
> Roman. That is deliberate markup, not a leftover.

## Rendering

- Only **Client** Components are worth `dynamic()`. Server Components ship no
  client JS, so wrapping them adds a lazy boundary that mounts after hydration
  and buys nothing. `ProjectsSection` and `VeReelSection` are split; everything
  else is a direct import.
- `RepoModal` is `dynamic({ ssr: false })` so `react-markdown` + `remark-gfm`
  only load when a project is opened.
- `CertificationsCarousel` is `lazy()` so `embla-carousel` stays out of the
  initial chunk.

## Scroll reveal

Reveal styles start at `opacity: 0` and are un-hidden by an
`IntersectionObserver`. They are scoped to `html.js`, set by an inline script in
`<head>`. Without that gate, anything that doesn't run JS — a visitor with
scripting off, a non-executing crawler — is served a blank page.

## Data fetching

Repos and READMEs are fetched **client-side** from the public GitHub API.

- `fetchRepos` guards on `reposLoading` as well as `reposFetched`, otherwise
  concurrent mounts fire duplicate requests against a 60/hour rate limit.
- `fetchReadme` deduplicates in-flight requests and runs at most 3 at a time.
  Cover images are decorative, so cards schedule them via `requestIdleCallback`
  rather than competing with LCP resources.
- Components subscribe with **narrow selectors**. `useGithubStore()` with no
  selector subscribes to the whole store, so every README that resolved
  re-rendered every card.

## Known remaining opportunity

`/` and `/video-editor` are **dynamic** (`ƒ` in the build output), not
prerendered. The cause is `cookies()` in `getServerLanguage()`, which the root
layout and every server section call. Cookie access opts the whole route out of
static rendering, so there is no CDN-cacheable HTML and every visit pays a
server render.

Fixing it means changing how the language is selected. The two realistic routes:

1. **`app/[lang]/…` with `generateStaticParams`** — fully static, but the URLs
   change (`/` → `/en`, `/id`), which needs redirects and has SEO consequences.
2. **`cacheComponents` + `use cache`** — keep the cookie, wrap the reads in
   Suspense so the static shell prerenders and the localized parts stream (PPR).

Both are architectural, not tuning. Neither has been done.
