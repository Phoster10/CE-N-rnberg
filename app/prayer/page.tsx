import { HandHeart, Lock, Quote } from "lucide-react";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import PrayerForm from "./prayer-form";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Prayer Request" };

export default function PrayerRequestPage() {
  return (
    <>
      <PageHero
        eyebrow="We're Here for You"
        title="You don't have to pray alone"
        subtitle="We believe in the power of prayer, and our prayer team would be honoured to stand with you in faith."
        image={stockImages.bible}
        crumbs={[{ label: "Home", href: "/" }, { label: "Prayer Request" }]}
      />
      <section className="section grid grid-cols-1 gap-12 py-24 lg:grid-cols-5 lg:py-32">
        <Reveal className="space-y-8 lg:col-span-2">
          <div className="grain relative isolate overflow-hidden rounded-4xl bg-navy-950 p-8 text-white shadow-lift sm:p-10">
            <div className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-gold-500/25 blur-[80px]" />
            <Quote className="h-10 w-10 text-gold-400" />
            <p className="mt-6 font-display text-2xl font-light italic leading-relaxed">
              &ldquo;Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest
              not.&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold text-gold-400">Jeremiah 33:3</p>
          </div>
          {[
            { icon: HandHeart, title: "Prayed over with faith", text: "Every request is personally received and prayed for by our prayer team." },
            { icon: Lock, title: "Kept confidential", text: "Choose private and only our prayer team will ever see your request." },
          ].map((p) => (
            <div key={p.title} className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy-800">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-1 text-navy-500">{p.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-3">
          <PrayerForm />
        </Reveal>
      </section>
    </>
  );
}
