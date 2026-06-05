import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Muhamad Riffa Faturahman — Web Developer",
  description:
    "Portfolio of Muhamad Riffa Faturahman, a results-driven Web Developer with experience in Laravel, React, Next.js, NestJS, and more.",
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
