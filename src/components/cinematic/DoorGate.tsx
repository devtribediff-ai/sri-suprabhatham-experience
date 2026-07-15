import { motion } from "framer-motion";
import { sriEase } from "@/lib/motion";

/**
 * A pair of grand luxury doors that part open. Rendered in CSS with SVG
 * ornament panels — no image assets needed. Trigger via `open` prop.
 */
export function DoorGate({ open }: { open: boolean }) {
  return (
    <div className="absolute inset-0 grid grid-cols-2 overflow-hidden pointer-events-none">
      <DoorLeaf side="left" open={open} />
      <DoorLeaf side="right" open={open} />
    </div>
  );
}

function DoorLeaf({ side, open }: { side: "left" | "right"; open: boolean }) {
  const isLeft = side === "left";
  return (
    <motion.div
      initial={false}
      animate={{ x: open ? (isLeft ? "-102%" : "102%") : "0%" }}
      transition={{ duration: 3.4, ease: sriEase, delay: open ? 0.2 : 0 }}
      className="relative h-full w-full"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.01 60) 0%, oklch(0.1 0.008 60) 100%)",
        boxShadow: isLeft
          ? "inset -1px 0 0 oklch(0.72 0.11 78 / 0.6), inset -12px 0 30px -20px oklch(0.72 0.11 78 / 0.5)"
          : "inset 1px 0 0 oklch(0.72 0.11 78 / 0.6), inset 12px 0 30px -20px oklch(0.72 0.11 78 / 0.5)",
      }}
    >
      {/* Ornamental panels */}
      <div className="absolute inset-0 flex flex-col gap-3 p-6 md:p-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 border border-brass/25 relative">
            <div className="absolute inset-3 border border-brass/15" />
            {i === 1 && (
              <div
                className="absolute inset-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: "radial-gradient(circle, oklch(0.72 0.11 78) 0%, oklch(0.55 0.11 72) 60%, transparent 100%)",
                  boxShadow: "0 0 30px oklch(0.72 0.11 78 / 0.6)",
                }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Center seam glow (only when closed) */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-y-0 ${isLeft ? "right-0" : "left-0"} w-px`}
        style={{ background: "linear-gradient(180deg, transparent, oklch(0.86 0.12 88) 40%, oklch(0.86 0.12 88) 60%, transparent)" }}
      />
      {/* Brass handle */}
      <div
        className={`absolute top-1/2 ${isLeft ? "right-6" : "left-6"} h-24 w-1 -translate-y-1/2 rounded-full`}
        style={{ background: "var(--gradient-brass)", boxShadow: "0 0 12px oklch(0.72 0.11 78 / 0.6)" }}
      />
    </motion.div>
  );
}
