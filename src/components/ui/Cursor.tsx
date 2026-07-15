import { useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/lib/device";

/**
 * Custom cursor — a brass ring that magnetises to interactive elements.
 * Disabled on touch devices and when the user prefers reduced motion.
 * A11y: pointer events remain untouched; the OS cursor is only hidden on
 * the body when the custom cursor is active.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    if (reduced) return;
    const isTouch = matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    document.documentElement.classList.add("has-custom-cursor");
    setVisible(true);
    let rx = 0, ry = 0, dx = 0, dy = 0;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']");
    };
    const raf = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) {
        const scale = hovering ? 1.6 : 1;
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
        ring.current.style.opacity = hovering ? "1" : "0.7";
      }
      req = requestAnimationFrame(raf);
    };
    let req = requestAnimationFrame(raf);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(req);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduced]);

  if (!visible) return null;
  return (
    <>
      <style>{`.has-custom-cursor, .has-custom-cursor * { cursor: none !important; }`}</style>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-8 w-8 rounded-full border border-brass/70 transition-[opacity,border-color] duration-300 will-change-transform"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1 w-1 rounded-full bg-brass-glow will-change-transform"
      />
    </>
  );
}
