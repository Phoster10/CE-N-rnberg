import { format } from "date-fns";
import { ArrowUpRight, BookOpen } from "lucide-react";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getTodayRhapsody } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Rhapsody of Realities" };

export default async function RhapsodyPage() {
  const entry = await getTodayRhapsody();

  const title = entry?.title ?? "Your Life Is Hid With Christ In God";
  const scripture = entry?.scripture_reference ?? "Colossians 3:3";
  const body =
    entry?.body ??
    "For ye are dead, and your life is hid with Christ in God. Today's reading reminds us of our new identity in Christ.";
  const date = entry?.entry_date ? new Date(entry.entry_date) : new Date();

  return (
    <>
      <PageHero
        eyebrow="Daily Devotional"
        title="Rhapsody of Realities"
        subtitle="Start every day with a fresh word from God's heart, by Pastor Chris Oyakhilome."
        image={entry?.cover_image_url || stockImages.bible}
        crumbs={[{ label: "Home", href: "/" }, { label: "Rhapsody of Realities" }]}
      />
      <section className="section grid grid-cols-1 gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <Reveal className="lg:col-span-4">
          <div className="sticky top-28 overflow-hidden rounded-4xl bg-navy-gradient p-8 text-white shadow-lift">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-navy-950 shadow-glow">
              <BookOpen className="h-6 w-6" />
            </span>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Today</p>
            <p className="mt-2 font-display text-5xl font-semibold leading-none">{format(date, "d")}</p>
            <p className="mt-2 text-lg text-navy-200">{format(date, "EEEE, MMMM yyyy")}</p>
            <div className="my-8 h-px bg-white/10" />
            <p className="text-sm leading-relaxed text-navy-300">
              Rhapsody of Realities is a daily devotional read by millions around the world in thousands of languages.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-8">
          <article className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">Today&apos;s Rhapsody</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 inline-flex rounded-full bg-gold-50 px-4 py-1.5 text-sm font-semibold text-gold-700 ring-1 ring-gold-200">
              {scripture}
            </p>
            <div className="mt-8 space-y-5 text-lg leading-[1.85] text-navy-700 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-gold-600">
              {body
                .split("\n")
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
            <Button
              href="https://rhapsodyofrealities.org"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="mt-10"
            >
              Read more on Rhapsody of Realities <ArrowUpRight className="h-4 w-4" />
            </Button>
          </article>
        </Reveal>
      </section>
    </>
  );
}
