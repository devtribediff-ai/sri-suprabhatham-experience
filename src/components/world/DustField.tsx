import { useEffect, useRef } from "react";
import { useReducedMotionPreference } from "@/lib/device";

/**
 * Floating dust particles rendered on a low-cost canvas. Runs at ~30fps
 * with a small particle count so it costs virtually nothing but adds a
 * layer of life to every cinematic scene.
 */
interface Props {
  count?: number;
  className?: string;
  color?: string;
}
export function DustField({ count = 90, className, color = "rgba(255,235,190,0.55)" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.4 + Math.random() * 1.6,
      vx: -0.05 + Math.random() * 0.1,
      vy: -0.02 - Math.random() * 0.08,
      a: 0.15 + Math.random() * 0.6,
      p: Math.random() * Math.PI * 2,
    }));
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.p += 0.002 * dt;
        p.x += p.vx * dt + Math.sin(p.p) * 0.03;
        p.y += p.vy * dt + Math.cos(p.p * 0.7) * 0.02;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        ctx.globalAlpha = p.a * (0.7 + 0.3 * Math.sin(p.p));
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [count, color, reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", width: "100%", height: "100%" }}
    />
  );
}
