export const siteConfig = {
  name: "Christ Embassy Nürnberg",
  tagline: "A Place of Love, Faith & God's Presence",
  description:
    "Christ Embassy Nürnberg is a dynamic, Christ-centered church committed to winning souls, building believers, and raising leaders through the Word of God.",
  url: "https://christembassy-nuernberg.de",
  address: {
    line1: "Thomas-Mann-Straße 60",
    line2: "90471 Nürnberg, Germany",
    full: "Thomas-Mann-Straße 60, 90471 Nürnberg, Germany",
  },
  phone: "+49 162 1234567",
  email: "info@christembassy-nuernberg.de",
  serviceTimes: [
    { label: "Sunday Service", time: "10:00 AM" },
    { label: "Midweek Service", time: "7:00 PM (Wed)" },
  ],
  social: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  bank: {
    accountName: "Christ Embassy Nürnberg",
    iban: "DE12 3456 7890 1234 5678 90",
    bic: "GENODEF1XXX",
    bank: "Musterbank Nürnberg",
  },
  giveUrl: "#",
  zoomLink: "",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Thomas-Mann-Stra%C3%9Fe+60,+90471+N%C3%BCrnberg,+Germany&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Thomas-Mann-Stra%C3%9Fe+60,+90471+N%C3%BCrnberg,+Germany",
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Connect",
    children: [
      { label: "About Us", href: "/about", description: "Our story, vision and beliefs" },
      { label: "New Here?", href: "/new-here", description: "What to expect on your first visit" },
      { label: "Visit Us", href: "/visit", description: "Service times, location & directions" },
      { label: "Ministries", href: "/ministries", description: "Find your place to grow and serve" },
    ],
  },
  { label: "Events", href: "/events" },
  {
    label: "Media",
    children: [
      { label: "Watch Online", href: "/watch", description: "Join our services live from anywhere" },
      { label: "Rhapsody of Realities", href: "/rhapsody", description: "Today's daily devotional" },
      { label: "Testimonies", href: "/testimonies", description: "Stories of God's goodness" },
      { label: "Gallery", href: "/gallery", description: "Moments from our church family" },
    ],
  },
  { label: "Prayer", href: "/prayer" },
  { label: "Contact", href: "/contact" },
];
