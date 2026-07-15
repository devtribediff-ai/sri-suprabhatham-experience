import { createFileRoute } from "@tanstack/react-router";
import { IntroScene } from "@/components/cinematic/IntroScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Suprabatham Builder — A Legacy, Composed in Stone" },
      { name: "description", content: "Enter the cinematic experience centre of Sri Suprabatham Builder — twenty-five years of boutique luxury residences in Chennai." },
      { property: "og:title", content: "Sri Suprabatham Builder — A Legacy, Composed in Stone" },
      { property: "og:description", content: "Enter the cinematic experience centre of Sri Suprabatham Builder — twenty-five years of boutique luxury residences in Chennai." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return <IntroScene />;
}
