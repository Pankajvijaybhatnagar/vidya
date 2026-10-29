// All content transcribed from "Gurukul Vidyapeeth Academic Calender 2027-28.pptx".
// `tag` is the label printed under each event on the slides; `category` drives colour + filters.

export const SESSION = {
  label: "2027–2028",
  short: "2027-28",
  start: "2027-04-01",
  end: "2028-03-31",
};

export const CATEGORIES = {
  academic: { label: "Academic", color: "#516A30", soft: "#E7EEDC" },
  exam: { label: "Examination", color: "#5E1214", soft: "#F5DCDC" },
  holiday: { label: "Holiday", color: "#E57B16", soft: "#FCE6D0" },
  cocurricular: { label: "Co-Curricular", color: "#B07A1A", soft: "#F6E8C8" },
  special: { label: "Special Event", color: "#2F7F86", soft: "#D8EEF0" },
  national: { label: "National Event", color: "#1E3A8A", soft: "#DCE3F5" },
  vacation: { label: "Vacation", color: "#522014", soft: "#EFE0D6" },
};

export const MONTHS = [
  { slug: "april-2027", name: "April", year: 2027, index: 3, page: 2 },
  { slug: "may-2027", name: "May", year: 2027, index: 4, page: 3 },
  { slug: "june-2027", name: "June", year: 2027, index: 5, page: 4 },
  { slug: "july-2027", name: "July", year: 2027, index: 6, page: 5 },
  { slug: "august-2027", name: "August", year: 2027, index: 7, page: 6 },
  { slug: "september-2027", name: "September", year: 2027, index: 8, page: 7 },
  { slug: "october-2027", name: "October", year: 2027, index: 9, page: 8 },
  { slug: "november-2027", name: "November", year: 2027, index: 10, page: 9 },
  { slug: "december-2027", name: "December", year: 2027, index: 11, page: 10 },
  { slug: "january-2028", name: "January", year: 2028, index: 0, page: 11 },
  { slug: "february-2028", name: "February", year: 2028, index: 1, page: 12 },
  { slug: "march-2028", name: "March", year: 2028, index: 2, page: 13 },
];

