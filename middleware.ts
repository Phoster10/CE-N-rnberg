import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAllowlistedAdmin } from "@/lib/auth/admin";

/**
 * Runs on every request:
 *  1. Refreshes the Supabase auth session (required by @supabase/ssr).
 *  2. Guards every /admin/dashboard/* route: requires a logged-in Supabase
 *     user whose email is in the server-side admin allowlist. Anyone else
 *     is redirected to /admin/login. This is a *first line of defense* —
 *     the real enforcement is Row-Level Security on the database tables.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin/dashboard")) {
    if (!user || !isAllowlistedAdmin(user.email)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
