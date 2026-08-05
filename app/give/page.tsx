import { Landmark, Heart, ShieldCheck, BookOpen, Users2, Building2, HeartHandshake } from "lucide-react";
import PageHero from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import CopyBankDetails from "@/components/copy-bank-details";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data";

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
  { q: "How is the money used?", a: "Giving supports the Gospel, our people, church operations, and community impact — see above." },
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

  return (
    <>
      <section className="relative overflow-hidden bg-navy-gradient py-24 text-center text-white">
        <div className="section relative">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Partner With Us <span className="text-gold-400">In Advancing God&apos;s Kingdom</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy-200">
            &ldquo;Bring ye all the tithes into the storehouse, that there may be meat in mine house...&rdquo;
          </p>
          <p className="mt-1 text-sm text-gold-400">Malachi 3:10</p>
        </div>
      </section>

      <section className="section py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: Heart, title: "Kingdom Impact", text: "Your giving supports the work of God in our city and beyond." },
            { icon: HeartHandshake, title: "Changing Lives", text: "Reaching people with the Gospel and transforming communities." },
            { icon: Building2, title: "Building the Church", text: "Strengthening and equipping believers for a greater tomorrow." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-navy-50 p-6 text-center">
              <c.icon className="mx-auto h-6 w-6 text-navy-700" />
              <h3 className="mt-3 font-display text-base font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-1 text-sm text-navy-500">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pb-16">
        <h2 className="container-heading">Ways to Give</h2>
        <p className="mx-auto -mt-8 mb-10 max-w-md text-center text-navy-500">
          Choose the most convenient way for you to support the work of God.
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
              <Landmark className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">Bank Transfer</h3>
            <p className="mt-1 text-sm text-navy-500">Give securely via bank transfer.</p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <Row label="Account Name" value={bank.accountName} />
              <Row label="IBAN" value={bank.iban} />
              <Row label="BIC" value={bank.bic} />
              <Row label="Bank" value={bank.bank} />
            </dl>
            <CopyBankDetails accountName={bank.accountName} iban={bank.iban} bic={bank.bic} bank={bank.bank} />
          </div>

          <div className="rounded-2xl border-2 border-gold-400 bg-white p-6 shadow-glow">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
              <Heart className="h-6 w-6" />
            </span>
            <div className="mt-4 flex items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-navy-900">Give Online</h3>
              <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-semibold text-gold-700">
                Recommended
              </span>
            </div>
            <p className="mt-1 text-sm text-navy-500">Give quickly and securely online.</p>
            <Button href={giveUrl} target="_blank" rel="noopener noreferrer" className="mt-6 w-full">
              Give Now
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-navy-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure and encrypted
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-navy-50 p-6 text-center">
            <p className="font-display text-lg text-navy-800">&ldquo;God loves a cheerful giver.&rdquo;</p>
            <p className="mt-2 text-sm font-semibold text-gold-600">2 Corinthians 9:7</p>
          </div>
        </div>
      </section>

      <section className="bg-navy-50/60 py-16">
        <div className="section grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="container-heading text-left">Where Your Giving Goes</h2>
            <p className="mt-2 text-navy-500">
              Your faithful giving supports the vision and mission of Christ Embassy.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {impactAreas.map((a) => (
                <div key={a.title} className="rounded-xl bg-white p-4 shadow-card">
                  <a.icon className="h-5 w-5 text-navy-700" />
                  <p className="mt-2 text-sm font-semibold text-navy-900">{a.title}</p>
                  <p className="mt-1 text-xs text-navy-500">{a.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="container-heading text-left">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-navy-100 bg-white p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-navy-900">{f.q}</summary>
                  <p className="mt-2 text-sm text-navy-500">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-gold-50 p-5">
              <p className="font-display text-sm font-semibold text-navy-900">Thank You!</p>
              <p className="mt-1 text-xs text-navy-500">
                Thank you for partnering with us and being a part of what God is doing through Christ Embassy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-navy-50 pb-1.5">
      <dt className="text-navy-400">{label}</dt>
      <dd className="font-medium text-navy-800">{value}</dd>
    </div>
  );
}
