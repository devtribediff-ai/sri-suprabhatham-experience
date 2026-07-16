import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Calendar, FileDown, MapPin } from "lucide-react";
import { ConsultationLounge, type LoungeAction } from "@/components/lounge/ConsultationLounge";
import { company } from "@/lib/projects.data";

export const Route = createFileRoute("/lounge")({
  head: () => ({
    meta: [
      { title: "The Consultation Lounge — Sri Suprabatham" },
      { name: "description", content: "Book a private site visit, schedule a meeting, chat on WhatsApp, or request a brochure. Every enquiry is met personally." },
      { property: "og:title", content: "The Consultation Lounge — Sri Suprabatham" },
      { property: "og:description", content: "Book a site visit, schedule a meeting, WhatsApp, call, or request a brochure." },
      { property: "og:url", content: "/lounge" },
    ],
    links: [{ rel: "canonical", href: "/lounge" }],
  }),
  component: LoungePage,
});

function LoungePage() {
  const wa = `https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello, I would like to consult with Sri Suprabatham Builder.")}`;
  const tel = `tel:${company.phones[0].replace(/\s+/g, "")}`;
  const mail = `mailto:${company.email}?subject=${encodeURIComponent("Enquiry — Sri Suprabatham")}`;
  const actions: LoungeAction[] = [
    { id: "visit", title: "Book a Private Visit", hint: "Private walkthrough at any residence", primary: true, href: mail, icon: <MapPin size={22} strokeWidth={1.25} /> },
    { id: "meeting", title: "Meet Our Team", hint: "Consult with our design lead", href: mail, icon: <Calendar size={22} strokeWidth={1.25} /> },
    { id: "brochure", title: "Download Brochure", hint: "All residences · PDF via email", href: mail, icon: <FileDown size={22} strokeWidth={1.25} /> },
    { id: "whatsapp", title: "WhatsApp", hint: company.whatsapp, href: wa, icon: <MessageCircle size={22} strokeWidth={1.25} /> },
    { id: "call", title: "Call Now", hint: company.phones[0], href: tel, icon: <Phone size={22} strokeWidth={1.25} /> },
  ];
  return (
    <div className="pt-32">
      <ConsultationLounge
        eyebrow="The Lounge"
        title={<>Your next chapter <span className="text-brass-gradient">begins here</span>.</>}
        subtitle="Choose the way you would like to begin. Whichever door you knock on, it opens on the same side of the studio."
        actions={actions}
      />
      {/* Quiet return glyph — the natural loop back to the entrance. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <Link
          to="/outro"
          className="pointer-events-auto text-[10px] uppercase tracking-[0.32em] text-ivory/40 underline-offset-4 transition-colors hover:text-brass"
        >
          Depart the experience
        </Link>
      </div>
    </div>
  );
}
