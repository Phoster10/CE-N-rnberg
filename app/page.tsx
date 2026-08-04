import Link from "next/link";
import { ArrowRight, HeartHandshake, MapPin, Quote, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/card";
import CountdownNextService from "@/components/countdown-next-service";
import {
  getHomepageContent,
  getServiceTimes,
  getUpcomingEvents,
  getTestimonies,
} from "@/lib/data";
import { format } from "date-fns";

export default async function HomePage() {
  const [content, services, events, testimonies] = await Promise.all([
    getHomepageContent(),
    getServiceTimes(),
    getUpcomingEvents(3),
    getTestimonies(3),
  ]);

  const heroHeading = content?.hero_heading ?? "Welcome to Christ Embassy Nürnberg";
  const heroSub = content?.hero_subheading ?? "A Place of Love, Faith & God's Presence";
  const verseText =
    content?.memory_verse_text ??
    "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.";
  const verseRef = content?.memory_verse_reference ?? "Jeremiah 33:3";
  const welcome =
    content?.welcome_message ??
    "Christ Embassy Nürnberg is a dynamic, Christ-centered church committed to winning souls, building believers, and raising leaders through the Word of God.";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-gradient">
        {content?.hero_image_url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.hero_image_url}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-navy-950/70" />
          </>
        ) : (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(234,173,51,0.35), transparent 40%), radial-gradient(circle at 80% 60%, rgba(79,99,173,0.4), transparent 45%)",
            }}
          />
        )}
        <div className="section relative grid grid-cols-1 gap-12 py-24 lg:grid-cols-2 lg:py-32">
          <div className="flex flex-col justify-center">
            <span className="eyebrow text-gold-400">{heroSub}</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {heroHeading.replace("Welcome to ", "")}
            </h1>
            <p className="mt-6 max-w-lg text-navy-200">{welcome}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/new-here" size="lg" variant="primary">
                Plan Your Visit <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/prayer" size="lg" variant="outline">
                Send a Prayer Request
              </Button>
            </div>
          </div>
          <div className="flex items-end">
            <CountdownNextService services={services} />
          </div>
        </div>
      </section>

      {/* WELCOME + MEMORY VERSE */}
      <section className="section grid grid-cols-1 gap-10 py-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="eyebrow">Who We Are</span>
          <h2 className="container-heading mt-3">A church built on love and the Word</h2>
          <p className="mt-4 text-navy-500">{welcome}</p>
          <Button href="/about" variant="secondary" className="mt-6">
            Learn More About Us <ArrowRight className="h-4 w-4" />
          </Button>
          {content?.welcome_image_url && (
            <div className="mt-6 overflow-hidden rounded-2xl shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content.welcome_image_url} alt="" className="h-56 w-full object-cover" />
            </div>
          )}
        </div>
        <div className="rounded-2xl bg-navy-gradient p-8 text-white shadow-soft">
          <Quote className="h-8 w-8 text-gold-400" />
          <p className="mt-4 font-display text-lg leading-relaxed">&ldquo;{verseText}&rdquo;</p>
          <p className="mt-4 text-sm font-semibold text-gold-400">{verseRef}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-navy-300">Weekly Memory Verse</p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="section pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: MapPin, title: "Visit Us", desc: "Find our location & service times", href: "/visit" },
            { icon: HeartHandshake, title: "Give Online", desc: "Support the work of God with us", href: "/give" },
            { icon: CalendarDays, title: "Upcoming Events", desc: "See what's happening this month", href: "/events" },
          ].map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="group rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 group-hover:bg-gold-gradient group-hover:text-navy-900">
                <a.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{a.title}</h3>
              <p className="mt-1 text-sm text-navy-500">{a.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="bg-navy-50/60 py-20">
        <div className="section">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow">Stay Involved</span>
              <h2 className="container-heading mt-3">Upcoming Events</h2>
            </div>
            <Link href="/events" className="hidden text-sm font-semibold text-navy-700 hover:text-gold-600 sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {(events.length > 0
              ? events
              : [
                  { id: "1", title: "Sunday Service", start_at: new Date().toISOString(), description: "Join us in worship." },
                  { id: "2", title: "Midweek Service", start_at: new Date().toISOString(), description: "A midweek encounter with the Word." },
                  { id: "3", title: "Healing Streams", start_at: new Date().toISOString(), description: "A special time of healing and miracles." },
                ]
            ).map((e) => (
              <div key={e.id} className="overflow-hidden rounded-2xl bg-white shadow-card">
                <div className="flex h-36 items-center justify-center bg-navy-gradient text-gold-400">
                  <CalendarDays className="h-10 w-10" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    {format(new Date(e.start_at), "EEE, d MMM · h:mm a")}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">{e.title}</h3>
                  {"description" in e && e.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-navy-500">{e.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIES */}
      <section className="section py-20">
        <SectionHeading eyebrow="Testimonies" title="Lives Changed by God" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {(testimonies.length > 0
            ? testimonies
            : [
                { id: "1", author_name: "Anna M.", content: "I was healed of a chronic back pain during the healing school. Glory to God!" },
                { id: "2", author_name: "David K.", content: "After praying with the pastor, I got a new job and my life changed." },
                { id: "3", author_name: "Sarah E.", content: "God touched my family and restored peace to our home." },
              ]
          ).map((t) => (
            <div key={t.id} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              <Quote className="h-6 w-6 text-gold-500" />
              <p className="mt-4 text-sm text-navy-600">&ldquo;{t.content}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-navy-900">{t.author_name}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/testimonies" variant="secondary">
            View More Testimonies
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-gradient py-20 text-center text-white">
        <div className="section">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Plan your visit this Sunday</h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-200">
            We would love to welcome you into a place of love, faith, and God&apos;s presence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/new-here" size="lg" variant="primary">
              Plan My Visit
            </Button>
            <Button href="/visit" size="lg" variant="outline">
              Get Directions
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
