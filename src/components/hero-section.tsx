"use client";

import { ArrowDown, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { TechCoverflow } from "@/components/tech-coverflow";
import { LinkButton } from "@/components/ui/link-button";
import type { HeroData } from "@/data/portfolio";

// Stagger container
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeScale = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HeroSection({ hero }: { hero: HeroData }) {
  return (
    <section className="shell relative pb-8 pt-8 md:pb-12 md:pt-6">
      {/* Ambient gradient behind hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, var(--accent-soft), transparent)",
        }}
      />

      <TechCoverflow />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid items-end gap-12 md:grid-cols-[1fr_0.78fr]"
      >
        <motion.div variants={fadeUp}>
          <h2 className="heading text-[1.8rem] tracking-tight md:text-[2.1rem]">
            {hero.name}
          </h2>
          <p className="fine-label mt-3">{hero.subtitle}</p>
          <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.4rem,4.6vw,3.2rem)] italic leading-[1.04] text-[var(--text)]">
            {hero.headline}
          </h1>
        </motion.div>

        <motion.div
          variants={fadeScale}
          className="glass rounded-[1.75rem] p-6"
        >
          <p className="fine-label">New-grad software engineer</p>
          <p className="soft mt-4 max-w-md text-[0.92rem] leading-7">
            {hero.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <LinkButton href="#projects">View Projects</LinkButton>
            <LinkButton href="/resume-henrik-sachdeva.pdf" variant="secondary">
              Resume
              <Download className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={`mailto:${hero.email}`} variant="quiet">
              Contact
              <Mail className="h-4 w-4" />
            </LinkButton>
          </div>
        </motion.div>
      </motion.div>

      <div className="quiet-rule my-12 md:my-16" />

      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="glass rounded-[1.75rem] p-5 md:grid md:grid-cols-[0.7fr_1.3fr] md:gap-5"
        aria-label="Profile summary"
      >
        <div>
          <p className="fine-label">Profile</p>
          <h2 className="heading mt-3 text-[1.15rem] md:text-[1.3rem]">
            {hero.name}
          </h2>
          <p className="soft mt-2 text-sm">{hero.location}</p>
        </div>

        <dl className="grid gap-0 border-t hairline md:grid-cols-3 md:border-l md:border-t-0">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b py-4 hairline md:border-b-0 md:border-r md:px-5 md:last:border-r-0"
            >
              <dt className="meta-copy">{stat.label}</dt>
              <dd className="mt-2 text-[0.95rem] font-semibold tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <motion.a
          href="#about"
          className="focus-ring mt-3 flex w-fit items-center gap-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)] md:col-start-2"
          whileHover={{ y: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          Continue reading
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </motion.aside>

      {/* Scroll indicator */}
      <motion.div
        className="mx-auto mt-10 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2.2,
            ease: [0.45, 0, 0.55, 1],
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        >
          <ArrowDown className="h-4 w-4 opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
