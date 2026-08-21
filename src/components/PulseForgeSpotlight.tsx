import { motion } from "framer-motion";
import { Mic, Waves, Grid3x3, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeader } from "./Projects";

const pillars = [
  {
    icon: Mic,
    label: "CAPTURE",
    title: "Hold to record, anywhere",
    body: "A table tap, a train seat thump, a radiator ring. One press captures it — no project setup, no import step, no DAW between the idea and the device.",
  },
  {
    icon: Waves,
    label: "ANALYSE",
    title: "Features, not pitch",
    body: "Found sounds are noisy and transient, so pitch detection is the wrong primary signal. Onset detection segments the hit; energy, attack, decay, spectral brightness and MFCCs describe it.",
  },
  {
    icon: Grid3x3,
    label: "MAP",
    title: "Rules, not a model",
    body: "A rule-based classifier suggests which of eight pads a sound belongs on — explainable, instant, and overridable. Every suggestion carries an internal reason string; the user can drag any pad to change it.",
  },
  {
    icon: SlidersHorizontal,
    label: "SHAPE",
    title: "Musical words, not DSP jargon",
    body: "Snap↔Ring and Dark↔Bright on a 2D pad, plus length and punch. Shaping is offline and cached, so a pad retriggers instantly and the exported WAV is bit-identical to what you heard.",
  },
];

const PULSEFORGE_URL = "https://github.com/Avinash-glitch/PulseForge";

// Captured from the app running on an iPhone 17 simulator
const screens = [
  { src: "/pulseforge/welcome.png", label: "01 · WELCOME", caption: "Anything can be a drum." },
  { src: "/pulseforge/capture.png", label: "02 · CAPTURE", caption: "Hold to record. Loud and close is best." },
  { src: "/pulseforge/kit.png", label: "03 · KIT", caption: "Eight pads, tap to play, hold to edit." },
  { src: "/pulseforge/shape.png", label: "04 · SHAPE", caption: "Snap↔Ring × Dark↔Bright, length, punch." },
  { src: "/pulseforge/library.png", label: "05 · LIBRARY", caption: "Every sound tagged by what it sounds like." },
  { src: "/pulseforge/export.png", label: "06 · EXPORT", caption: "Eight WAVs, zipped, named by pad." },
];

// Kit pad labels, in default-kit order
const PADS = ["KICK", "SNARE", "HAT", "OPEN", "TOM 1", "TOM 2", "RIDE", "PERC"];

// Deterministic transient envelope — one recorded hit, decaying
const HIT_BARS = 48;
const barHeight = (i: number) => {
  const attack = i < 3 ? (i + 1) / 3 : 1;
  const decay = Math.exp(-(Math.max(0, i - 3) / 11));
  const ripple = 0.82 + 0.18 * Math.sin(i * 1.7);
  return Math.max(0.04, attack * decay * ripple);
};

// Sweeps a detection cursor across the transient to show onset → analysis
const ScanLine = () => {
  const ref = useRef<SVGLineElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) / 2600) % 1;
      const x = 34 + t * 252;
      ref.current?.setAttribute("x1", String(x));
      ref.current?.setAttribute("x2", String(x));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <line
      ref={ref}
      x1="34"
      y1="40"
      x2="34"
      y2="120"
      stroke="hsl(var(--primary))"
      strokeWidth="1"
      opacity="0.55"
    />
  );
};

