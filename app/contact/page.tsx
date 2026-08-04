import { MapPin, Mail, Phone, Youtube, Instagram, Facebook } from "lucide-react";
import PageHero from "@/components/page-hero";
import ContactForm from "./contact-form";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data";

export const metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const phone = settings?.phone || siteConfig.phone;
  const email = settings?.email || siteConfig.email;
  const address1 = settings?.address_line1 || siteConfig.address.line1;
  const address2 = settings?.address_line2 || siteConfig.address.line2;
  const mapSrc = settings?.map_embed_src || siteConfig.mapEmbedSrc;
  const socials = [
    { icon: Youtube, href: settings?.social_youtube || siteConfig.social.youtube },
    { icon: Instagram, href: settings?.social_instagram || siteConfig.social.instagram },
    { icon: Facebook, href: settings?.social_facebook || siteConfig.social.facebook },
  ];

  return (
    <>
      <PageHero title="Contact Us" crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <section className="section grid grid-cols-1 gap-10 py-20 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex gap-4">
            <MapPin className="h-5 w-5 shrink-0 text-gold-600" />
            <p className="text-sm text-navy-600">
              {address1}
              <br />
              {address2}
            </p>
          </div>
          <div className="flex gap-4">
            <Phone className="h-5 w-5 shrink-0 text-gold-600" />
            <a href={`tel:${phone}`} className="text-sm text-navy-600 hover:text-navy-900">
              {phone}
            </a>
          </div>
          <div className="flex gap-4">
            <Mail className="h-5 w-5 shrink-0 text-gold-600" />
            <a href={`mailto:${email}`} className="text-sm text-navy-600 hover:text-navy-900">
              {email}
            </a>
          </div>
          <div className="flex gap-3 pt-2">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700 hover:bg-navy-900 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-card">
            <iframe
              title="Church location"
              src={mapSrc}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
