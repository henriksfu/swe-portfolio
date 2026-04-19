import { ProjectCase } from "@/components/project-case";
import { ProjectsCodeBackdrop } from "@/components/projects-code-backdrop";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/section-intro";
import type { Project } from "@/data/portfolio";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <Reveal
      id="projects"
      className="anchor section shell relative isolate border-t hairline"
      delay={0.06}
    >
      <ProjectsCodeBackdrop />
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionIntro
          eyebrow="Projects"
          title="Software projects with real engineering decisions."
          description="Each project is presented by problem, implementation choices, debugging constraints, and measurable outcome."
        />
        <p className="max-w-xs text-sm leading-6 text-[var(--text-muted)]">
          The focus is software engineering first: product behavior, data flow,
          tooling, evaluation, and practical tradeoffs.
        </p>
      </div>

      <div className="relative z-10 mt-10 grid gap-6">
        {projects.map((project, index) => (
          <ProjectCase key={project.title} project={project} index={index} />
        ))}
      </div>
    </Reveal>
  );
}
