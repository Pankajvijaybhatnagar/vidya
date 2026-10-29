// Stand-in portrait: a Devanagari monogram inside a rotating gradient ring.
export default function Medallion({ letter, size = "lg" }) {
  const dims =
    size === "xl" ? "h-44 w-44 text-7xl sm:h-52 sm:w-52" : size === "lg" ? "h-40 w-40 text-6xl" : size === "md" ? "h-24 w-24 text-4xl" : "h-14 w-14 text-2xl";
  return (
    <div className={`relative grid shrink-0 place-items-center ${dims}`}>
      <div className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#ea7a14,#ffc93c,#5e1214,#ea7a14)] p-[3px]">
        <div className="h-full w-full rounded-full bg-[#fffbf5]" />
      </div>
      <span className="font-hindi relative grid h-[84%] w-[84%] place-items-center rounded-full bg-gradient-to-br from-maroon via-[#7a1a14] to-saffron font-semibold text-white shadow-xl">
        {letter}
      </span>
    </div>
  );
}
