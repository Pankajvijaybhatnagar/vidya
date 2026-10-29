import { MONTHS } from "@/lib/calendar";
import { MESSAGES } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap() {
  const pages = ["", "/about", "/our-logo", "/vision-mission", "/balvatika", "/messages", "/calendar", "/examinations", "/holidays", "/activities", "/fees", "/gallery", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, priority: p === "" ? 1 : 0.8 })),
    ...MESSAGES.map((m) => ({ url: `${SITE.url}/messages/${m.slug}`, priority: 0.6 })),
    ...MONTHS.map((m) => ({ url: `${SITE.url}/calendar/${m.slug}`, priority: 0.6 })),
  ];
}
