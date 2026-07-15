import { createFileRoute } from "@tanstack/react-router";
import { IntroScene } from "@/components/cinematic/IntroScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Suprabhatham Builders — A Legacy, Composed in Stone" },
      { name: "description", content: "Enter the cinematic experience centre of Sri Suprabhatham Builders — twenty-five years of boutique luxury residences in Chennai." },
      { property: "og:title", content: "Sri Suprabhatham Builders — Arrival" },
      { property: "og:description", content: "Building trust since 2000. A cinematic experience centre for the studio's residences." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return <IntroScene />;
}
