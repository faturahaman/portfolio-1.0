import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import dynamic from "next/dynamic"

const ProjectsSection = dynamic(() => import("@/components/projects-section").then(m => m.ProjectsSection))
const SkillsSection = dynamic(() => import("@/components/sections/skills-section").then(m => m.SkillsSection))
const EducationSection = dynamic(() => import("@/components/sections/education-section").then(m => m.EducationSection))
const CertificationsSection = dynamic(() => import("@/components/sections/certifications-section").then(m => m.CertificationsSection))
const CtaSection = dynamic(() => import("@/components/sections/cta-section").then(m => m.CtaSection))
const Footer = dynamic(() => import("@/components/layout/footer").then(m => m.Footer))

// Sections are kept synchronous to preserve good initial load time
// Heavy components within sections (RepoModal, CertificationsCarousel) handle dynamic imports internally

export default function Home() {
  return (
    <div className="relative z-10 min-h-screen bg-white/90 dark:bg-[#111111]/90 text-[#242424] dark:text-[#ededed] font-sans transition-colors duration-300">
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-black text-white px-4 py-2 rounded-md font-bold">
        Skip to content
      </a>
      <Navbar />

      <main id="main-content" className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <div className="scroll-fade-section">
          <HeroSection />
        </div>
        <div className="scroll-fade-section">
          <StatsSection />
        </div>
        <div className="scroll-fade-section">
          <ExperienceSection />
        </div>
        <div className="scroll-fade-section">
          <ProjectsSection />
        </div>
        <div className="scroll-fade-section">
          <SkillsSection />
        </div>
        <div className="scroll-fade-section">
          <EducationSection />
        </div>
        <div className="scroll-fade-section">
          <CertificationsSection />
        </div>
        <div className="scroll-fade-section">
          <CtaSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}
