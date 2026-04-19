import { BriefcaseBusiness, Code2, Globe, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LinkButton } from "@/components/ui/link-button";
import type { ContactData, SocialLink } from "@/data/portfolio";

const iconMap = {
  email: Mail,
  github: Code2,
  linkedin: BriefcaseBusiness,
  website: Globe,
} as const;

export function ContactSection({
  contact,
  socials,
}: {
  contact: ContactData;
  socials: SocialLink[];
}) {
  return (
    <Reveal
      id="contact"
      className="anchor section shell border-t hairline"
      delay={0.1}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <p className="fine-label">Contact</p>
          <div className="section-line" />
          <h2 className="display mt-5 max-w-2xl text-[1.7rem] leading-[1.1] md:text-[2.2rem]">
            {contact.title}
          </h2>
          <p className="soft mt-5 max-w-xl text-[0.93rem] leading-7">
            {contact.description}
          </p>
          <div className="mt-6">
            <LinkButton href={`mailto:${contact.email}`} showArrow={false}>
              <Mail className="h-4 w-4" />
              {contact.email}
            </LinkButton>
          </div>
        </div>

        <div className="glass rounded-[1.75rem] p-5">
          <p className="fine-label px-2 pt-2">Links</p>
          <div className="mt-3 divide-y hairline">
            {socials.map((social) => {
              const Icon = iconMap[social.icon];

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring flex items-center justify-between gap-4 border-b px-2 py-4 text-sm font-medium transition-all duration-300 last:border-b-0 hover:text-[var(--accent)] hover:translate-x-1 hairline"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {social.label}
                  </span>
                  <span className="muted text-xs">Open</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
