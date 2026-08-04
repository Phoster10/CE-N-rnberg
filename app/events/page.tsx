import { CalendarDays, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import PageHero from "@/components/page-hero";
import { getAllEvents } from "@/lib/data";

export const metadata = { title: "Events" };

const fallback = [
  { id: "1", title: "Sunday Service", description: "Join us for an amazing time in God's presence.", start_at: new Date().toISOString(), end_at: null, poster_url: null, registration_url: null },
  { id: "2", title: "Midweek Service", description: "A midweek encounter with the Word.", start_at: new Date().toISOString(), end_at: null, poster_url: null, registration_url: null },
  { id: "3", title: "Healing Streams", description: "A special time of healing and miracles.", start_at: new Date().toISOString(), end_at: null, poster_url: null, registration_url: null },
  { id: "4", title: "Communion Service", description: "Remembering His death till He comes.", start_at: new Date().toISOString(), end_at: null, poster_url: null, registration_url: null },
];

export default async function EventsPage() {
  const events = await getAllEvents();
  const list = events.length > 0 ? events : fallback;

  return (
    <>
      <PageHero title="Events" crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]} />
      <section className="section py-20">
        <div className="space-y-5">
          {list.map((e) => (
            <div
              key={e.id}
              className="flex flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:flex-row sm:items-center"
            >
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-gradient text-white">
                <span className="text-lg font-bold leading-none">{format(new Date(e.start_at), "dd")}</span>
                <span className="text-[10px] uppercase tracking-wide text-gold-400">
                  {format(new Date(e.start_at), "MMM")}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-navy-900">{e.title}</h3>
                <p className="mt-1 text-sm text-navy-500">{e.description}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-navy-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {format(new Date(e.start_at), "EEEE, d MMMM · h:mm a")}
                  {e.end_at && ` - ${format(new Date(e.end_at), "h:mm a")}`}
                </p>
              </div>
              {e.registration_url && (
                <a
                  href={e.registration_url}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700"
                >
                  Register <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
