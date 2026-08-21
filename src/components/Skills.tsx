import { motion } from "framer-motion";
import { Drum, Goal, AudioWaveform, Telescope, type LucideIcon } from "lucide-react";
import { skillCategories, certifications, hobbies } from "@/data/portfolio";
import { SectionHeader } from "./Projects";

const hobbyIcons: Record<string, LucideIcon> = {
  Drum,
  Goal,
  AudioWaveform,
  Telescope,
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <SectionHeader ch="CH.06 — Stack" title="Frequency Bands" />

      <div className="space-y-px bg-border border border-border">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-surface p-6 sm:p-8 grid sm:grid-cols-12 gap-6 items-start"
          >
            {/* Band marker */}
            <div className="sm:col-span-3 lg:col-span-2 flex items-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl text-primary font-bold tracking-tighter">
                {cat.band}
              </span>
              <div className="flex flex-col gap-0.5">
                {[...Array(4)].map((_, b) => (
                  <span
                    key={b}
                    className="block w-6 h-1 bg-primary"
                    style={{ opacity: b <= (3 - i) ? 1 : 0.2 }}
                  />
                ))}
              </div>
            </div>

            {/* Title + chips */}
            <div className="sm:col-span-9 lg:col-span-10">
              <h3 className="font-display text-lg sm:text-xl mb-4 tracking-tight">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs px-3 py-1.5 border border-border bg-background hover:border-primary/60 hover:text-primary transition-colors cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certs + hobbies row */}
      <div className="mt-12 grid md:grid-cols-2 gap-px bg-border border border-border">
        <div className="bg-surface p-6 sm:p-8">
          <p className="channel-label mb-4">Certifications</p>
          <div className="flex flex-wrap gap-2">
            {certifications.map((c) => (
              <span key={c} className="font-mono text-xs px-3 py-1.5 border border-primary/40 text-primary bg-primary/5">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-surface p-6 sm:p-8">
          <p className="channel-label mb-4">Off-duty</p>
          <div className="flex flex-wrap gap-3">
            {hobbies.map((h) => {
              const Icon = hobbyIcons[h.icon];
              return (
                <span
                  key={h.name}
                  className="group inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-border hover:border-primary/60 hover:text-primary transition-colors"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-primary group-hover:rotate-6 transition-transform" strokeWidth={1.5} />}
                  {h.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
