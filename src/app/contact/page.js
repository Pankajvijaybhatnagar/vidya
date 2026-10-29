import Link from "next/link";
import { CalendarDays, Mail, MapPin, Phone, School } from "lucide-react";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/gallery";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE, telHref } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} — ${SITE.address}.`,
};

const MAP_QUERY = encodeURIComponent(`${SITE.name}, Safidon Road, Lakhmirwala, Jind, Haryana`);

export default function ContactPage() {
  return (
    <>
      <PageHero image={photo("campus-10")} eyebrow="सम्पर्क" title="Contact Us" subtitle="We would be glad to welcome you to the Vidyapeeth." />

      <section className="bg-texture py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <Reveal>
              <div className="rounded-3xl border border-ink/[0.07] bg-white p-7 shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-saffron text-white">
                  <MapPin className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">Visit us</h2>
                <p className="font-hindi mt-2 text-lg text-ink">{SITE.nameHi}</p>
                <p className="mt-1 text-ink/80">{SITE.address}</p>
                <p className="font-hindi text-ink/70">{SITE.addressHi}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-saffron"
                >
                  Get directions
                </a>
              </div>
            </Reveal>
            {(SITE.phones.length > 0 || SITE.email) && (
              <Reveal delay={0.1}>
                <div className="space-y-3 rounded-3xl border border-ink/[0.07] bg-white p-7 shadow-xl">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Call us</h2>
                  <p className="text-sm text-ink/60">Admissions, fees and general enquiries.</p>
                  {SITE.phones.map((n) => (
                    <a key={n} href={telHref(n)} className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 text-lg font-bold tracking-wide text-ink transition hover:bg-saffron hover:text-white">
                      <Phone className="h-5 w-5 text-saffron" /> +91 {n}
                    </a>
                  ))}
                  {SITE.email && (
                    <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 font-semibold text-ink hover:text-saffron">
                      <Mail className="h-5 w-5 text-saffron" /> {SITE.email}
                    </a>
                  )}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-maroon-texture p-7 text-white shadow-xl">
                <School className="h-8 w-8 text-marigold" />
                <p className="mt-3 text-white/90">{SITE.affiliation}</p>
                <p className="mt-2 text-sm text-white/70">
                  Run by {SITE.operator} ({SITE.operatorHi}).
                </p>
                <Link href="/calendar" className="mt-5 inline-flex items-center gap-2 font-bold text-marigold hover:text-white">
                  <CalendarDays className="h-4 w-4" /> Academic calendar 2027–28
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="space-y-8">
            {SITE.email && (
              <Reveal>
                <div className="rounded-3xl border border-ink/[0.07] bg-white p-7 shadow-xl">
                  <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight text-ink">Send an enquiry</h2>
                  <EnquiryForm />
                </div>
              </Reveal>
            )}
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-ink/[0.07] shadow-xl">
                <iframe
                  title="Map to the Vidyapeeth"
                  src={`https://maps.google.com/maps?q=${MAP_QUERY}&output=embed`}
                  className="h-[28rem] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
