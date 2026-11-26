"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, PlayCircle, Expand } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryAlbum, GalleryItem } from "@/types/database";
import { cn } from "@/lib/utils";

const categoryLabels: Record<GalleryAlbum["category"], string> = {
  services: "Services",
  events: "Events",
  outreach: "Outreach",
  baptisms: "Baptisms",
  conferences: "Conferences",
  kids: "Kids",
  general: "General",
};

export default function GalleryGrid({ items, albums = [] }: { items: GalleryItem[]; albums?: GalleryAlbum[] }) {
  const [filter, setFilter] = useState<GalleryAlbum["category"] | "all">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const albumCategory = useMemo(() => new Map(albums.map((a) => [a.id, a.category])), [albums]);
  const categoryOf = useCallback(
    (item: GalleryItem) => (item.album_id ? albumCategory.get(item.album_id) : undefined) ?? "general",
    [albumCategory]
  );

  // Only offer filters for categories that actually have photos.
  const categories = useMemo(() => {
    const present = new Set(items.map(categoryOf));
    return (Object.keys(categoryLabels) as GalleryAlbum["category"][]).filter((c) => present.has(c));
  }, [items, categoryOf]);

  const filtered = filter === "all" ? items : items.filter((i) => categoryOf(i) === filter);
  const active = activeIndex !== null ? filtered[activeIndex] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length));
    },
    [filtered.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, go]);

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {(["all", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(c);
                setActiveIndex(null);
              }}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                filter === c ? "bg-navy-900 text-white shadow-soft" : "bg-navy-50 text-navy-600 hover:bg-navy-100"
              )}
            >
              {c === "all" ? "All" : categoryLabels[c]}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {filtered.map((item, i) => (
          <motion.button
            layout
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActiveIndex(i)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl bg-navy-100"
            aria-label={item.caption ?? "Open photo"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnail_url ?? item.url}
              alt={item.caption ?? "Gallery photo"}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.caption && <span className="text-left text-sm font-medium text-white">{item.caption}</span>}
              <Expand className="ml-auto h-5 w-5 shrink-0 text-white" />
            </span>
            {item.media_type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveIndex(null)}
          >
            <button
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-navy-950"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            {filtered.length > 1 && (
              <>
                <button
                  className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-navy-950 sm:left-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-navy-950 sm:right-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {active.media_type === "video" ? (
                <video src={active.url} controls autoPlay className="max-h-[80vh] rounded-2xl" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.url} alt={active.caption ?? ""} className="max-h-[80vh] rounded-2xl object-contain" />
              )}
              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <p className="text-navy-200">{active.caption}</p>
                <p className="shrink-0 tabular-nums text-navy-400">
                  {activeIndex! + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
