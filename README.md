# Christ Embassy Nürnberg — Website & Admin Dashboard

A modern church website built with Next.js 15 (App Router), React 19, TypeScript,
Tailwind CSS, Framer Motion, and Supabase (Auth, Postgres, Storage).

## 1. Set up Supabase

1. Create a project at https://supabase.com.
2. In the SQL Editor, run the entire contents of `sql/schema.sql`. This creates
   every table, Row-Level Security policy, and the `public-media` storage bucket.
3. Under **Authentication → Users**, create an account for each admin/staff
   member (email + password).
4. Copy each admin's **User UID** and run, once per admin:
   ```sql
   insert into public.admin_users (id, email) values ('<user-uid>', '<their-email>');
   ```
   This is the database-level gate enforced by RLS.

## 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_EMAIL_ALLOWLIST=admin1@example.com,admin2@example.com
```

`ADMIN_EMAIL_ALLOWLIST` is the **app-level** gate (checked in `middleware.ts`
and the login action) — it must exactly match the emails you added to
`admin_users` in step 1.4. Never commit `.env.local`.

## 3. Install & run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The admin dashboard is at `/admin/login`
(also linked from the footer).

## 4. Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the same environment variables from step 2 in the Vercel project settings.
4. Deploy.

## Project structure

- `app/` — all routes (public pages + `/admin/login` + `/admin/dashboard/*`)
- `components/` — shared UI (Navbar, Footer, Button, Card...) and `components/admin/`
  for the reusable CRUD panel used across every dashboard section
- `lib/supabase/` — browser, server, and service-role Supabase clients
- `lib/data.ts` — typed read helpers for public pages
- `lib/auth/admin.ts` — server-side admin email allowlist check
- `middleware.ts` — refreshes the Supabase session and blocks `/admin/dashboard`
  for anyone not signed in and allowlisted
- `sql/schema.sql` — full Postgres schema + RLS policies + storage bucket
- `types/database.ts` — shared TypeScript types matching the schema

## Security notes

- Every table has RLS enabled. Public tables are readable by anyone but only
  writable by rows in `admin_users`. Submission tables (`prayer_requests`,
  `contact_messages`) are insert-only for the public and readable only by admins.
- Admin access requires **both** a valid Supabase Auth session **and** the
  user's email being present in `ADMIN_EMAIL_ALLOWLIST` (checked in
  `middleware.ts` and again on login) **and** their user id being in
  `public.admin_users` (enforced by RLS on every write). Any one of these
  failing denies access.
- File uploads are restricted by MIME type and size both in the storage
  bucket config and in the admin upload UI.
- All form inputs are validated with `zod` before being written to the database.

## What's still a placeholder

- "Give Now" links to `siteConfig.giveUrl` in `lib/site-config.ts` — wire this
  up to your real payment processor (Stripe, PayPal, a German provider, etc.).
- The footer newsletter form is UI-only; connect it to an email provider if needed.
- Sample/fallback content (service times, ministries, testimonies) shows on
  pages until you add real rows via the admin dashboard.
