import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Github, Lock, Smartphone } from "lucide-react";
import { projects } from "@/data/portfolio";
import type { ReactNode } from "react";

const accentStyles = [
  {
    border: "border-primary",
    text: "text-primary",
    bg: "bg-primary",
    soft: "bg-primary/12",
    shadow: "group-hover:shadow-[0_0_48px_hsl(var(--primary)/0.22)]",
  },
  {
    border: "border-emerald-300",
    text: "text-emerald-300",
    bg: "bg-emerald-300",
    soft: "bg-emerald-300/12",
    shadow: "group-hover:shadow-[0_0_48px_rgba(110,231,183,0.16)]",
  },
  {
    border: "border-sky-300",
    text: "text-sky-300",
    bg: "bg-sky-300",
    soft: "bg-sky-300/12",
    shadow: "group-hover:shadow-[0_0_48px_rgba(125,211,252,0.14)]",
  },
  {
    border: "border-rose-300",
    text: "text-rose-300",
    bg: "bg-rose-300",
    soft: "bg-rose-300/12",
    shadow: "group-hover:shadow-[0_0_48px_rgba(253,164,175,0.14)]",
  },
] as const;

const SectionHeader = ({ ch, title, count }: { ch: string; title: ReactNode; count?: string }) => (
  <div className="section-rule">
    <div className="flex items-baseline gap-4">
      <span className="channel-label">{ch}</span>
      <h2 className="font-display text-3xl sm:text-4xl tracking-tight">{title}</h2>
    </div>
    {count && <span className="font-mono text-xs text-muted-foreground">{count}</span>}
  </div>
);

const getActionLabel = (link: string | null) => {
  if (!link) return "Private";
  if (link.includes("github.com")) return "View Code";
  return "Live Site";
};

const ProjectCard = ({
  p,
  index,
}: {
  p: typeof projects[number];
  index: number;
}) => {
  const accent = accentStyles[index % accentStyles.length];
  const actionLabel = getActionLabel(p.link);
  const stackOffset = Math.min(index, 5) * 12;

  return (
    <motion.article
      data-project-card
      data-project-index={index}
      initial={{ y: 48 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 120, damping: 24 }}
      style={{
        top: `calc(5.25rem + ${stackOffset}px)`,
        zIndex: index + 1,
      }}
      className="group sticky mx-auto mb-[46vh] min-h-[34rem] max-w-[52rem] last:mb-[18vh] sm:min-h-[36rem] lg:min-h-[40rem]"
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-3 top-4 bottom-[-0.8rem] rounded-[2.25rem] border-2 ${accent.border} opacity-60 transition-transform duration-300 group-hover:translate-y-2`}
      />
      <div
        className={`relative z-10 flex h-full flex-col overflow-hidden rounded-[2.25rem] border-2 ${accent.border} bg-background p-7 sm:p-8 transition-shadow duration-300 ${accent.shadow}`}
      >
        <div
          aria-hidden="true"
          className={`absolute -right-20 -top-20 h-48 w-48 rounded-full ${accent.soft} blur-3xl`}
        />

        <div className="relative flex h-full flex-col">
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <span className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${accent.text}`}>
                {p.signal ?? "Project"}
              </span>
              <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className={`h-1.5 w-1.5 rounded-full ${accent.bg}`} />
                <span>{p.featured ? "Featured build" : "Selected work"}</span>
              </div>
            </div>
            {p.link ? (
              <ArrowUpRight className={`h-5 w-5 shrink-0 ${accent.text} transition-transform duration-300 group-hover:rotate-12`} />
            ) : (
              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
          </div>

          <h3 className="relative mt-7 break-words font-display text-[clamp(2.35rem,5vw,4rem)] leading-[0.96] tracking-normal text-foreground">
            {p.title}
          </h3>

          <p className="relative mt-5 text-base leading-relaxed text-foreground/72 sm:text-lg lg:text-xl">
            {p.description}
          </p>

          <div className="relative mt-7 grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-semibold text-muted-foreground sm:text-base">
            {p.tech.slice(0, 4).map((t) => (
              <span key={t} className={accent.text}>
                {t}
              </span>
            ))}
          </div>

          <div className="relative mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
            {p.link ? (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-16 flex-1 items-center justify-center gap-3 rounded-full bg-foreground/10 px-5 text-base font-medium text-foreground transition-colors hover:bg-foreground/16"
                aria-label={`${actionLabel} for ${p.title}`}
              >
                {actionLabel === "View Code" ? <Github className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                <span>{actionLabel}</span>
              </a>
            ) : (
              <span className="inline-flex min-h-16 flex-1 items-center justify-center gap-3 rounded-full bg-foreground/10 px-5 text-base font-medium text-muted-foreground">
                <Lock className="h-5 w-5" />
                Private
              </span>
            )}
            <a
              href="#contact"
              className={`inline-flex min-h-16 flex-1 items-center justify-center gap-3 rounded-full px-5 text-base font-medium text-background transition-transform hover:translate-x-1 ${accent.bg}`}
            >
              <span>Discuss</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const activeCardRef = useRef<number | null>(null);
  const [hapticsEnabled, setHapticsEnabled] = useState(false);
  const supportsHaptics = typeof navigator !== "undefined" && "vibrate" in navigator;

  useEffect(() => {
    if (!hapticsEnabled || !supportsHaptics || !sectionRef.current) return;

    const cards = Array.from(sectionRef.current.querySelectorAll<HTMLElement>("[data-project-card]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const centered = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!centered) return;

        const nextIndex = Number((centered.target as HTMLElement).dataset.projectIndex);
        if (Number.isNaN(nextIndex) || activeCardRef.current === nextIndex) return;

        activeCardRef.current = nextIndex;
        navigator.vibrate(12);
      },
      {
        threshold: [0.35, 0.5, 0.7],
        rootMargin: "-34% 0px -34% 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [hapticsEnabled, supportsHaptics]);

  const toggleHaptics = () => {
    if (!supportsHaptics) return;
    const nextEnabled = !hapticsEnabled;
    setHapticsEnabled(nextEnabled);
    activeCardRef.current = null;
    if (nextEnabled) navigator.vibrate([12, 32, 12]);
  };

  return (
    <>
      <section id="work" ref={sectionRef} className="relative py-16 sm:py-20">
        <SectionHeader ch="CH.01 — Work" title="Selected Projects" count={`${projects.length} / ${projects.length}`} />

        <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-base leading-relaxed text-foreground/70">
            Scroll through the deck. Each solid card rises from below, sticks, and stacks over the previous build.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Scroll · Stack · Inspect
            </span>
            <button
              type="button"
              onClick={toggleHaptics}
              disabled={!supportsHaptics}
              aria-pressed={hapticsEnabled}
              className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                hapticsEnabled
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:border-primary/60 hover:text-foreground"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              Haptics
            </button>
          </div>
        </div>

        <div className="relative">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </section>

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
    </>
  );
};

export default Projects;
export { SectionHeader };
