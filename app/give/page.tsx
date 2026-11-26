import { Landmark, Heart, ShieldCheck, BookOpen, Users2, Building2, HeartHandshake, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import CopyBankDetails from "@/components/copy-bank-details";
import FaqAccordion from "@/components/faq-accordion";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Give" };

const impactAreas = [
  { icon: BookOpen, title: "Spreading the Gospel", text: "Taking the message of Christ to our city, our nation and the nations." },
  { icon: Users2, title: "Building People", text: "Raising and equipping believers to walk in their divine purpose." },
  { icon: Building2, title: "Church Operations", text: "Supporting the work and activities of the local church." },
  { icon: HeartHandshake, title: "Community Impact", text: "Touching lives and making a difference in our community." },
];

const faqs = [
  { q: "Is my giving secure?", a: "Yes — all online transactions are processed through encrypted, secure payment channels." },
  { q: "Can I give as a first-time visitor?", a: "Of course — giving is always cheerful and never required to attend or participate." },
  { q: "What is the difference between tithes and offerings?", a: "Tithes are the first 10% returned to God; offerings are additional gifts given from the heart." },
  { q: "How is the money used?", a: "Giving supports the Gospel, our people, church operations, and community impact." },
];

export default async function GivePage() {
  const settings = await getSiteSettings();

  const bank = {
    accountName: settings?.bank_account_name || siteConfig.bank.accountName,
    iban: settings?.bank_iban || siteConfig.bank.iban,
    bic: settings?.bank_bic || siteConfig.bank.bic,
    bank: settings?.bank_name || siteConfig.bank.bank,
  };
  const giveUrl = settings?.give_url || siteConfig.giveUrl;
  const hasOnlineGiving = giveUrl && giveUrl !== "#";

  return (
    <>
      <PageHero
        eyebrow="Partner With Us"
        title="Advancing God's Kingdom together"
        subtitle="“Bring ye all the tithes into the storehouse, that there may be meat in mine house…” — Malachi 3:10"
        image={stockImages.worship}
        crumbs={[{ label: "Home", href: "/" }, { label: "Give" }]}
      />

      <section className="section py-24 lg:py-32">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow">Ways to Give</span>
          <h2 className="container-heading mt-4">Simple, secure, generous</h2>
          <p className="mt-5 text-lg text-navy-500">Choose the most convenient way for you to support the work of God.</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-4xl border border-navy-100/70 bg-white p-8 shadow-card sm:p-10">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <Landmark className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-navy-900">Bank Transfer</h3>
                  <p className="text-sm text-navy-500">Give directly from your bank account</p>
                </div>
              </div>
              <dl className="mt-8 divide-y divide-navy-50 rounded-2xl bg-navy-50/50 px-5">
                <Row label="Account Name" value={bank.accountName} />
                <Row label="IBAN" value={bank.iban} mono />
                <Row label="BIC" value={bank.bic} mono />
                <Row label="Bank" value={bank.bank} />
              </dl>
              <CopyBankDetails accountName={bank.accountName} iban={bank.iban} bic={bank.bic} bank={bank.bank} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grain relative isolate flex h-full flex-col overflow-hidden rounded-4xl bg-navy-950 p-8 text-white shadow-lift sm:p-10">
              <div className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-gold-500/25 blur-[90px]" />
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-navy-950 shadow-glow">
                  <Heart className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl font-semibold">Give Online</h3>
                    <span className="rounded-full bg-gold-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                      Recommended
                    </span>
                  </div>
                  <p className="text-sm text-navy-300">Quick and secure, from any device</p>
                </div>
              </div>
              <blockquote className="mt-10 flex-1 font-display text-3xl font-light italic leading-snug">
                &ldquo;God loves a cheerful giver.&rdquo;
                <span className="mt-3 block font-sans text-sm font-semibold not-italic text-gold-400">2 Corinthians 9:7</span>
              </blockquote>
              {hasOnlineGiving ? (
                <Button href={giveUrl} target="_blank" rel="noopener noreferrer" size="lg" className="mt-10 w-full">
                  Give Now <ArrowUpRight className="h-4 w-4" />
                </Button>
              ) : (
                <p className="mt-10 rounded-2xl bg-white/5 p-4 text-center text-sm text-navy-200 ring-1 ring-white/10">
                  Online giving is coming soon — please use bank transfer in the meantime.
                </p>
              )}
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-navy-300">
                <ShieldCheck className="h-3.5 w-3.5" /> Secure and encrypted
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-24 lg:py-32">
        <div className="section grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Your Impact</span>
            <h2 className="container-heading mt-4">Where your giving goes</h2>
            <p className="mt-5 text-lg text-navy-500">
              Your faithful giving supports the vision and mission of Christ Embassy.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {impactAreas.map((a) => (
                <div key={a.title} className="rounded-3xl bg-white p-6 shadow-card">
                  <a.icon className="h-6 w-6 text-gold-600" />
                  <p className="mt-4 font-display text-lg font-semibold text-navy-900">{a.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-500">{a.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow">Questions</span>
            <h2 className="container-heading mt-4">Frequently asked</h2>
            <FaqAccordion faqs={faqs} />
            <p className="mt-8 text-navy-500">
              Thank you for partnering with us and being a part of what God is doing through Christ Embassy Nürnberg.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 py-3.5 text-sm">
      <dt className="text-navy-400">{label}</dt>
      <dd className={mono ? "font-mono font-semibold tracking-wide text-navy-900" : "font-semibold text-navy-900"}>{value}</dd>
    </div>
  );
}
