import PageHero from "@/components/page-hero";
import PrayerForm from "./prayer-form";
import { Quote } from "lucide-react";

export const metadata = { title: "Prayer Request" };

export default function PrayerRequestPage() {
  return (
    <>
      <PageHero
        title="Prayer Request"
        subtitle="We believe in the power of prayer and we are here to stand with you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Prayer Request" }]}
      />
      <section className="section grid grid-cols-1 gap-10 py-20 lg:grid-cols-2">
        <div>
          <p className="text-navy-500">
            Send us your prayer request and our prayer team will pray with faith for you.
          </p>
          <div className="mt-6 rounded-2xl bg-navy-50 p-6">
            <Quote className="h-6 w-6 text-gold-500" />
            <p className="mt-3 font-display text-lg text-navy-800">
              &ldquo;Call unto me, and I will answer thee, and shew thee great and mighty things, which thou
              knowest not.&rdquo;
            </p>
            <p className="mt-3 text-sm font-semibold text-navy-600">Jeremiah 33:3</p>
          </div>
        </div>
        <PrayerForm />
      </section>
    </>
  );
}
