import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { rise, softRise, stagger } from "@/lib/motion";
import type { Project } from "@/lib/projects.schema";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:gap-20 lg:px-10">
        <div className="md:col-span-5">
          <SectionTitle
            eyebrow="The Composition"
            title={<>An address for <span className="text-brass-gradient">the limited few</span>.</>}
          />
        </div>
        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="md:col-span-7"
        >
          <motion.p variants={rise} className="font-display text-2xl leading-snug text-obsidian md:text-3xl">
            {project.description}
          </motion.p>
          <motion.p variants={softRise} className="mt-8 text-lg leading-relaxed text-muted-foreground">
            {project.overview}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export function ProjectGallery({ project }: { project: Project }) {
  if (project.gallery.length === 0) return null;
  return (
    <section className="relative bg-obsidian py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          tone="dark"
          eyebrow="The Interiors"
          title={<>Rooms composed like <span className="text-brass-gradient">a chamber piece</span>.</>}
          subtitle="Each interior study emerges from a shared material palette — soft neutrals, warm wood, brushed brass. Timeless first, then contemporary."
        />

        <motion.div
          variants={stagger(0.08, 0.1)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-6"
        >
          {project.gallery.map((img, i) => {
            const layouts = [
              "md:col-span-4 md:row-span-2 aspect-[4/5]",
              "md:col-span-2 aspect-[3/4]",
              "md:col-span-2 aspect-[3/4]",
              "md:col-span-3 aspect-[4/3]",
              "md:col-span-3 aspect-[4/3]",
              "md:col-span-6 aspect-[16/9]",
            ];
            const cls = layouts[i % layouts.length];
            return (
              <motion.div key={img.src + i} variants={rise} className={cls}>
                <PlaceholderImage
                  src={img.src}
                  alt={img.alt}
                  aspect=""
                  className="!h-full !w-full brass-frame"
                  caption={img.caption}
                  vignette={0.4}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
