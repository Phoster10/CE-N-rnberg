import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-navy-gradient py-16 text-white">
      <div className="section">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-xl text-navy-200">{subtitle}</p>}
        <nav className="mt-4 flex items-center gap-1.5 text-sm text-navy-300" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {c.href ? (
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-gold-400">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
