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

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#242424] dark:text-[#ededed] font-sans transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <HeroSection />
        <StatsSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  )
}
