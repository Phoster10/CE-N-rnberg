import { format } from "date-fns";
import { BookOpen } from "lucide-react";
import PageHero from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { getTodayRhapsody } from "@/lib/data";

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
      <PageHero title="Rhapsody of Realities" crumbs={[{ label: "Home", href: "/" }, { label: "Rhapsody of Realities" }]} />
      <section className="section grid grid-cols-1 gap-10 py-20 lg:grid-cols-3">
        <div className="flex flex-col items-center rounded-2xl bg-navy-gradient p-8 text-center text-white shadow-soft">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-gold-400">
            <BookOpen className="h-7 w-7" />
          </span>
          <p className="mt-4 font-display text-lg font-semibold">Rhapsody of Realities</p>
          <p className="mt-1 text-sm text-navy-300">Daily devotional by Pastor Chris</p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
            Today&apos;s Rhapsody · {format(date, "EEEE, d MMMM yyyy")}
          </p>
          <h2 className="container-heading mt-3 text-left">{title}</h2>
          <p className="mt-2 text-sm font-semibold text-navy-600">{scripture}</p>
          <p className="mt-4 leading-relaxed text-navy-600">{body}</p>
          <Button href="#" variant="secondary" className="mt-6">
            Read More
          </Button>
        </div>
      </section>
    </>
  );
}
