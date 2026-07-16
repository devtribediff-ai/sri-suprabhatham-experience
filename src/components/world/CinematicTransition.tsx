import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { sriEase } from "@/lib/motion";

/**
 * Router transition layer — the seam that keeps the WebPlace feeling like a
 * single continuous camera move. Every route change is masked by a paired
 * veil (exit fade-in → new route mounts under it → veil fade-out).
 *
 * The veil is intentionally warm-black + a soft brass bloom, never white,
 * because a white flash reads as a page load. Duration is generous
 * (~1.4s combined) so short bounces don't feel like a UI hiccup.
 */
export function CinematicTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstRender = useRef(true);
  const [veilKey, setVeilKey] = useState<string | null>(null);

  useEffect(() => {
    // Never veil the very first route — the IntroScene owns its own arrival.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const k = `${pathname}-${Date.now()}`;
    setVeilKey(k);
    const t = window.setTimeout(() => setVeilKey(null), 1400);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {veilKey && (
        <motion.div
          key={veilKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.55, ease: sriEase },
            // exit is a longer, softer fade-out so the new scene emerges
            // from warm darkness rather than snapping in.
          }}
          className="pointer-events-none fixed inset-0 z-[80]"
          aria-hidden
          style={{
            background:
              "radial-gradient(70% 55% at 50% 55%, oklch(0.16 0.02 40 / 0.88) 0%, oklch(0.08 0.01 40 / 0.98) 55%, #050303 100%)",
          }}
        >
          {/* Soft brass bloom — the light bleeding around the doorway */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.6, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 1.2, ease: sriEase }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(35% 28% at 50% 55%, oklch(0.72 0.11 78 / 0.35) 0%, transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
