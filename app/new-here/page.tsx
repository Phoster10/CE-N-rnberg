"use client";

import { useState } from "react";
import PageHero from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "What should I wear?", a: "Come as you are! Smart casual is common, but there's no dress code — we're just glad you're here." },
  { q: "What happens during the service?", a: "Expect worship, prayer, an inspiring message from the Word, and a warm welcome from our church family." },
  { q: "Is there children's ministry?", a: "Yes — our Children's Ministry team cares for kids of all ages during the service." },
  { q: "How long is the service?", a: "Services typically run for about an hour and a half." },
  { q: "Can I come if I'm not a Christian?", a: "Absolutely. Everyone is welcome, wherever you are on your journey of faith." },
];

export default function NewHerePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHero title="New Here?" crumbs={[{ label: "Home", href: "/" }, { label: "New Here" }]} />
      <section className="section grid grid-cols-1 gap-10 py-20 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="container-heading text-left">What should I wear?</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-xl border border-navy-100">
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-navy-900"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  {f.q}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", openIndex === i && "rotate-180")}
                  />
                </button>
                {openIndex === i && <p className="px-5 pb-4 text-sm text-navy-500">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-2xl bg-navy-50 p-8 text-center">
          <div className="flex h-48 w-full items-center justify-center rounded-xl bg-navy-gradient text-gold-400">
            <span className="font-display text-lg">Our Church Family</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-navy-900">Plan Your Visit</h3>
          <p className="text-sm text-navy-500">We would love to welcome you!</p>
          <Button href="/visit" variant="primary">
            Plan My Visit
          </Button>
        </div>
      </section>
    </>
  );
}
