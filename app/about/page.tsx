import { Button } from "@/components/ui/button";
import { Compass, Target, HeartHandshake } from "lucide-react";
import PageHero from "@/components/page-hero";

export const metadata = { title: "About Us" };

const values = [
  { icon: Compass, title: "Our Vision", text: "To reach out with the Gospel of Christ to all nations." },
  { icon: Target, title: "Our Mission", text: "To win souls, build believers, and raise leaders." },
  { icon: HeartHandshake, title: "Our Core Values", text: "Love, excellence, integrity, faith & service." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      <section className="section grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow">Who We Are</span>
          <h2 className="container-heading mt-3 text-left">
            A dynamic, Christ-centered church family
          </h2>
          <p className="mt-4 text-navy-500">
            Christ Embassy Nürnberg is a dynamic, Christ-centered church committed to winning souls,
            building believers, and raising leaders through the Word of God.
          </p>
          <p className="mt-4 text-navy-500">
            We are part of a global ministry founded by Pastor Chris Oyakhilome, and we are passionate
            about impacting our city and the nations with God&apos;s love.
          </p>
          <Button href="/new-here" variant="secondary" className="mt-6">
            Learn More About Us
          </Button>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-soft">
          <div className="flex aspect-[4/3] items-center justify-center bg-navy-gradient text-gold-400">
            <span className="font-display text-2xl">Pastor&apos;s Portrait</span>
          </div>
        </div>
      </section>

      <section className="bg-navy-50/60 py-20">
        <div className="section grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-white p-6 text-center shadow-card">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{v.title}</h3>
              <p className="mt-2 text-sm text-navy-500">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:items-center">
        <div className="order-2 overflow-hidden rounded-2xl shadow-soft lg:order-1">
          <div className="flex aspect-[4/3] items-center justify-center bg-navy-900 text-gold-400">
            <span className="font-display text-2xl">Congregation in Worship</span>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="eyebrow">Our Faith</span>
          <h2 className="container-heading mt-3 text-left">What We Believe</h2>
          <p className="mt-4 text-navy-500">
            We believe in the absolute truth of God&apos;s Word, the power of prayer, the Holy Spirit,
            and in living a life that reflects Christ.
          </p>
        </div>
      </section>
    </>
  );
}
