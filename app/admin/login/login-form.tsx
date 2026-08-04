"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";
import { Button } from "@/components/ui/button";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in..." : "Sign In"}
      </Button>
      {state.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}
    </form>
  );
}
