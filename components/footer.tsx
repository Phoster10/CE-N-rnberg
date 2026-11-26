import Link from "next/link";
import { Youtube, Instagram, Facebook, MapPin, Mail, Phone, Clock, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getServiceTimes, getSiteSettings } from "@/lib/data";
import Logo from "@/components/logo";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const linkGroups = [
  {
    title: "Connect",
    links: [
      { label: "About Us", href: "/about" },
      { label: "New Here?", href: "/new-here" },
      { label: "Visit Us", href: "/visit" },
      { label: "Ministries", href: "/ministries" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Grow",
    links: [
      { label: "Watch Online", href: "/watch" },
      { label: "Rhapsody of Realities", href: "/rhapsody" },
      { label: "Testimonies", href: "/testimonies" },
      { label: "Gallery", href: "/gallery" },
      { label: "Prayer Request", href: "/prayer" },
      { label: "Give", href: "/give" },
    ],
  },
];

export default async function Footer() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServiceTimes()]);

  const tagline = settings?.footer_tagline || "A place of love, faith and God's presence.";
  const address1 = settings?.address_line1 || siteConfig.address.line1;
  const address2 = settings?.address_line2 || siteConfig.address.line2;
  const email = settings?.email || siteConfig.email;
  const phone = settings?.phone || siteConfig.phone;
  const socials = [
    { icon: Youtube, href: settings?.social_youtube || siteConfig.social.youtube, label: "YouTube" },
    { icon: Instagram, href: settings?.social_instagram || siteConfig.social.instagram, label: "Instagram" },
    { icon: Facebook, href: settings?.social_facebook || siteConfig.social.facebook, label: "Facebook" },
  ];
  const serviceList =
    services.length > 0
      ? services.map((s) => ({ label: s.label, when: `${DAYS[s.day_of_week]} · ${s.time.slice(0, 5)}` }))
      : siteConfig.serviceTimes.map((s) => ({ label: s.label, when: s.time }));

  return (
    <footer className="grain relative isolate overflow-hidden bg-navy-950 text-navy-200">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]" />

      {/* Big statement row */}
      <div className="section border-b border-white/10 py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            A church for the city <span className="italic text-gold-400">and the nations.</span>
          </h2>
          <Link
            href="/new-here"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-gold-gradient py-2 pl-6 pr-2 font-semibold text-navy-950 shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Plan your visit
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-gold-400 transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>

      <div className="section grid grid-cols-2 gap-10 py-16 md:grid-cols-12">
        <div className="col-span-2 md:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-gold-400/30">
              <Logo className="h-8 w-8" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-semibold text-white">Christ Embassy</span>
              <span className="mt-1 block text-[10px] font-semibold tracking-[0.35em] text-gold-400">NÜRNBERG</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-300">{tagline}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {linkGroups.map((g) => (
          <div key={g.title} className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{g.title}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-navy-300 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 md:col-span-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Join Us</h3>
          <ul className="mt-5 space-y-4 text-sm text-navy-300">
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="space-y-1">
                {serviceList.map((s) => (
                  <span key={s.label} className="block">
                    <span className="font-medium text-white">{s.label}</span> — {s.when}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>
                {address1}
                <br />
                {address2}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                {email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-400 md:flex-row">
          <p>© {new Date().getFullYear()} Christ Embassy Nürnberg. All rights reserved.</p>
          <p className="tracking-[0.2em]">LOVE · REACH · IMPACT</p>
          <Link href="/admin/login" className="text-navy-500 underline-offset-4 hover:text-gold-400 hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
