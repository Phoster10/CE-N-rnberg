/**
 * Gatherings that happen every week or every day. All times are Nürnberg time,
 * whatever time zone the server or the visitor is in.
 */

const TIME_ZONE = "Europe/Berlin";
const HOUR = 60 * 60 * 1000;

export const weeklyServices = [
  { title: "Sunday Service", description: "Join us for an amazing time in God's presence.", weekday: 0, hour: 10 },
  { title: "Midweek Service", description: "A midweek encounter with the Word.", weekday: 3, hour: 18 },
];

export const zoomPrayer = {
  title: "Daily Prayers on Zoom",
  description: "Pray with us every day, wherever you are.",
  hours: [5, 20, 23],
  url: "https://us06web.zoom.us/j/5647700167?pwd=aTV5RWxDazRCZGJwVkZFcUpXVGtNZz09#success",
};

function berlinParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)!.value);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour"), minute: get("minute") };
}

/** The instant at which Nürnberg clocks read `hour`:00, `dayOffset` days from today. */
function berlinTime(now: Date, dayOffset: number, hour: number) {
  const today = berlinParts(now);
  const wall = Date.UTC(today.year, today.month - 1, today.day + dayOffset, hour);
  const seen = berlinParts(new Date(wall));
  const offset = Date.UTC(seen.year, seen.month - 1, seen.day, seen.hour, seen.minute) - wall;
  return { date: new Date(wall - offset), weekday: new Date(wall).getUTCDay() };
}

/**
 * Next start on one of the given weekdays and hours. A gathering stays listed
 * for `lingerHours` after it starts, so it doesn't vanish while it's running.
 */
export function nextOccurrence(now: Date, weekdays: number[], hours: number[], lingerHours: number): Date {
  // Start from yesterday: a late-night session can still be running after midnight.
  for (let dayOffset = -1; dayOffset <= 8; dayOffset++) {
    for (const hour of hours) {
      const { date, weekday } = berlinTime(now, dayOffset, hour);
      if (weekdays.includes(weekday) && date.getTime() + lingerHours * HOUR > now.getTime()) return date;
    }
  }
  throw new Error("No upcoming occurrence found");
}

export function formatBerlin(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, ...options }).format(date);
}
