"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="focus-ring group relative inline-flex h-8 w-16 items-center rounded-full border px-1 transition-colors duration-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--line)",
        color: "var(--text)",
      }}
    >
      <span className="sr-only">Toggle theme</span>
      <motion.span
        layout
        className="absolute h-6 w-6 rounded-full"
        animate={{ x: mounted && isDark ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 440, damping: 28 }}
        style={{
          background: "var(--accent)",
          boxShadow: "0 2px 12px var(--accent-glow)",
        }}
      />
      <span className="relative z-10 grid h-6 w-6 place-items-center">
        <motion.span
          animate={{
            rotate: isDark ? -30 : 0,
            scale: isDark ? 0.8 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Sun
            className="h-3 w-3 transition-colors"
            style={{ color: isDark ? "var(--text-muted)" : "var(--surface)" }}
          />
        </motion.span>
      </span>
      <span className="relative z-10 ml-auto grid h-6 w-6 place-items-center">
        <motion.span
          animate={{
            rotate: isDark ? 0 : 30,
            scale: isDark ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Moon
            className="h-3 w-3 transition-colors"
            style={{ color: isDark ? "var(--surface)" : "var(--text-muted)" }}
          />
        </motion.span>
      </span>
    </button>
  );
}
