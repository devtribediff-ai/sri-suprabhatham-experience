import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { rise, softRise, stagger } from "@/lib/motion";
import type { Project } from "@/lib/projects.schema";

/** Renders a Lucide icon by string name; falls back to a brass dot. */
function DynamicIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon | undefined>)[name];
  if (!Icon) return <span className="h-2 w-2 rounded-full bg-brass" aria-hidden />;
  return <Icon size={22} strokeWidth={1.25} aria-hidden />;
}

export function ProjectAmenities({ project }: { project: Project }) {
  return (
    <section className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="Amenities"
          title={<>The comforts that <span className="text-brass-gradient">do the quiet work</span>.</>}
        />

        <motion.ul
          variants={stagger(0.06, 0.1)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-20 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {project.amenities.map((a) => (
            <motion.li
              key={a.id}
              variants={rise}
              className="group flex items-start gap-5 border-t border-obsidian/10 py-6 transition-colors duration-500 hover:border-brass/60"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center brass-frame text-brass-deep transition-colors duration-500 group-hover:text-brass">
                <DynamicIcon name={a.icon} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-2xl text-obsidian">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
