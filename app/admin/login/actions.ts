"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAllowlistedAdmin } from "@/lib/auth/admin";

export type LoginState = { error: string | null };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { error: "Invalid email or password." };
  }

  // Defense in depth: even a valid Supabase account must be on the
  // server-side admin allowlist before we grant dashboard access.
  if (!isAllowlistedAdmin(data.user.email)) {
    await supabase.auth.signOut();
    return { error: "This account is not authorized to access the admin dashboard." };
  }

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
