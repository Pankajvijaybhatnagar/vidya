"use client";

import { Download } from "lucide-react";
import { EVENTS, toICS } from "@/lib/calendar";

export function downloadICS(events, filename) {
  const blob = new Blob([toICS(events)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DownloadCalendarButton({
  events = EVENTS,
  filename = "gurukul-vidyapeeth-2027-28.ics",
  label = "Add to my calendar",
  variant = "outline",
  className = "",
}) {
  const look = variant === "primary" ? "btn-primary text-white hover:brightness-110" : "border border-current/30";
  return (
    <button
      type="button"
      onClick={() => downloadICS(events, filename)}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold transition ${look} ${className}`}
    >
      <Download className="h-4 w-4" />
      {label}
    </button>
  );
}
