import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
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
  authors: [{ name: "Muhamad Riffa Faturahman" }],
  creator: "Muhamad Riffa Faturahman",
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
    title: "Muhamad Riffa Faturahman — Web Developer | React, Next.js, Laravel",
    description:
      "Results-driven Web Developer with 1+ year of experience. Specializes in Laravel, React, Next.js, NestJS, PHP, and JavaScript. 26+ projects delivered.",
    siteName: "Muhamad Riffa Faturahman Portfolio",
    images: [
      {
        url: "/logo-no-bg.png",
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
    images: ["/logo-no-bg.png"],
  },
  icons: {
    icon: "/logo-no-bg.png",
    apple: "/logo-no-bg.png",
  },
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
