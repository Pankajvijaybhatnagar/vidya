import { Bricolage_Grotesque, Plus_Jakarta_Sans, Mukta, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import PointerGlow from "@/components/PointerGlow";
import { SITE } from "@/lib/site";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const mukta = Mukta({ variable: "--font-mukta", subsets: ["devanagari", "latin"], weight: ["300", "400", "500", "600", "700"] });
const tiro = Tiro_Devanagari_Sanskrit({ variable: "--font-tiro", subsets: ["devanagari", "latin"], weight: "400" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}, ${SITE.city} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.nameHi} — ${SITE.taglineHi}. ${SITE.name}, ${SITE.address}: founded ${SITE.founded}. About the Vidyapeeth, our logo, vision & mission, leadership messages and the academic calendar 2027–28.`,
  keywords: [
    "Vinay Bal Mandir Gurukul Vidyapeeth",
    "विनय बाल मन्दिर गुरुकुल विद्यापीठ",
    "Gurukul Vidyapeeth Jind",
    "Jind school",
    "academic calendar 2027-28",
    "school holidays Haryana",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    images: ["/logo.png"],
    type: "website",
  },
};

export const viewport = {
  themeColor: "#170909",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="hi"
      className={`${bricolage.variable} ${jakarta.variable} ${mukta.variable} ${tiro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <PointerGlow />
      </body>
    </html>
  );
}
