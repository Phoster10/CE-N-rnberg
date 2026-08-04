import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Images,
  Users2,
  Quote,
  Clock,
  Megaphone,
  Video,
  BookOpen,
  Home,
  HandHeart,
  MessageSquare,
  LogOut,
  Flame,
  Info,
  DoorOpen,
  Settings,
} from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";

const navItems = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Homepage Content", href: "/admin/dashboard/homepage", icon: Home },
  { label: "About Us Page", href: "/admin/dashboard/about", icon: Info },
  { label: "New Here Page", href: "/admin/dashboard/new-here", icon: DoorOpen },
  { label: "Service Times", href: "/admin/dashboard/service-times", icon: Clock },
  { label: "Events", href: "/admin/dashboard/events", icon: CalendarDays },
  { label: "Ministries", href: "/admin/dashboard/ministries", icon: Users2 },
  { label: "Gallery", href: "/admin/dashboard/gallery", icon: Images },
  { label: "Testimonies", href: "/admin/dashboard/testimonies", icon: Quote },
  { label: "Rhapsody of Realities", href: "/admin/dashboard/rhapsody", icon: BookOpen },
  { label: "Announcements", href: "/admin/dashboard/announcements", icon: Megaphone },
  { label: "Watch Online", href: "/admin/dashboard/watch-online", icon: Video },
  { label: "Prayer Requests", href: "/admin/dashboard/prayer-requests", icon: HandHeart },
  { label: "Contact Messages", href: "/admin/dashboard/contact-messages", icon: MessageSquare },
  { label: "Site Settings", href: "/admin/dashboard/site-settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-navy-50/40">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-100 bg-white lg:flex">
        <div className="flex items-center gap-2.5 border-b border-navy-100 px-6 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-gradient text-gold-400">
            <Flame className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-semibold text-navy-900">Admin Dashboard</span>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="border-t border-navy-100 p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-navy-100 bg-white px-6 py-4 lg:hidden">
          <span className="font-display text-sm font-semibold text-navy-900">Admin Dashboard</span>
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-medium text-red-600">
              Sign Out
            </button>
          </form>
        </header>
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
