"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Flame, ChevronDown, ArrowUpRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mainNav, type NavItem, type NavLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const isGroup = (item: NavItem): item is { label: string; children: NavLink[] } => "children" in item;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Admin pages have no dark hero to float over, so the bar is always solid there.
  const isAdmin = pathname.startsWith("/admin");
  const solid = scrolled || isAdmin || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const enterGroup = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const leaveGroup = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <header
      className={cn(
        "top-0 z-50 w-full transition-all duration-500",
        isAdmin ? "sticky" : "fixed",
        solid ? "bg-white/85 shadow-[0_1px_0_rgba(16,26,63,0.06),0_10px_30px_-15px_rgba(16,26,63,0.2)] backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav
        className={cn("section flex items-center justify-between transition-all duration-500", solid ? "h-[72px]" : "h-24")}
        aria-label="Main navigation"
      >
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Christ Embassy Nürnberg — home">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-navy-gradient text-gold-400 shadow-soft ring-1 ring-gold-400/30 transition-transform duration-500 group-hover:rotate-[8deg]">
            <Flame className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="leading-none">
            <span
              className={cn(
                "block font-display text-[17px] font-semibold tracking-wide transition-colors",
                solid ? "text-navy-900" : "text-white"
              )}
            >
              Christ Embassy
            </span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.35em] text-gold-500">NÜRNBERG</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) =>
            isGroup(item) ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => enterGroup(item.label)}
                onMouseLeave={leaveGroup}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    item.children.some((c) => isActive(c.href))
                      ? solid
                        ? "text-navy-900"
                        : "text-white"
                      : solid
                        ? "text-navy-500 hover:text-navy-900"
                        : "text-white/75 hover:text-white"
                  )}
                  aria-expanded={openGroup === item.label}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform duration-300", openGroup === item.label && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {openGroup === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-navy-100/70 bg-white p-2 shadow-lift">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className={cn(
                              "group/item flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-navy-50",
                              isActive(c.href) && "bg-navy-50"
                            )}
                          >
                            <span>
                              <span className="block text-sm font-semibold text-navy-900">{c.label}</span>
                              {c.description && (
                                <span className="mt-0.5 block text-xs text-navy-400">{c.description}</span>
                              )}
                            </span>
                            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-navy-300 transition-all group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-gold-500" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? solid
                        ? "text-navy-900"
                        : "text-white"
                      : solid
                        ? "text-navy-500 hover:text-navy-900"
                        : "text-white/75 hover:text-white"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500"
                    />
                  )}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/give"
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
              solid ? "text-navy-800 hover:bg-navy-50" : "text-white hover:bg-white/10"
            )}
          >
            <Heart className="h-4 w-4 text-gold-500" /> Give
          </Link>
          <Button href="/new-here" size="sm" variant="primary">
            Plan Your Visit
          </Button>
        </div>

        <button
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            solid ? "text-navy-900 hover:bg-navy-50" : "text-white hover:bg-white/10"
          )}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-navy-100 bg-white lg:hidden"
          >
            <div className="flex flex-col px-6 pb-10 pt-4">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="border-b border-navy-50 py-2"
                >
                  {isGroup(item) ? (
                    <>
                      <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
                        {item.label}
                      </p>
                      {item.children.map((c) => (
                        <MobileLink key={c.href} href={c.href} active={isActive(c.href)}>
                          {c.label}
                        </MobileLink>
                      ))}
                    </>
                  ) : (
                    <MobileLink href={item.href} active={isActive(item.href)}>
                      {item.label}
                    </MobileLink>
                  )}
                </motion.div>
              ))}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button href="/give" variant="light">
                  <Heart className="h-4 w-4 text-gold-500" /> Give
                </Button>
                <Button href="/new-here" variant="primary">
                  Plan a Visit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between rounded-xl px-3 py-3 font-display text-xl transition-colors",
        active ? "text-navy-900" : "text-navy-600 hover:bg-navy-50"
      )}
    >
      {children}
      {active && <span className="h-2 w-2 rounded-full bg-gold-500" />}
    </Link>
  );
}
