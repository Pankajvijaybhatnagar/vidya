import Link from "next/link";
import { ArrowUpRight, Bus, IndianRupee, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { FEES, FEE_BANDS, FEE_NOTE, FEE_SESSION, inr } from "@/lib/fees";
import { photo } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `Fee Structure ${FEE_SESSION}`,
  description: `Class-wise fee structure ${FEE_SESSION} of ${SITE.name}, ${SITE.city} — registration, annual charge, monthly fee and yearly total from Nursery to Class 12.`,
};

export default function FeesPage() {
  return (
    <>
      <PageHero
        eyebrow="शुल्क विवरण"
        title={`Fee Structure ${FEE_SESSION}`}
        subtitle="Quality education at a modest fee — the founding promise of the Vidyapeeth."
        image={photo("classrooms-08")}
      />

      {/* Bands */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {FEE_BANDS.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col rounded-[2rem] p-7 shadow-xl ${
                  i === 1 ? "bg-ink text-white" : "border border-ink/[0.07] bg-white text-ink"
                }`}
              >
                <p className={`text-xs font-bold uppercase tracking-[0.2em] ${i === 1 ? "text-gold-light" : "text-saffron"}`}>{b.hint}</p>
                <p className="mt-1 font-display text-2xl font-semibold tracking-tight">Classes {b.label}</p>
                <p className="mt-6 font-display text-5xl font-semibold tracking-tight">
                  {inr(b.fee.monthly)}
                  <span className={`ml-1 text-base font-medium ${i === 1 ? "text-white/50" : "text-ink/45"}`}>/ month</span>
                </p>
                <dl className={`mt-6 space-y-2 border-t pt-5 text-sm ${i === 1 ? "border-white/10" : "border-ink/[0.07]"}`}>
                  {[
                    ["Registration", b.fee.registration],
                    ["Annual charge", b.fee.annual],
                    ["Monthly fee × 12", b.fee.monthly * 12],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className={i === 1 ? "text-white/60" : "text-ink/60"}>{k}</dt>
                      <dd className="font-semibold">{inr(v)}</dd>
                    </div>
                  ))}
                  <div className={`flex justify-between gap-4 border-t pt-3 text-base ${i === 1 ? "border-white/10" : "border-ink/[0.07]"}`}>
                    <dt className="font-bold">Yearly total</dt>
                    <dd className={`font-bold ${i === 1 ? "text-marigold" : "text-maroon"}`}>{inr(b.fee.yearly)}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Full table */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow={`Session ${FEE_SESSION}`} title="Class-wise fee table" subtitle="All amounts in Indian Rupees." />
          <Reveal className="mt-12 overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left">
                <thead className="bg-maroon-texture text-white">
                  <tr>
                    {["Class", "Regd. charges", "Annual charge", "Monthly fee", "Yearly"].map((h, i) => (
                      <th key={h} scope="col" className={`px-5 py-4 text-xs font-bold uppercase tracking-wider ${i ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f, i) => {
                    const bandStart = i > 0 && FEES[i - 1].monthly !== f.monthly;
                    return (
                      <tr key={f.cls} className={`${i % 2 ? "bg-cream/70" : ""} ${bandStart ? "border-t-2 border-saffron/40" : "border-t border-ink/[0.05]"} transition hover:bg-saffron/[0.06]`}>
                        <th scope="row" className="px-5 py-3.5 font-display font-semibold text-ink">
                          {f.cls}
                        </th>
                        <td className="px-5 py-3.5 text-right tabular-nums text-ink/75">{inr(f.registration)}</td>
                        <td className="px-5 py-3.5 text-right tabular-nums text-ink/75">{inr(f.annual)}</td>
                        <td className="px-5 py-3.5 text-right tabular-nums text-ink/75">{inr(f.monthly)}</td>
                        <td className="px-5 py-3.5 text-right font-bold tabular-nums text-maroon">{inr(f.yearly)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-6 flex items-start gap-4 rounded-2xl border-2 border-saffron/30 bg-saffron/[0.06] p-5">
            <Bus className="mt-0.5 h-6 w-6 shrink-0 text-saffron" />
            <p className="font-semibold text-ink">
              <span className="text-rust">Note:</span> {FEE_NOTE}
            </p>
          </Reveal>

          <Reveal className="mt-12 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-[#eef2e6] p-8 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-leaf text-white sm:grid">
                <IndianRupee className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-ink">Questions about admission or fees?</p>
                <p className="text-ink/60">The Vidyapeeth office will be happy to help.</p>
              </div>
            </div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white transition hover:bg-saffron">
              <Phone className="h-4 w-4" /> Contact us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
