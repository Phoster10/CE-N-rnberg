import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type {
  AboutContent,
  Announcement,
  ContactMessage,
  Event,
  GalleryAlbum,
  GalleryItem,
  HomepageContent,
  Ministry,
  NewHereContent,
  PrayerRequest,
  RhapsodyEntry,
  ServiceTime,
  SiteSettings,
  Testimony,
  WatchOnlineSettings,
} from "@/types/database";

/**
 * Read-only data helpers used by public Server Components. Each one degrades
 * gracefully (returns null/[] ) if Supabase env vars aren't configured yet,
 * so the site still renders with placeholder content during setup.
 */

export async function getHomepageContent(): Promise<HomepageContent | null> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("homepage_content").select("*").limit(1).maybeSingle();
  return data as HomepageContent | null;
}

export async function getServiceTimes(): Promise<ServiceTime[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("service_times").select("*").order("day_of_week");
  return (data as ServiceTime[]) ?? [];
}

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .gte("start_at", new Date().toISOString())
    .order("start_at", { ascending: true })
    .limit(limit);
  return (data as Event[]) ?? [];
}

export async function getAllEvents(): Promise<Event[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("start_at", { ascending: true });
  return (data as Event[]) ?? [];
}

export async function getMinistries(): Promise<Ministry[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("ministries").select("*").order("sort_order");
  return (data as Ministry[]) ?? [];
}

export async function getTestimonies(limit?: number): Promise<Testimony[]> {
  const supabase = createPublicClient();
  let query = supabase
    .from("testimonies")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return (data as Testimony[]) ?? [];
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("gallery_albums").select("*").order("created_at", { ascending: false });
  return (data as GalleryAlbum[]) ?? [];
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
  return (data as GalleryItem[]) ?? [];
}

export async function getRhapsodyEntries(limit?: number): Promise<RhapsodyEntry[]> {
  const supabase = createPublicClient();
  let query = supabase.from("rhapsody_entries").select("*").order("entry_date", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return (data as RhapsodyEntry[]) ?? [];
}

export async function getTodayRhapsody(): Promise<RhapsodyEntry | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("rhapsody_entries")
    .select("*")
    .order("entry_date", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as RhapsodyEntry | null;
}

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("announcements").select("*").eq("is_active", true);
  return (data as Announcement[]) ?? [];
}

export async function getWatchOnlineSettings(): Promise<WatchOnlineSettings | null> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("watch_online_settings").select("*").limit(1).maybeSingle();
  return data as WatchOnlineSettings | null;
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("about_content").select("*").limit(1).maybeSingle();
  return data as AboutContent | null;
}

export async function getNewHereContent(): Promise<NewHereContent | null> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("new_here_content").select("*").limit(1).maybeSingle();
  return data as NewHereContent | null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
  return data as SiteSettings | null;
}

// ---- Admin-only reads (called from dashboard Server Components, after the
// caller has already been verified against the allowlist) ----------------

export async function getPrayerRequests(): Promise<PrayerRequest[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("prayer_requests").select("*").order("created_at", { ascending: false });
  return (data as PrayerRequest[]) ?? [];
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  return (data as ContactMessage[]) ?? [];
}
