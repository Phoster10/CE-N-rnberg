import { Clock, MapPin, Navigation, Bus, Car, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";
import { getServiceTimes, getSiteSettings } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Visit Us" };

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function VisitPage() {
  const [services, settings] = await Promise.all([getServiceTimes(), getSiteSettings()]);
  const list =
    services.length > 0
      ? services.map((s) => ({ label: s.label, day: DAYS[s.day_of_week], time: s.time.slice(0, 5) }))
      : [
          { label: "Sunday Service", day: "Sunday", time: "10:00" },
          { label: "Midweek Service", day: "Wednesday", time: "19:00" },
        ];

  const address1 = settings?.address_line1 || siteConfig.address.line1;
  const address2 = settings?.address_line2 || siteConfig.address.line2;
  const mapSrc = settings?.map_embed_src || siteConfig.mapEmbedSrc;
  const directionsUrl = settings?.map_directions_url || siteConfig.mapDirectionsUrl;

  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Service times & location"
        subtitle="We'd love to see you this week. Here's when we meet and how to find us."
        image={stockImages.sanctuary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Visit Us" }]}
      />

      {/* Service times — the most important info, front and centre */}
      <section className="section relative z-10 -mt-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {list.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i}>
              <div className="flex items-center gap-6 rounded-4xl border border-navy-100/70 bg-white p-8 shadow-lift">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-navy-950 shadow-glow">
                  <Clock className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{s.day}s</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-navy-900">{s.label}</p>
                </div>
                <p className="ml-auto font-display text-4xl font-semibold tabular-nums text-navy-900">{s.time}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section grid grid-cols-1 gap-12 py-24 lg:grid-cols-2 lg:py-28">
        <Reveal className="space-y-8">
          <div>
            <span className="eyebrow">Find Us</span>
            <h2 className="container-heading mt-4">Getting here</h2>
          </div>
          <div className="flex gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-navy-900">Our address</h3>
              <p className="mt-1 text-lg text-navy-500">
                {address1}
                <br />
                {address2}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: TrainFront, label: "By U-Bahn", sub: "U2 to Schweinau, 5 min walk" },
              { icon: Bus, label: "By Bus", sub: "Bus 63/67 · Lehrerstraße stop" },
              { icon: Car, label: "By Car", sub: "Free parking available nearby" },
            ].map((t) => (
              <div key={t.label} className="rounded-3xl border border-navy-100/70 bg-white p-5 shadow-card">
                <t.icon className="h-6 w-6 text-gold-600" />
                <p className="mt-3 font-semibold text-navy-900">{t.label}</p>
                <p className="mt-1 text-sm text-navy-500">{t.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href={directionsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
              <Navigation className="h-4 w-4" /> Get Directions
            </Button>
            <Button href="/new-here" variant="light" size="lg">
              What to expect
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full min-h-[460px] overflow-hidden rounded-4xl border border-navy-100/70 shadow-lift">
            <iframe
              title="Christ Embassy Nürnberg location map"
              src={mapSrc}
              className="h-full min-h-[460px] w-full grayscale-[30%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
