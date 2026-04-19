# Henrik Sachdeva Portfolio

A premium software engineering portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion. The visual direction is minimal, editorial, and recruiter-friendly, with a persistent light/dark theme system.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Framer Motion
- shadcn-style local primitives where useful
- Lucide icons

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npx next build --webpack
```

`next build` may use Turbopack by default in this Next.js version. In this sandbox, Turbopack can hit a port-binding restriction, so webpack is the verified build path.

## File Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    about-section.tsx
    contact-section.tsx
    hero-section.tsx
    project-case.tsx
    projects-section.tsx
    resume-section.tsx
    reveal.tsx
    section-intro.tsx
    site-nav.tsx
    skills-section.tsx
    theme-provider.tsx
    theme-toggle.tsx
    ui/
      button.tsx
      link-button.tsx
  data/
    portfolio.ts
  lib/
    utils.ts
public/
  resume-henrik-sachdeva.pdf
```

## Content

All portfolio copy, project data, social links, and resume metadata live in `src/data/portfolio.ts`.

Project links currently use email walkthrough requests and the resume PDF. Replace those with public repos or live demos when available.
# swe-portfolio
