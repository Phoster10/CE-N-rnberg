/**
 * Fallback photography used until the church uploads its own images through
 * the admin dashboard. Any image set in Supabase always takes precedence.
 */
const unsplash = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const stockImages = {
  worship: unsplash("photo-1438232992991-995b7058bbb3", 2000),
  congregation: unsplash("photo-1529070538774-1843cb3265df"),
  bible: unsplash("photo-1504052434569-70ad5836ab65"),
  fellowship: unsplash("photo-1511632765486-a01980e01a18"),
  sanctuary: unsplash("photo-1519491050282-cf00c82424b4"),
  praise: unsplash("photo-1507692049790-de58290a4334"),
};

// Matched against the ministry's name, first hit wins ("women" must come before "men").
const ministryPhotos: [RegExp, string][] = [
  [/child|kid/i, "photo-1529390079861-591de354faf5"],
  [/teen/i, "photo-1744320911030-1ab998d994d7"],
  [/youth/i, "photo-1563902341721-029085ad9347"],
  [/women|woman|ladies/i, "photo-1630726410985-a1021e8a232a"],
  [/\bmen\b|\bmen's/i, "photo-1653566031535-bcf33e1c2893"],
  [/choir|music|worship/i, "photo-1593678820334-91d5f99be314"],
  [/media/i, "photo-1627697855200-b3278a1f4209"],
  [/evangel|outreach/i, "photo-1779787818512-c99bab0e3b06"],
];

/** Stock photo for a ministry that has no uploaded image, or null if none fits. */
export function ministryImage(name: string) {
  const match = ministryPhotos.find(([pattern]) => pattern.test(name));
  return match ? unsplash(match[1], 900) : null;
}
