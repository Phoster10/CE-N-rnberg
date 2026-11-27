import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock,
  Coffee,
  HandHeart,
  Heart,
  MapPin,
  Megaphone,
  Music,
  PlayCircle,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/card";
import CountdownNextService from "@/components/countdown-next-service";
import Reveal from "@/components/motion/reveal";
import HeroIn from "@/components/motion/hero-in";
import Photo from "@/components/photo";
import { HeroGlow } from "@/components/page-hero";
import { ministryImage, stockImages } from "@/lib/images";
import {
  getActiveAnnouncements,
  getHomepageContent,
  getMinistries,
  getServiceTimes,
  getTestimonies,
  getTodayRhapsody,
  getUpcomingEvents,
  getWatchOnlineSettings,
} from "@/lib/data";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const fallbackEvents = [
  { id: "1", title: "Sunday Service", start_at: new Date().toISOString(), description: "Join us in worship.", poster_url: null, location: null },
  { id: "2", title: "Midweek Service", start_at: new Date().toISOString(), description: "A midweek encounter with the Word.", poster_url: null, location: null },
  { id: "3", title: "Healing Streams", start_at: new Date().toISOString(), description: "A special time of healing and miracles.", poster_url: null, location: null },
];

const fallbackMinistries = [
  { id: "1", name: "Children's Ministry", description: "Raising children in the love and knowledge of God.", image_url: null },
  { id: "2", name: "Youth Ministry", description: "Building passionate young people for God.", image_url: null },
  { id: "3", name: "Choir", description: "Leading hearts in worship and praise.", image_url: null },
  { id: "4", name: "Evangelism Team", description: "Taking the Gospel to our world.", image_url: null },
];

const fallbackTestimonies = [
  { id: "1", author_name: "Anna M.", content: "I was healed of a chronic back pain during the healing school. Glory to God!" },
  { id: "2", author_name: "David K.", content: "After praying with the pastor, I got a new job and my life changed." },
  { id: "3", author_name: "Sarah E.", content: "God touched my family and restored peace to our home." },
];