const RAW = [
  // April 2027
  ["2027-04-01", null, "Commencement of Academic Session 2027-28", "academic", "Academic"],
  ["2027-04-05", null, "Regular Classes Commence", "academic", "Academic"],
  ["2027-04-07", null, "Hindu Nav Varsh", "cocurricular", "Co-Curricular Activities"],
  ["2027-04-11", null, "Mahatma Phule Jayanti", "cocurricular", "Co-Curricular Activities"],
  ["2027-04-14", null, "Ambedkar Jayanti, Baisakhi & Mahavir Jayanti", "holiday", "Holiday"],
  ["2027-04-15", null, "Ram Navami", "holiday", "Holiday"],
  ["2027-04-22", null, "Earth Day Special Assembly & Activities", "cocurricular", "Co-Curricular Activities"],

  // May 2027
  ["2027-05-08", null, "Parshuram Jayanti", "holiday", "Holiday"],
  ["2027-05-09", null, "Mother's Day Special Observance", "cocurricular", "Co-Curricular Activities"],
  ["2027-05-12", null, "Ganga Jayanti Celebration & Haridwar DPS Function", "cocurricular", "Co-Curricular Activities"],
  ["2027-05-15", "2027-05-22", "First Periodic Assessment - I (PA-1)", "exam", "Academic"],
  ["2027-05-17", null, "Bakrid (Eid-ul-Zuha)", "holiday", "Holiday"],
  ["2027-05-24", null, "Vidyapeeth Annual Function", "special", "Special Event"],

  // June 2027
  ["2027-06-01", "2027-06-07", "Summer Vacation Holiday", "vacation", "School Closed"],
  ["2027-06-07", null, "Maharana Pratap Jayanti", "special", "Online / Special Activity"],
  ["2027-06-08", "2027-06-15", "Summer Vacation Holiday", "vacation", "School Closed"],
  ["2027-06-16", "2027-06-23", "Summer Vacation Holiday", "vacation", "School Closed"],
  ["2027-06-21", null, "International Yoga Day", "special", "Online / Special Activity"],
  ["2027-06-24", "2027-06-30", "Summer Vacation Holiday", "vacation", "School Closed"],

  // July 2027
  ["2027-07-01", null, "Vidyapeeth Reopens Post Summer Vacation", "academic", "Academic"],
  ["2027-07-16", null, "Harela Parv", "cocurricular", "Co-Curricular Activities"],
  ["2027-07-18", null, "Guru Purnima", "special", "Special Assembly"],
  ["2027-07-26", "2027-07-31", "Periodic Assessment - I (PA-1)", "exam", "Academic"],

  // August 2027
  ["2027-08-04", null, "Hariyali Teej", "special", "Mandatory Attendance"],
  ["2027-08-15", null, "Independence Day", "national", "Mandatory Attendance"],
  ["2027-08-17", null, "Raksha Bandhan", "holiday", "Holiday"],
  ["2027-08-25", null, "Janmashtami Celebrations", "holiday", "Holiday"],
  ["2027-08-28", null, "Inter-House Cultural & Sports Meet", "academic", "Academic"],

  // September 2027
  ["2027-09-04", null, "Ganesh Chaturthi", "cocurricular", "Co-Curricular Activities"],
  ["2027-09-05", null, "Teacher's Day", "special", "Student Council Led"],
  ["2027-09-13", "2027-09-25", "Half-Yearly / Mid-Term Examinations", "exam", "Academic"],
  ["2027-09-14", null, "Hindi Diwas Special Assembly", "special", "Special Event"],
  ["2027-09-30", null, "Maharaja Agrasen Jayanti", "cocurricular", "Co-Curricular Activities"],

  // October 2027
  ["2027-10-02", null, "Gandhi Jayanti & Mid-Term Result PTM", "holiday", "Holiday"],
  ["2027-10-07", null, "Durga Ashtami", "special", "Durga Pooja"],
  ["2027-10-09", null, "Dussehra Celebration", "holiday", "Holiday"],
  ["2027-10-15", null, "Valmiki Jayanti", "holiday", "Holiday"],
  ["2027-10-29", null, "Deepawali", "holiday", "Holiday"],
  ["2027-10-30", null, "Govardhan Pooja", "holiday", "Holiday"],
  ["2027-10-31", null, "Bhai Dooj", "holiday", "Holiday"],

  // November 2027
  ["2027-11-01", null, "Haryana Day", "special", "Special Event"],
  ["2027-11-14", null, "Bal Diwas / Guru Nanak Jayanti / Nehru Jayanti", "holiday", "Holiday"],

  // December 2027
  ["2027-12-15", "2027-12-22", "Pre-Board Examination I", "exam", "Academic"],
  ["2027-12-25", null, "Christmas Celebration", "holiday", "Holiday"],

  // January 2028
  ["2028-01-01", null, "New Year's Day", "cocurricular", "Co-Curricular Activities"],
  ["2028-01-04", null, "Guru Gobind Singh Jayanti", "cocurricular", "Co-Curricular Activities"],
  ["2028-01-14", null, "Lohri", "special", "Special Observance"],
  ["2028-01-15", null, "Makar Sankranti", "special", "Special Observance"],
  ["2028-01-17", "2028-01-24", "Pre-Board Examination II", "exam", "Academic"],
  ["2028-01-26", null, "Republic Day Grand Celebrations", "national", "National Event"],
  ["2028-01-31", null, "Vasant Panchami", "holiday", "Holiday"],

  // February 2028
  ["2028-02-10", null, "Guru Ravidas Jayanti", "cocurricular", "Co-Curricular Activities"],
  ["2028-02-15", null, "HBSE Board Examinations (Expected)", "exam", "Academic", true],
  ["2028-02-23", null, "Maha Shivratri", "holiday", "Holiday"],
  ["2028-02-27", null, "Eid-ul-Fitr", "holiday", "Holiday"],

  // March 2028
  ["2028-03-10", null, "Holika Dahan", "holiday", "Holiday"],
  ["2028-03-11", null, "Holi", "holiday", "Holiday"],
  ["2028-03-20", null, "Annual Result Declaration & PTM", "academic", "Academic"],
  ["2028-03-22", "2028-03-31", "Session Break & Book Distribution", "academic", "Academic"],
  ["2028-03-23", null, "Shaheedi Diwas", "special", "Special Observance"],
];

