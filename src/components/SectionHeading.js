import Reveal from "./Reveal";

const HINDI = /[ऀ-ॿ]/;

export function Eyebrow({ children, light = false }) {
  const hindi = typeof children === "string" && HINDI.test(children);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${
        light ? "bg-white/10 text-gold-light ring-1 ring-white/15" : "bg-saffron/10 text-rust ring-1 ring-saffron/20"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
      <span className={hindi ? "font-hindi text-sm font-medium" : "text-[11px] font-bold uppercase tracking-[0.18em]"}>{children}</span>
    </span>
  );
}

export default function SectionHeading({ eyebrow, title, subtitle, light = false, align = "center" }) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-3xl ${alignCls}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && <p className={`mt-4 text-base sm:text-lg ${light ? "text-white/65" : "text-ink/60"}`}>{subtitle}</p>}
    </Reveal>
  );
}
