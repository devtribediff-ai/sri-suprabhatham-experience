import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { brand, company } from "@/lib/projects.data";
import { GodRays } from "@/components/world/GodRays";
import { FogBands } from "@/components/world/FogBands";
import { DustField } from "@/components/world/DustField";
import { sriEase } from "@/lib/motion";

/**
 * Act V — Departure. Camera pulls back from the city, sky warms into
 * sunset, brand mark rises, tagline is engraved, fade to black.
 */
export function OutroScene() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  useEffect(() => {
    const t: number[] = [];
    t.push(window.setTimeout(() => setPhase(1), 400));   // sunset
    t.push(window.setTimeout(() => setPhase(2), 2200));  // logo
    t.push(window.setTimeout(() => setPhase(3), 3800));  // tagline
    t.push(window.setTimeout(() => setPhase(4), 6500));  // fade
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative isolate min-h-dvh w-full overflow-hidden bg-black text-ivory">
      {/* Sunset gradient */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 2.4, ease: sriEase }}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.32 0.12 30) 0%, oklch(0.5 0.14 45) 30%, oklch(0.72 0.12 70) 55%, oklch(0.24 0.06 40) 100%)",
        }}
      />

      {/* Distant city silhouette */}
      <motion.svg
        viewBox="0 0 1200 260"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[28%] h-[22%] w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase >= 1 ? 0.9 : 0, y: phase >= 1 ? 0 : 20 }}
        transition={{ duration: 2.4, ease: sriEase }}
        aria-hidden
      >
        <path
          d="M0 260 V180 L60 180 L60 130 L120 130 L120 170 L180 170 L180 100 L240 100 L240 155 L320 155 L320 90 L380 90 L380 150 L450 150 L450 120 L520 120 L520 60 L580 60 L580 140 L660 140 L660 100 L740 100 L740 170 L820 170 L820 110 L900 110 L900 150 L980 150 L980 90 L1060 90 L1060 160 L1140 160 L1140 180 L1200 180 V260 Z"
          fill="oklch(0.14 0.03 40)"
        />
      </motion.svg>

      <GodRays intensity={0.28} />
      <FogBands tone="warm" />
      <DustField count={80} />

      {/* Ground fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(180deg, transparent, #050303)" }} />

      {/* Final fade-to-black */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 1 : 0 }}
        transition={{ duration: 3.2, ease: sriEase }}
        className="absolute inset-0 bg-black"
      />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <motion.img
          src={brand.logo}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={
            phase >= 2
              ? { opacity: phase >= 4 ? 0 : 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0 }
          }
          transition={{ duration: 2, ease: sriEase }}
          className="h-24 w-auto md:h-32"
          style={{ filter: "drop-shadow(0 0 40px oklch(0.72 0.11 78 / 0.55))" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 3 ? { opacity: phase >= 4 ? 0 : 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1.8, ease: sriEase }}
          className="mt-8 font-display text-4xl italic text-brass-gradient md:text-6xl"
        >
          {company.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: phase >= 4 ? 0 : 0.7 } : { opacity: 0 }}
          transition={{ duration: 1.6, ease: sriEase, delay: 0.6 }}
          className="eyebrow mt-6 text-ivory/60"
        >
          {company.name} · Est. {company.since}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, ease: sriEase, delay: 1.6 }}
          className="mt-20"
        >
          <Link to="/" className="eyebrow text-ivory/70 underline underline-offset-8 hover:text-brass">
            Return to the entrance
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
