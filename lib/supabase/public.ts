import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-free anon client for public content. Because it never touches the
 * request, pages that use it can be cached and served without waiting on the
 * database. Access is still limited by Row-Level Security.
 */
export function createPublicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
    // Fail fast: the default retries add 7s of waiting when the database is unreachable.
    db: { retry: false, timeout: 5000 },
  });
}
