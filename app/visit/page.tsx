import { Clock, MapPin, Navigation, Bus, Car, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";
import { getServiceTimes, getSiteSettings } from "@/lib/data";

export const metadata = { title: "Visit Us" };

export default async function VisitPage() {
  const [services, settings] = await Promise.all([getServiceTimes(), getSiteSettings()]);
  const list =
    services.length > 0
      ? services.map((s) => ({ label: s.label, time: s.time }))
      : siteConfig.serviceTimes;

  const address1 = settings?.address_line1 || siteConfig.address.line1;
  const address2 = settings?.address_line2 || siteConfig.address.line2;
  const mapSrc = settings?.map_embed_src || siteConfig.mapEmbedSrc;
  const directionsUrl = settings?.map_directions_url || siteConfig.mapDirectionsUrl;

  return (
    <>
      <PageHero title="Visit Us" crumbs={[{ label: "Home", href: "/" }, { label: "Visit Us" }]} />

      <section className="section grid grid-cols-1 gap-10 py-20 lg:grid-cols-2">
        <div className="space-y-6">
          <InfoRow icon={MapPin} title="Our Location">
            {address1}
            <br />
            {address2}
          </InfoRow>
          <InfoRow icon={Clock} title="Service Times">
            <ul className="space-y-1">
              {list.map((s) => (
                <li key={s.label}>
                  {s.label}: <span className="font-semibold text-navy-900">{s.time}</span>
                </li>
              ))}
            </ul>
          </InfoRow>
          <InfoRow icon={Navigation} title="How to Get Here">
            We are easily accessible by public transport. Free parking is available near the church.
          </InfoRow>
          <Button href={directionsUrl} variant="secondary">
            Get Directions
          </Button>

          <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
            {[
              { icon: TrainFront, label: "By U-Bahn", sub: "U1 to Scharfeiterring, 13 min walk" },
              { icon: Bus, label: "By Bus", sub: "Bus 63/67 · Lehrerstraße Stop" },
              { icon: Car, label: "By Car", sub: "Free parking available" },
              { icon: MapPin, label: "Address", sub: address2 },
            ].map((t) => (
              <div key={t.label} className="rounded-xl border border-navy-100 p-4 text-center shadow-card">
                <t.icon className="mx-auto h-5 w-5 text-navy-700" />
                <p className="mt-2 text-xs font-semibold text-navy-900">{t.label}</p>
                <p className="mt-1 text-[11px] text-navy-500">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-soft">
          <iframe
            title="Christ Embassy Nürnberg location map"
            src={mapSrc}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold text-navy-900">{title}</h3>
        <div className="mt-1 text-sm text-navy-500">{children}</div>
      </div>
    </div>
  );
}
