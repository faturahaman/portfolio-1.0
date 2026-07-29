# Muhamad Riffa Faturahman — Web Developer Portfolio

A modern, performant portfolio website showcasing full-stack web development projects, skills, and experience. Built with Next.js, React, and TypeScript with focus on performance, accessibility, and SEO.

**🌐 Live:** [riffatur.com](https://riffatur.com)

---

## ✨ Features

- **Modern UI/UX** — Responsive design with smooth scroll animations
- **Dark Mode Support** — Theme switcher with system preference detection
- **Multi-language** — English & Bahasa Indonesia support
- **Performance Optimized** — Critical CSS inlining, image optimization, lazy loading
- **SEO Optimized** — Structured data (JSON-LD), sitemap, robots.txt, meta tags
- **Accessibility First** — WCAG compliant with alt text and semantic HTML
- **GitHub Integration** — Auto-fetch projects from GitHub API
- **Dynamic Content** — Real-time project data and stats

---

## 🛠 Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

**Tools & DevOps:**
- ESLint & TypeScript
- Git version control
- Vercel (deployment)

**Backend Skills Showcased:**
- Laravel, NestJS, PHP, Node.js
- REST API design
- MySQL, MongoDB, PostgreSQL

---

## 📦 Project Structure

```
web-portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata & structured data
│   ├── page.tsx           # Homepage (one-page site)
│   ├── robots.ts          # SEO robots configuration
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Hero, Experience, Projects, Skills, etc.
│   ├── projects/          # Project cards, pagination, modals
│   ├── ui/                # Theme toggler, language switcher
│   └── theme-provider.tsx # Dark mode provider
├── lib/
│   ├── translations.ts    # i18n translations (EN, ID)
│   ├── github-utils.ts    # GitHub API integration
│   ├── readme-utils.ts    # README parsing
│   └── scroll-animation.ts # Scroll observer utilities
├── data/
│   └── resume.ts          # Profile & resume data
├── public/                # Static assets (images, CV)
├── store/                 # Zustand state management
└── styles/               # Global CSS

```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/faturahaman/web-portfolio.git
cd web-portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

The page auto-refreshes as you edit files (hot reload).

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 🔧 Configuration

### Environment Variables
Currently no environment variables required. GitHub API calls use public endpoints.

### Customization

**Personal Data:** Edit `data/resume.ts` for:
- Profile information
- Skills, experience, education
- Certifications
- Social links

**Translations:** Edit `lib/translations.ts` to update content in English/Indonesian

**Styling:** Modify `globals.css` and Tailwind config for theme customization

---

## 📊 SEO & Performance

**SEO Features:**
- ✅ Sitemap generation (`/sitemap.xml`)
- ✅ Robots configuration (`/robots.txt`)
- ✅ JSON-LD structured data (Person, FAQ schemas)
- ✅ Open Graph & Twitter Card meta tags
- ✅ Semantic HTML & proper heading hierarchy
- ✅ Meta descriptions & keywords per page

**Performance Optimizations:**
- ✅ Critical CSS inlining
- ✅ Image optimization & lazy loading
- ✅ DNS prefetch for external resources
- ✅ Preload high-priority assets
- ✅ Code splitting & dynamic imports

**Core Web Vitals Targets:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Manual Deployment

```bash
npm run build
npm run start
```

Then deploy the `.next` folder to your hosting provider.

---

## 📄 License

© 2024 Muhamad Riffa Faturahman. All rights reserved.

---

## 📞 Contact

- **Email:** [riffatur.io@gmail.com](mailto:riffatur.io@gmail.com)
- **LinkedIn:** [Muhamad Riffa Faturahman](https://linkedin.com/in/muhamad-riffa-faturahman-71ba5a279)
- **GitHub:** [@faturahaman](https://github.com/faturahaman)
- **Website:** [riffatur.com](https://riffatur.com)

---

## 🤝 Contributing

Feedback and suggestions are welcome! Feel free to open an issue or reach out.

---

**Last Updated:** June 2024
