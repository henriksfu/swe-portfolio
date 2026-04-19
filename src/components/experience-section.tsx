"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import type { Experience } from "@/data/portfolio";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function ExperienceSection({
  experience,
}: {
  experience: Experience[];
}) {
  return (
    <Reveal
      id="experience"
      className="anchor section shell border-t hairline"
      delay={0.07}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionIntro
          eyebrow="Experience"
          title="Applied work in live products and team builds."
          description="A mix of professional web development and fast-paced product engineering where reliability, debugging, and delivery mattered."
        />
        <p className="max-w-xs text-sm leading-6 text-[var(--text-muted)]">
          Experience is separated from projects so the portfolio stays focused
          while still showing real-world ownership.
        </p>
      </div>

      <div className="mt-10 grid gap-0">
        {experience.map((item, i) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="row-highlight grid gap-6 border-t py-8 hairline lg:grid-cols-[0.75fr_1.25fr]"
          >
            <div>
              <p className="fine-label">{item.period}</p>
              <h3 className="heading mt-3 text-[1.1rem]">{item.company}</h3>
              <p className="soft mt-2 text-sm">{item.role}</p>
              <p className="muted mt-1 text-sm">{item.location}</p>
            </div>

            <div>
              <p className="soft max-w-2xl text-[0.92rem] leading-7">
                {item.summary}
              </p>
              <ul className="mt-4 space-y-2.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm leading-6 text-[var(--text-soft)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium text-[var(--text-soft)] hairline"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Reveal>
  );
}
