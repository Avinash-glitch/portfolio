import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/portfolio";
import { SectionHeader } from "./Projects";

const Experience = () => {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section id="experience" className="py-24 sm:py-32">
      <SectionHeader ch="CH.03 — Timeline" title="Experience" />

      <div className="grid md:grid-cols-12 gap-px bg-border border border-border">
        {/* Tabs */}
        <div className="md:col-span-4 lg:col-span-3 bg-background flex md:flex-col overflow-x-auto md:overflow-visible">
          {experiences.map((e, i) => (
            <button
              key={e.id}
              onClick={() => setActive(i)}
              className={`relative text-left px-5 py-4 font-mono text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors flex-shrink-0
                ${i === active ? "text-primary bg-surface" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span className="block text-[10px] mb-1 opacity-60">{`0${i + 1}`}</span>
              {e.company}
              {i === active && (
                <motion.span
                  layoutId="exp-marker"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary md:w-0.5 md:h-full hidden md:block"
                />
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="md:col-span-8 lg:col-span-9 bg-surface p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight mb-2">
                {exp.role}
                <span className="text-primary"> @ {exp.company}</span>
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
                {exp.duration}
              </p>
              <ul className="space-y-4">
                {exp.details.map((d, idx) => (
                  <li key={idx} className="flex gap-4 text-foreground/75">
                    <span className="font-mono text-primary flex-shrink-0 mt-1">▸</span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
