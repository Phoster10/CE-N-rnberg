import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. NEVER import this in a Client Component or
 * expose it to the browser — it bypasses Row-Level Security entirely.
 * Only use it in trusted server contexts (route handlers / server actions)
 * after the caller's identity has already been verified against the admin
 * allowlist (see lib/auth/admin.ts).
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
