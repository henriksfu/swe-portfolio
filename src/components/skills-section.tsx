"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import type { Capability, SkillGroup } from "@/data/portfolio";

const capabilityVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function SkillsSection({
  capabilities,
  skills,
}: {
  capabilities: Capability[];
  skills: SkillGroup[];
}) {
  return (
    <Reveal
      id="skills"
      className="anchor section shell border-t hairline"
      delay={0.04}
    >
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionIntro
          eyebrow="Skills"
          title="A practical stack for building and evaluating systems."
          description="The emphasis is not on listing every tool. It is on the tools I have used to make systems work end to end."
        />

        <div>
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map((capability, i) => (
              <motion.article
                key={capability.label}
                custom={i}
                variants={capabilityVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px" }}
                className="glass rounded-[1.5rem] p-5"
              >
                <p className="text-sm font-semibold">{capability.label}</p>
                <p className="soft mt-3 text-sm leading-6">
                  {capability.text}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 grid gap-6">
            {skills.map((group) => (
              <div key={group.label} className="border-t pt-6 hairline">
                <p className="fine-label">{group.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1.5 text-sm text-[var(--text-soft)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--text)] hover:shadow-[0_0_0_1px_var(--accent-glow)] hairline"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
