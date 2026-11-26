import { ArrowRight, Baby, Clock, Coffee, MapPin, Music, Shirt } from "lucide-react";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/card";
import FaqAccordion from "@/components/faq-accordion";
import { getNewHereContent, getSiteSettings } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "New Here?" };

const faqs = [
  { q: "What should I wear?", a: "Come as you are! Smart casual is common, but there's no dress code — we're just glad you're here." },
  { q: "What happens during the service?", a: "Expect worship, prayer, an inspiring message from the Word, and a warm welcome from our church family." },
  { q: "Is there children's ministry?", a: "Yes — our Children's Ministry team cares for kids of all ages during the service." },
  { q: "How long is the service?", a: "Services typically run for about an hour and a half." },
  { q: "Can I come if I'm not a Christian?", a: "Absolutely. Everyone is welcome, wherever you are on your journey of faith." },
];

const highlights = [
  { icon: Coffee, title: "Warm welcome", text: "Friendly faces at the door to greet you and help you settle in." },
  { icon: Music, title: "Vibrant worship", text: "Joyful praise and heartfelt worship in God's presence." },
  { icon: Clock, title: "About 90 minutes", text: "Worship, prayer and a practical, life-giving message." },
  { icon: Baby, title: "Kids are covered", text: "A safe, fun children's church for every age." },
  { icon: Shirt, title: "Come as you are", text: "No dress code — just come and be yourself." },
  { icon: MapPin, title: "Easy to reach", text: "Close to public transport, with free parking nearby." },
];

export default async function NewHerePage() {
  const [content, settings] = await Promise.all([getNewHereContent(), getSiteSettings()]);
  const heading = content?.heading ?? "What should I wear?";

  return (
    <>
      <PageHero
        eyebrow="Welcome Home"
        title="We can't wait to meet you"
        subtitle={
          settings?.new_here_note ||
          "Whether you're exploring faith or looking for a church home, here's everything you need for your first visit."
        }
        image={content?.image_url || stockImages.fellowship}
        crumbs={[{ label: "Home", href: "/" }, { label: "New Here" }]}
      />

      <section className="dot-grid py-24 lg:py-32">
        <div className="section">
          <SectionHeading eyebrow="What to Expect" title="Your first visit, made easy" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={0.05 * i}>
                <div className="group flex h-full gap-5 rounded-3xl border border-navy-100/70 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy-800 transition-colors duration-500 group-hover:bg-gold-gradient group-hover:text-navy-950">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy-900">{h.title}</h3>
                    <p className="mt-1 text-navy-500">{h.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section grid grid-cols-1 gap-16 pb-24 lg:grid-cols-2 lg:items-start lg:pb-32">
        <Reveal>
          <span className="eyebrow">Questions</span>
          <h2 className="container-heading mt-4">{heading}</h2>
          <FaqAccordion faqs={faqs} />
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-4xl bg-navy-950 text-white shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content?.image_url || stockImages.congregation} alt="" className="h-64 w-full object-cover" />
            <div className="p-8 sm:p-10">
              <h3 className="font-display text-3xl font-semibold">Plan your visit</h3>
              <p className="mt-3 text-navy-200">
                Find our service times, address and the easiest way to get to us. We&apos;ll save you a seat!
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/visit" variant="primary">
                  Times & directions <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/contact" variant="outline">
                  Ask a question
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
