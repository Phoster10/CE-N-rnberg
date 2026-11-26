import { Images } from "lucide-react";
import PageHero from "@/components/page-hero";
import GalleryGrid from "@/components/gallery-grid";
import { getGalleryAlbums, getGalleryItems } from "@/lib/data";
import { stockImages } from "@/lib/images";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const [items, albums] = await Promise.all([getGalleryItems(), getGalleryAlbums()]);

  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Life at Christ Embassy"
        subtitle="Worship, fellowship and celebration — snapshots from our church family."
        image={stockImages.congregation}
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="section py-24 lg:py-32">
        {items.length > 0 ? (
          <GalleryGrid items={items} albums={albums} />
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-4xl border border-dashed border-navy-200 p-12 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50 text-navy-700">
              <Images className="h-7 w-7" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold text-navy-900">Coming soon</h2>
            <p className="mt-2 text-navy-500">Photos and videos from our services and events will appear here soon.</p>
          </div>
        )}
      </section>
    </>
  );
}
