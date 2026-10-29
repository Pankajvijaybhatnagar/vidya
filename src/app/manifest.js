import { SITE } from "@/lib/site";

export default function manifest() {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFAF0",
    theme_color: "#5E1214",
    icons: [{ src: "/logo.png", sizes: "443x443", type: "image/png" }],
  };
}
