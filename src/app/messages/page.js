import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/gallery";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import { MESSAGES } from "@/lib/content";

export const metadata = {
  title: "Messages",
  description: "Messages from the Founder, Co-Founder, Vice-Chairperson, Principal and Balvatika Coordinator of Vinay Bal Mandir Gurukul Vidyapeeth.",
};

function excerpt(m) {
  const text = m.lead?.quote || m.blocks.find((b) => b.p).p;
  return text.length > 170 ? text.slice(0, 170).trimEnd() + "…" : text;
}

export default function MessagesPage() {
  return (
    <>
      <PageHero image={photo("events-04")} eyebrow="संदेश" title="Messages from our Leadership" subtitle="Words of guidance from those who lead and nurture the Vidyapeeth." />

      <section className="bg-texture py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2">
          {MESSAGES.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 2) * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
              <Link
                href={`/messages/${m.slug}`}
                className="spotlight group flex h-full flex-col items-center gap-6 rounded-[2rem] border border-ink/[0.07] bg-white p-8 text-center shadow-sm transition duration-500 hover:-translate-y-1.5 hover:border-saffron/40 hover:shadow-2xl sm:flex-row sm:text-left"
              >
                <Portrait message={m} size="md" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-saffron">{m.role}</p>
                  <h2 className="font-hindi mt-1 text-2xl font-semibold text-ink">{m.name}</h2>
                  <p className="text-sm text-ink/60">
                    {m.nameEn}
                    {m.credentials ? ` · ${m.credentials}` : ""}
                  </p>
                  <p className="font-hindi mt-4 leading-relaxed text-ink/80">“{excerpt(m)}”</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-saffron transition group-hover:gap-2">
                    Read full message <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
