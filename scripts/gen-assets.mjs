/**
 * One-off asset generator.
 *
 * Produces the small, correctly-encoded image assets the app references:
 *  - app/icon.png        favicon (browser tab)
 *  - app/apple-icon.png  iOS home-screen icon (needs an opaque background)
 *  - public/og.png       1200x630 social preview
 *  - public/avatar.webp  the hero avatar, re-encoded as *actual* WebP
 *
 * Run with: node scripts/gen-assets.mjs
 */
import sharp from "sharp"
import { mkdir, stat } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const p = (...s) => path.join(root, ...s)

const LOGO = p("public", "logo-no-bg.png")
const AVATAR_SRC = p("public", "avatar.webp") // currently a PNG despite the extension

async function kb(file) {
  return `${((await stat(file)).size / 1024).toFixed(1)} KB`
}

await mkdir(p("app"), { recursive: true })

// ── Favicon: transparent, small. 96px covers 16/32/48 downscales cleanly. ──
await sharp(LOGO)
  .resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, palette: true })
  .toFile(p("app", "icon.png"))

// ── Apple touch icon: iOS composites transparency onto black, so flatten. ──
await sharp(LOGO)
  .resize(160, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png({ compressionLevel: 9 })
  .toFile(p("app", "apple-icon.png"))

// ── Social preview: 1200x630 is the format every platform crops from. ──
const logoForOg = await sharp(LOGO)
  .resize({ height: 300, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer()

const caption = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <style>
    .name { font-family: Segoe UI, Arial, Helvetica, sans-serif; font-size: 54px; font-weight: 700; fill: #f2f2f2; }
    .role { font-family: Segoe UI, Arial, Helvetica, sans-serif; font-size: 30px; font-weight: 400; fill: #9ca3af; }
  </style>
  <text x="600" y="500" text-anchor="middle" class="name">Muhamad Riffa Faturahman</text>
  <text x="600" y="552" text-anchor="middle" class="role">Web Developer &#183; React, Next.js, Laravel</text>
</svg>`

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: "#111111",
  },
})
  .composite([
    { input: logoForOg, top: 90, left: 600 - Math.round((300 * 956) / 1087 / 2) },
    { input: Buffer.from(caption), top: 0, left: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(p("public", "og.png"))

// ── Avatar: re-encode to real WebP (the source is a mislabelled PNG). ──
const avatarOut = p("public", "avatar.webp")
const reencoded = await sharp(AVATAR_SRC).webp({ quality: 82, effort: 6 }).toBuffer()
await sharp(reencoded).toFile(avatarOut)

console.log("app/icon.png       ", await kb(p("app", "icon.png")))
console.log("app/apple-icon.png ", await kb(p("app", "apple-icon.png")))
console.log("public/og.png      ", await kb(p("public", "og.png")))
console.log("public/avatar.webp ", await kb(avatarOut), "(now actually WebP)")
