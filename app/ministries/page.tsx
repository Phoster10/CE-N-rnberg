import PageHero from "@/components/page-hero";
import { getMinistries } from "@/lib/data";

export const metadata = { title: "Ministries" };

const fallback = [
  { id: "1", name: "Children's Ministry", description: "Raising children in the love and knowledge of God.", image_url: null },
  { id: "2", name: "Teens Ministry", description: "Empowering teenagers to live for Christ.", image_url: null },
  { id: "3", name: "Youth Ministry", description: "Building passionate young people for God.", image_url: null },
  { id: "4", name: "Campus Ministry", description: "Reaching students on campuses.", image_url: null },
  { id: "5", name: "Men's Fellowship", description: "Building Godly men.", image_url: null },
  { id: "6", name: "Women's Fellowship", description: "Empowering women to fulfil their destiny.", image_url: null },
  { id: "7", name: "Choir", description: "Leading hearts in worship and praise.", image_url: null },
  { id: "8", name: "Media Team", description: "Spreading the Gospel through media.", image_url: null },
  { id: "9", name: "Evangelism Team", description: "Taking the Gospel to our world.", image_url: null },
];

export default async function MinistriesPage() {
  const ministries = await getMinistries();
  const list = ministries.length > 0 ? ministries : fallback;

  return (
    <>
      <PageHero title="Our Ministries" crumbs={[{ label: "Home", href: "/" }, { label: "Ministries" }]} />
      <section className="section py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-2xl border border-navy-100 shadow-card">
              <div className="flex h-40 items-center justify-center bg-navy-gradient text-gold-400">
                <span className="font-display text-lg">{m.name}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-navy-900">{m.name}</h3>
                <p className="mt-1 text-sm text-navy-500">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
