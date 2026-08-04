import Link from "next/link";
import { Youtube, Instagram, Facebook, MapPin, Mail, Phone, Flame } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Watch Online", href: "/watch" },
  { label: "Rhapsody of Realities", href: "/rhapsody" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Give", href: "/give" },
];

export default async function Footer() {
  const settings = await getSiteSettings();

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

  return (
    <footer className="bg-navy-gradient text-navy-100">
      <div className="section grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold-400">
              <Flame className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold text-white">
                CHRIST EMBASSY
              </span>
              <span className="block text-[11px] tracking-[0.25em] text-gold-400">NÜRNBERG</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-navy-300">{tagline}</p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-navy-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-navy-300 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-300">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>
                {address1}
                <br />
                {address2}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${email}`} className="hover:text-white">
                {email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${phone}`} className="hover:text-white">
                {phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Stay Connected</h3>
          <p className="mt-4 text-sm text-navy-300">Get the latest updates and events.</p>
          <form className="mt-4 flex gap-2">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email address"
              className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-navy-400 focus:border-gold-400 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-navy-900"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-400 md:flex-row">
          <p>© {new Date().getFullYear()} Christ Embassy Nürnberg. All Rights Reserved.</p>
          <p>A Church for the City and the Nations · Love · Reach · Impact</p>
          <Link href="/admin/login" className="text-navy-400 underline-offset-4 hover:text-gold-400 hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
