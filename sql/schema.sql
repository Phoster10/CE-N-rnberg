-- ============================================================================
-- Christ Embassy Nürnberg — Supabase schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- Every table has Row-Level Security enabled. Public tables are readable by
-- anyone (anon + authenticated) but writable only by authenticated admins.
-- Submission tables (prayer requests, contact messages) are insert-only for
-- anon users and readable only by admins.
--
-- "Admin" here = any row in public.admin_users. Populate this table with the
-- Supabase auth user id of each staff member you allowlist via
-- ADMIN_EMAIL_ALLOWLIST in the app; the app-level allowlist is the primary
-- gate for the dashboard UI, and this table is the *database-level* gate
-- enforced by RLS so the API can never be bypassed even if the UI check is
-- skipped.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Admin users (mirrors the app's email allowlist at the DB layer)
-- ----------------------------------------------------------------------------
create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$;

create policy "Admins can read the admin list"
  on public.admin_users for select
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- Homepage content (single row, edited by admins)
-- ----------------------------------------------------------------------------
create table if not exists public.homepage_content (
  id uuid primary key default gen_random_uuid(),
  hero_heading text not null default 'Welcome to Christ Embassy Nürnberg',
  hero_subheading text not null default 'A Place of Love, Faith & God''s Presence',
  memory_verse_text text not null default '',
  memory_verse_reference text not null default '',
  welcome_message text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.homepage_content enable row level security;

create policy "Public can read homepage content"
  on public.homepage_content for select
  using (true);

create policy "Admins can manage homepage content"
  on public.homepage_content for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Service times
-- ----------------------------------------------------------------------------
create table if not exists public.service_times (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  time text not null,
  is_next_feature boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.service_times enable row level security;

create policy "Public can read service times"
  on public.service_times for select using (true);

create policy "Admins can manage service times"
  on public.service_times for all
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Events
-- ----------------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz,
  location text,
  poster_url text,
  registration_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "Public can read published events"
  on public.events for select
  using (is_published = true or public.is_admin());

create policy "Admins can manage events"
  on public.events for all
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Ministries
-- ----------------------------------------------------------------------------
create table if not exists public.ministries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.ministries enable row level security;

create policy "Public can read ministries"
  on public.ministries for select using (true);

create policy "Admins can manage ministries"
  on public.ministries for all
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Gallery albums + items
-- ----------------------------------------------------------------------------
create table if not exists public.gallery_albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'general'
    check (category in ('services','events','outreach','baptisms','conferences','kids','general')),
  created_at timestamptz not null default now()
);

alter table public.gallery_albums enable row level security;

create policy "Public can read gallery albums"
  on public.gallery_albums for select using (true);

create policy "Admins can manage gallery albums"
  on public.gallery_albums for all
  using (public.is_admin()) with check (public.is_admin());

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  album_id uuid references public.gallery_albums (id) on delete set null,
  media_type text not null check (media_type in ('image','video')),
  url text not null,
  thumbnail_url text,
  caption text,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

create policy "Public can read gallery items"
  on public.gallery_items for select using (true);

create policy "Admins can manage gallery items"
  on public.gallery_items for all
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Testimonies (public submissions require admin approval before showing)
-- ----------------------------------------------------------------------------
create table if not exists public.testimonies (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  content text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.testimonies enable row level security;

create policy "Public can read published testimonies"
  on public.testimonies for select
  using (is_published = true or public.is_admin());

create policy "Admins can manage testimonies"
  on public.testimonies for all
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Rhapsody of Realities entries
-- ----------------------------------------------------------------------------
create table if not exists public.rhapsody_entries (
  id uuid primary key default gen_random_uuid(),
  entry_date date not null unique,
  title text not null,
  scripture_reference text,
  body text not null,
  cover_image_url text,
  created_at timestamptz not null default now()
);

alter table public.rhapsody_entries enable row level security;

create policy "Public can read rhapsody entries"
  on public.rhapsody_entries for select using (true);

create policy "Admins can manage rhapsody entries"
  on public.rhapsody_entries for all
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Announcements
-- ----------------------------------------------------------------------------
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

create policy "Public can read active announcements"
  on public.announcements for select
  using (is_active = true or public.is_admin());

create policy "Admins can manage announcements"
  on public.announcements for all
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Watch Online settings (single row: livestream status + links)
-- ----------------------------------------------------------------------------
create table if not exists public.watch_online_settings (
  id uuid primary key default gen_random_uuid(),
  is_live boolean not null default false,
  youtube_embed_url text,
  zoom_link text,
  updated_at timestamptz not null default now()
);

alter table public.watch_online_settings enable row level security;

create policy "Public can read watch online settings"
  on public.watch_online_settings for select using (true);

create policy "Admins can manage watch online settings"
  on public.watch_online_settings for all
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Prayer requests (public insert-only; admins read/manage)
-- ----------------------------------------------------------------------------
create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  request text not null check (char_length(request) between 1 and 2000),
  visibility text not null default 'private' check (visibility in ('public','private')),
  status text not null default 'new' check (status in ('new','in_progress','prayed')),
  created_at timestamptz not null default now()
);

alter table public.prayer_requests enable row level security;

create policy "Anyone can submit a prayer request"
  on public.prayer_requests for insert
  with check (true);

create policy "Admins can read prayer requests"
  on public.prayer_requests for select
  using (public.is_admin());

create policy "Admins can update prayer requests"
  on public.prayer_requests for update
  using (public.is_admin()) with check (public.is_admin());

create policy "Admins can delete prayer requests"
  on public.prayer_requests for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- Contact messages (public insert-only; admins read/manage)
-- ----------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message text not null check (char_length(message) between 1 and 3000),
  status text not null default 'new' check (status in ('new','read','archived')),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  with check (true);

create policy "Admins can read contact messages"
  on public.contact_messages for select
  using (public.is_admin());

create policy "Admins can update contact messages"
  on public.contact_messages for update
  using (public.is_admin()) with check (public.is_admin());

create policy "Admins can delete contact messages"
  on public.contact_messages for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- Storage buckets: gallery, posters, ministries, rhapsody
-- Run in SQL editor — creates buckets and their access policies.
-- File type/size limits are also enforced client-side before upload.
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('public-media', 'public-media', true, 10485760,
   array['image/jpeg','image/png','image/webp','image/gif','video/mp4'])
on conflict (id) do nothing;

create policy "Public can view public-media"
  on storage.objects for select
  using (bucket_id = 'public-media');

create policy "Admins can upload to public-media"
  on storage.objects for insert
  with check (bucket_id = 'public-media' and public.is_admin());

create policy "Admins can update public-media"
  on storage.objects for update
  using (bucket_id = 'public-media' and public.is_admin());

create policy "Admins can delete public-media"
  on storage.objects for delete
  using (bucket_id = 'public-media' and public.is_admin());

-- ----------------------------------------------------------------------------
-- Seed a default homepage_content + watch_online_settings row so the app
-- has something to render before an admin edits it.
-- ----------------------------------------------------------------------------
insert into public.homepage_content (hero_heading, hero_subheading, memory_verse_text, memory_verse_reference, welcome_message)
select
  'Welcome to Christ Embassy Nürnberg',
  'A Place of Love, Faith & God''s Presence',
  'Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.',
  'Jeremiah 33:3',
  'Christ Embassy Nürnberg is a dynamic, Christ-centered church committed to winning souls, building believers, and raising leaders through the Word of God.'
where not exists (select 1 from public.homepage_content);

insert into public.watch_online_settings (is_live, youtube_embed_url, zoom_link)
select false, null, null
where not exists (select 1 from public.watch_online_settings);

-- ============================================================================
-- ADDENDUM — full site-wide editability
-- Run this block too (it's idempotent — safe to run even if you already ran
-- everything above). It adds:
--   1. Image fields on homepage_content (hero background, welcome photo)
--   2. about_content — every text block + both photos on the About page
--   3. new_here_content — text + photo on the New Here page
--   4. site_settings — contact info, socials, bank details, map links,
--      footer tagline: every "hardcoded" church detail, now editable
-- All existing pages read from these tables with the old hardcoded values
-- as a fallback, so nothing breaks if a field is left empty.
-- ============================================================================

alter table public.homepage_content
  add column if not exists hero_image_url text,
  add column if not exists welcome_image_url text;

-- ----------------------------------------------------------------------------
-- About page content (single row)
-- ----------------------------------------------------------------------------
create table if not exists public.about_content (
  id uuid primary key default gen_random_uuid(),
  who_we_are_text text not null default '',
  vision_text text not null default 'To reach out with the Gospel of Christ to all nations.',
  mission_text text not null default 'To win souls, build believers, and raise leaders.',
  values_text text not null default 'Love, excellence, integrity, faith & service.',
  believe_text text not null default '',
  portrait_image_url text,
  congregation_image_url text,
  updated_at timestamptz not null default now()
);

alter table public.about_content enable row level security;

create policy "Public can read about content"
  on public.about_content for select using (true);

create policy "Admins can manage about content"
  on public.about_content for all
  using (public.is_admin()) with check (public.is_admin());

insert into public.about_content (who_we_are_text, believe_text)
select
  'Christ Embassy Nürnberg is a dynamic, Christ-centered church committed to winning souls, building believers, and raising leaders through the Word of God. We are part of a global ministry founded by Pastor Chris Oyakhilome, and we are passionate about impacting our city and the nations with God''s love.',
  'We believe in the absolute truth of God''s Word, in the power of prayer, in the Holy Spirit, and in living a life that reflects Christ.'
where not exists (select 1 from public.about_content);

-- ----------------------------------------------------------------------------
-- New Here page content (single row)
-- ----------------------------------------------------------------------------
create table if not exists public.new_here_content (
  id uuid primary key default gen_random_uuid(),
  heading text not null default 'What should I wear?',
  image_url text,
  updated_at timestamptz not null default now()
);

alter table public.new_here_content enable row level security;

create policy "Public can read new here content"
  on public.new_here_content for select using (true);

create policy "Admins can manage new here content"
  on public.new_here_content for all
  using (public.is_admin()) with check (public.is_admin());

insert into public.new_here_content (heading)
select 'What should I wear?'
where not exists (select 1 from public.new_here_content);

-- ----------------------------------------------------------------------------
-- Site-wide settings: contact info, socials, bank details, map, footer
-- (single row)
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  phone text not null default '+49 162 1234567',
  email text not null default 'info@christembassy-nuernberg.de',
  address_line1 text not null default 'Thomas-Mann-Straße 60',
  address_line2 text not null default '90471 Nürnberg, Germany',
  footer_tagline text not null default 'A place of love, faith and God''s presence.',
  social_youtube text,
  social_instagram text,
  social_facebook text,
  bank_account_name text not null default 'Christ Embassy Nürnberg',
  bank_iban text not null default '',
  bank_bic text not null default '',
  bank_name text not null default '',
  give_url text,
  map_embed_src text,
  map_directions_url text,
  new_here_note text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
  on public.site_settings for select using (true);

create policy "Admins can manage site settings"
  on public.site_settings for all
  using (public.is_admin()) with check (public.is_admin());

insert into public.site_settings (map_embed_src, map_directions_url)
select
  'https://www.google.com/maps?q=Thomas-Mann-Stra%C3%9Fe+60,+90471+N%C3%BCrnberg,+Germany&output=embed',
  'https://www.google.com/maps/dir/?api=1&destination=Thomas-Mann-Stra%C3%9Fe+60,+90471+N%C3%BCrnberg,+Germany'
where not exists (select 1 from public.site_settings);

-- ----------------------------------------------------------------------------
-- If you already ran this file before with the old address, the insert above
-- was skipped (a site_settings row already existed) — this updates it too.
-- Safe to re-run any time; it only overwrites these specific fields.
-- ----------------------------------------------------------------------------
update public.site_settings set
  address_line1 = 'Thomas-Mann-Straße 60',
  address_line2 = '90471 Nürnberg, Germany',
  map_embed_src = coalesce(map_embed_src, 'https://www.google.com/maps?q=Thomas-Mann-Stra%C3%9Fe+60,+90471+N%C3%BCrnberg,+Germany&output=embed'),
  map_directions_url = coalesce(map_directions_url, 'https://www.google.com/maps/dir/?api=1&destination=Thomas-Mann-Stra%C3%9Fe+60,+90471+N%C3%BCrnberg,+Germany')
where address_line1 = 'Lehrerstraße 6';
