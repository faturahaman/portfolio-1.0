import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import { ScrollAnimator } from "@/components/scroll-animator";
import { ParallaxScene } from "@/components/parallax-scene";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";

const BASE_URL = "https://riffatur.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Web Developer Indonesia — React, Next.js, Laravel | Muhamad Riffa Faturahman",
    template: "%s | Riffa Faturahman — Web Developer",
  },
  description:
    "Jasa web developer freelance Indonesia (Bogor). Spesialis React, Next.js, Laravel, NestJS, PHP, REST API. 26+ proyek selesai, 100% on-time. Open untuk proyek freelance & kolaborasi. Hubungi sekarang!",
  keywords: [
    // ── Intent-based (service queries) ──
    "jasa web developer",
    "jasa pembuatan website",
    "jasa website profesional",
    "jasa web developer freelance",
    "jasa web developer murah",
    "jasa fullstack developer",
    "jasa backend developer",
    "jasa frontend developer",
    "jasa REST API developer",
    "jasa CMS development",
    "jasa pembuatan aplikasi web",
    "hire web developer Indonesia",
    "hire freelance developer Indonesia",
    "freelance web developer",
    "freelance React developer",
    "freelance Laravel developer",
    "freelance Next.js developer",
    // ── Location-based ──
    "web developer Indonesia",
    "web developer Bogor",
    "developer freelance Bogor",
    "web developer Jawa Barat",
    "programmer Indonesia",
    "programmer freelance Indonesia",
    "software developer Indonesia",
    // ── Tech-stack (what people search when looking for help) ──
    "React developer",
    "React.js developer",
    "Next.js developer",
    "Laravel developer",
    "NestJS developer",
    "PHP developer",
    "JavaScript developer",
    "TypeScript developer",
    "Node.js developer",
    "full stack developer",
    "backend developer",
    "frontend developer",
    "REST API developer",
    "MySQL developer",
    "MongoDB developer",
    "PostgreSQL developer",
    // ── Portfolio / discovery ──
    "portfolio web developer",
    "portfolio programmer Indonesia",
    "contoh portfolio web developer",
    "web developer portfolio",
    "web developer portofolio",
    // ── Branded (keep for existing traffic) ──
    "Muhamad Riffa Faturahman",
    "Riffa Faturahman",
    "Riffa developer",
    "riffatur",
    "riffatur.com",
    // ── Problem-solution keywords ──
    "buat website profesional",
    "buat web app custom",
    "optimasi website",
    "website performance optimization",
    "CMS development Indonesia",
    "pembuatan website company profile",
    "pembuatan website e-commerce",
  ],
  authors: [{ name: "Muhamad Riffa Faturahman", url: BASE_URL }],
  creator: "Muhamad Riffa Faturahman",
  publisher: "Muhamad Riffa Faturahman",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Web Developer Freelance Indonesia — React, Next.js, Laravel | Riffa Faturahman",
    description:
      "Jasa web developer freelance Indonesia (Bogor). Spesialis React, Next.js, Laravel, NestJS, PHP. 26+ proyek, 100% on-time. Hubungi untuk konsultasi gratis!",
    siteName: "Riffa Faturahman — Web Developer Portfolio",
    locale: "id_ID",
    alternateLocale: "en_US",
    images: [
      {
        url: `${BASE_URL}/logo-no-bg.png`,
        width: 512,
        height: 512,
        alt: "Riffa Faturahman — Web Developer Freelance Indonesia",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developer Freelance Indonesia | Riffa Faturahman",
    description:
      "Jasa web developer freelance. Spesialis React, Next.js, Laravel, PHP. Open untuk proyek freelance!",
    images: [`${BASE_URL}/logo-no-bg.png`],
    creator: "@faturahaman",
  },
  icons: {
    icon: "/logo-no-bg.png",
    apple: "/logo-no-bg.png",
  },
  category: "technology",
};

