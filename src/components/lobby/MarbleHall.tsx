import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/Surfaces";
import { DustField } from "@/components/world/DustField";
import { company } from "@/lib/projects.data";
import { rise, softRise, sriEase, stagger } from "@/lib/motion";

/**
 * Lobby hero — a marble corridor with volumetric brass light, a floating
 * brand mark, and a slow parallax pan on scroll. Establishes the "you have
 * arrived in the lobby" feeling before the legacy content begins.
 */
export function MarbleHall() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yWall = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const yLight = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9, 1], [1, 1, 0.7, 0.4]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-obsidian text-ivory"
      aria-label="The lobby"
    >
      {/* Marble back wall */}
      <motion.div style={{ y: yWall }} className="absolute inset-0">
        <div className="absolute inset-0 marble-surface marble-vein-overlay opacity-90" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, oklch(0.14 0.008 60 / 0.65) 0%, oklch(0.14 0.008 60 / 0.35) 40%, oklch(0.14 0.008 60 / 0.85) 100%)" }}
        />
      </motion.div>

      {/* Volumetric brass sconce rays */}
      <motion.div
        style={{ y: yLight }}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        aria-hidden
      >
        <div
          className="absolute left-[8%] top-0 h-[140%] w-[35%] -rotate-6"
          style={{
            background: "radial-gradient(closest-side, oklch(0.72 0.11 78 / 0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[8%] top-0 h-[140%] w-[35%] rotate-6"
          style={{
            background: "radial-gradient(closest-side, oklch(0.72 0.11 78 / 0.28), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Reflection floor */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.16 0.008 60 / 0.85) 30%, oklch(0.12 0.008 60) 100%)",
          maskImage: "linear-gradient(180deg, transparent, black 30%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 30%)",
        }}
      />

      <DustField count={70} color="rgba(255,229,180,0.4)" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        variants={stagger(0.12, 0.2)}
        initial="initial"
        animate="enter"
        className="relative z-10 mx-auto flex min-h-[92dvh] max-w-[1400px] flex-col items-center justify-center px-6 py-32 text-center lg:px-10"
      >
        <motion.p variants={softRise} className="eyebrow text-brass-glow">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-brass" aria-hidden />
          The Lobby
        </motion.p>
        <motion.h1
          variants={rise}
          className="mt-6 font-display text-6xl leading-[0.95] sm:text-7xl md:text-[10rem]"
        >
          <span className="block">A Legacy,</span>
          <span className="block text-brass-gradient">Composed in Stone.</span>
        </motion.h1>
        <motion.p variants={softRise} className="mt-10 max-w-2xl text-lg leading-relaxed text-ivory/75">
          Twenty-five years of building homes that behave like heirlooms. Step into the ideas, the hands, and the philosophy behind {company.name}.
        </motion.p>

        {/* Floating brand mark */}
        <motion.div
          variants={rise}
          transition={{ delay: 0.6, duration: 1.4, ease: sriEase }}
          className="mt-16 flex flex-col items-center gap-4"
          aria-hidden
        >
          <div
            className="h-24 w-px"
            style={{ background: "linear-gradient(180deg, transparent, oklch(0.72 0.11 78))" }}
          />
          <GlassCard tone="ink" framed className="px-6 py-3">
            <div className="flex items-center gap-4">
              <span className="font-display text-2xl text-brass-glow">S</span>
              <span className="hairline h-px w-10" />
              <span className="eyebrow text-ivory/70">Est. {company.since}</span>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
