import { MapPin, Mail, Phone, Youtube, Instagram, Facebook } from "lucide-react";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import ContactForm from "./contact-form";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const phone = settings?.phone || siteConfig.phone;
  const email = settings?.email || siteConfig.email;
  const address1 = settings?.address_line1 || siteConfig.address.line1;
  const address2 = settings?.address_line2 || siteConfig.address.line2;
  const mapSrc = settings?.map_embed_src || siteConfig.mapEmbedSrc;
  const socials = [
    { icon: Youtube, label: "YouTube", href: settings?.social_youtube || siteConfig.social.youtube },
    { icon: Instagram, label: "Instagram", href: settings?.social_instagram || siteConfig.social.instagram },
    { icon: Facebook, label: "Facebook", href: settings?.social_facebook || siteConfig.social.facebook },
  ];

  const details = [
    { icon: MapPin, title: "Visit", content: <>{address1}<br />{address2}</> },
    { icon: Phone, title: "Call", content: <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold-600">{phone}</a> },
    { icon: Mail, title: "Email", content: <a href={`mailto:${email}`} className="break-all hover:text-gold-600">{email}</a> },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd love to hear from you"
        subtitle="Questions, ideas, or just want to say hello? Send us a message and we'll get back to you soon."
        image={stockImages.sanctuary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <section className="section grid grid-cols-1 gap-12 py-24 lg:grid-cols-5 lg:py-32">
        <Reveal className="space-y-8 lg:col-span-2">
          <div className="space-y-6">
            {details.map((d) => (
              <div key={d.title} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <d.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{d.title}</p>
                  <p className="mt-1 text-lg text-navy-700">{d.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 text-navy-700 transition-all hover:-translate-y-0.5 hover:border-navy-900 hover:bg-navy-900 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="overflow-hidden rounded-4xl border border-navy-100/70 shadow-card">
            <iframe
              title="Church location"
              src={mapSrc}
              className="h-72 w-full grayscale-[30%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-3">
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
