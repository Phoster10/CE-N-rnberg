import { ArrowRight, Compass, Target, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { HeroGlow } from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import { getAboutContent } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "About Us" };

export default async function AboutPage() {
  const content = await getAboutContent();

  const whoWeAre =
    content?.who_we_are_text ??
    "Christ Embassy Nürnberg is a dynamic, Christ-centered church committed to winning souls, building believers, and raising leaders through the Word of God. We are part of a global ministry founded by Pastor Chris Oyakhilome, and we are passionate about impacting our city and the nations with God's love.";
  const vision = content?.vision_text ?? "To reach out with the Gospel of Christ to all nations.";
  const mission = content?.mission_text ?? "To win souls, build believers, and raise leaders.";
  const values = content?.values_text ?? "Love, excellence, integrity, faith & service.";
  const believe =
    content?.believe_text ??
    "We believe in the absolute truth of God's Word, in the power of prayer, in the Holy Spirit, and in living a life that reflects Christ.";

  const valueCards = [
    { icon: Compass, title: "Our Vision", text: vision },
    { icon: Target, title: "Our Mission", text: mission },
    { icon: HeartHandshake, title: "Our Core Values", text: values },
  ];

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A family of faith in the heart of Nürnberg"
        subtitle="Rooted in God's Word, alive with His presence, and reaching our city with His love."
        image={content?.congregation_image_url || stockImages.congregation}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <section className="section grid grid-cols-1 gap-16 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <Reveal>
          <span className="eyebrow">Who We Are</span>
          <h2 className="container-heading mt-4">
            A dynamic, <em className="text-gold-600">Christ-centered</em> church family
          </h2>
          {whoWeAre
            .split("\n")
            .filter(Boolean)
            .map((p, i) => (
              <p key={i} className="mt-6 text-lg leading-relaxed text-navy-500">
                {p}
              </p>
            ))}
          <Button href="/new-here" variant="secondary" className="mt-10">
            Plan Your First Visit <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Reveal>
        <Reveal delay={0.15} className="relative">
          <div className="absolute -inset-4 -z-10 rotate-2 rounded-4xl bg-gold-gradient opacity-20" />
          <div className="overflow-hidden rounded-4xl shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content?.portrait_image_url || stockImages.fellowship}
              alt=""
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="grain relative isolate overflow-hidden bg-navy-950 py-24 text-white lg:py-32">
        <HeroGlow />
        <div className="section relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {valueCards.map((v, i) => (
            <Reveal key={v.title} delay={0.1 * i}>
              <div className="group h-full rounded-4xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/40">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-navy-950 shadow-glow">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-8 font-display text-2xl font-semibold">{v.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-navy-200">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section grid grid-cols-1 gap-16 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-4xl shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={stockImages.bible} alt="An open Bible" className="aspect-[4/3] w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.15} className="order-1 lg:order-2">
          <span className="eyebrow">Our Faith</span>
          <h2 className="container-heading mt-4">What we believe</h2>
          <p className="mt-6 text-lg leading-relaxed text-navy-500">{believe}</p>
          <Button href="/contact" variant="light" className="mt-10">
            Have a question? Talk to us
          </Button>
        </Reveal>
      </section>
    </>
  );
}
