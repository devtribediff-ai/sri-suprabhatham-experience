import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { BrassButton } from "@/components/ui/BrassButton";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { DustField } from "@/components/world/DustField";
import { GodRays } from "@/components/world/GodRays";
import { rise, softRise, sriEase, stagger } from "@/lib/motion";
import type { Project } from "@/lib/projects.schema";

/**
 * The consultation lounge — a luxury interior with five brass action
 * plates. Not a form page; a decision moment. Every action is data-driven
 * and can be swapped for future services (VR tour, drone reel) without
 * touching this component.
 */
export interface LoungeAction {
  id: string;
  title: string;
  hint: string;
  href?: string; // external / mailto / tel
  to?: string; // router path
  icon: React.ReactNode;
  primary?: boolean;
}

export function ConsultationLounge({
  eyebrow,
  title,
  subtitle,
  project,
  actions,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  project?: Project;
  actions: LoungeAction[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-obsidian py-28 text-ivory md:py-40">
      {/* Marble wall */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 marble-surface marble-vein-overlay" />
        <div className="absolute inset-0 bg-obsidian/70" />
      </div>
      {/* Warm ceiling wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{ background: "radial-gradient(50% 40% at 50% 0%, oklch(0.72 0.11 78 / 0.4), transparent 70%)" }}
      />
      <GodRays intensity={0.25} />
      <DustField count={70} />

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:gap-20 lg:px-10">
        <motion.header
          variants={stagger(0.08, 0.1)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="md:col-span-5"
        >
          <motion.p variants={softRise} className="eyebrow text-brass-glow">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-brass" aria-hidden />
            {eyebrow}
          </motion.p>
          <motion.h2 variants={rise} className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
            {title}
          </motion.h2>
          <motion.p variants={softRise} className="mt-6 max-w-md text-lg leading-relaxed text-ivory/70">
            {subtitle}
          </motion.p>
          {project && (
            <motion.div
              variants={softRise}
              transition={{ delay: 0.15, duration: 1, ease: sriEase }}
              className="mt-10 border-t border-brass/30 pt-6"
            >
              <p className="eyebrow text-brass-glow">Regarding</p>
              <p className="mt-2 font-display text-2xl">{project.name} · {project.location}</p>
            </motion.div>
          )}
        </motion.header>

        <motion.ul
          variants={stagger(0.08, 0.2)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="grid gap-4 md:col-span-7"
        >
          {actions.map((a) => (
            <motion.li key={a.id} variants={rise}>
              <ActionPlate action={a} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ActionPlate({ action }: { action: LoungeAction }) {
  const inner = (
    <div
      className={`group relative flex items-center gap-6 border p-6 transition-all duration-500 md:p-7 ${
        action.primary
          ? "border-brass/50 bg-obsidian/70 hover:border-brass"
          : "border-brass/25 bg-obsidian/40 hover:border-brass/60"
      }`}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center brass-frame text-brass-glow">
        {action.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-2xl leading-tight text-ivory">{action.title}</p>
        <p className="mt-1 text-sm text-ivory/60">{action.hint}</p>
      </div>
      <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden className="shrink-0 text-brass transition-transform duration-500 group-hover:translate-x-1.5">
        <path d="M0 7 H23 M18 2 L23 7 L18 12" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  );
  if (action.to) return <Link to={action.to}>{inner}</Link>;
  return <a href={action.href} target={action.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>;
}
