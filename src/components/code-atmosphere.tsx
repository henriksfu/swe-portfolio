"use client";

import { useTheme } from "@/components/theme-provider";
import { useEffect, useRef } from "react";

// ————————————————————————————————————————————————
// Floating code glyphs + shooting stars
// ————————————————————————————————————————————————
const GLYPHS = [
  "=>", "{}", "()", "[]", "//", "&&", "||", "!=", "===",
  "const", "let", "fn", "async", "await", "type", "return",
  "::", "<>", "/>", "null", "true", "0x", "/**", "*/",
  "...", "import", "export", ";", "++", "|>", "void",
  "if", "for", "map", "new", "ctx", "req", "res", "db",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  size: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  life: number;
  maxLife: number;
  opacity: number;
  width: number;
  glyph: string;
}

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const PARTICLE_COUNT = 55;
const STAR_MIN_INTERVAL = 2500;
const STAR_MAX_INTERVAL = 6000;

export function CodeAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, mounted } = useTheme();
  const isDarkRef = useRef(theme === "dark");
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<ShootingStar[]>([]);
  const nextStarTime = useRef(0);

  // Keep isDark ref up to date without re-creating particles
  useEffect(() => {
    isDarkRef.current = theme === "dark";
  }, [theme]);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Init particles — scattered across viewport
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.06, 0.14),
      text: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      size: rand(10, 18),
      baseOpacity: rand(0.04, 0.14),
      opacity: 0,
      twinkleSpeed: rand(0.3, 1.2),
      twinklePhase: rand(0, Math.PI * 2),
    }));

    starsRef.current = [];
    nextStarTime.current = performance.now() + rand(800, 2000);

    let lastTime = performance.now();

    function frame(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const isDark = isDarkRef.current;

      ctx!.clearRect(0, 0, w, h);

      // ─── PARTICLES (code glyphs that float like stars) ───
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinklePhase += p.twinkleSpeed * dt;

        // Twinkle: oscillate opacity like stars
        const twinkle = 0.5 + 0.5 * Math.sin(p.twinklePhase);
        p.opacity = p.baseOpacity * (0.3 + 0.7 * twinkle);

        // Wrap
        if (p.x < -40) p.x = w + 30;
        if (p.x > w + 40) p.x = -30;
        if (p.y < -30) p.y = h + 20;
        if (p.y > h + 30) p.y = -20;

        ctx!.save();
        ctx!.globalAlpha = p.opacity;
        ctx!.translate(p.x, p.y);
        ctx!.font = `${p.size}px "SFMono-Regular", "Cascadia Code", "Fira Code", monospace`;
        ctx!.fillStyle = isDark
          ? "rgb(200, 190, 165)"
          : "rgb(80, 75, 65)";
        ctx!.fillText(p.text, 0, 0);
        ctx!.restore();
      }

      // ─── SHOOTING STARS ───
      if (now > nextStarTime.current && starsRef.current.length < 3) {
        const angle = rand(Math.PI * 0.55, Math.PI * 0.85); // sweeps left-downward
        starsRef.current.push({
          x: w + 20,
          y: rand(h * 0.05, h * 0.55),
          angle,
          speed: rand(280, 520),
          length: rand(80, 200),
          life: 0,
          maxLife: rand(1.5, 3.5),
          opacity: rand(0.12, 0.28),
          width: rand(1.2, 2.5),
          glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        });
        nextStarTime.current = now + rand(STAR_MIN_INTERVAL, STAR_MAX_INTERVAL);
      }

      for (let i = starsRef.current.length - 1; i >= 0; i--) {
        const s = starsRef.current[i];
        s.life += dt;

        if (s.life > s.maxLife) {
          starsRef.current.splice(i, 1);
          continue;
        }

        const progress = s.life / s.maxLife;
        const alpha =
          progress < 0.1
            ? progress / 0.1
            : progress > 0.6
              ? (1 - progress) / 0.4
              : 1;

        const dist = s.speed * s.life;
        const hx = s.x + Math.cos(s.angle) * dist;
        const hy = s.y + Math.sin(s.angle) * dist;
        const tx = hx - Math.cos(s.angle) * s.length;
        const ty = hy - Math.sin(s.angle) * s.length;

        const op = s.opacity * alpha;

        // Trail gradient
        ctx!.save();
        ctx!.globalAlpha = op;

        const grad = ctx!.createLinearGradient(tx, ty, hx, hy);
        const streakColor = isDark
          ? "rgba(200, 173, 110,"
          : "rgba(74, 103, 65,";
        grad.addColorStop(0, `${streakColor}0)`);
        grad.addColorStop(0.4, `${streakColor}0.6)`);
        grad.addColorStop(1, isDark
          ? "rgba(255, 245, 220, 0.9)"
          : "rgba(120, 140, 110, 0.8)");

        ctx!.strokeStyle = grad;
        ctx!.lineWidth = s.width;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(hx, hy);
        ctx!.stroke();

        // Bright head dot
        ctx!.globalAlpha = Math.min(op * 2.5, 1);
        ctx!.beginPath();
        ctx!.arc(hx, hy, s.width * 2, 0, Math.PI * 2);
        const headGlow = isDark
          ? "rgba(255, 240, 200, 0.9)"
          : "rgba(80, 110, 70, 0.7)";
        ctx!.fillStyle = headGlow;
        ctx!.fill();

        // Code glyph at the head of the streak
        ctx!.globalAlpha = Math.min(op * 1.8, 0.7);
        ctx!.font = `bold 11px monospace`;
        ctx!.fillStyle = isDark
          ? "rgb(255, 245, 220)"
          : "rgb(60, 80, 55)";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(s.glyph, hx + 12, hy - 4);

        ctx!.restore();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
