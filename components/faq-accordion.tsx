"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-8 divide-y divide-navy-100 border-y border-navy-100">
      {faqs.map((f, i) => {
        const open = openIndex === i;
        return (
          <div key={f.q}>
            <button
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <span
                className={cn(
                  "font-display text-xl font-medium transition-colors",
                  open ? "text-navy-900" : "text-navy-700 group-hover:text-navy-900"
                )}
              >
                {f.q}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  open ? "rotate-45 bg-gold-gradient text-navy-950" : "bg-navy-50 text-navy-700"
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-xl pb-6 leading-relaxed text-navy-500">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
