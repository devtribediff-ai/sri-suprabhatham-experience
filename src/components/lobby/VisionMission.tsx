import { motion } from "framer-motion";
import { company } from "@/lib/projects.data";
import { rise, softRise, stagger } from "@/lib/motion";

/**
 * Two-column vision/mission block, presented as brass-framed doctrinal
 * statements. Deliberately reserved — no icons, no gradients.
 */
export function VisionMission() {
  const items = [
    { label: "Vision", body: company.vision },
    { label: "Mission", body: company.mission },
  ];
  return (
    <section className="relative isolate bg-obsidian py-28 text-ivory md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, oklch(0.72 0.11 78 / 0.25), transparent 70%)",
        }}
      />
      <motion.div
        variants={stagger(0.15, 0.1)}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-2 md:gap-24 lg:px-10"
      >
        {items.map((it) => (
          <motion.div key={it.label} variants={rise}>
            <motion.p variants={softRise} className="eyebrow text-brass-glow">
              <span className="mr-3 inline-block h-px w-10 align-middle bg-brass" aria-hidden />
              {it.label}
            </motion.p>
            <motion.p variants={rise} className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              {it.body}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
