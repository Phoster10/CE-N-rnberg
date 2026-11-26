import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";
import { format } from "date-fns";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import { getAllEvents } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Events" };

const fallback = [
  { id: "1", title: "Sunday Service", description: "Join us for an amazing time in God's presence.", start_at: new Date().toISOString(), end_at: null, location: null, poster_url: null, registration_url: null },
  { id: "2", title: "Midweek Service", description: "A midweek encounter with the Word.", start_at: new Date().toISOString(), end_at: null, location: null, poster_url: null, registration_url: null },
  { id: "3", title: "Healing Streams", description: "A special time of healing and miracles.", start_at: new Date().toISOString(), end_at: null, location: null, poster_url: null, registration_url: null },
  { id: "4", title: "Communion Service", description: "Remembering His death till He comes.", start_at: new Date().toISOString(), end_at: null, location: null, poster_url: null, registration_url: null },
];

export default async function EventsPage() {
  const events = await getAllEvents();
  const list = events.length > 0 ? events : fallback;

  return (
    <>
      <PageHero
        eyebrow="What's On"
        title="Events & gatherings"
        subtitle="Services, conferences and special moments — there's always something happening in our church family."
        image={stockImages.worship}
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />
      <section className="section py-24 lg:py-32">
        <div className="space-y-6">
          {list.map((e, i) => {
            const start = new Date(e.start_at);
            return (
              <Reveal key={e.id} delay={0.05 * Math.min(i, 4)}>
                <article className="group grid grid-cols-1 overflow-hidden rounded-4xl border border-navy-100/70 bg-white shadow-card transition-all duration-500 hover:shadow-lift md:grid-cols-[auto_1fr_auto]">
                  <div className="relative flex min-h-[10rem] items-center justify-center overflow-hidden bg-navy-gradient px-10 py-8 text-white md:w-64">
                    {e.poster_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={e.poster_url}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="relative text-center">
                      <span className="block text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                        {format(start, "MMMM")}
                      </span>
                      <span className="block font-display text-7xl font-semibold leading-none">{format(start, "dd")}</span>
                      <span className="mt-1 block text-sm text-navy-200">{format(start, "EEEE")}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-3xl font-semibold text-navy-900">{e.title}</h3>
                    {e.description && <p className="mt-3 max-w-2xl leading-relaxed text-navy-500">{e.description}</p>}
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-500">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gold-600" />
                        {format(start, "HH:mm")}
                        {e.end_at && ` – ${format(new Date(e.end_at), "HH:mm")}`}
                      </span>
                      <span className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-gold-600" />
                        {format(start, "d MMMM yyyy")}
                      </span>
                      {e.location && (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gold-600" />
                          {e.location}
                        </span>
                      )}
                    </div>
                  </div>
                  {e.registration_url && (
                    <div className="flex items-center px-8 pb-8 md:pb-0">
                      <a
                        href={e.registration_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-transform hover:-translate-y-0.5"
                      >
                        Register <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
