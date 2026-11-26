import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HeroIn from "@/components/motion/hero-in";
import Photo from "@/components/photo";

/**
 * Dark, atmospheric header used at the top of every inner page. The navbar
 * floats transparently over it, so it carries its own top padding.
 */
export default function PageHero({
  title,
  subtitle,
  eyebrow,
  image,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string | null;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy-950 pb-20 pt-40 text-white sm:pb-24 sm:pt-48">
      {image && (
        <>
          <Photo src={image} alt="" fill priority sizes="100vw" className="-z-20 animate-slow-zoom object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/85 via-navy-950/75 to-navy-950" />
        </>
      )}
      <HeroGlow />

      <div className="section relative">
        <HeroIn>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-navy-300" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-navy-500" />}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold-400">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </HeroIn>
        {eyebrow && (
          <HeroIn delay={0.05}>
            <span className="eyebrow mt-8 text-gold-400">{eyebrow}</span>
          </HeroIn>
        )}
        <HeroIn delay={0.1}>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </HeroIn>
        {subtitle && (
          <HeroIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">{subtitle}</p>
          </HeroIn>
        )}
      </div>

      {/* Soft fade into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </section>
  );
}

/** Slowly drifting gold & blue light used behind dark heroes. */
export function HeroGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] animate-aurora rounded-full bg-gold-500/20 blur-[120px]" />
      <div className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] animate-aurora-slow rounded-full bg-navy-400/30 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-aurora rounded-full bg-gold-300/10 blur-[100px]" />
    </div>
  );
}
