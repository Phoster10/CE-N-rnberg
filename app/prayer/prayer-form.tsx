"use client";

import { useActionState } from "react";
import { submitPrayerRequest, type PrayerFormState } from "./actions";
import { Button } from "@/components/ui/button";

const initialState: PrayerFormState = { success: false, message: "" };

export default function PrayerForm() {
  const [state, formAction, pending] = useActionState(submitPrayerRequest, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-700">
          Your Name (Optional)
        </label>
        <input
          id="name"
          name="name"
          maxLength={200}
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-700">
          Email (Optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={200}
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="request" className="mb-1.5 block text-sm font-medium text-navy-700">
          Your Prayer Request
        </label>
        <textarea
          id="request"
          name="request"
          required
          maxLength={2000}
          rows={5}
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          placeholder="Share your prayer request..."
        />
      </div>
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-navy-700">How would you like us to pray for you?</legend>
        <div className="flex flex-col gap-2 text-sm text-navy-600">
          <label className="flex items-center gap-2">
            <input type="radio" name="visibility" value="public" className="accent-gold-500" />
            Public (Our prayer team will pray)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="visibility" value="private" defaultChecked className="accent-gold-500" />
            Private (Only our prayer team will see this)
          </label>
        </div>
      </fieldset>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Submitting..." : "Submit Request"}
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
