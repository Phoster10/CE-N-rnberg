import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only entrance animation for above-the-fold hero content. Unlike Reveal,
 * it plays without waiting for JavaScript, so hero text is never hidden on load.
 */
export default function HeroIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("animate-fade-up", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
