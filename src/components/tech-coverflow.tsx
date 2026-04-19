"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SiDocker,
  SiFastify,
  SiGithubactions,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

const technologies: { label: string; icon: IconType }[] = [
  { label: "TypeScript", icon: SiTypescript },
  { label: "React", icon: SiReact },
  { label: "Next.js", icon: SiNextdotjs },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "Fastify", icon: SiFastify },
  { label: "PostgreSQL", icon: SiPostgresql },
  { label: "Prisma", icon: SiPrisma },
  { label: "Redis", icon: SiRedis },
  { label: "Docker", icon: SiDocker },
  { label: "GitHub Actions", icon: SiGithubactions },
  { label: "Tailwind", icon: SiTailwindcss },
  { label: "Vercel", icon: SiVercel },
];

const tripled = [...technologies, ...technologies, ...technologies];
const ITEM_GAP = 72;
const SINGLE_SET_WIDTH = technologies.length * ITEM_GAP;
const SPEED = 26;

export function TechCoverflow() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const speedMultiplier = useRef(1);
  const [hovered, setHovered] = useState(false);

  const targetMultiplier = hovered ? 0.18 : 1;

  const animate = useCallback(
    (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      speedMultiplier.current +=
        (targetMultiplier - speedMultiplier.current) * 0.04;

      offsetRef.current -= SPEED * speedMultiplier.current * delta;

      if (Math.abs(offsetRef.current) >= SINGLE_SET_WIDTH) {
        offsetRef.current += SINGLE_SET_WIDTH;
      }

      if (stripRef.current) {
        stripRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      // Per-item depth styling based on distance from center
      if (trackRef.current) {
        const trackRect = trackRef.current.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width / 2;

        for (const el of itemRefs.current) {
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          const itemCenterX = rect.left + rect.width / 2;
          const dist = Math.abs(itemCenterX - centerX);
          const maxDist = trackRect.width / 2;
          const t = Math.min(dist / maxDist, 1);

          // Cubic ease for dramatic center focus
          const ease = t * t * t;

          const scale = 1.35 - ease * 0.7;    // 1.35 → 0.65
          const opacity = 1 - ease * 0.85;     // 1.0 → 0.15
          const blur = ease * 2.4;              // 0 → 2.4px
          const yShift = ease * 4;              // 0 → 4px drift down

          el.style.transform = `scale(${scale}) translateY(${yShift}px)`;
          el.style.opacity = `${opacity}`;
          el.style.filter = blur > 0.15 ? `blur(${blur}px)` : "none";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [targetMultiplier],
  );

  useEffect(() => {
    if (reduceMotion) return;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, reduceMotion]);

  return (
    <div
      ref={trackRef}
      className="tech-carousel"
      aria-label="Technologies"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={stripRef}
        className="tech-carousel-strip"
        style={{ willChange: "transform" }}
      >
        {tripled.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.label}-${i}`}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="tech-carousel-item"
              title={tech.label}
            >
              <Icon aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
