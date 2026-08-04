import { PlayCircle, Video } from "lucide-react";
import PageHero from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { getWatchOnlineSettings } from "@/lib/data";

export const metadata = { title: "Watch Online" };

export default async function WatchOnlinePage() {
  const settings = await getWatchOnlineSettings();
  const isLive = settings?.is_live ?? false;
  const embedUrl = settings?.youtube_embed_url;
  const zoomLink = settings?.zoom_link;

  return (
    <>
      <PageHero title="Watch Online" crumbs={[{ label: "Home", href: "/" }, { label: "Watch Online" }]} />

      <section className="section py-20">
        <div className="overflow-hidden rounded-2xl bg-navy-gradient text-white shadow-soft">
          {isLive && embedUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title="Live service"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video flex-col items-center justify-center gap-4 p-8 text-center">
              <PlayCircle className="h-14 w-14 text-gold-400" />
              <h2 className="font-display text-2xl font-semibold">Join Us Live</h2>
              <p className="text-navy-200">Every Sunday at 10:00 AM</p>
              <Button variant="primary">Watch Live</Button>
            </div>
          )}
        </div>

        {isLive && zoomLink && (
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <Video className="h-6 w-6 text-navy-700" />
              <div>
                <p className="font-semibold text-navy-900">Join our Zoom prayer room</p>
                <p className="text-sm text-navy-500">Connect with fellow believers during the service.</p>
              </div>
            </div>
            <a
              href={zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-700"
            >
              Join Zoom
            </a>
          </div>
        )}

        <div className="mt-16">
          <h3 className="container-heading text-left">Latest Messages</h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {["Living in God's Purpose", "The Power of the Word", "Walking in Victory"].map((title) => (
              <div key={title} className="overflow-hidden rounded-2xl border border-navy-100 shadow-card">
                <div className="relative flex h-40 items-center justify-center bg-navy-900 text-white">
                  <PlayCircle className="h-10 w-10" />
                </div>
                <div className="p-4">
                  <h4 className="font-display text-base font-semibold text-navy-900">{title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
