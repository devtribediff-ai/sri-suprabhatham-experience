import { motion } from "framer-motion";
import { sriEase } from "@/lib/motion";

/**
 * Vishnu Chakra — a sacred discus rendered in pure SVG so it scales crisply
 * and animates on the GPU. Slow continuous rotation with a brass glow. Used
 * as the opening motif of the arrival sequence.
 */
export function ChakraMark({ size = 220, visible = true }: { size?: number; visible?: boolean }) {
  const spokes = 24;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, filter: "blur(24px)" }}
      animate={visible ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0 }}
      transition={{ duration: 2.2, ease: sriEase }}
      className="pointer-events-none relative"
      style={{ width: size, height: size, filter: "drop-shadow(0 0 42px oklch(0.72 0.11 78 / 0.55))" }}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <radialGradient id="chakraCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.96 0.05 88)" />
            <stop offset="60%" stopColor="oklch(0.78 0.14 78)" />
            <stop offset="100%" stopColor="oklch(0.42 0.11 55)" />
          </radialGradient>
          <linearGradient id="chakraRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.09 85)" />
            <stop offset="50%" stopColor="oklch(0.62 0.14 68)" />
            <stop offset="100%" stopColor="oklch(0.86 0.09 85)" />
          </linearGradient>
        </defs>
        {/* outer ring */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#chakraRing)" strokeWidth="2" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="url(#chakraRing)" strokeWidth="0.6" opacity="0.6" />
        {/* serrated flame edge */}
        {Array.from({ length: 32 }).map((_, i) => {
          const a = (i / 32) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 90;
          const y1 = 100 + Math.sin(a) * 90;
          const x2 = 100 + Math.cos(a) * 98;
          const y2 = 100 + Math.sin(a) * 98;
          return <line key={`f${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#chakraRing)" strokeWidth="1.2" />;
        })}
        {/* spokes */}
        {Array.from({ length: spokes }).map((_, i) => {
          const a = (i / spokes) * Math.PI * 2;
          const x2 = 100 + Math.cos(a) * 78;
          const y2 = 100 + Math.sin(a) * 78;
          return <line key={i} x1="100" y1="100" x2={x2} y2={y2} stroke="url(#chakraRing)" strokeWidth="1.2" />;
        })}
        {/* inner ring */}
        <circle cx="100" cy="100" r="34" fill="none" stroke="url(#chakraRing)" strokeWidth="1.5" />
        {/* hub */}
        <circle cx="100" cy="100" r="14" fill="url(#chakraCore)" />
        <circle cx="100" cy="100" r="4" fill="oklch(0.98 0.02 88)" />
      </motion.svg>
    </motion.div>
  );
}
