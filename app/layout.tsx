import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const BASE_URL = "https://riffatur.com";

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
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Muhamad Riffa Faturahman — Web Developer | React, Next.js, Laravel",
    description:
      "Results-driven Web Developer with 1+ year of experience. Specializes in Laravel, React, Next.js, NestJS, PHP, and JavaScript. 26+ projects delivered.",
    siteName: "Muhamad Riffa Faturahman Portfolio",
    images: [
      {
        url: `${BASE_URL}/logo-no-bg.png`,
        width: 512,
        height: 512,
        alt: "Muhamad Riffa Faturahman — Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Muhamad Riffa Faturahman — Web Developer",
    description:
      "Results-driven Web Developer. Specializes in Laravel, React, Next.js, NestJS, PHP, and JavaScript.",
    images: [`${BASE_URL}/logo-no-bg.png`],
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
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
