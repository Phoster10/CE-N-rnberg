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
    { value: remaining?.hours ?? 0, label: "Hours" },
    { value: remaining?.minutes ?? 0, label: "Minutes" },
    { value: remaining?.seconds ?? 0, label: "Seconds" },
  ];

  return (
    <div className="glass-light flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">Next Service</p>
        <p className="font-display text-lg font-semibold text-navy-900">{label}</p>
      </div>
      <div className="flex gap-3" role="timer" aria-live="off">
        {units.map((u) => (
          <div key={u.label} className="flex w-16 flex-col items-center rounded-xl bg-navy-900 py-2.5 text-white">
            <span className="font-display text-xl font-bold tabular-nums">{String(u.value).padStart(2, "0")}</span>
            <span className="text-[10px] uppercase tracking-wide text-navy-300">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
