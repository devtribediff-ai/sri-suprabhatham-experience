import { useEffect, useRef } from "react";
import { useReducedMotionPreference } from "@/lib/device";

/**
 * Occasional bird silhouettes traversing the sky. Cheap SVG paths tweened
 * in JS. Fires every 8–18 seconds and lasts ~14s per flock.
 */
export function BirdsLayer({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const spawn = () => {
      if (cancelled) return;
      const flock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      flock.setAttribute("viewBox", "0 0 40 20");
      flock.setAttribute("aria-hidden", "true");
      flock.style.cssText = `position:absolute;left:-8%;top:${5 + Math.random() * 30}%;width:60px;height:30px;opacity:0.55;color:#0E0D0B;transition:transform 14s linear,opacity 1s;`;
      flock.innerHTML = `
        <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
          <path d="M4 12c2-4 4-4 6 0c2-4 4-4 6 0"/>
          <path d="M18 8c1.5-3 3-3 4.5 0c1.5-3 3-3 4.5 0"/>
          <path d="M26 14c1-2 2-2 3 0c1-2 2-2 3 0"/>
        </g>`;
      el.appendChild(flock);
      requestAnimationFrame(() => {
        flock.style.transform = `translate(${window.innerWidth * 1.1}px, ${-30 - Math.random() * 60}px)`;
      });
      setTimeout(() => { flock.style.opacity = "0"; }, 12000);
      setTimeout(() => { flock.remove(); }, 15000);
      timer = window.setTimeout(spawn, 9000 + Math.random() * 12000);
    };
    let timer = window.setTimeout(spawn, 4500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [reduced]);

  return <div ref={ref} className={className} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} />;
}
