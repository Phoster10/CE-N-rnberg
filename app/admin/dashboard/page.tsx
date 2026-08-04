import Link from "next/link";
import { CalendarDays, HandHeart, MessageSquare, Quote } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();
  const [events, prayers, messages, testimonies] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("prayer_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("testimonies").select("*", { count: "exact", head: true }).eq("is_published", false),
  ]);
  return {
    events: events.count ?? 0,
    newPrayers: prayers.count ?? 0,
    newMessages: messages.count ?? 0,
    pendingTestimonies: testimonies.count ?? 0,
  };
}

export default async function DashboardOverviewPage() {
  const counts = await getCounts();

  const cards = [
    { label: "Total Events", value: counts.events, icon: CalendarDays, href: "/admin/dashboard/events" },
    { label: "New Prayer Requests", value: counts.newPrayers, icon: HandHeart, href: "/admin/dashboard/prayer-requests" },
    { label: "New Contact Messages", value: counts.newMessages, icon: MessageSquare, href: "/admin/dashboard/contact-messages" },
    { label: "Testimonies Awaiting Review", value: counts.pendingTestimonies, icon: Quote, href: "/admin/dashboard/testimonies" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Welcome back</h1>
      <p className="mt-1 text-sm text-navy-500">Here&apos;s what&apos;s happening on the Christ Embassy Nürnberg website.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-shadow hover:shadow-soft"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-2xl font-bold text-navy-900">{c.value}</p>
            <p className="mt-1 text-sm text-navy-500">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
