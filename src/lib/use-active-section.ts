"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "about",
  "skills",
  "projects",
  "experience",
  "resume",
  "contact",
];

/**
 * Tracks which section is currently most visible in the viewport.
 * Uses IntersectionObserver with a negative root margin to bias
 * toward the section occupying the upper-center of the screen.
 */
export function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }
          });

          // Pick the section with the highest intersection ratio
          let best = "";
          let bestRatio = 0;
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sectionId;
            }
          });

          if (best) setActive(best);
        },
        {
          // Bias observer toward the upper portion of the viewport
          rootMargin: "-20% 0px -50% 0px",
          threshold: [0, 0.15, 0.3, 0.5, 0.7, 1],
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return active;
}
