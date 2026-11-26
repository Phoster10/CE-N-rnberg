"use client";

import { useEffect, useState } from "react";
import type { ServiceTime } from "@/types/database";

function getNextServiceDate(services: ServiceTime[]): { date: Date; label: string } | null {
  if (services.length === 0) return null;
  const now = new Date();
  let best: { date: Date; label: string } | null = null;

  for (const s of services) {
    const [h, m] = s.time.split(":").map(Number);
    for (let addWeeks = 0; addWeeks < 2; addWeeks++) {
      const candidate = new Date(now);
      const dayDiff = (s.day_of_week - now.getDay() + 7) % 7;
      candidate.setDate(now.getDate() + dayDiff + addWeeks * 7);
      candidate.setHours(h, m, 0, 0);
      if (candidate > now && (!best || candidate < best.date)) {
        best = { date: candidate, label: s.label };
        break;
      }
    }
  }
  return best;
}

const FALLBACK: ServiceTime[] = [
  { id: "f1", label: "Sunday Service", day_of_week: 0, time: "10:00", is_next_feature: true, created_at: "" },
];

export default function CountdownNextService({ services }: { services: ServiceTime[] }) {
  const list = services.length > 0 ? services : FALLBACK;
  const [remaining, setRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(
    null
  );
  const [label, setLabel] = useState("Sunday Service");

  useEffect(() => {
    const tick = () => {
      const next = getNextServiceDate(list);
      if (!next) return;
      setLabel(next.label);
      const diff = Math.max(0, next.date.getTime() - Date.now());
      setRemaining({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const units = [
    { value: remaining?.days ?? 0, label: "Days" },
    { value: remaining?.hours ?? 0, label: "Hrs" },
    { value: remaining?.minutes ?? 0, label: "Min" },
    { value: remaining?.seconds ?? 0, label: "Sec" },
  ];

  return (
    <div className="glass flex flex-col gap-5 rounded-3xl p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-400" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">Next Service</p>
          <p className="font-display text-lg font-medium text-white">{label}</p>
        </div>
      </div>
      <div className="flex gap-2 sm:gap-3" role="timer" aria-live="off" aria-label={`Countdown to ${label}`}>
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex w-14 flex-col items-center rounded-2xl bg-white/[0.06] py-2.5 ring-1 ring-white/10 sm:w-16">
              <span className="font-display text-2xl font-semibold tabular-nums text-white">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-navy-300">{u.label}</span>
            </div>
            {i < units.length - 1 && <span className="hidden text-navy-400 sm:block">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
