import { motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { rise, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects.schema";

export function ProjectFloorPlans({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  if (project.floorPlans.length === 0) return null;
  const plan = project.floorPlans[active];
  return (
    <section className="relative bg-obsidian py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          tone="dark"
          eyebrow="Floor Plans"
          title={<>Zoning designed for <span className="text-brass-gradient">daily choreography</span>.</>}
          subtitle="Direct circulation. Bedroom privacy. Cross-ventilation across opposing façades. Every unit is Vastu-aligned and climate-responsive."
        />

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4">
            <motion.ul
              variants={stagger(0.06, 0.05)}
              initial="initial"
              whileInView="enter"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="flex flex-col gap-2"
            >
              {project.floorPlans.map((p, i) => (
                <motion.li key={p.id} variants={rise}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={cn(
                      "group flex w-full items-start gap-4 border-l px-5 py-5 text-left transition-all duration-500",
                      i === active
                        ? "border-brass bg-obsidian/60"
                        : "border-brass/25 hover:border-brass/70 hover:bg-obsidian/40",
                    )}
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brass" aria-hidden />
                    <span className="min-w-0">
                      <span className="block font-display text-2xl">{p.name}</span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.28em] text-ivory/60">
                        {p.facing} · {p.area}
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="md:col-span-8">
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-8 lg:grid-cols-5"
            >
              <div className="lg:col-span-3">
                {plan.image ? (
                  <PlaceholderImage
                    src={plan.image.src}
                    alt={plan.image.alt}
                    aspect="aspect-[4/3]"
                    fit="contain"
                    className="bg-ivory brass-frame"
                  />
                ) : (
                  <div className="grid aspect-[4/3] place-items-center brass-frame bg-ivory/5 text-ivory/40">
                    <span className="eyebrow">Plan available on request</span>
                  </div>
                )}
              </div>
              <div className="lg:col-span-2">
                <p className="eyebrow text-brass-glow">Units</p>
                <p className="mt-3 font-display text-2xl text-ivory">{plan.units.join(" · ")}</p>
                <div className="hairline mt-8 w-full text-brass/40" />
                {plan.description && (
                  <p className="mt-6 text-sm leading-relaxed text-ivory/70">{plan.description}</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
