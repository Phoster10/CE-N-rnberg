"use client";

import { useActionState } from "react";
import { HandHeart, Lock, Users } from "lucide-react";
import { submitPrayerRequest, type PrayerFormState } from "./actions";
import { Button } from "@/components/ui/button";

const initialState: PrayerFormState = { success: false, message: "" };

export default function PrayerForm() {
  const [state, formAction, pending] = useActionState(submitPrayerRequest, initialState);

  if (state.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-4xl border border-navy-100/70 bg-white p-12 text-center shadow-lift">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-navy-950 shadow-glow">
          <HandHeart className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-navy-900">We&apos;re praying with you</h2>
        <p role="status" className="mt-3 max-w-sm text-navy-500">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-4xl border border-navy-100/70 bg-white p-8 shadow-lift sm:p-10">
      <div>
        <h2 className="font-display text-3xl font-semibold text-navy-900">Share your request</h2>
        <p className="mt-2 text-navy-500">Your name and email are optional.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Your Name
          </label>
          <input id="name" name="name" maxLength={200} className="field" placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input id="email" name="email" type="email" maxLength={200} className="field" placeholder="Optional" />
        </div>
      </div>
      <div>
        <label htmlFor="request" className="field-label">
          Your Prayer Request
        </label>
        <textarea
          id="request"
          name="request"
          required
          maxLength={2000}
          rows={6}
          className="field resize-none"
          placeholder="Share what's on your heart..."
        />
      </div>
      <fieldset>
        <legend className="field-label">Who can see this request?</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { value: "private", icon: Lock, title: "Private", text: "Only our prayer team", checked: true },
            { value: "public", icon: Users, title: "Public", text: "Our prayer team will pray", checked: false },
          ].map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-navy-100 p-4 transition-colors has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50/60"
            >
              <input type="radio" name="visibility" value={o.value} defaultChecked={o.checked} className="mt-1 accent-gold-500" />
              <span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                  <o.icon className="h-3.5 w-3.5" /> {o.title}
                </span>
                <span className="text-xs text-navy-500">{o.text}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Button type="submit" disabled={pending} size="lg" className="w-full">
        {pending ? "Submitting..." : "Submit Prayer Request"}
      </Button>

      {state.message && (
        <p role="status" className="text-sm font-medium text-red-600">
          {state.message}
        </p>
      )}
    </form>
  );
}