export const SUMMER_CAMPS = [
  { title: "Music Camp for Girls & Boys", icon: "music" },
  { title: "Life-Skills Development Workshops", icon: "sparkles" },
  { title: "Yoga / Swimming Camp for Girls", icon: "waves" },
  { title: "Yoga / Swimming Camp for Boys", icon: "waves" },
];

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_ABBR = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Dates are calendar days, so parse them as UTC to avoid timezone drift.
export function parseDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function slugify(s) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const EVENTS = RAW.map(([start, end, title, category, tag, onwards], i) => {
  const s = parseDate(start);
  const e = end ? parseDate(end) : s;
  const monthIndex = s.getUTCMonth();
  const month = MONTHS.find((m) => m.index === monthIndex && m.year === s.getUTCFullYear());
  const days = Math.round((e - s) / 86400000) + 1;
  return {
    id: `${start}-${slugify(title)}-${i}`,
    start,
    end: end || start,
    title,
    category,
    tag,
    onwards: Boolean(onwards),
    days,
    month: month.slug,
    dayLabel: end ? MONTH_ABBR[monthIndex] : onwards ? "ONWARDS" : DAYS[s.getUTCDay()],
    dateLabel: end
      ? `${String(s.getUTCDate()).padStart(2, "0")}-${String(e.getUTCDate()).padStart(2, "0")}`
      : String(s.getUTCDate()).padStart(2, "0"),
  };
});

export function eventsForMonth(slug) {
  return EVENTS.filter((e) => e.month === slug).sort((a, b) => a.start.localeCompare(b.start));
}

export function eventsByCategory(...cats) {
  return EVENTS.filter((e) => cats.includes(e.category));
}

export function formatLongDate(ev) {
  const opts = { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" };
  const s = parseDate(ev.start).toLocaleDateString("en-IN", opts);
  if (ev.onwards) return `${s} onwards`;
  if (ev.start === ev.end) {
    const wd = parseDate(ev.start).toLocaleDateString("en-IN", { weekday: "long", timeZone: "UTC" });
    return `${wd}, ${s}`;
  }
  const e = parseDate(ev.end).toLocaleDateString("en-IN", opts);
  return `${s} – ${e}`;
}

export function monthBySlug(slug) {
  return MONTHS.find((m) => m.slug === slug);
}

// Builds the 6-week grid used by month calendars; cells outside the month are null.
export function monthGrid(month) {
  const first = new Date(Date.UTC(month.year, month.index, 1));
  const daysIn = new Date(Date.UTC(month.year, month.index + 1, 0)).getUTCDate();
  const cells = [];
  for (let i = 0; i < first.getUTCDay(); i++) cells.push(null);
  for (let d = 1; d <= daysIn; d++) {
    const iso = `${month.year}-${String(month.index + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({
      day: d,
      iso,
      weekday: (first.getUTCDay() + d - 1) % 7,
      events: EVENTS.filter((e) => e.start <= iso && iso <= e.end),
    });
  }
  while (cells.length % 7) cells.push(null);
  return cells;
}

export const STATS = {
  events: EVENTS.length,
  holidays: EVENTS.filter((e) => e.category === "holiday").length,
  exams: EVENTS.filter((e) => e.category === "exam").length,
  celebrations: EVENTS.filter((e) => ["cocurricular", "special", "national"].includes(e.category)).length,
};

// iCalendar export so families can add the session to Google / Apple / Outlook calendars.
export function toICS(events) {
  const esc = (s) => s.replace(/[,;\\]/g, (c) => "\\" + c);
  const ymd = (iso) => iso.replace(/-/g, "");
  const nextDay = (iso) => {
    const d = parseDate(iso);
    d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().slice(0, 10);
  };
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gurukul Vidyapeeth//Academic Calendar 2027-28//EN",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Gurukul Vidyapeeth 2027-28",
  ];
  for (const ev of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.id}@gurukulvidyapeeth`,
      "DTSTAMP:20270101T000000Z",
      `DTSTART;VALUE=DATE:${ymd(ev.start)}`,
      `DTEND;VALUE=DATE:${ymd(nextDay(ev.end))}`,
      `SUMMARY:${esc(ev.title)}`,
      `DESCRIPTION:${esc(ev.tag)} — Gurukul Vidyapeeth`,
      `CATEGORIES:${esc(CATEGORIES[ev.category].label)}`,
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
