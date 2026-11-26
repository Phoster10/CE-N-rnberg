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
