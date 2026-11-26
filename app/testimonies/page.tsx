import { ArrowRight, Quote } from "lucide-react";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getTestimonies } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Testimonies" };

const fallback = [
  { id: "1", author_name: "Anna M.", content: "I was healed of a chronic back pain during the healing school. Glory to God!" },
  { id: "2", author_name: "David K.", content: "After praying with the pastor, I got a new job and my life changed." },
  { id: "3", author_name: "Sarah E.", content: "God touched my family and restored peace to our home." },
];

export default async function TestimoniesPage() {
  const testimonies = await getTestimonies();
  const list = testimonies.length > 0 ? testimonies : fallback;

  return (
    <>
      <PageHero
        eyebrow="Stories of Grace"
        title="What God has done"
        subtitle="Healing, provision, restoration — real stories from real people in our church family."
        image={stockImages.worship}
        crumbs={[{ label: "Home", href: "/" }, { label: "Testimonies" }]}
      />
      <section className="section py-24 lg:py-32">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {list.map((t, i) => (
            <Reveal key={t.id} delay={0.05 * (i % 3)} className="mb-6 break-inside-avoid">
              <figure
                className={
                  i % 4 === 1
                    ? "rounded-4xl bg-navy-900 p-8 text-white shadow-lift"
                    : "rounded-4xl border border-navy-100/70 bg-white p-8 shadow-card"
                }
              >
                <Quote className={i % 4 === 1 ? "h-9 w-9 text-gold-400" : "h-9 w-9 text-gold-500"} />
                <blockquote
                  className={`mt-5 font-display text-xl leading-relaxed ${i % 4 === 1 ? "text-white" : "text-navy-800"}`}
                >
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      i % 4 === 1 ? "bg-gold-gradient text-navy-950" : "bg-navy-50 text-navy-800"
                    }`}
                  >
                    {t.author_name.charAt(0)}
                  </span>
                  <span className={`font-semibold ${i % 4 === 1 ? "text-white" : "text-navy-900"}`}>{t.author_name}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col items-center justify-between gap-6 rounded-4xl bg-cream p-10 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-3xl font-semibold text-navy-900">Has God done something for you?</h2>
              <p className="mt-2 text-navy-500">We&apos;d love to celebrate with you. Share your testimony with us.</p>
            </div>
            <Button href="/contact" variant="secondary" size="lg">
              Share your testimony <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
