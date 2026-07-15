import { createFileRoute } from "@tanstack/react-router";
import { OutroScene } from "@/components/cinematic/OutroScene";

export const Route = createFileRoute("/outro")({
  head: () => ({
    meta: [
      { title: "Departure — Sri Suprabatham Builder" },
      { name: "description", content: "The closing frame of the experience. Built on trust. Designed for generations." },
      { property: "og:title", content: "Departure — Sri Suprabatham Builder" },
      { property: "og:description", content: "Built on trust. Designed for generations." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OutroScene,
});
