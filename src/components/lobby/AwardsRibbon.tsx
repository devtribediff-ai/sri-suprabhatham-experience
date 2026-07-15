import { motion } from "framer-motion";
import { company } from "@/lib/projects.data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { rise, stagger } from "@/lib/motion";

/**
 * Awards ribbon — a horizontal marquee of recognitions. Static on hover
 * so visitors can read a specific award without chasing it.
 */
export function AwardsRibbon() {
  const loop = [...company.awards, ...company.awards];
  return (
    <section className="relative isolate overflow-hidden bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="Recognitions"
          title={<>Trusted by the industry that <span className="text-brass-gradient">watches craft closely</span>.</>}
        />
      </div>

      <motion.div
        variants={stagger(0.05, 0.15)}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="group mt-20 overflow-hidden"
      >
        <motion.div
          className="flex w-max gap-8 px-6 will-change-transform"
          style={{ animation: "marquee-x 40s linear infinite" }}
        >
          {loop.map((a, i) => (
            <motion.div
              key={`${a.year}-${i}`}
              variants={rise}
              className="w-[320px] shrink-0 border-l border-brass/40 pl-6"
            >
              <p className="eyebrow text-brass-deep">{a.year}</p>
              <h3 className="mt-3 font-display text-2xl leading-tight text-obsidian">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.issuer}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="mx-auto mt-16 max-w-[1400px] px-6 lg:px-10">
        <div className="hairline w-full text-brass/40" />
      </div>
    </section>
  );
}
