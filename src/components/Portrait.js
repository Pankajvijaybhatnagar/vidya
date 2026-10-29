import Image from "next/image";
import Medallion from "./Medallion";
import { PORTRAITS } from "@/lib/gallery";

// Real photograph inside the medallion ring when we have one; monogram otherwise.
export default function Portrait({ message, size = "lg" }) {
  const p = PORTRAITS[message.slug];
  if (!p) return <Medallion letter={message.monogram} size={size} />;

  const dims = size === "xl" ? "h-44 w-44 sm:h-52 sm:w-52" : size === "lg" ? "h-40 w-40" : size === "md" ? "h-24 w-24" : "h-14 w-14";
  return (
    <div className={`relative shrink-0 ${dims}`}>
      <div className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#ea7a14,#ffc93c,#5e1214,#ea7a14)]" />
      <div className="absolute inset-[3px] rounded-full bg-[#fffbf5]" />
      <Image
        src={p.src}
        alt={message.nameEn || message.name}
        width={p.w}
        height={p.h}
        sizes="208px"
        placeholder="blur"
        blurDataURL={p.blur}
        className="absolute inset-[8%] h-[84%] w-[84%] rounded-full object-cover object-top shadow-xl"
      />
    </div>
  );
}
