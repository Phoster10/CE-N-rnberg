import { Quote } from "lucide-react";
import PageHero from "@/components/page-hero";
import { getTestimonies } from "@/lib/data";

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
      <PageHero title="Testimonies" crumbs={[{ label: "Home", href: "/" }, { label: "Testimonies" }]} />
      <section className="section py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <div key={t.id} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              <Quote className="h-6 w-6 text-gold-500" />
              <p className="mt-4 text-sm text-navy-600">&ldquo;{t.content}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-navy-900">{t.author_name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
