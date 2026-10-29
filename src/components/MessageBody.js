import Reveal from "./Reveal";

export function Shloka({ quote, gloss, light = false }) {
  return (
    <figure
      className={`relative my-8 overflow-hidden rounded-3xl px-6 py-8 text-center sm:px-10 ${
        light ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-gradient-to-br from-[#fff1de] via-white to-[#fdebd3] ring-1 ring-saffron/15"
      }`}
    >
      <span className="pointer-events-none absolute -left-2 -top-6 font-display text-[7rem] leading-none text-saffron/15">“</span>
      <blockquote
        className={`font-sanskrit relative whitespace-pre-line text-xl leading-relaxed sm:text-2xl ${light ? "text-gold-light" : "text-maroon"}`}
      >
        {quote}
      </blockquote>
      {gloss && (
        <figcaption className={`font-hindi relative mx-auto mt-4 max-w-2xl text-base leading-relaxed ${light ? "text-white/70" : "text-ink/60"}`}>
          {gloss}
        </figcaption>
      )}
    </figure>
  );
}

export default function MessageBody({ message }) {
  const firstPara = message.blocks.findIndex((b) => b.p);
  return (
    <div className="font-hindi text-[1.08rem] leading-[1.95] text-ink/75">
      {message.lead && <Shloka quote={message.lead.quote} gloss={message.lead.gloss} />}
      {message.title && (
        <h2 className="font-hindi mb-6 text-center text-2xl font-semibold text-ink sm:text-3xl">
          <span className="ornament-divider">{message.title}</span>
        </h2>
      )}
      {message.salutation && <p className="mb-5 text-lg font-semibold text-ink">{message.salutation}</p>}
      {message.blocks.map((b, i) => {
        if (b.quote) {
          return (
            <Reveal key={i} y={20}>
              <Shloka quote={b.quote} gloss={b.gloss} />
            </Reveal>
          );
        }
        return (
          <p key={i} className={`mb-5 text-justify ${i === firstPara ? "text-xl leading-relaxed text-ink" : ""}`}>
            {b.p}
          </p>
        );
      })}
      <div className="mt-10 border-t border-ink/10 pt-6 text-right">
        {message.signoff && <p className="mb-2 text-ink/55">{message.signoff}</p>}
        {message.signature.map((line, i) => (
          <p key={i} className={i === 0 ? "text-2xl font-semibold text-ink" : "text-sm text-ink/55"}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
