import { ArrowUpRight, Facebook, PlayCircle, Video, Youtube } from "lucide-react";
import PageHero, { HeroGlow } from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import Photo from "@/components/photo";
import { Button } from "@/components/ui/button";
import { getWatchOnlineSettings, getSiteSettings } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Watch Online" };

export default async function WatchOnlinePage() {
  const [settings, siteSettings] = await Promise.all([getWatchOnlineSettings(), getSiteSettings()]);
  const isLive = settings?.is_live ?? false;
  // We stream on Facebook Live. Facebook's video plugin embeds the same way
  // YouTube's does — just paste the Facebook Live "Embed" link here.
  const embedUrl = settings?.youtube_embed_url;
  const zoomLink = settings?.zoom_link;
  const facebookUrl = siteSettings?.social_facebook || siteConfig.social.facebook;
  const youtubeUrl = siteSettings?.social_youtube || siteConfig.social.youtube;

  return (
    <>
      <PageHero
        eyebrow="Church Online"
        title="Worship with us from anywhere"
        subtitle="Wherever you are in the world, you can be part of what God is doing at Christ Embassy Nürnberg."
        image={stockImages.praise}
        crumbs={[{ label: "Home", href: "/" }, { label: "Watch Online" }]}
      />

      <section className="section py-24 lg:py-32">
        <Reveal>
          <div className="grain relative isolate overflow-hidden rounded-4xl bg-navy-950 text-white shadow-lift ring-1 ring-navy-900/10">
            {isLive && embedUrl ? (
              <>
                <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Live
                  </span>
                  <span className="text-sm text-navy-200">We&apos;re streaming right now — welcome!</span>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src={embedUrl}
                    title="Live service"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </>
            ) : (
              <div className="relative flex aspect-video min-h-[22rem] flex-col items-center justify-center gap-5 p-8 text-center">
                <Photo src={stockImages.worship} alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" className="-z-20 object-cover opacity-30" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
                <HeroGlow />
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-md">
                  <PlayCircle className="h-12 w-12 text-gold-400" />
                </span>
                <h2 className="font-display text-4xl font-semibold sm:text-5xl">Join us live</h2>
                <p className="max-w-md text-lg text-navy-200">Every Sunday at 10:00 · Streamed live on Facebook</p>
                <Button href={facebookUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                  <Facebook className="h-4 w-4" /> Watch on Facebook
                </Button>
              </div>
            )}
          </div>
        </Reveal>

        {isLive && zoomLink && (
          <Reveal className="mt-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-navy-100/70 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy-800">
                  <Video className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-navy-900">Join our Zoom prayer room</p>
                  <p className="text-sm text-navy-500">
                    This opens Zoom in a new tab or the Zoom app — it&apos;s a separate, interactive room alongside
                    the video above, not the video itself.
                  </p>
                </div>
              </div>
              <Button href={zoomLink} target="_blank" rel="noopener noreferrer" variant="secondary" className="shrink-0">
                Join Zoom
              </Button>
            </div>
          </Reveal>
        )}

        <div className="mt-24">
          <Reveal>
            <span className="eyebrow">Catch Up</span>
            <h2 className="container-heading mt-4">Missed a service?</h2>
            <p className="mt-4 max-w-xl text-lg text-navy-500">
              Watch past messages and stay connected through our channels.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { icon: Facebook, title: "Facebook", text: "Live services, replays and updates from our church family.", href: facebookUrl },
              { icon: Youtube, title: "YouTube", text: "Messages and highlights you can watch on demand, anytime.", href: youtubeUrl },
            ].map((c, i) => (
              <Reveal key={c.title} delay={0.1 * i}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-6 rounded-4xl border border-navy-100/70 bg-white p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-gradient group-hover:text-navy-950">
                    <c.icon className="h-7 w-7" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold text-navy-900">{c.title}</h3>
                    <p className="mt-1 text-navy-500">{c.text}</p>
                  </div>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-navy-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold-500" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
