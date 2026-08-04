"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "./actions";
import { Button } from "@/components/ui/button";

const initialState: ContactFormState = { success: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-navy-700">
            Your Name
          </label>
          <input
            id="c-name"
            name="name"
            required
            maxLength={200}
            className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-navy-700">
            Your Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            maxLength={200}
            className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-navy-700">
          Your Message
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          maxLength={3000}
          rows={5}
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          placeholder="Type your message..."
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending..." : "Send Message"}
      </Button>
      {state.message && (
        <p
          role="status"
          className={state.success ? "text-sm font-medium text-green-700" : "text-sm font-medium text-red-600"}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
