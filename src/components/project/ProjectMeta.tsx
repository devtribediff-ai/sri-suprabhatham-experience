import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { rise, softRise, stagger } from "@/lib/motion";
import type { Project } from "@/lib/projects.schema";

export function ProjectSpecs({ project }: { project: Project }) {
  return (
    <section className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="Specifications"
          title={<>Engineered for the <span className="text-brass-gradient">quarter-century</span>.</>}
        />
        <motion.dl
          variants={stagger(0.06, 0.1)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {project.specs.map((g) => (
            <motion.div
              key={g.id}
              variants={rise}
              className="border-t border-obsidian/15 pt-6"
            >
              <dt className="eyebrow text-brass-deep">{g.title}</dt>
              <dd className="mt-4 space-y-2 text-sm leading-relaxed text-obsidian">
                {g.items.map((it) => (
                  <p key={it} className="pl-4 -indent-4 before:mr-2 before:text-brass before:content-['–']">
                    {it}
                  </p>
                ))}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

export function ProjectQuality({ project }: { project: Project }) {
  return (
    <section className="relative bg-obsidian py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          tone="dark"
          eyebrow="Construction Quality"
          title={<>Silent standards, <span className="text-brass-gradient">stubbornly held</span>.</>}
        />
        <motion.ul
          variants={stagger(0.08, 0.1)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {project.quality.map((q, i) => (
            <motion.li key={q} variants={rise} className="flex gap-5 border-l border-brass/40 pl-5">
              <span className="eyebrow shrink-0 text-brass-glow">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display text-2xl leading-tight text-ivory">{q}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export function ProjectLocation({ project }: { project: Project }) {
  return (
    <section className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-12 md:gap-20 lg:px-10">
        <div className="md:col-span-5">
          <SectionTitle
            eyebrow="Location"
            title={<>The address, <span className="text-brass-gradient">on purpose</span>.</>}
            subtitle={project.location3d.address}
          />
        </div>
        <motion.div
          variants={stagger(0.08, 0.15)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="md:col-span-7"
        >
          {/* Stylised map plate — reserved for a real embed later */}
          <div className="relative aspect-[16/10] overflow-hidden brass-frame bg-obsidian/5">
            <svg
              viewBox="0 0 800 500"
              className="absolute inset-0 h-full w-full text-obsidian/25"
              aria-hidden
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="800" height="500" fill="url(#grid)" />
              <path d="M 0 320 C 200 300 350 340 500 300 S 780 260 800 240" stroke="oklch(0.72 0.11 78)" strokeWidth="1.5" fill="none" />
              <path d="M 200 500 L 200 100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
              <path d="M 550 500 L 550 100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
            </svg>
            <div className="absolute left-[42%] top-[52%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="relative grid h-6 w-6 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-brass/40" aria-hidden />
                <span className="h-3 w-3 rounded-full bg-brass" aria-hidden />
              </span>
              <span className="mt-3 rounded-sm bg-obsidian px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-ivory">
                {project.name}
              </span>
            </div>
          </div>
          <motion.p variants={softRise} className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Coordinates: {project.location3d.lat.toFixed(4)}° N · {project.location3d.lng.toFixed(4)}° E
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
