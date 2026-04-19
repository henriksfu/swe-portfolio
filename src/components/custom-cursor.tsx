"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Detect touch-only devices
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!visible) setVisible(true);

      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onMouseEnterInteractive = () => setHovering(true);
    const onMouseLeaveInteractive = () => setHovering(false);

    // Animate ring with lerp
    const animate = () => {
      const lerp = 0.12;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    // Track interactive elements
    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select",
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    // Re-observe after DOM updates
    const mutationObs = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select",
      );
      newInteractives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
      mutationObs.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${hovering ? "hovering" : ""}`}
      />
    </>
  );
}
