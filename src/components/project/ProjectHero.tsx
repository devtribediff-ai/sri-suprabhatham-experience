import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { DustField } from "@/components/world/DustField";
import { rise, softRise, sriEase, stagger } from "@/lib/motion";
import type { Project } from "@/lib/projects.schema";

export function ProjectHero({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100dvh] overflow-hidden bg-obsidian text-ivory"
      aria-label={`${project.name} — hero`}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <PlaceholderImage
          src={project.hero.src}
          alt={project.hero.alt}
          aspect=""
          className="!h-full !w-full"
          loading="eager"
          vignette={0.75}
          fallback="obsidian"
        />
      </motion.div>
      <DustField count={80} />

      <motion.div
        variants={stagger(0.1, 0.4)}
        initial="initial"
        animate="enter"
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-6 py-32 lg:px-10"
      >
        <motion.p variants={softRise} className="eyebrow text-brass-glow">
          <span className="mr-3 inline-block h-px w-10 align-middle bg-brass" aria-hidden />
          {project.location} · {project.status}
        </motion.p>
        <motion.h1
          variants={rise}
          className="mt-6 font-display text-6xl leading-[0.95] sm:text-8xl md:text-[12rem]"
        >
          {project.name}
        </motion.h1>
        <motion.p variants={rise} className="mt-4 max-w-2xl font-display text-3xl text-ivory/85 md:text-4xl">
          {project.tagline}
        </motion.p>
        <motion.div
          variants={softRise}
          transition={{ delay: 0.3, duration: 1, ease: sriEase }}
          className="mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-brass/30 pt-8 text-sm md:grid-cols-4"
        >
          <Stat label="Configuration" value={project.configuration} />
          <Stat label="Units" value={String(project.unitsCount)} />
          <Stat label="Typology" value={project.bhk} />
          <Stat label="Size" value={project.sizeRange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-brass-glow">{label}</p>
      <p className="mt-2 font-display text-xl text-ivory">{value}</p>
    </div>
  );
}
