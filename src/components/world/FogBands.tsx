import { motion } from "framer-motion";

/**
 * Low horizontal fog bands drifting across a scene. Layered translucent
 * gradients that give hero sections a sense of atmospheric depth.
 */
export function FogBands({ tone = "warm" }: { tone?: "warm" | "cool" }) {
  const c = tone === "warm" ? "oklch(0.92 0.05 82 / 0.28)" : "oklch(0.88 0.03 220 / 0.22)";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-x-[-20%] h-[38%]"
          style={{
            bottom: `${i * 18}%`,
            background: `radial-gradient(60% 100% at 50% 100%, ${c}, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{ x: ["-4%", "4%", "-4%"] }}
          transition={{ duration: 22 + i * 6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
