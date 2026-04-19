"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import type { AboutData, EducationData } from "@/data/portfolio";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function AboutSection({
  about,
  education,
}: {
  about: AboutData;
  education: EducationData;
}) {
  return (
    <Reveal id="about" className="anchor section shell border-t hairline">
      <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <SectionIntro eyebrow="About" title={about.title} description={about.body} />

        <div className="grid gap-4">
          {about.points.map((point, i) => (
            <motion.article
              key={point.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="glass rounded-[1.5rem] p-6"
            >
              <p className="fine-label">{point.label}</p>
              <p className="soft mt-3 text-[0.92rem] leading-6">{point.text}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 border-t pt-10 hairline md:grid-cols-[0.6fr_1.4fr]">
        <div>
          <p className="fine-label">Education</p>
          <div className="section-line" />
          <h3 className="heading mt-3 text-[1.1rem]">Computing Science</h3>
        </div>
        <div className="grid gap-5">
          {education.entries.map((entry) => (
            <div
              key={entry.school}
              className="grid gap-3 border-b pb-5 last:border-b-0 last:pb-0 hairline md:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="text-[0.95rem] font-semibold tracking-tight">
                  {entry.school}
                </p>
                <p className="soft mt-1 text-[0.92rem] leading-6">
                  {entry.degree}
                </p>
              </div>
              <div className="text-sm md:text-right">
                <p className="font-semibold">{entry.period}</p>
                <p className="muted mt-1">{entry.location}</p>
              </div>
            </div>
          ))}
          <div>
            <p className="fine-label">Relevant Focus</p>
            <p className="soft mt-2 text-[0.92rem] leading-6">
              {education.focus}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
