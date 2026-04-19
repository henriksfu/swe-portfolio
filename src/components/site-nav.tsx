"use client";

import { BriefcaseBusiness, Mail, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SiGithub } from "react-icons/si";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/lib/use-active-section";
import type { SocialLink } from "@/data/portfolio";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

const iconMap = {
  email: Mail,
  github: SiGithub,
  linkedin: BriefcaseBusiness,
  website: BriefcaseBusiness,
} as const;

export function SiteNav({ socials }: { socials: SocialLink[] }) {
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleSocials = socials.filter((social) =>
    ["github", "linkedin", "email"].includes(social.icon),
  );

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 py-3"
        style={{
          background:
            "linear-gradient(180deg, var(--nav-bg), transparent)",
        }}
      >
        <div className="nav-object shell flex h-[3.4rem] items-center justify-between gap-4 rounded-full px-3">
          <a
            href="#top"
            className="focus-ring flex items-center gap-3 rounded-full"
            aria-label="Go to top"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-full border text-xs font-bold tracking-tight transition-colors hover:bg-[var(--surface-2)]"
              style={{ borderColor: "var(--line)" }}
            >
              HS
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              Henrik Sachdeva
            </span>
          </a>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link focus-ring relative rounded-full px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)] ${
                    isActive
                      ? "nav-link-active text-[var(--text)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="nav-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Social icons — desktop */}
            <div className="hidden items-center gap-0.5 md:flex">
              {visibleSocials.map((social) => {
                const Icon = iconMap[social.icon];

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring grid h-8 w-8 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                    aria-label={social.label}
                  >
                    <Icon className="h-[14px] w-[14px]" />
                  </a>
                );
              })}
            </div>

            <ThemeToggle />

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="focus-ring grid h-8 w-8 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.5rem] z-30 mx-auto w-[min(1120px,calc(100%-2.5rem))] xl:hidden"
          >
            <nav className="glass rounded-2xl p-4">
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--surface-2)] ${
                        isActive
                          ? "text-[var(--text)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      )}
                      {item.label}
                    </a>
                  );
                })}
              </div>

              {/* Social links in mobile */}
              <div className="mt-3 flex gap-2 border-t pt-3 hairline">
                {visibleSocials.map((social) => {
                  const Icon = iconMap[social.icon];

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring grid h-9 w-9 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
