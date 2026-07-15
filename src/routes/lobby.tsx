import { createFileRoute } from "@tanstack/react-router";
import { MarbleHall } from "@/components/lobby/MarbleHall";
import { LegacyTimeline } from "@/components/lobby/LegacyTimeline";
import { FounderCard } from "@/components/lobby/FounderCard";
import { VisionMission } from "@/components/lobby/VisionMission";
import { AwardsRibbon } from "@/components/lobby/AwardsRibbon";
import { BrassLink } from "@/components/ui/BrassButton";
import { company } from "@/lib/projects.data";

export const Route = createFileRoute("/lobby")({
  head: () => ({
    meta: [
      { title: "The Lobby — Sri Suprabatham Builder" },
      { name: "description", content: "Twenty-five years of quiet, uncompromising practice. Meet the founder, the managing director, and the studio's manifesto." },
      { property: "og:title", content: "The Lobby — Sri Suprabatham Builder" },
      { property: "og:description", content: "Legacy · Founders · Vision · Mission · Awards." },
      { property: "og:url", content: "/lobby" },
    ],
    links: [{ rel: "canonical", href: "/lobby" }],
  }),
  component: LobbyPage,
});

function LobbyPage() {
  return (
    <>
      <MarbleHall />
      <LegacyTimeline />
      <section className="relative bg-ivory py-28 md:py-40">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-28 px-6 lg:px-10">
          <FounderCard person={company.founder} eyebrow="The Founder" />
          <FounderCard person={company.managingDirector} eyebrow="The Managing Director" align="right" />
        </div>
      </section>
      <VisionMission />
      <AwardsRibbon />

      <section className="relative isolate bg-obsidian py-24 text-ivory md:py-32">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 text-center lg:px-10">
          <p className="eyebrow text-brass-glow">Next</p>
          <h2 className="max-w-2xl font-display text-4xl md:text-6xl">
            Step into <span className="text-brass-gradient">the miniature city</span>.
          </h2>
          <BrassLink to="/projects" tone="ink" size="lg" arrow>
            View the projects
          </BrassLink>
        </div>
      </section>
    </>
  );
}
