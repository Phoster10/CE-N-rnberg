import { ArrowRight, Baby, BookOpen, Mic2, Megaphone, Sparkles, Users, UserRound, Video } from "lucide-react";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/motion/reveal";
import Photo from "@/components/photo";
import { Button } from "@/components/ui/button";
import { getMinistries } from "@/lib/data";
import { ministryImage, stockImages } from "@/lib/images";

export const metadata = { title: "Ministries" };

const fallback = [
  { id: "1", name: "Children's Ministry", description: "Raising children in the love and knowledge of God.", image_url: null },
  { id: "2", name: "Teens Ministry", description: "Empowering teenagers to live for Christ.", image_url: null },
  { id: "3", name: "Youth Ministry", description: "Building passionate young people for God.", image_url: null },
  { id: "5", name: "Men's Fellowship", description: "Building Godly men.", image_url: null },
  { id: "6", name: "Women's Fellowship", description: "Empowering women to fulfil their destiny.", image_url: null },
  { id: "7", name: "Choir", description: "Leading hearts in worship and praise.", image_url: null },
  { id: "8", name: "Media Team", description: "Spreading the Gospel through media.", image_url: null },
  { id: "9", name: "Evangelism Team", description: "Taking the Gospel to our world.", image_url: null },
];

// Picks a fitting icon from the ministry's name so admin-created ministries get one too.
function iconFor(name: string) {
  const n = name.toLowerCase();
  if (n.includes("child") || n.includes("kid")) return Baby;
  if (n.includes("choir") || n.includes("music") || n.includes("worship")) return Mic2;
  if (n.includes("media")) return Video;
  if (n.includes("evangel") || n.includes("outreach")) return Megaphone;
  if (n.includes("men") || n.includes("women")) return UserRound;
  if (n.includes("youth") || n.includes("teen")) return Sparkles;
  if (n.includes("bible") || n.includes("school")) return BookOpen;
  return Users;
}

export default async function MinistriesPage() {
  const ministries = await getMinistries();
  const list = ministries.length > 0 ? ministries : fallback;

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Find your place to grow and serve"
        subtitle="Every member has a gift and a calling. Discover a ministry where you can belong, flourish and make a difference."
        image={stockImages.fellowship}
        crumbs={[{ label: "Home", href: "/" }, { label: "Ministries" }]}
      />
      <section className="section py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m, i) => {
            const Icon = iconFor(m.name);
            const image = m.image_url || ministryImage(m.name);
            return (
              <Reveal key={m.id} delay={0.06 * (i % 3)}>
                <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-navy-100/70 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <div className="relative">
                    <div className="relative h-48 overflow-hidden bg-navy-gradient">
                      {image ? (
                        <Photo
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl" />
                          <Icon className="absolute -bottom-4 -right-4 h-32 w-32 text-white/[0.06]" />
                          <span className="absolute left-6 top-6 font-display text-6xl font-semibold text-white/10">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="absolute bottom-0 left-6 flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-2xl bg-gold-gradient text-navy-950 shadow-glow transition-transform duration-500 group-hover:rotate-6">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="flex-1 p-7 pt-12">
                    <h3 className="font-display text-2xl font-semibold text-navy-900">{m.name}</h3>
                    {m.description && <p className="mt-2 leading-relaxed text-navy-500">{m.description}</p>}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-col items-center justify-between gap-6 rounded-4xl bg-cream p-10 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-3xl font-semibold text-navy-900">Ready to get involved?</h2>
              <p className="mt-2 text-navy-500">Tell us a little about yourself and we&apos;ll help you find the right fit.</p>
            </div>
            <Button href="/contact" variant="secondary" size="lg">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
