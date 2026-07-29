/**
 * Content for the /video-editor persona page.
 *
 * Kept separate from components so real video links, skills, and process copy
 * can be edited here without touching JSX.
 *
 * 👉 TO ADD REAL VIDEOS: edit the `VIDEO_ITEMS` array below and replace every
 *    `embedUrl: "#"` with the real YouTube / Vimeo / Instagram Reels URL.
 *    The embed component auto-detects the platform from the URL.
 */

export type VideoCategory =
  | "motion-graphic"
  | "cinematic"
  | "reels-shorts"
  | "color-grading"

export interface VideoItem {
  id: string
  title: string
  category: VideoCategory
  software: string[] // e.g. ["After Effects", "Premiere Pro"]
  embedUrl: string // TODO: replace "#" with real YouTube / Vimeo / IG Reels URL
  thumbnail?: string
}

/**
 * Category → i18n key (resolved in the component via t()).
 * Order here drives the filter-tab order.
 */
export const VIDEO_CATEGORIES: { key: VideoCategory; labelKey: string }[] = [
  { key: "motion-graphic", labelKey: "videoEditor.catMotionGraphic" },
  { key: "cinematic", labelKey: "videoEditor.catCinematic" },
  { key: "reels-shorts", labelKey: "videoEditor.catReelsShorts" },
  { key: "color-grading", labelKey: "videoEditor.catColorGrading" },
]

/**
 * Placeholder showreel items.
 * TODO: replace each `embedUrl: "#"` with the real video link and set a real
 *       `title`. Add or remove items freely — the grid & filters adapt.
 */
export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: "reel-1",
    title: "Brand Motion Graphic Opener",
    category: "motion-graphic",
    software: ["After Effects", "Premiere Pro"],
    embedUrl: "#", // TODO: ganti dengan link asli (YouTube/Vimeo)
  },
  {
    id: "reel-2",
    title: "Cinematic Travel Edit",
    category: "cinematic",
    software: ["Premiere Pro", "After Effects"],
    embedUrl: "#", // TODO: ganti dengan link asli
  },
  {
    id: "reel-3",
    title: "Instagram Reels — Product Promo",
    category: "reels-shorts",
    software: ["Alight Motion", "Premiere Pro"],
    embedUrl: "#", // TODO: ganti dengan link asli (YouTube Shorts / IG Reels)
  },
  {
    id: "reel-4",
    title: "Cinematic Color Grade — Before/After",
    category: "color-grading",
    software: ["Premiere Pro", "DaVinci Resolve"],
    embedUrl: "#", // TODO: ganti dengan link asli
  },
  {
    id: "reel-5",
    title: "Kinetic Typography Motion",
    category: "motion-graphic",
    software: ["After Effects"],
    embedUrl: "#", // TODO: ganti dengan link asli
  },
  {
    id: "reel-6",
    title: "Short-Form Content — TikTok/Shorts",
    category: "reels-shorts",
    software: ["Alight Motion", "CapCut"],
    embedUrl: "#", // TODO: ganti dengan link asli
  },
]

/**
 * Skills — software tools + working specialties.
 * `software` items map to logos where available; specialty labels are static.
 */
export interface VideoSkillGroup {
  category: string
  titleKey: string // i18n key for the group heading
  items: string[]
}

export const VIDEO_SKILLS: VideoSkillGroup[] = [
  {
    category: "Software",
    titleKey: "videoEditor.skillsSoftware",
    items: [
      "Alight Motion",
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "CapCut",
    ],
  },
  {
    category: "Specialties",
    titleKey: "videoEditor.skillsSpecialties",
    items: [
      "Motion Graphic",
      "Cinematic Editing",
      "Reels & Shorts",
      "Color Grading",
      "Sound Design",
    ],
  },
]

/**
 * Process steps — reuses the experience/timeline visual language of the dev page.
 * `titleKey`/`descKey` resolve via t().
 */
export interface ProcessStep {
  step: string
  titleKey: string
  descKey: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", titleKey: "videoEditor.processBriefTitle", descKey: "videoEditor.processBriefDesc" },
  { step: "02", titleKey: "videoEditor.processRoughTitle", descKey: "videoEditor.processRoughDesc" },
  { step: "03", titleKey: "videoEditor.processRevisionTitle", descKey: "videoEditor.processRevisionDesc" },
  { step: "04", titleKey: "videoEditor.processDeliveryTitle", descKey: "videoEditor.processDeliveryDesc" },
]
