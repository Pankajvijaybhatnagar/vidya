import PageHero from "@/components/PageHero";
import { photo } from "@/lib/gallery";
import CalendarExplorer from "@/components/CalendarExplorer";
import { SESSION, STATS } from "@/lib/calendar";

export const metadata = {
  title: "Academic Calendar 2027-28",
  description: "Interactive month, agenda and year views of the Gurukul Vidyapeeth academic calendar for session 2027–2028.",
};

export default function CalendarPage() {
  return (
    <>
      <PageHero
        image={photo("classrooms-03")}
        eyebrow="Annual · Academic · Calendar"
        title={`Session ${SESSION.label}`}
        subtitle={`${STATS.events} entries across twelve months — filter, search, and add any date to your own calendar.`}
      />
      <section className="py-12">
        <CalendarExplorer />
      </section>
    </>
  );
}
