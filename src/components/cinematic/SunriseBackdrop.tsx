import { motion } from "framer-motion";
import { sriEase } from "@/lib/motion";

/**
 * Sunrise gradient backdrop for the arrival scene. Layered radial washes
 * simulate a slowly rising sun. Purely CSS/SVG — no images.
 */
export function SunriseBackdrop({ progress = 1 }: { progress?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-obsidian">
      {/* Night sky base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 130%, oklch(0.32 0.03 60) 0%, oklch(0.12 0.008 60) 55%, #000 100%)",
        }}
      />
      {/* Rising sun */}
      <motion.div
        initial={{ y: "62%", opacity: 0 }}
        animate={{ y: `${62 - progress * 30}%`, opacity: progress }}
        transition={{ duration: 3.8, ease: sriEase }}
        className="absolute left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.96 0.05 88) 0%, oklch(0.72 0.16 66 / 0.85) 30%, oklch(0.5 0.16 25 / 0.4) 55%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />
      {/* Warm horizon wash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: progress }}
        transition={{ duration: 3.4, ease: sriEase, delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: "var(--gradient-sunrise)" }}
      />
      {/* Volumetric god rays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: progress * 0.9 }}
        transition={{ duration: 3, ease: sriEase, delay: 0.4 }}
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "repeating-linear-gradient(78deg, transparent 0 40px, oklch(0.96 0.05 88 / 0.06) 40px 41px, transparent 41px 90px)",
          animation: "godray-drift 12s ease-in-out infinite",
          maskImage: "radial-gradient(80% 60% at 50% 40%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(80% 60% at 50% 40%, black, transparent 70%)",
        }}
      />
      {/* Distant skyline silhouette */}
      <motion.svg
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: progress, y: 0 }}
        transition={{ duration: 2.2, ease: sriEase, delay: 0.6 }}
        viewBox="0 0 1440 200"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[24vh] w-full text-obsidian"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 200 V120 L60 120 L60 90 L120 90 L120 110 L180 110 L180 70 L240 70 L240 100 L300 100 L300 60 L340 60 L340 40 L380 40 L380 60 L440 60 L440 100 L520 100 L520 80 L600 80 L600 50 L680 50 L680 80 L760 80 L760 60 L820 60 L820 40 L880 40 L880 70 L960 70 L960 90 L1040 90 L1040 60 L1120 60 L1120 90 L1200 90 L1200 110 L1280 110 L1280 80 L1360 80 L1360 110 L1440 110 L1440 200 Z"
        />
      </motion.svg>
    </div>
  );
}
