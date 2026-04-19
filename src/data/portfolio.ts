type LinkVariant = "primary" | "secondary" | "quiet";
type SocialIcon = "email" | "github" | "linkedin" | "website";

export type SocialLink = {
  href: string;
  icon: SocialIcon;
  label: string;
};

export type HeroData = {
  email: string;
  headline: string;
  intro: string;
  location: string;
  name: string;
  stats: { label: string; value: string }[];
  subtitle: string;
};

export type AboutData = {
  body: string;
  points: { label: string; text: string }[];
  title: string;
};

export type EducationData = {
  entries: {
    degree: string;
    location: string;
    period: string;
    school: string;
  }[];
  focus: string;
};

export type Capability = {
  label: string;
  text: string;
};

export type SkillGroup = {
  items: string[];
  label: string;
};

export type Project = {
  highlights: string[];
  impact: string;
  links: { href: string; label: string; variant: LinkVariant }[];
  period: string;
  problem: string;
  stack: string[];
  summary: string;
  title: string;
};

export type Experience = {
  company: string;
  highlights: string[];
  location: string;
  period: string;
  role: string;
  stack: string[];
  summary: string;
};

export type ResumeData = {
  coursework: string[];
  file: string;
  summary: string;
};

export type ContactData = {
  description: string;
  email: string;
  title: string;
};

const email = "sachdevahenrik2002@gmail.com";

