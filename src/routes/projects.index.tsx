import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects.data";
import { BrassLink } from "@/components/ui/BrassButton";
import { sriEase, stagger, rise, softRise } from "@/lib/motion";

// R3F bundle only loads when the visitor reaches this route.
const MiniatureCity = lazy(() =>
  import("@/components/city/MiniatureCity").then((m) => ({ default: m.MiniatureCity })),
);

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "The Projects — Sri Suprabhatham Builders" },
      { name: "description", content: "A miniature city of the studio's residences. Hover to bring a building to life. Click to step inside." },
      { property: "og:title", content: "The Projects — Sri Suprabhatham Builders" },
      { property: "og:description", content: "Explore Mathura, Aadya, Aastha, Ayodaya, and Elite as glowing architectural models." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="relative isolate min-h-[40dvh] bg-obsidian pb-4 pt-40 text-ivory">
        <motion.div
          variants={stagger(0.08, 0.1)}
          initial="initial"
          animate="enter"
          className="mx-auto max-w-[1400px] px-6 lg:px-10"
        >
          <motion.p variants={softRise} className="eyebrow text-brass-glow">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-brass" aria-hidden />
            The Projects
          </motion.p>
          <motion.h1
            variants={rise}
            className="mt-6 font-display text-5xl leading-[0.98] sm:text-6xl md:text-8xl"
          >
            A miniature city, <span className="text-brass-gradient">composed by hand</span>.
          </motion.h1>
          <motion.p
            variants={softRise}
            transition={{ delay: 0.2, duration: 1, ease: sriEase }}
            className="mt-6 max-w-2xl text-lg text-ivory/70"
          >
            Every project is a small architectural monolith on the bronze plinth below. Hover to see it come to life. Click to fly inside.
          </motion.p>
        </motion.div>
      </section>

      <Suspense
        fallback={
          <div className="grid h-[92dvh] w-full place-items-center bg-obsidian text-ivory">
            <div className="flex flex-col items-center gap-3">
              <div className="h-px w-40 overflow-hidden bg-brass/25">
                <div className="h-full w-1/3 animate-[marquee-x_1.6s_linear_infinite] bg-brass" />
              </div>
              <span className="eyebrow text-brass-glow">Composing the city</span>
            </div>
          </div>
        }
      >
        <MiniatureCity />
      </Suspense>

      {/* Index list — for accessibility, SEO, and no-JS fallback */}
      <section className="relative bg-ivory py-28 md:py-40" aria-label="Projects index">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.ul
            variants={stagger(0.08, 0.1)}
            initial="initial"
            whileInView="enter"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((p) => (
              <motion.li key={p.slug} variants={rise}>
                <BrassLink
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  tone="ghost"
                  className="!block !p-0 !text-left"
                >
                  <div className="group flex h-full flex-col border-l border-brass/40 p-6 transition-colors duration-500 hover:border-brass">
                    <p className="eyebrow text-brass-deep">{p.location}</p>
                    <p className="mt-4 font-display text-4xl text-obsidian normal-case tracking-normal">{p.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.28em] text-obsidian/60">{p.status} · {p.bhk}</p>
                    <p className="mt-4 text-sm normal-case tracking-normal text-muted-foreground">{p.tagline}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-brass-deep group-hover:text-brass">
                      View residence
                      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
                        <path d="M0 5 H16 M12 1 L16 5 L12 9" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </span>
                  </div>
                </BrassLink>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
