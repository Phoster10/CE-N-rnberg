"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-6 space-y-3">
      {faqs.map((f, i) => (
        <div key={f.q} className="overflow-hidden rounded-xl border border-navy-100">
          <button
            className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-navy-900"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            {f.q}
            <ChevronDown className={cn("h-4 w-4 transition-transform", openIndex === i && "rotate-180")} />
          </button>
          {openIndex === i && <p className="px-5 pb-4 text-sm text-navy-500">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}
