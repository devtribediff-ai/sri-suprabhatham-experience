import type { Variants } from "framer-motion";

/** Signature cinematic easing curve used across the experience. */
export const sriEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const drape: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Rises with a slight blur — headline reveal. */
export const rise: Variants = {
  initial: { opacity: 0, y: 32, filter: "blur(10px)" },
  enter: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: sriEase, delay },
  }),
};

/** Gentle rise for body copy — no blur. */
export const softRise: Variants = {
  initial: { opacity: 0, y: 18 },
  enter: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: sriEase, delay },
  }),
};

/** Fade only — used for atmospheric layers. */
export const fade: Variants = {
  initial: { opacity: 0 },
  enter: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.4, ease: sriEase, delay },
  }),
};

/** Staggered reveal container. */
export const stagger = (childDelay = 0.08, initialDelay = 0): Variants => ({
  initial: {},
  enter: {
    transition: { staggerChildren: childDelay, delayChildren: initialDelay },
  },
});
