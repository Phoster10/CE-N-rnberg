"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, ExternalLink, Facebook, Video } from "lucide-react";
import { formatBerlin, nextOccurrence, weeklyServices, zoomPrayer, zoomUrl } from "@/lib/schedule";

const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];
const clock = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

/**
 * The recurring services and prayer times. The page is cached, so the dates are
 * recalculated in the browser to keep them current.
 */
export default function RegularGatherings({ renderedAt, facebookUrl }: { renderedAt: number; facebookUrl: string }) {
  const [now, setNow] = useState(() => new Date(renderedAt));

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const services = weeklyServices
    .map((s) => ({ ...s, start: nextOccurrence(now, [s.weekday], [s.hour], 2) }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
  const nextPrayer = nextOccurrence(now, EVERY_DAY, zoomPrayer.hours, 1);

  return (
    <div className="space-y-6">
      {services.map((s) => (
        <article key={s.title} className={cardClass}>
          <DateBlock date={s.start} />
          <div className="p-8">
            <h3 className="font-display text-3xl font-semibold text-navy-900">{s.title}</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-navy-500">{s.description}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-500">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-600" />
                {clock(s.hour)}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gold-600" />
                Every {formatBerlin(s.start, { weekday: "long" })}
              </span>
              <span className="flex items-center gap-2">
                <Video className="h-4 w-4 text-gold-600" />
                Live on Facebook &amp; Zoom
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 px-8 pb-8 md:flex-col md:justify-center md:pb-0">
            <JoinLink href={zoomUrl}>
              Join on Zoom <ExternalLink className="h-4 w-4" />
            </JoinLink>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              <Facebook className="h-4 w-4" /> Watch on Facebook
            </a>
          </div>
        </article>
      ))}

      <article className={cardClass}>
        <DateBlock date={nextPrayer} />
        <div className="p-8">
          <h3 className="font-display text-3xl font-semibold text-navy-900">{zoomPrayer.title}</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-navy-500">{zoomPrayer.description}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-500">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-600" />
              {zoomPrayer.hours.map(clock).join(" · ")} (German time)
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold-600" />
              Every day
            </span>
            <span className="flex items-center gap-2">
              <Video className="h-4 w-4 text-gold-600" />
              Zoom
            </span>
          </div>
        </div>
        <div className="flex items-center px-8 pb-8 md:pb-0">
          <JoinLink href={zoomUrl}>
            Join on Zoom <ExternalLink className="h-4 w-4" />
          </JoinLink>
        </div>
      </article>
    </div>
  );
}

const cardClass =
  "grid grid-cols-1 overflow-hidden rounded-4xl border border-navy-100/70 bg-white shadow-card transition-all duration-500 hover:shadow-lift md:grid-cols-[auto_1fr_auto]";

function JoinLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-transform hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

function DateBlock({ date }: { date: Date }) {
  return (
    <div className="flex min-h-[10rem] flex-col items-center justify-center bg-navy-gradient px-10 py-8 text-center text-white md:w-64">
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
        {formatBerlin(date, { month: "long" })}
      </span>
      <span className="block font-display text-7xl font-semibold leading-none">{formatBerlin(date, { day: "2-digit" })}</span>
      <span className="mt-1 block text-sm text-navy-200">{formatBerlin(date, { weekday: "long" })}</span>
    </div>
  );
}
