export interface ExperienceEntry {
  title: string
  company: string
  period: string
  bullets: string[]
  highlights: Record<number, string> // bullet index → highlighted text within that bullet
  tags: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: "Internship — Application Support & Website Developer",
    company: "DISKOMINFO Bogor City",
    period: "Aug 2025 – Nov 2026",
    bullets: [
      "Developed official government website (kominfo.kotabogor.go.id) using React and Laravel",
      "Built CMS system with 15+ features (CRUD, authentication, role management, dashboard)",
      "Developed and integrated 20+ REST API endpoints for admin panel",
      "Reduced content update time by 60–70% through CMS automation",
      "Managed structured content data (articles, pages, media) with improved efficiency",
    ],
    highlights: { 0: "kominfo.kotabogor.go.id", 3: "60–70%" },
    tags: ["React", "Laravel", "REST API", "CMS", "PHP"],
  },
  {
    title: "Internship — Application Support & Website Developer",
    company: "DISKOMINFO Bogor City",
    period: "Jan 2026 – Mar 2026",
    bullets: [
      "Developed a multi-tenant puskesmas system supporting 5+ tenants using NestJS and Next.js",
      "Built and maintained 25+ REST API endpoints for system operations and data integration",
      "Optimized database performance (MongoDB → MySQL), improving query efficiency by 30–40%",
      "Implemented authentication & authorization (JWT/RBAC) for secure multi-user access",
      "Managed and processed 1000+ records of government data with high accuracy",
    ],
    highlights: { 0: "NestJS and Next.js", 2: "30–40%" },
    tags: ["NestJS", "Next.js", "MongoDB", "MySQL", "JWT", "RBAC"],
  },
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "Jan 2024 – Present",
    bullets: [
      "Developed 5+ web applications for clients using JavaScript, PHP, and MySQL",
      "Improved website performance to 80–95+ PageSpeed score through optimization",
      "Built 10+ custom features including authentication systems, dashboards, and API integrations",
      "Maintained 100% on-time project delivery rate",
      "Collaborated with clients to translate requirements into scalable technical solutions",
    ],
    highlights: { 1: "80–95+ PageSpeed score", 3: "100% on-time" },
    tags: ["JavaScript", "PHP", "MySQL", "Performance", "API Integration"],
  },
]

export interface SkillGroup {
  category: string
  items: string[]
}

export const SKILLS: SkillGroup[] = [
  { category: "Programming Languages", items: ["PHP", "JavaScript", "Python", "Go"] },
  { category: "Frontend", items: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { category: "Backend", items: ["Laravel", "NestJS", "REST API"] },
  { category: "Database", items: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"] },
  { category: "Tools & DevOps", items: ["Git", "Docker", "Postman"] },
]

export const EDUCATION = {
  degree: "Software Engineering and Game Development",
  school: "SMK Analis Kimia Nusa Bangsa",
  year: "2026",
  gpa: "3.73",
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export const CERTIFICATIONS: Certification[] = [
  { name: "Back-End Development with JavaScript (Node.js)", issuer: "Dicoding", year: "2025" },
  { name: "Fundamental Front-End Web Development", issuer: "Dicoding", year: "2025" },
  { name: "JavaScript Programming Basics", issuer: "Dicoding", year: "2025" },
  { name: "Web Programming Fundamentals", issuer: "Dicoding", year: "2025" },
  { name: "MongoDB for Web Development", issuer: "Codepolitan", year: "2026" },
  { name: "Git & Version Control (GitHub)", issuer: "Dicoding", year: "2025" },
  { name: "PHP Programming", issuer: "Codepolitan", year: "2025" },
]

export const STATS = [
  { value: "26+", label: "Projects Delivered" },
  { value: "10+", label: "Certifications Earned" },
  { value: "100%", label: "On-Time Delivery" },
]

export const PROFILE = {
  name: "Muhamad Riffa Faturahman",
  title: "Website Developer",
  email: "faturahaman.r@gmail.com",
  linkedin: "https://linkedin.com/in/muhamad-riffa-faturahman-71ba5a279",
  github: "https://github.com/faturahaman",
  githubUsername: "faturahaman",
  cv: "/CV_WEBDEVsS.pdf",
  summary: "Results-driven Web Developer with 1+ year of experience building modern web applications and digital solutions using Laravel, React, Next.js, JavaScript, PHP, MySQL, PostgreSQL, MongoDB, NestJS, and Docker.",
}
