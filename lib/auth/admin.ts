/**
 * Server-side admin allowlist. Set ADMIN_EMAIL_ALLOWLIST in your environment
 * to a comma-separated list of the exact email addresses that may access
 * /admin/dashboard. This is intentionally NOT a NEXT_PUBLIC_ var — it must
 * never ship to the browser bundle.
 */
export function getAdminAllowlist(): string[] {
  const raw = process.env.ADMIN_EMAIL_ALLOWLIST ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowlistedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminAllowlist().includes(email.trim().toLowerCase());
}
