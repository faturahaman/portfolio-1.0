import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { EducationSection } from "@/components/sections/education-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { CtaSection } from "@/components/sections/cta-section"

// Sections are kept synchronous to preserve good initial load time
// Heavy components within sections (RepoModal, CertificationsCarousel) handle dynamic imports internally

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#242424] dark:text-[#ededed] font-sans transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
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
