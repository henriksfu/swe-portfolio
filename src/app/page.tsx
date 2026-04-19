import { AboutSection } from "@/components/about-section";
import { CodeAtmosphere } from "@/components/code-atmosphere";
import { ContactSection } from "@/components/contact-section";
import { CustomCursor } from "@/components/custom-cursor";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeSection } from "@/components/resume-section";
import { SiteNav } from "@/components/site-nav";
import { SkillsSection } from "@/components/skills-section";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <CodeAtmosphere />
      <main id="top" className="relative z-[1]">
        <CustomCursor />
        <SiteNav socials={portfolio.socials} />
        <HeroSection hero={portfolio.hero} />
        <AboutSection about={portfolio.about} education={portfolio.education} />
        <SkillsSection
          skills={portfolio.skills}
          capabilities={portfolio.capabilities}
        />
        <ProjectsSection projects={portfolio.projects} />
        <ExperienceSection experience={portfolio.experience} />
        <ResumeSection resume={portfolio.resume} />
        <ContactSection contact={portfolio.contact} socials={portfolio.socials} />

        {/* Footer */}
        <footer className="shell border-t py-8 hairline">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} Henrik Sachdeva
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Handcrafted with intention
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

