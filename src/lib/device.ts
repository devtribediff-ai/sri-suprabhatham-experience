import { useEffect, useState } from "react";

/**
 * Reads prefers-reduced-motion after mount. Safe for SSR — always returns
 * `false` on the server, then hydrates client value.
 */
export function useReducedMotionPreference(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Best-effort low-end device heuristic. Used to downgrade 3D scenes.
 * Never treated as absolute — R3F still falls back gracefully.
 */
export function useIsLowEnd(): boolean {
  const [low, setLow] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const mem = nav.deviceMemory ?? 8;
    const cores = nav.hardwareConcurrency ?? 8;
    const save = nav.connection?.saveData ?? false;
    const slow = nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g";
    setLow(mem <= 2 || cores <= 2 || save || slow);
  }, []);
  return low;
}

/** True once the component has mounted on the client. */
export function useHydrated(): boolean {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
