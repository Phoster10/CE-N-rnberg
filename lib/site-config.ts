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
  phone: "+4915142024914",
  email: "info@christembassy-nuernberg.de",
  serviceTimes: [
    { label: "Sunday Service", time: "10:00 AM" },
    { label: "Midweek Service", time: "6:00 PM (Wed)" },
  ],
  social: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    facebook: "https://www.facebook.com/cechurchnurnberg",
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

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Watch Online", href: "/watch" },
  { label: "Rhapsody of Realities", href: "/rhapsody" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Gallery", href: "/gallery" },
  { label: "New Here", href: "/new-here" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];
