import { MapPin, Mail, Phone, Youtube, Instagram, Facebook } from "lucide-react";
import PageHero from "@/components/page-hero";
import ContactForm from "./contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <section className="section grid grid-cols-1 gap-10 py-20 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex gap-4">
            <MapPin className="h-5 w-5 shrink-0 text-gold-600" />
            <p className="text-sm text-navy-600">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
            </p>
          </div>
          <div className="flex gap-4">
            <Phone className="h-5 w-5 shrink-0 text-gold-600" />
            <a href={`tel:${siteConfig.phone}`} className="text-sm text-navy-600 hover:text-navy-900">
              {siteConfig.phone}
            </a>
          </div>
          <div className="flex gap-4">
            <Mail className="h-5 w-5 shrink-0 text-gold-600" />
            <a href={`mailto:${siteConfig.email}`} className="text-sm text-navy-600 hover:text-navy-900">
              {siteConfig.email}
            </a>
          </div>
          <div className="flex gap-3 pt-2">
            {[
              { icon: Youtube, href: siteConfig.social.youtube },
              { icon: Instagram, href: siteConfig.social.instagram },
              { icon: Facebook, href: siteConfig.social.facebook },
            ].map(({ icon: Icon, href }, i) => (
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
              src={siteConfig.mapEmbedSrc}
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
