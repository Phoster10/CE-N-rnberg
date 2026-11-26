"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades and lifts its children into view the first time they scroll on-screen.
 * Use `delay` to stagger siblings. Content is visible in the server HTML and is
 * only hidden if it starts below the fold, so nothing waits on JavaScript to
 * appear. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ease = `0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;

  return (
    <div
      ref={ref}
      className={className}
      style={
        state === "hidden"
          ? { opacity: 0, transform: `translateY(${y}px)` }
          : state === "shown"
            ? { transition: `opacity ${ease}, transform ${ease}` }
            : undefined
      }
    >
      {children}
    </div>
  );
}
