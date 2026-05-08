import { motion } from "framer-motion";
import { Map, Sparkles, MessageSquareText, Shuffle } from "lucide-react";
import { useMemo } from "react";
import { SectionHeader } from "./Projects";

const pillars = [
  {
    icon: Map,
    label: "MAP",
    title: "Playlist co-occurrence, not audio features",
    body: "Two tracks sit close on the map when real listeners keep putting them on the same playlists. No tempo, no valence, no genre tags — just human curation, projected.",
  },
  {
    icon: Sparkles,
    label: "ZONES",
    title: "AI-named mood regions",
    body: "An LLM pass reads each emergent cluster and labels it — 'late-night focus', 'sunday driving' — so the territories on your map have names you'd actually use.",
  },
  {
    icon: MessageSquareText,
    label: "PROMPT",
    title: "Natural-language curation",
    body: "Describe a vibe in plain English and SoundMap returns a playlist drawn from points inside the matching region of your map.",
  },
  {
    icon: Shuffle,
    label: "BYOK",
    title: "Bring your own key",
    body: "Plug in your own AI provider key — OpenAI, Anthropic, whatever you trust. Your listening data and your model usage stay yours.",
  },
];

// Deterministic pseudo-random points so the map is stable but feels organic
const useScatter = (count: number) =>
  useMemo(() => {
    const pts: { x: number; y: number; r: number; cluster: number }[] = [];
    const clusters = [
      { cx: 80, cy: 90, spread: 35, hue: 0 },
      { cx: 200, cy: 70, spread: 28, hue: 1 },
      { cx: 230, cy: 230, spread: 40, hue: 2 },
      { cx: 90, cy: 240, spread: 32, hue: 3 },
      { cx: 160, cy: 160, spread: 22, hue: 4 },
    ];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      const c = clusters[i % clusters.length];
      const angle = rand() * Math.PI * 2;
      const dist = Math.pow(rand(), 0.6) * c.spread;
      pts.push({
        x: c.cx + Math.cos(angle) * dist,
        y: c.cy + Math.sin(angle) * dist,
        r: 1.2 + rand() * 1.6,
        cluster: c.hue,
      });
    }
    return { pts, clusters };
  }, [count]);

const CaseStudy = () => {
  const { pts, clusters } = useScatter(160);

  return (
    <section id="case-study" className="py-24 sm:py-32 relative">
      <SectionHeader ch="CH.02 — Spotlight" title="SoundMap" />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: visual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-24">
            <div className="relative aspect-square bg-surface border border-border p-6 overflow-hidden">
              <span className="channel-label absolute top-4 left-4 z-10">CO-OCCURRENCE · LIVE</span>
              <span className="channel-label absolute top-4 right-4 z-10 text-primary">500 PTS</span>

              {/* Faint grid */}
              <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full" aria-hidden>
                <defs>
                  <pattern id="sm-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />
                  </pattern>
                  <radialGradient id="cluster-glow-0" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="320" height="320" fill="url(#sm-grid)" />

                {/* Cluster halos */}
                {clusters.map((c, i) => (
                  <circle
                    key={i}
                    cx={c.cx}
                    cy={c.cy}
                    r={c.spread + 14}
                    fill="url(#cluster-glow-0)"
                    opacity={0.6 + (i % 3) * 0.15}
                  />
                ))}

                {/* Cluster labels */}
                {[
                  { x: 50, y: 60, t: "FOCUS" },
                  { x: 230, y: 50, t: "DRIVE" },
                  { x: 250, y: 285, t: "EUPHORIC" },
                  { x: 50, y: 285, t: "LATE-NIGHT" },
                  { x: 165, y: 150, t: "CORE" },
                ].map((l) => (
                  <text
                    key={l.t}
                    x={l.x}
                    y={l.y}
                    fontSize="7"
                    fontFamily="JetBrains Mono"
                    letterSpacing="2"
                    fill="hsl(var(--foreground))"
                    opacity="0.55"
                  >
                    {l.t}
                  </text>
                ))}

                {/* Track points */}
                {pts.map((p, i) => (
                  <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={p.r}
                    fill={p.cluster === 4 ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                    opacity={p.cluster === 4 ? 0.95 : 0.55}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: p.cluster === 4 ? 0.95 : 0.55, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 60) * 0.008, duration: 0.4 }}
                  />
                ))}

                {/* Active cursor */}
                <g>
                  <circle cx={165} cy={150} r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" values="10;18;10" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <line x1="165" y1="140" x2="165" y2="160" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.6" />
                  <line x1="155" y1="150" x2="175" y2="150" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.6" />
                </g>
              </svg>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>PLAYLIST · INGEST</span>
                <span className="flex items-center gap-2">
                  <span className="led animate-blink" /> AI LABELS · BYOK
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-px bg-border border border-border text-[10px] font-mono uppercase tracking-widest">
              <div className="bg-surface p-2 text-center text-muted-foreground">CO-PLAY</div>
              <div className="bg-surface p-2 text-center text-muted-foreground">CONTEXT</div>
              <div className="bg-surface p-2 text-center text-muted-foreground">RITUAL</div>
            </div>
          </div>
        </motion.div>

        {/* Right: copy */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="channel-label mb-3">PROBLEM</p>
            <p className="text-lg sm:text-xl text-foreground/85 leading-relaxed">
              Streaming services hand you{" "}
              <span className="text-foreground">opaque genre tags and algorithmic recommendations</span>{" "}
              — and never the shape of your own taste. You can't see your library; you can only
              scroll it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="channel-label mb-3">APPROACH</p>
            <p className="text-foreground/75 leading-relaxed">
              Skip audio features entirely. Build a co-occurrence graph from how real listeners
              actually group tracks across public playlists, then project that graph into 2D so
              songs people pair together end up next to each other. A BYOK AI pass names the
              resulting regions and turns plain-English vibes into playlists drawn from the
              matching cluster.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="bg-surface p-5 group hover:bg-surface-2 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <p.icon className="w-4 h-4 text-primary" />
                  <span className="font-mono text-[10px] tracking-widest text-primary">{p.label}</span>
                </div>
                <h4 className="font-display text-lg mb-2 tracking-tight">{p.title}</h4>
                <p className="text-sm text-foreground/65 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-l-2 border-primary pl-6 py-2"
          >
            <p className="channel-label mb-2">LEARNING</p>
            <p className="text-foreground/85 italic">
              "The best algorithms can recommend — but your friends know your vibe. Co-occurrence
              across human-made playlists captures something audio features never will: context,
              ritual, the song someone always plays after that song."
            </p>
          </motion.div>

          <motion.a
            href="https://github.com/Avinash-glitch/SoundMap"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors"
          >
            <span className="w-8 h-px bg-current" />
            View SoundMap on GitHub
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
