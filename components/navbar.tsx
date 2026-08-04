"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mainNav } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-card" : "bg-white"
      )}
    >
      <nav className="section flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-gradient text-gold-400 shadow-soft">
            <Flame className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-wide text-navy-900">
              CHRIST EMBASSY
            </span>
            <span className="block text-[11px] font-medium tracking-[0.25em] text-gold-600">
              NÜRNBERG
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                  active
                    ? "text-navy-900 bg-navy-50"
                    : "text-navy-500 hover:text-navy-900 hover:bg-navy-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <Button href="/new-here" size="sm" variant="primary">
            Plan Your Visit
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-navy-800 xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-navy-100 bg-white xl:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    pathname === item.href
                      ? "bg-navy-50 text-navy-900"
                      : "text-navy-600 hover:bg-navy-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/new-here" size="sm" variant="primary" className="mt-3 w-full">
                Plan Your Visit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
