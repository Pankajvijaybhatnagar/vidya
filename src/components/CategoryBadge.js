import { CATEGORIES } from "@/lib/calendar";

export default function CategoryBadge({ category, label, className = "" }) {
  const c = CATEGORIES[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${className}`}
      style={{ backgroundColor: c.soft, color: c.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
      {label || c.label}
    </span>
  );
}
