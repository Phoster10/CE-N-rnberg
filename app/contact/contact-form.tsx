"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitContactMessage, type ContactFormState } from "./actions";
import { Button } from "@/components/ui/button";

const initialState: ContactFormState = { success: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);

  if (state.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-4xl border border-navy-100/70 bg-white p-12 text-center shadow-lift">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-navy-900">Message sent</h2>
        <p role="status" className="mt-3 max-w-sm text-navy-500">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-4xl border border-navy-100/70 bg-white p-8 shadow-lift sm:p-10">
      <div>
        <h2 className="font-display text-3xl font-semibold text-navy-900">Send us a message</h2>
        <p className="mt-2 text-navy-500">We usually reply within a day or two.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="field-label">
            Your Name
          </label>
          <input id="c-name" name="name" required maxLength={200} className="field" placeholder="Enter your name" />
        </div>
        <div>
          <label htmlFor="c-email" className="field-label">
            Your Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            maxLength={200}
            className="field"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="field-label">
          Your Message
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          maxLength={3000}
          rows={6}
          className="field resize-none"
          placeholder="How can we help?"
        />
      </div>
      <Button type="submit" disabled={pending} size="lg" className="w-full">
        {pending ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
      </Button>
      {state.message && (
        <p role="status" className="text-sm font-medium text-red-600">
          {state.message}
        </p>
      )}
    </form>
  );
}
