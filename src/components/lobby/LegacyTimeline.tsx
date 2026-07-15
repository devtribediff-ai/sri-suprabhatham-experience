import { motion } from "framer-motion";
import { company } from "@/lib/projects.data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { rise, softRise, sriEase, stagger } from "@/lib/motion";

/**
 * Vertical timeline of milestones — a marble ribbon on the left, entries
 * on the right. Each entry rises with a brass tick as it enters view.
 */
export function LegacyTimeline() {
  return (
    <section id="legacy" className="relative isolate bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="Twenty-Five Years"
          title={<>A quiet, uncompromising <span className="text-brass-gradient">practice</span>.</>}
          subtitle="From a single 4-unit residence in West Mambalam to the studio's boutique manifesto — never more than ten homes at a time. Ever."
        />

        <motion.ol
          variants={stagger(0.12, 0.15)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="relative mx-auto mt-24 max-w-4xl"
        >
          {/* Marble ribbon */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-6 w-px md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, oklch(0.72 0.11 78 / 0.5) 8%, oklch(0.72 0.11 78 / 0.5) 92%, transparent 100%)",
            }}
          />
          {company.milestones.map((m, i) => (
            <motion.li
              key={m.year}
              variants={rise}
              className={`relative mb-14 pl-16 last:mb-0 md:pl-0 ${
                i % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
              }`}
            >
              {/* Brass tick */}
              <span
                aria-hidden
                className="absolute left-4 top-2 grid h-6 w-6 place-items-center rounded-full bg-obsidian md:left-1/2 md:-translate-x-1/2"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--gradient-brass)", boxShadow: "0 0 12px oklch(0.72 0.11 78 / 0.7)" }}
                />
              </span>
              <motion.p variants={softRise} className="eyebrow text-brass-deep">
                {m.year}
              </motion.p>
              <motion.h3 variants={softRise} className="mt-2 font-display text-3xl text-obsidian">
                {m.title}
              </motion.h3>
              <motion.p
                variants={softRise}
                transition={{ delay: 0.1, duration: 0.9, ease: sriEase }}
                className="mt-3 max-w-lg text-muted-foreground"
              >
                {m.note}
              </motion.p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
