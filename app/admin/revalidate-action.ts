"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAllowlistedAdmin } from "@/lib/auth/admin";

/** Drops the cached public pages so an admin's changes show up right away. */
export async function revalidateSite() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAllowlistedAdmin(user?.email)) return;
  revalidatePath("/", "layout");
}
