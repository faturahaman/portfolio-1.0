import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { EducationSection } from "@/components/sections/education-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { CtaSection } from "@/components/sections/cta-section"
import { Footer } from "@/components/layout/footer"

// Only ProjectsSection is worth code-splitting: it's the one section below the
// fold that is a Client Component, so deferring its chunk actually removes JS
// from the critical path.
//
// The rest are Server Components — they ship zero client JS, so wrapping them
// in dynamic() saved nothing and cost something: each became a lazy boundary
// that mounted after hydration, which is what made scroll-reveal sections show
// up late and need a MutationObserver to catch them.
const ProjectsSection = dynamic(() =>
  import("@/components/projects-section").then((m) => m.ProjectsSection)
)

// Heavy leaf components (RepoModal, CertificationsCarousel) handle their own
// dynamic imports internally.

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
