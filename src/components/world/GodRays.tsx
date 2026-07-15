import { motion } from "framer-motion";

/**
 * Cinematic god rays — a set of soft, additive light shafts angled from
 * an off-canvas source. Purely decorative CSS gradient sheets that drift
 * to simulate slow air movement.
 */
export function GodRays({ intensity = 0.35, tone = "brass" }: { intensity?: number; tone?: "brass" | "cool" }) {
  const stops =
    tone === "brass"
      ? "oklch(0.86 0.11 82 / 0.9), oklch(0.72 0.11 78 / 0.4) 50%, transparent 75%"
      : "oklch(0.92 0.05 220 / 0.8), oklch(0.72 0.08 220 / 0.3) 50%, transparent 75%";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute -top-[40%] h-[220%] w-[28%] origin-top"
          style={{
            left: `${8 + i * 22}%`,
            background: `linear-gradient(180deg, ${stops})`,
            opacity: intensity,
            transform: `rotate(${-8 + i * 3}deg)`,
            filter: "blur(24px)",
          }}
          animate={{ opacity: [intensity * 0.7, intensity, intensity * 0.7] }}
          transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