export const portfolio: {
  about: AboutData;
  capabilities: Capability[];
  contact: ContactData;
  education: EducationData;
  experience: Experience[];
  hero: HeroData;
  projects: Project[];
  resume: ResumeData;
  skills: SkillGroup[];
  socials: SocialLink[];
} = {
  hero: {
    email,
    location: "Vancouver, BC",
    name: "Henrik Sachdeva",
    subtitle: "Software Engineer · Full-Stack / Backend / Systems",
    headline:
      "Software engineer focused on reliable systems and clean execution.",
    intro:
      "Fresh Computing Science graduate from Simon Fraser University building distributed services, real-time collaboration systems, and systems tooling. I care about clean architecture, reliability, testing, and shipping software that is understandable under real constraints.",
    stats: [
      { label: "Status", value: "Fresh Graduate" },
      { label: "Focus", value: "Full-Stack + Backend" },
      { label: "Location", value: "Vancouver" },
    ],
  },
  socials: [
    { label: "Email", href: `mailto:${email}`, icon: "email" },
    { label: "GitHub", href: "https://github.com/henriksachdeva", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/henrik-sachdeva-62b103203/",
      icon: "linkedin",
    },
  ],
  about: {
    title: "I build full-stack products with backend depth and systems discipline.",
    body:
      "My strongest projects involve production-style software: distributed monitoring services, real-time collaborative workspaces, processor simulation tooling, and e-commerce maintenance. The common thread is engineering discipline: data modeling, service boundaries, synchronization, testing, automation, and clear implementation.",
    points: [
      {
        label: "Engineering depth",
        text:
          "Built projects involving distributed services, message queues, WebSockets, WebRTC, CRDTs, PostgreSQL, Redis, CI gates, and C++ simulation tooling.",
      },
      {
        label: "Engineering style",
        text:
          "I prefer explicit systems with visible tradeoffs: clear service boundaries, deterministic behavior, reproducible tooling, and readable implementation over clever abstractions.",
      },
      {
        label: "Role fit",
        text:
          "Looking for internship, co-op, or new-grad software engineering roles across backend, full-stack, tooling, and applied AI product engineering.",
      },
    ],
  },
  education: {
    entries: [
      {
        school: "Fraser International College",
        degree: "Bachelor of Computing Science pathway",
        location: "Burnaby, BC",
        period: "2022 - 2023",
      },
      {
        school: "Simon Fraser University",
        degree:
          "Bachelor of Computing Science, Concentration in Artificial Intelligence",
        location: "Burnaby, BC",
        period: "2023 - 2026",
      },
    ],
    focus:
      "Machine Learning, Deep Learning, NLP, AI, Data Structures & Algorithms, Probability, Linear Algebra.",
  },
  capabilities: [
    {
      label: "Backend systems",
      text:
        "Node.js, Fastify, REST APIs, PostgreSQL, Redis, Prisma, queues, validation, and service-oriented design.",
    },
    {
      label: "Real-time software",
      text:
        "WebSockets, WebRTC, Yjs CRDTs, reconnect handling, room-based collaboration, and synchronization logic.",
    },
    {
      label: "Systems tooling",
      text:
        "C++ simulation, Bash automation, Python analysis, reproducible experiment runs, and CI/CD quality gates.",
    },
  ],
  skills: [
    {
      label: "Software Engineering",
      items: ["TypeScript", "JavaScript", "C++", "Python", "Bash", "Git", "Linux"],
    },
    {
      label: "Backend & Systems",
      items: ["Node.js", "Fastify", "REST APIs", "Distributed Systems", "BullMQ", "System Design"],
    },
    {
      label: "Data & Persistence",
      items: ["PostgreSQL", "Redis", "Prisma", "Data Modeling", "Zod", "Message Queues"],
    },
    {
      label: "Real-Time & Quality",
      items: ["WebSockets", "WebRTC", "Yjs", "Docker", "GitHub Actions", "Vitest", "CMake/Make"],
    },
  ],
  projects: [
    {
      title: "SignalOps — Distributed Uptime Monitor",
      period: "Apr 2026",
      impact: "5-service distributed monitor",
      problem:
        "Uptime monitoring needs reliable checks, durable state, and alerting that avoids noisy notifications when services flap.",
      summary:
        "Built an end-to-end distributed uptime monitor with separate services for the frontend, API, job processing, persistence, and queue-backed checks. The system tracks monitor state transitions, sends Discord alerts, and uses CI gates to prevent regressions.",
      stack: [
        "TypeScript",
        "Node.js",
        "Fastify",
        "Next.js",
        "PostgreSQL",
        "Prisma",
        "Redis",
        "BullMQ",
        "Docker",
        "GitHub Actions",
      ],
      highlights: [
        "Designed a 5-service architecture with queue-backed background checks and persistent monitor state.",
        "Implemented a 4-state transition engine for UP, DEGRADED, DOWN, and PAUSED monitors to reduce alert noise.",
        "Added lint, typecheck, and test gates in CI using GitHub Actions to protect production-quality behavior.",
      ],
      links: [
        {
          label: "Live",
          href: "https://concord-iv8m.onrender.com/",
          variant: "primary",
        },
        {
          label: "Request walkthrough",
          href: "mailto:sachdevahenrik2002@gmail.com?subject=SignalOps%20Walkthrough",
          variant: "secondary",
        },
      ],
    },
    {
      title: "Concord — Real-Time Collaborative Workspace",
      period: "Apr 2026",
      impact: "CRDT-based collaboration",
      problem:
        "Collaborative editors need conflict-safe synchronization when multiple users draw and write code in the same room.",
      summary:
        "Built a real-time collaborative workspace where users can concurrently draw and write code through room-based sessions. The system uses shared CRDT models and a custom Next.js + Node websocket runtime with reconnect handling.",
      stack: [
        "TypeScript",
        "Next.js 14",
        "Node.js",
        "Tailwind CSS",
        "Yjs",
        "WebRTC",
        "WebSockets",
        "Docker",
        "Render/Fly.io",
      ],
      highlights: [
        "Implemented room-based collaboration for concurrent drawing and code editing.",
        "Used Y.Map, Y.Array, and Y.Text CRDT shared models to support conflict-safe synchronization.",
        "Engineered websocket reconnect handling to improve reliability during real-time sessions.",
      ],
      links: [
        {
          label: "Request walkthrough",
          href: "mailto:sachdevahenrik2002@gmail.com?subject=Concord%20Walkthrough",
          variant: "primary",
        },
        { label: "Resume", href: "/resume-henrik-sachdeva.pdf", variant: "secondary" },
      ],
    },
    {
      title: "Henrik Sachdeva Portfolio",
      period: "Apr 2026",
      impact: "Production portfolio site",
      problem:
        "A software engineering portfolio needs to communicate technical depth quickly without feeling like a generic template or resume dump.",
      summary:
        "Designed and built this portfolio as a handcrafted Next.js application with a restrained luxury-inspired visual system, persistent light/dark themes, subtle motion, and project case studies focused on engineering decisions.",
      stack: [
        "TypeScript",
        "Next.js",
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Accessibility",
        "Responsive Design",
      ],
      highlights: [
        "Built a reusable component structure for navigation, theme handling, project case studies, section reveals, and custom link buttons.",
        "Implemented a persisted light/dark theme system with custom CSS variables instead of relying on default component-library styling.",
        "Added refined motion and a blurred code backdrop scoped to the Projects section while preserving readability and reduced-motion support.",
      ],
      links: [
        {
          label: "Live",
          href: "https://www.henriksachdeva.dev",
          variant: "primary",
        },
        {
          label: "Request walkthrough",
          href: "mailto:sachdevahenrik2002@gmail.com?subject=Portfolio%20Website%20Walkthrough",
          variant: "secondary",
        },
      ],
    },
    {
      title: "Simple Processor Pipeline Simulator",
      period: "Apr 2026",
      impact: "72 deterministic runs",
      problem:
        "Processor pipeline experiments need deterministic simulation, repeatable runs, and clear statistical reporting across configurations.",
      summary:
        "Built a cycle-accurate, in-order, 2-wide processor pipeline simulator and experiment toolchain. The project automated batch runs across pipeline depths and workloads, then generated reproducible reports with statistical analysis.",
      stack: ["C++17", "Bash", "Python", "CMake/Make", "Automation", "Data Reporting"],
      highlights: [
        "Simulated four pipeline depths across three workloads and captured execution statistics across 72 runs.",
        "Automated batch experiment execution and generated reports with means, interaction effects, and ANOVA-based analysis.",
        "Packaged build targets, documentation, and scripts so experiments can be rerun across depth, trace, and replication configurations.",
      ],
      links: [
        {
          label: "Request walkthrough",
          href: "mailto:sachdevahenrik2002@gmail.com?subject=Processor%20Simulator%20Walkthrough",
          variant: "primary",
        },
        { label: "Resume", href: "/resume-henrik-sachdeva.pdf", variant: "secondary" },
      ],
    },
  ],
  experience: [
    {
      company: "Artisan Smoke Shop",
      role: "Full Stack Developer",
      location: "Surrey, BC",
      period: "Oct 2025 – Present",
      summary:
        "Maintaining and customizing a live WordPress/WooCommerce storefront for a retail business with 500+ products, customer workflows, payment integrations, and ongoing performance needs.",
      stack: ["WordPress", "WooCommerce", "Elementor", "Astra", "HTML", "CSS", "JavaScript", "PHP"],
      highlights: [
        "Customized and maintained a WooCommerce catalog with 500+ products across vapes and accessories.",
        "Improved mobile responsiveness and UI quality using Elementor, Astra, HTML, CSS, and JavaScript.",
        "Configured plugins for secure payments, inventory management, and customer workflows while supporting 24/7 storefront availability.",
      ],
    },
    {
      company: "JourneyHacks by SFU Surge",
      role: "Hackathon Developer — Real-Time Coding Platform",
      location: "Burnaby, BC",
      period: "Feb 2025",
      summary:
        "Built backend pieces for a real-time competitive coding game with team-based API integration and live leaderboard behavior under hackathon time constraints.",
      stack: ["APIs", "Backend Debugging", "Leaderboard Logic", "Bash", "Linux Tools", "Automation"],
      highlights: [
        "Implemented and debugged backend updates that supported live team-based competition mechanics.",
        "Used terminal tooling and automation scripts to diagnose issues quickly and unblock the team.",
        "Helped ship an interactive product experience with real-time behavior rather than a static prototype.",
      ],
    },
  ],
  resume: {
    file: "/resume-henrik-sachdeva.pdf",
    summary:
      "Concise version of my education, full-stack work, systems projects, and technical skills. The site expands on the engineering decisions behind the resume bullets.",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Probability",
      "Linear Algebra",
    ],
  },
  contact: {
    title: "Let’s talk about software engineering roles.",
    description:
      "I’ve graduated and am looking for new-grad software engineering roles where I can contribute to real systems, take ownership, and keep growing quickly.",
    email,
  },
};
