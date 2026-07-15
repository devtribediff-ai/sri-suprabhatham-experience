import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SunriseBackdrop } from "./SunriseBackdrop";
import { DoorGate } from "./DoorGate";
import { DustField } from "@/components/world/DustField";
import { BirdsLayer } from "@/components/world/BirdsLayer";
import { ChakraMark } from "@/components/world/ChakraMark";
import { GodRays } from "@/components/world/GodRays";
import { FogBands } from "@/components/world/FogBands";
import { BrassButton, BrassLink } from "@/components/ui/BrassButton";
import { brand, company } from "@/lib/projects.data";
import { sriEase } from "@/lib/motion";
import { useReducedMotionPreference } from "@/lib/device";

/**
 * Act I — Arrival.
 *
 * Timeline (seconds):
 *   0.0  — total darkness
 *   0.6  — ambient chord swells (audio host handles playback)
 *   0.9  — SSB logo emerges in warm brass
 *   2.4  — Tamil wordmark & tagline fade in
 *   3.6  — sunrise wash rises, skyline silhouette appears
 *   6.2  — call-to-enter appears; doors remain closed
 *   USER — clicks "Enter" → doors part → camera dolly-in fires → nav to /lobby
 */
export function IntroScene() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [gateOpen, setGateOpen] = useState(false);
  const [dollying, setDollying] = useState(false);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    if (reduced) {
      // Skip the extended timing for reduced-motion users.
      setPhase(4);
      return;
    }
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(1), 800));   // logo
    timers.push(window.setTimeout(() => setPhase(2), 2400));  // tagline
    timers.push(window.setTimeout(() => setPhase(3), 3600));  // sunrise
    timers.push(window.setTimeout(() => setPhase(4), 6000));  // enter cta
    return () => { timers.forEach(clearTimeout); };
  }, [reduced]);

  return (
    <section
      className="relative isolate min-h-dvh w-full overflow-hidden bg-black text-ivory"
      aria-label="Sri Suprabatham Builder — arrival"
    >
      {/* Royal red glow — emerges from the black, then softens as the sunrise takes over */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? (phase >= 3 ? 0.35 : 1) : 0 }}
        transition={{ duration: 2.2, ease: sriEase }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 55% at 50% 55%, oklch(0.38 0.16 25 / 0.85) 0%, oklch(0.22 0.11 20 / 0.7) 35%, #050303 75%)",
        }}
      />

      {/* Sunrise sky (delayed until phase 3) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 2.6, ease: sriEase }}
        className="absolute inset-0"
      >
        <SunriseBackdrop progress={phase >= 3 ? 1 : 0} />
        <BirdsLayer />
      </motion.div>

      {/* Doors (closed until user gestures Enter) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 1.8, ease: sriEase }}
        className="absolute inset-0"
      >
        <DoorGate open={gateOpen} />
      </motion.div>

      {/* Atmospheric layers */}
      <GodRays intensity={phase >= 3 ? 0.4 : 0.18} />
      <FogBands tone="warm" />
      {/* Dust motes — always on */}
      <DustField count={100} />

      {/* Vishnu Chakra — the opening motif */}
      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
        <motion.div
          animate={{
            opacity: phase === 0 ? 0 : phase < 2 ? 1 : 0.25,
            scale: phase >= 2 ? 1.4 : 1,
            y: phase >= 2 ? -60 : 0,
          }}
          transition={{ duration: 2, ease: sriEase }}
        >
          <ChakraMark size={260} visible={phase >= 0} />
        </motion.div>
      </div>

      {/* Camera dolly-in overlay — a white bloom + zoom right before route change */}
      <AnimatePresence>
        {dollying && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.6, ease: sriEase }}
            className="absolute inset-0 z-40"
            style={{
              background: "radial-gradient(60% 45% at 50% 55%, oklch(0.96 0.05 88 / 0.95) 0%, oklch(0.85 0.08 82 / 0.6) 40%, transparent 75%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </AnimatePresence>

      {/* Wordmark + copy */}
      <div className="relative z-20 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: sriEase }}
              className="mb-6"
              aria-hidden
            >
              <img
                src={brand.logo}
                alt="Sri Suprabatham Builder"
                className="mx-auto h-28 w-auto md:h-36"
                style={{
                  filter:
                    "drop-shadow(0 0 40px oklch(0.72 0.11 78 / 0.55)) drop-shadow(0 0 90px oklch(0.42 0.18 25 / 0.35))",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: sriEase, delay: 0.4 }}
              className="font-display text-5xl leading-[0.95] tracking-tight text-ivory sm:text-7xl md:text-[7.5rem]"
              style={{ textShadow: "0 2px 40px oklch(0.14 0.008 60 / 0.8)" }}
            >
              <span className="block">Sri Suprabatham</span>
              <span className="block text-brass-gradient">Builder</span>
              <span
                className="mt-3 block text-brass-gradient text-2xl sm:text-3xl md:text-4xl"
                style={{ letterSpacing: "0.02em" }}
              >
                {company.wordmarkTamil}
              </span>
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: sriEase, delay: 0.2 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <p className="eyebrow text-brass-glow">
                <span className="inline-block h-px w-10 align-middle bg-brass" aria-hidden /> Building Trust Since {company.since} <span className="inline-block h-px w-10 align-middle bg-brass" aria-hidden />
              </p>
              <p className="font-display text-xl italic text-ivory/85 md:text-2xl">
                {company.tagline}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 4 && !gateOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: sriEase }}
              className="mt-14 flex flex-col items-center gap-6"
            >
              {reduced ? (
                <BrassLink to="/lobby" tone="ink" size="lg" arrow>
                  Enter the Experience
                </BrassLink>
              ) : (
                <BrassButton
                  tone="ink"
                  size="lg"
                  arrow
                  onClick={() => {
                    setGateOpen(true);
                    setTimeout(() => setDollying(true), 1600);
                    setTimeout(() => { window.location.assign("/lobby"); }, 3800);
                  }}
                >
                  Enter the Experience
                </BrassButton>
              )}
              <span className="eyebrow text-ivory/50">Best experienced with sound</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom vignette to seat the composition */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48"
        style={{ background: "linear-gradient(180deg, transparent, oklch(0.08 0.008 60 / 0.7))" }}
      />

      {/* Skip link for a11y */}
      <a
        href="/lobby"
        className="absolute right-6 top-24 z-30 text-[10px] uppercase tracking-[0.28em] text-ivory/60 underline underline-offset-4 transition-colors hover:text-brass focus-visible:text-brass"
      >
        Skip intro
      </a>
    </section>
  );
}