const PulseForgeSpotlight = () => {
  return (
    <section id="pulseforge-spotlight" className="py-24 sm:py-32 relative">
      <SectionHeader
        ch="CH.01 — Spotlight"
        title={
          <a
            href={PULSEFORGE_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            PulseForge
          </a>
        }
      />

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
              <span className="channel-label absolute top-4 left-4 z-10">ONSET · KIT MAP</span>
              <span className="channel-label absolute top-4 right-4 z-10 text-primary">8 PADS</span>

              <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full" aria-hidden>
                <defs>
                  <pattern id="pf-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                  </pattern>
                  <linearGradient id="pf-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                  </linearGradient>
                </defs>

                <rect width="320" height="320" fill="url(#pf-grid)" />

                {/* Captured transient */}
                <line
                  x1="34"
                  y1="80"
                  x2="286"
                  y2="80"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />
                {Array.from({ length: HIT_BARS }, (_, i) => {
                  const h = barHeight(i) * 38;
                  const x = 34 + i * (252 / HIT_BARS);
                  return (
                    <motion.rect
                      key={i}
                      x={x}
                      y={80 - h}
                      width={252 / HIT_BARS - 1.6}
                      height={h * 2}
                      fill="url(#pf-bar)"
                      rx={0.8}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.012 }}
                      style={{ transformOrigin: `${x}px 80px` }}
                    />
                  );
                })}
                <ScanLine />

                {/* Onset marker */}
                <g>
                  <circle
                    cx="40"
                    cy="80"
                    r="5"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                  >
                    <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" />
                    <animate
                      attributeName="opacity"
                      values="0.9;0.15;0.9"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x="50"
                    y="125"
                    fontSize="6.5"
                    fontFamily="JetBrains Mono"
                    letterSpacing="1"
                    fill="hsl(var(--primary))"
                    opacity="0.9"
                  >
                    ONSET · SNARE 0.82
                  </text>
                </g>

                {/* Pad grid */}
                {PADS.map((pad, i) => {
                  const col = i % 4;
                  const row = Math.floor(i / 4);
                  const w = 58;
                  const h = 58;
                  const gap = 8;
                  const x = 34 + col * (w + gap);
                  const y = 152 + row * (h + gap);
                  const isTarget = pad === "SNARE";
                  return (
                    <motion.g
                      key={pad}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    >
                      <rect
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        rx={6}
                        fill={isTarget ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                        opacity={isTarget ? 0.9 : 0.08}
                        stroke={isTarget ? "hsl(var(--primary))" : "hsl(var(--border))"}
                        strokeWidth="1"
                      />
                      <text
                        x={x + w / 2}
                        y={y + h / 2 + 3}
                        fontSize="7"
                        fontFamily="JetBrains Mono"
                        letterSpacing="1"
                        textAnchor="middle"
                        fill={isTarget ? "hsl(var(--background))" : "hsl(var(--foreground))"}
                        opacity={isTarget ? 1 : 0.55}
                      >
                        {pad}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>ON-DEVICE · NO NETWORK</span>
                <span className="flex items-center gap-2">
                  <span className="led animate-blink" /> REC ARMED
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-px bg-border border border-border text-[10px] font-mono uppercase tracking-widest">
              <div className="bg-surface p-2 text-center text-muted-foreground">RECORD</div>
              <div className="bg-surface p-2 text-center text-muted-foreground">MAP</div>
              <div className="bg-surface p-2 text-center text-muted-foreground">PLAY</div>
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
              Rhythm ideas arrive on trains, at desks, in cafés —{" "}
              <span className="text-foreground">nowhere near a kit</span>. Turning a found sound
              into something playable means recording it, importing to a DAW, trimming, EQing,
              compressing, mapping it to a sampler, exporting. Seven steps for an idea that lasts
              about thirty seconds.
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
              Build for capture, not production, and use classical DSP rather than a cloud model —
              it runs instantly, offline, and can explain itself. Record → onset detection →
              feature extraction → role suggestion → mapping → play. The interface never says
              spectral centroid or compression ratio; it says punch, boom, snap, ring, bright,
              dark. Everything testable lives in a headless Swift package, so the DSP is developed
              and verified without a simulator.
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
                  <span className="font-mono text-[10px] tracking-widest text-primary">
                    {p.label}
                  </span>
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
              "Onset detection has to disarm after each hit. A pitch-sweeping kick or a ringing
              cymbal keeps spectral flux high long after the strike, so one hit reads as two. A
              test caught that — not my ears."
            </p>
          </motion.div>

          <motion.a
            href={PULSEFORGE_URL}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors"
          >
            <span className="w-8 h-px bg-current" />
            View PulseForge on GitHub
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>
      </div>

      {/* Screens */}
      <div className="mt-16 sm:mt-20">
        <div className="section-rule">
          <div className="flex items-baseline gap-4">
            <span className="channel-label">SCREENS</span>
            <h3 className="font-display text-xl tracking-tight">Captured from the running app</h3>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {screens.length} / {screens.length}
          </span>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          {screens.map((s, i) => (
            <motion.figure
              key={s.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="w-[13.5rem] shrink-0 snap-start border border-border bg-surface p-2 sm:w-[15rem]"
            >
              <img
                src={s.src}
                alt={`PulseForge — ${s.caption}`}
                width={431}
                height={900}
                loading="lazy"
                className="w-full border border-border bg-background"
              />
              <figcaption className="px-1 pb-1 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                  {s.label}
                </span>
                <p className="mt-1.5 text-sm leading-snug text-foreground/65">{s.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PulseForgeSpotlight;
