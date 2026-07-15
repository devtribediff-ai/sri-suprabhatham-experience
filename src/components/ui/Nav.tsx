import { Link, useMatchRoute } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AudioToggle } from "./AudioToggle";
import { company } from "@/lib/projects.data";

const items = [
  { label: "Legacy", to: "/lobby" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Mathura", to: "/projects/mathura" as const },
  { label: "Lounge", to: "/lounge" as const },
];

/**
 * Transparent-on-hero navigation that turns to a hairline glass strip once
 * the user has scrolled past ~15% of the viewport. Mobile: brass-framed drawer.
 */
export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const match = useMatchRoute();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 80);
  });

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled ? "glass-panel py-3" : "py-6",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 lg:px-10">
        <Link to="/" className="group relative flex items-center gap-3" aria-label={company.name}>
          <span className="grid h-9 w-9 place-items-center brass-frame bg-obsidian text-brass-glow" aria-hidden>
            <span className="font-display text-lg">S</span>
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg text-obsidian">Sri Suprabhatham</span>
            <span className="eyebrow text-brass-deep">Builders · Est. 2000</span>
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
                    active ? "text-brass-deep" : "text-obsidian/75 hover:text-obsidian",
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
            className="hidden items-center gap-2 border border-obsidian/25 px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] text-obsidian transition-colors duration-500 hover:border-brass hover:text-brass sm:inline-flex"
          >
            Consult
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center border border-obsidian/20 text-obsidian md:hidden"
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