// ── Schema: Person (rich entity for Knowledge Panel) ──────────────────────────
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Muhamad Riffa Faturahman",
  alternateName: ["Riffa Faturahman", "Riffa", "riffatur"],
  url: BASE_URL,
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo-no-bg.png`,
    width: 512,
    height: 512,
  },
  sameAs: [
    "https://github.com/faturahaman",
    "https://linkedin.com/in/muhamad-riffa-faturahman-71ba5a279",
    BASE_URL,
  ],
  jobTitle: "Web Developer",
  description:
    "Web developer freelance Indonesia spesialis React, Next.js, Laravel, NestJS, PHP, REST API. Tersedia untuk proyek freelance dan kolaborasi.",
  email: "faturahaman.r@gmail.com",
  nationality: {
    "@type": "Country",
    name: "Indonesia",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogor",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  worksFor: {
    "@type": "Organization",
    name: "Self-employed (Freelance)",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "SMK Analis Kimia Nusa Bangsa",
  },
  knowsAbout: [
    "Web Development",
    "React.js",
    "Next.js",
    "Laravel",
    "NestJS",
    "PHP",
    "JavaScript",
    "TypeScript",
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "REST API",
    "Docker",
    "Git",
    "CMS Development",
    "Full Stack Development",
    "Backend Development",
    "Frontend Development",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Web Developer",
    occupationLocation: {
      "@type": "Country",
      name: "Indonesia",
    },
    description: "Freelance web developer specializing in React, Next.js, Laravel, NestJS, PHP, and REST API development.",
    skills: "React.js, Next.js, Laravel, NestJS, PHP, JavaScript, MySQL, MongoDB, REST API, Docker",
  },
  offers: {
    "@type": "Offer",
    name: "Freelance Web Development Services",
    description: "Jasa pembuatan website, web app, REST API, CMS, dan optimasi performa. Tersedia untuk proyek freelance Indonesia dan internasional.",
    url: BASE_URL,
    seller: {
      "@type": "Person",
      name: "Muhamad Riffa Faturahman",
    },
  },
};

// ── Schema: WebSite (enables Sitelinks Searchbox) ─────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Riffa Faturahman — Web Developer Portfolio",
  alternateName: "riffatur.com",
  url: BASE_URL,
  description: "Portfolio web developer freelance Indonesia. Spesialis React, Next.js, Laravel, PHP, REST API.",
  author: { "@id": `${BASE_URL}/#person` },
  inLanguage: ["id", "en"],
  publisher: { "@id": `${BASE_URL}/#person` },
};

// ── Schema: FAQ (rich snippets for common searches) ───────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah Riffa Faturahman menerima proyek freelance web development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Muhamad Riffa Faturahman menerima proyek freelance web development dari seluruh Indonesia maupun internasional. Hubungi via email faturahaman.r@gmail.com atau LinkedIn untuk konsultasi gratis.",
      },
    },
    {
      "@type": "Question",
      name: "Apa saja teknologi yang dikuasai web developer ini?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Riffa Faturahman menguasai React.js, Next.js, Laravel, NestJS, PHP, JavaScript, TypeScript, MySQL, MongoDB, PostgreSQL, REST API, Docker, dan Git. Spesialis full-stack web development.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama pengalaman web developer Riffa Faturahman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Riffa Faturahman memiliki 1+ tahun pengalaman profesional sebagai web developer, dengan 26+ proyek yang telah diselesaikan termasuk website pemerintah, sistem multi-tenant, CMS, dan berbagai aplikasi web untuk klien.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah tersedia jasa pembuatan website profesional di Bogor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Riffa Faturahman adalah web developer berbasis di Bogor, Jawa Barat yang menyediakan jasa pembuatan website profesional, web app, REST API, dan CMS untuk klien lokal maupun remote.",
      },
    },
    {
      "@type": "Question",
      name: "Apa perbedaan jasa web developer React vs Laravel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "React digunakan untuk membangun antarmuka pengguna yang interaktif dan cepat (frontend), sedangkan Laravel adalah framework PHP untuk backend yang powerful. Riffa Faturahman menguasai keduanya sehingga dapat mengerjakan proyek full-stack dari frontend hingga backend dan database.",
      },
    },
  ],
};

// ── Schema: BreadcrumbList (helps Google understand site structure) ────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Experience",
      item: `${BASE_URL}#experience`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Projects",
      item: `${BASE_URL}#projects`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Skills",
      item: `${BASE_URL}#skills`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Certifications",
      item: `${BASE_URL}#certifications`,
    },
  ],
};


// Critical CSS for above-the-fold content (inlined to prevent render-blocking)
const criticalCSS = `
  :root {
    --background: #ffffff;
    --foreground: #242424;
  }
  .dark {
    --background: #111111;
    --foreground: #ededed;
  }
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: "Times New Roman", Times, serif;
    margin: 0;
    padding: 0;
  }
  html {
    scroll-behavior: smooth;
    height: 100%;
    scrollbar-gutter: stable;
  }
  .min-h-full {
    min-height: 100vh;
  }
  .min-h-screen {
    min-height: 100vh;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        {/* Inline critical CSS to prevent render-blocking */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

        {/* Preload hero image for LCP optimization */}
        <link
          rel="preload"
          as="image"
          href="https://avatars.githubusercontent.com/faturahaman?v=4"
          fetchPriority="high"
        />

        {/* Preload favicon */}
        <link rel="preload" as="image" href="/logo-no-bg.png" type="image/png" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" crossOrigin="anonymous" />

        {/* JSON-LD: Person — core entity for Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        {/* JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* JSON-LD: FAQ — rich snippet answers in SERPs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* JSON-LD: BreadcrumbList — site structure for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ParallaxScene />
        <ScrollProgressBar />
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <ScrollAnimator />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
