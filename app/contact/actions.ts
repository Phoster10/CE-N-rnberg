"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200),
  email: z.string().trim().email("Please enter a valid email.").max(200),
  message: z.string().trim().min(1, "Please enter a message.").max(3000),
});

export type ContactFormState = { success: boolean; message: string };

export async function submitContactMessage(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert(parsed.data);

  if (error) {
    return { success: false, message: "Something went wrong. Please try again in a moment." };
  }

  return { success: true, message: "Thanks for reaching out — we'll get back to you soon." };
}
