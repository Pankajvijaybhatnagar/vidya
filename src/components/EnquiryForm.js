"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { SITE } from "@/lib/site";

// Opens the visitor's mail app with the enquiry pre-filled; needs SITE.email to be set.
export default function EnquiryForm() {
  const [form, setForm] = useState({ name: "", phone: "", subject: "Admission enquiry", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name}${form.phone ? `, ${form.phone}` : ""}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  const input = "w-full rounded-xl border border-ink/[0.07] bg-white px-4 py-3 text-ink outline-none transition focus:border-saffron";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Your name</span>
          <input required value={form.name} onChange={set("name")} className={input} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Phone</span>
          <input type="tel" value={form.phone} onChange={set("phone")} className={input} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-ink">Subject</span>
        <select value={form.subject} onChange={set("subject")} className={input}>
          <option>Admission enquiry</option>
          <option>Balvatika enquiry</option>
          <option>General enquiry</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-ink">Message</span>
        <textarea required rows={5} value={form.message} onChange={set("message")} className={input} />
      </label>
      <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-bold text-white shadow-lg transition hover:bg-saffron">
        <Send className="h-4 w-4" /> Send enquiry
      </button>
    </form>
  );
}
