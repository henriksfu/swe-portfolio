"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";
import type { Project } from "@/data/portfolio";

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function ProjectCase({
  index,
  project,
}: {
  index: number;
  project: Project;
}) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="glass group rounded-[1.75rem] p-6 md:p-8"
    >
      {/* Top row: number + meta */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="muted text-sm">{project.period}</p>
            <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
            <p className="text-xs font-semibold text-[var(--accent)]">
              {project.impact}
            </p>
          </div>
          <h3 className="display mt-3 text-[1.5rem] leading-[1.08] md:text-[1.85rem]">
            {project.title}
          </h3>
        </div>
        <span className="display hidden text-[2.5rem] leading-none text-[var(--text-muted)] opacity-20 md:block">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="soft measure mt-5 text-[0.92rem] leading-7">
        {project.summary}
      </p>

      {/* Stack tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border px-3 py-1.5 text-xs font-medium text-[var(--text-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--text)] hairline"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="quiet-rule my-6" />

      {/* Problem + Highlights */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="fine-label">Problem</p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
            {project.problem}
          </p>
        </div>
        <div>
          <p className="fine-label">Technical highlights</p>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-6 text-[var(--text-soft)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        {project.links.map((link) => (
          <LinkButton key={link.label} href={link.href} variant={link.variant}>
            {link.label}
          </LinkButton>
        ))}
      </div>
    </motion.article>
  );
}