export default async function HomePage() {
  const [content, services, events, testimonies, ministries, rhapsody, watch, announcements] = await Promise.all([
    getHomepageContent(),
    getServiceTimes(),
    getUpcomingEvents(3),
    getTestimonies(3),
    getMinistries(),
    getTodayRhapsody(),
    getWatchOnlineSettings(),
    getActiveAnnouncements(),
  ]);

  const heroHeading = (content?.hero_heading ?? "Welcome to Christ Embassy Nürnberg").replace(/^welcome to\s+/i, "");
  // Split the last word off so it can carry the gold accent.
  const lastSpace = heroHeading.lastIndexOf(" ");
  const headingLead = lastSpace > 0 ? heroHeading.slice(0, lastSpace) : "";
  const headingAccent = lastSpace > 0 ? heroHeading.slice(lastSpace + 1) : heroHeading;

  const heroSub = content?.hero_subheading ?? "A Place of Love, Faith & God's Presence";
  const verseText =
    content?.memory_verse_text ??
    "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.";
  const verseRef = content?.memory_verse_reference ?? "Jeremiah 33:3";
  const welcome =
    content?.welcome_message ??
    "Christ Embassy Nürnberg is a dynamic, Christ-centered church committed to winning souls, building believers, and raising leaders through the Word of God.";

  const serviceList =
    services.length > 0
      ? services.map((s) => ({ label: s.label, when: `${DAYS[s.day_of_week]}s · ${s.time.slice(0, 5)}` }))
      : [
          { label: "Sunday Service", when: "Sundays · 10:00" },
          { label: "Midweek Service", when: "Wednesdays · 18:00" },
        ];

  const eventList = events.length > 0 ? events : fallbackEvents;
  const ministryList = (ministries.length > 0 ? ministries : fallbackMinistries)
    .slice(0, 4)
    .map((m) => ({ ...m, image_url: m.image_url || ministryImage(m.name) }));
  const testimonyList = testimonies.length > 0 ? testimonies : fallbackTestimonies;
  const isLive = watch?.is_live ?? false;

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-950 text-white">
        <Photo
          src={content?.hero_image_url || stockImages.worship}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/80 via-navy-950/20 to-transparent" />
        <HeroGlow />

        <div className="section relative w-full pb-12 pt-40 sm:pb-16">
          <HeroIn>
            <span className="eyebrow text-gold-400">{heroSub}</span>
          </HeroIn>
          <HeroIn delay={0.1}>
            <h1 className="mt-6 max-w-5xl font-display text-[3.25rem] font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-[6.5rem]">
              {headingLead && <span className="block">{headingLead}</span>}
              <span className="text-gold-shine italic">{headingAccent}</span>
            </h1>
          </HeroIn>
          <HeroIn delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-100/90">{welcome}</p>
          </HeroIn>
          <HeroIn delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/new-here" size="lg" variant="primary">
                Plan Your Visit <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button href="/watch" size="lg" variant="outline">
                <PlayCircle className="h-5 w-5" /> {isLive ? "Watch Live Now" : "Watch Online"}
              </Button>
            </div>
          </HeroIn>

          <HeroIn delay={0.45}>
            <div className="mt-16 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <CountdownNextService services={services} />
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {serviceList.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gold-400" />
                    <div>
                      <p className="font-semibold text-white">{s.label}</p>
                      <p className="text-navy-300">{s.when}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gold-400" />
                  <div>
                    <p className="font-semibold text-white">Nürnberg</p>
                    <Link href="/visit" className="text-navy-300 underline-offset-4 hover:text-gold-300 hover:underline">
                      Get directions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </HeroIn>
        </div>
      </section>

      {/* ───────────── MARQUEE ───────────── */}
      <div className="overflow-hidden border-y border-gold-600/30 bg-gold-gradient py-4 text-navy-950" aria-hidden>
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {["Love", "Faith", "God's Presence", "Winning Souls", "Building Believers", "Raising Leaders", "Nürnberg & the Nations"].map(
                (w) => (
                  <span key={w} className="flex items-center gap-8 px-8 font-display text-xl italic sm:text-2xl">
                    {w} <Sparkles className="h-4 w-4 not-italic opacity-60" />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ───────────── ANNOUNCEMENTS ───────────── */}
      {announcements.length > 0 && (
        <section className="section pt-16">
          <div className="grid gap-4 md:grid-cols-2">
            {announcements.slice(0, 2).map((a) => (
              <Reveal key={a.id}>
                <div className="flex h-full gap-4 rounded-3xl border border-gold-200 bg-gold-50/70 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-navy-950">
                    <Megaphone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">Announcement</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-navy-900">{a.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-600">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ───────────── WELCOME ───────────── */}
      <section className="section grid grid-cols-1 items-center gap-16 py-24 lg:grid-cols-2 lg:py-32">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mr-10 overflow-hidden rounded-4xl shadow-lift sm:mr-20">
            <Photo
              src={content?.welcome_image_url || stockImages.congregation}
              alt="Our church family gathered for worship"
              width={800}
              height={1000}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 right-0 w-1/2 overflow-hidden rounded-3xl border-[6px] border-white shadow-lift">
            <Photo src={stockImages.fellowship} alt="" width={600} height={600} sizes="(min-width: 1024px) 300px, 50vw" className="aspect-square w-full object-cover" />
          </div>
          <div className="absolute -left-4 top-10 flex items-center gap-3 rounded-2xl bg-white p-4 pr-6 shadow-lift sm:-left-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-navy-950">
              <Heart className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold leading-tight text-navy-900">Part of a global family</p>
              <p className="text-xs font-medium text-navy-400">Christ Embassy · LoveWorld</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">Who We Are</span>
            <h2 className="container-heading mt-4">
              A church family built on <em className="text-gold-600">love</em> and the Word
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy-500">{welcome}</p>
          </Reveal>
          <div className="mt-10 space-y-5">
            {[
              { icon: Heart, title: "Winning Souls", text: "Sharing the Gospel of Christ in Nürnberg and to the nations." },
              { icon: BookOpen, title: "Building Believers", text: "Growing strong in faith through the teaching of God's Word." },
              { icon: Sparkles, title: "Raising Leaders", text: "Equipping every member to discover and fulfil their purpose." },
            ].map((p, i) => (
              <Reveal key={p.title} delay={0.1 * i}>
                <div className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 shadow-soft">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy-900">{p.title}</h3>
                    <p className="mt-1 text-navy-500">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <Button href="/about" variant="secondary" className="mt-10">
              Discover Our Story <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ───────────── MEMORY VERSE ───────────── */}
      <section className="grain relative isolate overflow-hidden bg-navy-950 py-28 text-center text-white sm:py-36">
        <HeroGlow />
        <div className="section relative max-w-4xl">
          <Reveal>
            <Quote className="mx-auto h-12 w-12 text-gold-500/80" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">Memory Verse of the Week</p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-8 text-balance font-display text-3xl font-light italic leading-snug sm:text-4xl lg:text-5xl">
              &ldquo;{verseText}&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 inline-flex items-center gap-3 font-semibold tracking-wide text-gold-400">
              <span className="h-px w-10 bg-gold-500/60" />
              {verseRef}
              <span className="h-px w-10 bg-gold-500/60" />
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── FIRST VISIT ───────────── */}
      <section className="dot-grid relative py-24 lg:py-32">
        <div className="section">
          <SectionHeading
            eyebrow="Your First Sunday"
            title="Come as you are. We've saved you a seat."
            description="Visiting a new church can feel like a big step. Here's what you can expect when you join us."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: Coffee, step: "01", title: "A warm welcome", text: "Our welcome team will greet you at the door, help you find a seat and answer any questions." },
              { icon: Music, step: "02", title: "Inspiring worship", text: "Expect vibrant praise, heartfelt worship and a life-changing message from God's Word." },
              { icon: Users, step: "03", title: "Real community", text: "Stay after service to meet people, grab a drink and discover where you can belong." },
            ].map((s, i) => (
              <Reveal key={s.step} delay={0.1 * i}>
                <div className="group relative h-full overflow-hidden rounded-4xl border border-navy-100/70 bg-white p-8 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <span className="absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-navy-50 transition-colors duration-500 group-hover:text-gold-100">
                    {s.step}
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-800 transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-navy-950">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-8 font-display text-2xl font-semibold text-navy-900">{s.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-navy-500">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/new-here" variant="secondary">
              What to Expect <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/visit" variant="light">
              <MapPin className="h-4 w-4" /> Location & Times
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ───────────── EVENTS ───────────── */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="section">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <span className="eyebrow">Stay Involved</span>
              <h2 className="container-heading mt-4">Upcoming Events</h2>
            </Reveal>
            <Reveal>
              <Link href="/events" className="group inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-gold-600">
                View all events
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {eventList.map((e, i) => {
              const date = new Date(e.start_at);
              return (
                <Reveal key={e.id} delay={0.1 * i}>
                  <Link
                    href="/events"
                    className="group flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
                  >
                    <div className="relative h-56 overflow-hidden bg-navy-gradient">
                      {e.poster_url ? (
                        <Photo
                          src={e.poster_url}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 400px, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <HeroGlow />
                          <CalendarDays className="absolute bottom-6 right-6 h-20 w-20 text-white/10" />
                        </>
                      )}
                      <div className="absolute left-5 top-5 flex flex-col items-center rounded-2xl bg-white px-4 py-2.5 text-center shadow-lift">
                        <span className="font-display text-2xl font-semibold leading-none text-navy-900">{format(date, "dd")}</span>
                        <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gold-600">{format(date, "MMM")}</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                        {format(date, "EEEE · HH:mm")}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-navy-900">{e.title}</h3>
                      {e.description && <p className="mt-2 line-clamp-2 text-navy-500">{e.description}</p>}
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy-800 group-hover:text-gold-600">
                        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── WATCH + RHAPSODY ───────────── */}
      <section className="section grid grid-cols-1 gap-6 py-24 lg:grid-cols-5 lg:py-32">
        <Reveal className="lg:col-span-3">
          <Link
            href="/watch"
            className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-4xl bg-navy-950 p-8 text-white shadow-lift sm:p-10"
          >
            <Photo
              src={stockImages.praise}
              alt=""
              fill
              sizes="(min-width: 1024px) 740px, 100vw"
              className="-z-20 object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
            <span className="absolute right-8 top-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950">
              <PlayCircle className="h-9 w-9" />
            </span>
            {isLive ? (
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Live now
              </span>
            ) : (
              <span className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Watch Online</span>
            )}
            <h3 className="max-w-md font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Can&apos;t make it in person? Join us live.
            </h3>
            <p className="mt-4 max-w-md text-navy-200">
              Join us on Facebook or Zoom, Sundays at 10:00 and Wednesdays at 18:00.
            </p>
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <Link
            href="/rhapsody"
            className="group relative isolate flex h-full min-h-[26rem] flex-col overflow-hidden rounded-4xl bg-cream p-8 shadow-card transition-all duration-500 hover:shadow-lift sm:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
                {format(rhapsody?.entry_date ? new Date(rhapsody.entry_date) : new Date(), "d MMM yyyy")}
              </span>
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">Today&apos;s Rhapsody</p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900">
              {rhapsody?.title ?? "Your Life Is Hid With Christ In God"}
            </h3>
            <p className="mt-2 text-sm font-semibold text-navy-500">
              {rhapsody?.scripture_reference ?? "Colossians 3:3"}
            </p>
            <p className="mt-4 line-clamp-3 leading-relaxed text-navy-500">
              {rhapsody?.body ??
                "For ye are dead, and your life is hid with Christ in God. Today's reading reminds us of our new identity in Christ."}
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-navy-900 group-hover:text-gold-600">
              Read today&apos;s devotional <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ───────────── MINISTRIES ───────────── */}
      <section className="grain relative isolate overflow-hidden bg-navy-950 py-24 text-white lg:py-32">
        <HeroGlow />
        <div className="section relative">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal className="max-w-2xl">
              <span className="eyebrow text-gold-400">Get Involved</span>
              <h2 className="container-heading mt-4 text-white">There&apos;s a place for you here</h2>
              <p className="mt-5 text-lg text-navy-200">
                From kids to youth, worship to outreach — discover a community where you can grow, serve and belong.
              </p>
            </Reveal>
            <Reveal>
              <Button href="/ministries" variant="outline">
                Explore all ministries <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ministryList.map((m, i) => (
              <Reveal key={m.id} delay={0.08 * i}>
                <Link
                  href="/ministries"
                  className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/40"
                >
                  {m.image_url && (
                    <>
                      <Photo
                        src={m.image_url}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
                    </>
                  )}
                  <span className="absolute left-6 top-6 font-display text-5xl font-semibold text-white/10 transition-colors group-hover:text-gold-500/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <h3 className="font-display text-2xl font-semibold">{m.name}</h3>
                    {m.description && <p className="mt-2 line-clamp-2 text-sm text-navy-200">{m.description}</p>}
                    <span className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all group-hover:bg-gold-500 group-hover:text-navy-950">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── TESTIMONIES ───────────── */}
      <section className="section py-24 lg:py-32">
        <SectionHeading
          eyebrow="Testimonies"
          title="Lives changed by the goodness of God"
          description="Real stories from our church family. What He has done for others, He can do for you."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonyList.map((t, i) => (
            <Reveal key={t.id} delay={0.1 * i}>
              <figure
                className={
                  i === 1
                    ? "relative flex h-full flex-col rounded-4xl bg-navy-900 p-8 text-white shadow-lift md:-translate-y-6"
                    : "relative flex h-full flex-col rounded-4xl border border-navy-100/70 bg-white p-8 shadow-card"
                }
              >
                <Quote className={i === 1 ? "h-10 w-10 text-gold-400" : "h-10 w-10 text-gold-500"} />
                <blockquote
                  className={`mt-6 flex-1 font-display text-xl leading-relaxed ${i === 1 ? "text-white" : "text-navy-800"}`}
                >
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full font-semibold ${
                      i === 1 ? "bg-gold-gradient text-navy-950" : "bg-navy-50 text-navy-800"
                    }`}
                  >
                    {t.author_name.charAt(0)}
                  </span>
                  <span className={`font-semibold ${i === 1 ? "text-white" : "text-navy-900"}`}>{t.author_name}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <Button href="/testimonies" variant="light">
            Read more testimonies <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </section>

      {/* ───────────── PRAYER + GIVE ───────────── */}
      <section className="section grid grid-cols-1 gap-6 pb-24 md:grid-cols-2 lg:pb-32">
        {[
          {
            icon: HandHeart,
            title: "Need prayer?",
            text: "Whatever you're facing, you don't have to face it alone. Our prayer team would be honoured to stand with you in faith.",
            cta: "Send a prayer request",
            href: "/prayer",
          },
          {
            icon: Heart,
            title: "Partner with us",
            text: "Your generosity helps us spread the Gospel, build believers and serve our community here in Nürnberg and beyond.",
            cta: "Ways to give",
            href: "/give",
          },
        ].map((c, i) => (
          <Reveal key={c.title} delay={0.1 * i}>
            <Link
              href={c.href}
              className="group flex h-full flex-col rounded-4xl border border-navy-100/70 bg-gradient-to-br from-white to-cream p-10 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-navy-950 shadow-glow">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-8 font-display text-3xl font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-navy-500">{c.text}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-navy-900 group-hover:text-gold-600">
                {c.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section className="grain relative isolate overflow-hidden bg-navy-950 py-28 text-center text-white sm:py-36">
        <Photo src={stockImages.sanctuary} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/60 via-navy-950/80 to-navy-950" />
        <HeroGlow />
        <div className="section relative max-w-3xl">
          <Reveal>
            <span className="eyebrow text-gold-400">We&apos;d love to meet you</span>
            <h2 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Your seat is waiting <span className="text-gold-shine italic">this Sunday</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-navy-200">
              Experience a place of love, faith, and God&apos;s presence. Come as you are — you belong here.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/new-here" size="lg" variant="primary">
                Plan My Visit <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button href="/visit" size="lg" variant="outline">
                <MapPin className="h-4 w-4" /> Get Directions
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
