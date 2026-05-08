import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/data/portfolio";
import type { ReactNode } from "react";

const SectionHeader = ({ ch, title, count }: { ch: string; title: ReactNode; count?: string }) => (
  <div className="section-rule">
    <div className="flex items-baseline gap-4">
      <span className="channel-label">{ch}</span>
      <h2 className="font-display text-3xl sm:text-4xl tracking-tight">{title}</h2>
    </div>
    {count && <span className="font-mono text-xs text-muted-foreground">{count}</span>}
  </div>
);

const ProjectCard = ({ p, large = false }: { p: typeof projects[number]; large?: boolean }) => {
  const Wrapper: any = p.link ? "a" : "div";
  const wrapperProps = p.link
    ? { href: p.link, target: "_blank", rel: "noreferrer" }
    : {};
  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative block bg-surface border border-border p-6 sm:p-8 glow-on-hover ${
        large ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      {/* corner ticks */}
      <span className="absolute top-0 left-0 w-3 h-px bg-primary" />
      <span className="absolute top-0 left-0 w-px h-3 bg-primary" />
      <span className="absolute top-0 right-0 w-3 h-px bg-primary" />
      <span className="absolute top-0 right-0 w-px h-3 bg-primary" />

      <div className="flex items-start justify-between mb-6">
        <span className="channel-label">{p.signal ?? "PROJECT"}</span>
        {p.link ? (
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
        ) : (
          <Lock className="w-4 h-4 text-muted-foreground" />
        )}
      </div>

      <h3 className={`font-display tracking-tight mb-3 ${large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
        {p.title}
      </h3>

      <p className={`text-foreground/70 leading-relaxed mb-6 ${large ? "text-base" : "text-sm"}`}>
        {p.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {p.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-background border border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
};

const Projects = () => {
  return (
    <section id="work" className="py-24 sm:py-32">
      <SectionHeader ch="CH.01 — Work" title="Selected Projects" count={`${projects.length} / ${projects.length}`} />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className={p.featured && i < 2 ? "lg:col-span-1" : ""}
          >
            <ProjectCard p={p} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex justify-center">
        <a
          href="https://github.com/Avinash-glitch"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors"
        >
          <span className="w-8 h-px bg-current" />
          Full archive on GitHub
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Projects;
export { SectionHeader };
