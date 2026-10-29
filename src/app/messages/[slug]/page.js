import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/gallery";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import MessageBody from "@/components/MessageBody";
import { MESSAGES, messageBySlug } from "@/lib/content";
import { SITE } from "@/lib/site";

// Every slug is prerendered below; an unknown slug just blocks briefly before the 404.
export const instant = false;

export function generateStaticParams() {
  return MESSAGES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = messageBySlug(slug);
  if (!m) return {};
  return { title: m.role, description: `${m.role} — ${m.nameEn}, ${SITE.name}.` };
}

export default async function MessagePage({ params }) {
  const { slug } = await params;
  const m = messageBySlug(slug);
  if (!m) notFound();
  const i = MESSAGES.indexOf(m);
  const prev = MESSAGES[i - 1];
  const next = MESSAGES[i + 1];

  return (
    <>
      <PageHero image={photo("events-04")} eyebrow={m.roleHi} title={m.role} />

      <section className="bg-texture py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <Reveal className="rounded-[2rem] border border-ink/[0.07] bg-white p-6 text-center shadow-sm">
              <div className="flex justify-center">
                <Portrait message={m} />
              </div>
              <h2 className="font-hindi mt-4 text-2xl font-semibold leading-snug text-ink">{m.name}</h2>
              <p className="mt-1 text-sm text-ink/60">{m.nameEn}</p>
              <p className="mt-3 inline-block rounded-full bg-saffron px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">{m.roleHi}</p>
              {m.credentials && <p className="mt-3 text-sm font-semibold text-leaf">{m.credentials}</p>}
              <div className="mt-6 space-y-1 border-t border-ink/[0.07] pt-4 text-left">
                {MESSAGES.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/messages/${o.slug}`}
                    className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      o.slug === m.slug ? "bg-ink text-white" : "text-ink/70 hover:bg-saffron/10 hover:text-ink"
                    }`}
                  >
                    {o.role.replace("'s Message", "")}
                  </Link>
                ))}
              </div>
            </Reveal>
          </aside>

          <Reveal>
            <article className="relative overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white p-6 shadow-sm sm:p-12">
              <div className="relative">
                <MessageBody message={m} />
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          {prev ? (
            <Link href={`/messages/${prev.slug}`} className="group flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 font-bold text-ink transition hover:bg-ink hover:text-white">
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" /> {prev.role}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/messages/${next.slug}`} className="group flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-saffron">
              {next.role} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link href="/messages" className="rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-saffron">
              All messages
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
