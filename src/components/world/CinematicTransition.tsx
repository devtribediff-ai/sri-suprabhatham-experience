import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { sriEase } from "@/lib/motion";

/**
 * A warm bloom veil that flashes on every route change so navigations feel
 * like one continuous drone flight rather than a hard page cut.
 */
export function CinematicTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    setKey(pathname);
    setShow(true);
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: sriEase }}
          className="pointer-events-none fixed inset-0 z-[60]"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 45% at 50% 55%, oklch(0.96 0.05 88 / 0.35) 0%, oklch(0.85 0.08 82 / 0.15) 40%, transparent 75%)",
            mixBlendMode: "screen",
          }}
        />
      )}
    </AnimatePresence>
  );
}
