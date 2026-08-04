"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import type { GalleryItem } from "@/types/database";
import { cn } from "@/lib/utils";

const categories = ["All", "Services", "Events", "Outreach", "Baptisms", "Conferences", "Kids"];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = items; // category filtering is done via album join upstream if needed
  const active = activeIndex !== null ? filtered[activeIndex] : null;

  const go = (dir: 1 | -1) => {
    if (activeIndex === null) return;
    const next = (activeIndex + dir + filtered.length) % filtered.length;
    setActiveIndex(next);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === c ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-600 hover:bg-navy-100"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-navy-100"
          >
            {item.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnail_url ?? item.url}
                alt={item.caption ?? "Gallery photo"}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-navy-gradient text-gold-400">
                Photo
              </div>
            )}
            {item.media_type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                <PlayCircle className="h-8 w-8 text-white" />
              </span>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <button
            className="absolute right-6 top-6 text-white hover:text-gold-400"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            className="absolute left-4 text-white hover:text-gold-400"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
          <button
            className="absolute right-4 text-white hover:text-gold-400"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
          <div className="max-h-[85vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {active.media_type === "video" ? (
              <video src={active.url} controls className="max-h-[85vh] rounded-lg" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={active.url} alt={active.caption ?? ""} className="max-h-[85vh] rounded-lg object-contain" />
            )}
            {active.caption && <p className="mt-3 text-center text-sm text-navy-200">{active.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
