import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/navbar"
import { VeHero } from "@/components/video/ve-hero"
import { VeSkillsSection } from "@/components/video/ve-skills-section"
import { VeProcessSection } from "@/components/video/ve-process-section"
import { VeCtaSection } from "@/components/video/ve-cta-section"
import { Footer } from "@/components/layout/footer"
import { BASE_URL, OG_IMAGE } from "@/lib/site"

// Same reasoning as app/page.tsx: only the Client Component is worth splitting.
const VeReelSection = dynamic(() =>
  import("@/components/video/ve-reel-section").then((m) => m.VeReelSection)
)

const PAGE_URL = `${BASE_URL}/video-editor`

export const metadata: Metadata = {
  title: "Jasa Video Editor Freelance Indonesia — Alight Motion, After Effects & Premiere Pro",
  description:
    "Jasa video editor freelance Indonesia (Bogor). Motion graphic, cinematic editing, reels & shorts, color grading dengan Alight Motion, After Effects, dan Premiere Pro. Available for work!",
  keywords: [
    // ── Intent-based ──
    "jasa video editor freelance Indonesia",
    "jasa video editor",
    "jasa edit video",
    "jasa motion graphic",
    "jasa video editor murah",
    "hire video editor Indonesia",
    "freelance video editor",
    // ── Software / skill ──
    "video editor Alight Motion",
    "video editor After Effects",
    "video editor Premiere Pro",
    "motion graphic designer",
    "cinematic video editor",
    "color grading",
    "reels editor",
    "shorts editor",
    // ── Location ──
    "motion graphic Bogor",
    "video editor Bogor",
    "video editor Indonesia",
    "video editor Jawa Barat",
    // ── Branded ──
    "Muhamad Riffa Faturahman",
    "Riffa Faturahman video editor",
    "riffatur",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Jasa Video Editor Freelance Indonesia — Alight Motion, After Effects & Premiere Pro",
    description:
      "Motion graphic, cinematic editing, reels & shorts, color grading. Video editor freelance Bogor, Indonesia. Available for work!",
    siteName: "Riffa Faturahman — Video Editor Portfolio",
    locale: "id_ID",
    alternateLocale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Video Editor Freelance Indonesia | Riffa Faturahman",
    description:
      "Motion graphic, cinematic editing, reels & color grading dengan Alight Motion, After Effects & Premiere Pro.",
    images: [OG_IMAGE.url],
    creator: "@faturahaman",
  },
  category: "video",
}

// ── Schema: video editing service (distinct entity from the dev page) ──
const videoServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${PAGE_URL}/#service`,
  name: "Riffa Faturahman — Video Editing Services",
  url: PAGE_URL,
  image: OG_IMAGE.url,
  description:
    "Jasa video editor freelance Indonesia: motion graphic, cinematic editing, reels & shorts, dan color grading menggunakan Alight Motion, After Effects, dan Premiere Pro.",
  areaServed: { "@type": "Country", name: "Indonesia" },
  provider: {
    "@type": "Person",
    name: "Muhamad Riffa Faturahman",
    url: BASE_URL,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogor",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  knowsAbout: [
    "Video Editing",
    "Motion Graphic",
    "Cinematic Editing",
    "Color Grading",
    "Alight Motion",
    "Adobe After Effects",
    "Adobe Premiere Pro",
    "Reels & Shorts",
    "Sound Design",
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Video Editor", item: PAGE_URL },
  ],
}

export default function VideoEditorPage() {
  return (
    <div className="relative z-10 min-h-screen bg-white/90 dark:bg-[#111111]/90 text-[#242424] dark:text-[#ededed] font-sans transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-black text-white px-4 py-2 rounded-md font-bold">
        Skip to content
      </a>
      <Navbar />

      <main id="main-content" className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <div className="scroll-fade-section">
          <VeHero />
        </div>
        <div className="scroll-fade-section">
          <VeReelSection />
        </div>
        <div className="scroll-fade-section">
          <VeSkillsSection />
        </div>
        <div className="scroll-fade-section">
          <VeProcessSection />
        </div>
        <div className="scroll-fade-section">
          <VeCtaSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}
