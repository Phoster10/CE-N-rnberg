import PageHero from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import FaqAccordion from "@/components/faq-accordion";
import { getNewHereContent } from "@/lib/data";

export const metadata = { title: "New Here?" };

const faqs = [
  { q: "What should I wear?", a: "Come as you are! Smart casual is common, but there's no dress code — we're just glad you're here." },
  { q: "What happens during the service?", a: "Expect worship, prayer, an inspiring message from the Word, and a warm welcome from our church family." },
  { q: "Is there children's ministry?", a: "Yes — our Children's Ministry team cares for kids of all ages during the service." },
  { q: "How long is the service?", a: "Services typically run for about an hour and a half." },
  { q: "Can I come if I'm not a Christian?", a: "Absolutely. Everyone is welcome, wherever you are on your journey of faith." },
];

export default async function NewHerePage() {
  const content = await getNewHereContent();
  const heading = content?.heading ?? "What should I wear?";

  return (
    <>
      <PageHero title="New Here?" crumbs={[{ label: "Home", href: "/" }, { label: "New Here" }]} />
      <section className="section grid grid-cols-1 gap-10 py-20 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="container-heading text-left">{heading}</h2>
          <FaqAccordion faqs={faqs} />
        </div>

        <div className="flex flex-col items-center gap-6 rounded-2xl bg-navy-50 p-8 text-center">
          {content?.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.image_url} alt="" className="h-48 w-full rounded-xl object-cover" />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-xl bg-navy-gradient text-gold-400">
              <span className="font-display text-lg">Our Church Family</span>
            </div>
          )}
          <h3 className="font-display text-xl font-semibold text-navy-900">Plan Your Visit</h3>
          <p className="text-sm text-navy-500">We would love to welcome you!</p>
          <Button href="/visit" variant="primary">
            Plan My Visit
          </Button>
        </div>
      </section>
    </>
  );
}
