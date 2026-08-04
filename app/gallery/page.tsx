import PageHero from "@/components/page-hero";
import GalleryGrid from "@/components/gallery-grid";
import { getGalleryItems } from "@/lib/data";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHero title="Gallery" crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />
      <section className="section py-20">
        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <p className="text-center text-navy-500">
            Photos and videos from our services and events will appear here soon.
          </p>
        )}
      </section>
    </>
  );
}
