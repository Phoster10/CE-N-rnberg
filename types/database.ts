export type ServiceTime = {
  id: string;
  label: string;
  day_of_week: number; // 0 = Sunday
  time: string; // "10:00"
  is_next_feature: boolean;
  created_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string | null;
  location: string | null;
  poster_url: string | null;
  registration_url: string | null;
  is_published: boolean;
  created_at: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  category: "services" | "events" | "outreach" | "baptisms" | "conferences" | "kids" | "general";
  created_at: string;
};

export type GalleryItem = {
  id: string;
  album_id: string | null;
  media_type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  caption: string | null;
  created_at: string;
};

export type Ministry = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
};

export type Testimony = {
  id: string;
  author_name: string;
  content: string;
  is_published: boolean;
  created_at: string;
};

export type RhapsodyEntry = {
  id: string;
  entry_date: string;
  title: string;
  scripture_reference: string | null;
  body: string;
  cover_image_url: string | null;
  created_at: string;
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  is_active: boolean;
  created_at: string;
};

export type WatchOnlineSettings = {
  id: string;
  is_live: boolean;
  youtube_embed_url: string | null;
  zoom_link: string | null;
  updated_at: string;
};

export type HomepageContent = {
  id: string;
  hero_heading: string;
  hero_subheading: string;
  memory_verse_text: string;
  memory_verse_reference: string;
  welcome_message: string;
  hero_image_url: string | null;
  welcome_image_url: string | null;
  updated_at: string;
};

export type AboutContent = {
  id: string;
  who_we_are_text: string;
  vision_text: string;
  mission_text: string;
  values_text: string;
  believe_text: string;
  portrait_image_url: string | null;
  congregation_image_url: string | null;
  updated_at: string;
};

export type NewHereContent = {
  id: string;
  heading: string;
  image_url: string | null;
  updated_at: string;
};

export type SiteSettings = {
  id: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  footer_tagline: string;
  social_youtube: string | null;
  social_instagram: string | null;
  social_facebook: string | null;
  bank_account_name: string;
  bank_iban: string;
  bank_bic: string;
  bank_name: string;
  give_url: string | null;
  map_embed_src: string | null;
  map_directions_url: string | null;
  new_here_note: string | null;
  updated_at: string;
};

export type PrayerRequest = {
  id: string;
  name: string | null;
  email: string | null;
  request: string;
  visibility: "public" | "private";
  status: "new" | "in_progress" | "prayed";
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};
