import { Download } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import { LinkButton } from "@/components/ui/link-button";
import type { ResumeData } from "@/data/portfolio";

export function ResumeSection({ resume }: { resume: ResumeData }) {
  return (
    <Reveal
      id="resume"
      className="anchor section shell border-t hairline"
      delay={0.08}
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionIntro
          eyebrow="Resume"
          title="Compact resume, deeper context here."
          description={resume.summary}
        />

        <div className="glass rounded-[1.75rem] p-6">
          <div className="flex flex-col gap-5 border-b pb-6 hairline sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="fine-label">PDF</p>
              <p className="mt-2 text-[1rem] font-semibold">
                Henrik Sachdeva Resume
              </p>
            </div>
            <LinkButton href={resume.file} variant="primary">
              Download
              <Download className="h-4 w-4" />
            </LinkButton>
          </div>

          <div className="mt-5">
            <p className="fine-label">Relevant coursework</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {resume.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-full border px-3 py-1.5 text-sm text-[var(--text-soft)] hairline"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
