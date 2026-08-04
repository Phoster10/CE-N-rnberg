"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  request: z.string().trim().min(1, "Please enter your prayer request.").max(2000),
  visibility: z.enum(["public", "private"]),
});

export type PrayerFormState = {
  success: boolean;
  message: string;
};

export async function submitPrayerRequest(
  _prev: PrayerFormState,
  formData: FormData
): Promise<PrayerFormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    request: formData.get("request"),
    visibility: formData.get("visibility") || "private",
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("prayer_requests").insert({
    name: parsed.data.name || null,
    email: parsed.data.email || null,
    request: parsed.data.request,
    visibility: parsed.data.visibility,
  });

  if (error) {
    return { success: false, message: "Something went wrong. Please try again in a moment." };
  }

  return { success: true, message: "Your prayer request has been received. Our prayer team will stand with you." };
}
