import { Link, useMatchRoute, useRouterState } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AudioToggle } from "./AudioToggle";
import { brand, company } from "@/lib/projects.data";

const items = [
  { label: "Legacy", to: "/lobby" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Mathura", to: "/projects/mathura" as const },
  { label: "Lounge", to: "/lounge" as const },
];

/** Routes that render on a dark background and therefore need light nav text. */
const DARK_ROUTES = ["/", "/projects", "/outro"];
const DARK_ROUTE_PREFIXES = ["/projects/"];

/** Routes where nav chrome should stay hidden entirely — the arrival scene
 *  owns its own presence and nav there breaks the "camera in silence" mood. */
const CHROMELESS_ROUTES = ["/", "/outro"];

const IDLE_MS = 2400;

/**
 * Auto-contrast, idle-hiding nav. The chrome fades away after ~2.4s of
 * pointer / key stillness so the visitor feels like they are inside a
 * continuous camera journey, not a website. Any pointer, key, wheel, or
 * touch gesture reveals it again. On the arrival and outro routes the
 * nav stays hidden entirely.
 */
export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [awake, setAwake] = useState(true);
  const match = useMatchRoute();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hiddenRoute = CHROMELESS_ROUTES.includes(pathname);
  const timer = useRef<number | null>(null);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  // Idle-hide: any input resets the timer.
  useEffect(() => {
    const wake = () => {
      setAwake(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setAwake(false), IDLE_MS);
    };
    wake();
    const opts = { passive: true } as AddEventListenerOptions;
    window.addEventListener("pointermove", wake, opts);
    window.addEventListener("wheel", wake, opts);
    window.addEventListener("touchstart", wake, opts);
    window.addEventListener("keydown", wake);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("wheel", wake);
      window.removeEventListener("touchstart", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [pathname]);

  const onDarkHero = useMemo(() => {
    if (scrolled) return false;
    if (DARK_ROUTES.includes(pathname)) return true;
    return DARK_ROUTE_PREFIXES.some((p) => pathname.startsWith(p));
  }, [pathname, scrolled]);

  const textClass = onDarkHero ? "text-ivory" : "text-obsidian";
  const subtleTextClass = onDarkHero ? "text-ivory/75 hover:text-ivory" : "text-obsidian/75 hover:text-obsidian";
  const borderClass = onDarkHero ? "border-ivory/25 hover:border-brass hover:text-brass" : "border-obsidian/25 hover:border-brass hover:text-brass";
  const eyebrowClass = onDarkHero ? "text-brass-glow" : "text-brass-deep";

  const visible = !hiddenRoute && (awake || open);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{
        y: visible ? 0 : -18,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding,background] duration-700",
        scrolled ? "glass-panel py-3" : "py-6",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 lg:px-10">
        <Link to="/" className="group relative flex items-center gap-3" aria-label={company.name}>
          <img src={brand.logo} alt="" aria-hidden className="h-11 w-11 shrink-0 object-contain" />
          <span className={cn("hidden flex-col leading-tight sm:flex", textClass)}>
            <span className="font-display text-lg">Sri Suprabatham Builder</span>
            <span className={cn("eyebrow", eyebrowClass)}>Est. {company.since} · Chennai</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((it) => {
            const active = !!match({ to: it.to, fuzzy: false });
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={cn(
                    "group relative px-4 py-2 text-[11px] uppercase tracking-[0.28em] transition-colors",
                    active ? (onDarkHero ? "text-brass-glow" : "text-brass-deep") : subtleTextClass,
                  )}
                >
                  {it.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <AudioToggle />
          <Link
            to="/lounge"
            className={cn(
              "hidden items-center gap-2 border px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] transition-colors duration-500 sm:inline-flex",
              textClass,
              borderClass,
            )}
          >
            Consult
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn("grid h-10 w-10 place-items-center border md:hidden", textClass, onDarkHero ? "border-ivory/25" : "border-obsidian/20")}
          >
            <span className="relative block h-3 w-4">
              <span className={cn("absolute inset-x-0 top-0 h-px bg-current transition-transform", open && "translate-y-[6px] rotate-45")} />
              <span className={cn("absolute inset-x-0 top-1/2 h-px bg-current transition-opacity", open && "opacity-0")} />
              <span className={cn("absolute inset-x-0 bottom-0 h-px bg-current transition-transform", open && "-translate-y-[6px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel mx-6 mt-3 border border-brass/25 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-obsidian/10">
            {items.map((it) => (
              <li key={it.to}>
                <Link
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 text-sm uppercase tracking-[0.28em] text-obsidian"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
