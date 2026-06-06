import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import { ScrollAnimator } from "@/components/scroll-animator";

const BASE_URL = "https://riffatur.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Muhamad Riffa Faturahman — Web Developer | React, Next.js, Laravel",
  description:
    "Portfolio of Muhamad Riffa Faturahman — a results-driven Web Developer with 1+ year of experience building modern web applications using Laravel, React, Next.js, NestJS, PHP, JavaScript, MySQL, MongoDB, and PostgreSQL. Available for freelance projects.",
  keywords: [
    "web developer",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "Laravel developer",
    "PHP developer",
    "JavaScript developer",
    "NestJS developer",
    "backend developer",
    "frontend developer",
    "freelance web developer",
    "REST API developer",
    "MySQL developer",
    "MongoDB developer",
    "web developer Indonesia",
    "Muhamad Riffa Faturahman",
    "Riffa Faturahman",
    "portfolio web developer",
    "CMS development",
    "website developer",
  ],
  authors: [{ name: "Muhamad Riffa Faturahman", url: BASE_URL }],
  creator: "Muhamad Riffa Faturahman",
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
    title: "Muhamad Riffa Faturahman — Web Developer | React, Next.js, Laravel",
    description:
      "Results-driven Web Developer with 1+ year of experience. Specializes in Laravel, React, Next.js, NestJS, PHP, and JavaScript. 26+ projects delivered.",
    siteName: "Muhamad Riffa Faturahman Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/logo-no-bg.png`,
        width: 512,
        height: 512,
        alt: "Muhamad Riffa Faturahman — Web Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhamad Riffa Faturahman — Web Developer",
    description:
      "Results-driven Web Developer. Specializes in Laravel, React, Next.js, NestJS, PHP, and JavaScript.",
    images: [`${BASE_URL}/logo-no-bg.png`],
    creator: "@faturahaman",
  },
  icons: {
    icon: "/logo-no-bg.png",
    apple: "/logo-no-bg.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhamad Riffa Faturahman",
  url: BASE_URL,
  image: `${BASE_URL}/logo-no-bg.png`,
  sameAs: [
    "https://github.com/faturahaman",
    "https://linkedin.com/in/muhamad-riffa-faturahman-71ba5a279",
  ],
  jobTitle: "Web Developer",
  description:
    "Results-driven Web Developer with 1+ year of experience building modern web applications using Laravel, React, Next.js, NestJS, PHP, JavaScript, MySQL, MongoDB, and PostgreSQL.",
  knowsAbout: [
    "Web Development",
    "React.js",
    "Next.js",
    "Laravel",
    "NestJS",
    "PHP",
    "JavaScript",
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "REST API",
    "Docker",
    "Git",
  ],
  email: "faturahaman.r@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Self-employed",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Muhamad Riffa Faturahman offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Muhamad Riffa Faturahman offers full-stack web development services including React, Next.js, Laravel, NestJS development, REST API design, and database architecture using MySQL, MongoDB, and PostgreSQL.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies does the web developer specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Specializations include React.js, Next.js, Laravel, NestJS, PHP, JavaScript, TypeScript, MySQL, MongoDB, PostgreSQL, REST APIs, Docker, and Git version control.",
      },
    },
    {
      "@type": "Question",
      name: "Is Muhamad Riffa Faturahman available for freelance projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Muhamad Riffa Faturahman is available for freelance web development projects. Contact via email at faturahaman.r@gmail.com or through LinkedIn.",
      },
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
      lang="en"
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

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* FAQ Schema for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
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
