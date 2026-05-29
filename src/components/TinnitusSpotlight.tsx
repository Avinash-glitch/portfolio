import { motion } from "framer-motion";
import { FileText, Waves, GitBranch, ScanLine } from "lucide-react";
import { useMemo, useEffect, useRef } from "react";
import { SectionHeader } from "./Projects";

const pillars = [
  {
    icon: ScanLine,
    label: "SPIKE LOG",
    title: "Capture the moment, not the memory",
    body: "One-tap spike logging with triggers, severity, and real-world context — recorded when it happens so the detail is there when an appointment finally arrives.",
  },
  {
    icon: Waves,
    label: "PITCH MATCH",
    title: "AVFoundation sine-tone calibration",
    body: "A real-time tone generator sweeps 20 Hz – 16 kHz at 44.1 kHz sample rate. Users dial in their perceived pitch; the matched frequency is cross-referenced with audiogram regions in the PDF report.",
  },
  {
    icon: GitBranch,
    label: "PATTERN ANALYSIS",
    title: "Deterministic subtype classification",
    body: "A rule-based classifier surfaces stress, sleep, noise-induced, somatic, and reactive modifiers from 14 days of check-in data — shown as associations, never causes.",
  },
  {
    icon: FileText,
    label: "REPORT",
    title: "Clinician-ready PDF in one tap",
    body: "Structured summary of spike history, trigger patterns, audiogram context, and matched pitch — formatted for a GP, audiologist, or ENT to read in a few minutes.",
  },
];

// Audiogram frequencies shown in the visual (Hz)
const FREQ_LABELS = ["250", "500", "1k", "2k", "4k", "8k"];

// Deterministic bar heights (simulating a mild high-frequency hearing loss curve)
const BAR_HEIGHTS = [0.15, 0.18, 0.22, 0.38, 0.72, 0.65];

// Animated sine wave points across the SVG width
const useSinePoints = (
  width: number,
  height: number,
  amplitude: number,
  phase: number
) =>
  useMemo(() => {
    const points: string[] = [];
    for (let x = 0; x <= width; x += 2) {
      const y = height / 2 + amplitude * Math.sin((x / width) * 4 * Math.PI + phase);
      points.push(`${x},${y.toFixed(1)}`);
    }
    return points.join(" ");
  }, [width, height, amplitude, phase]);

const AnimatedWave = () => {
  const canvasRef = useRef<SVGPolylineElement>(null);
  const phaseRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const W = 320;
    const H = 60;
    const AMP = 14;

    const tick = () => {
      phaseRef.current += 0.04;
      if (canvasRef.current) {
        const pts: string[] = [];
        for (let x = 0; x <= W; x += 2) {
          const y =
            H / 2 + AMP * Math.sin((x / W) * 4 * Math.PI + phaseRef.current);
          pts.push(`${x},${y.toFixed(1)}`);
        }
        canvasRef.current.setAttribute("points", pts.join(" "));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <polyline
      ref={canvasRef}
      points=""
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      opacity="0.75"
    />
  );
};

const TENNITUS_URL = "https://github.com/Avinash-glitch/Tennitus";

const TinnitusSpotlight = () => {
  return (
    <section id="tinnitus-spotlight" className="py-24 sm:py-32 relative">
      <SectionHeader
        ch="CH.03 — Spotlight"
        title={
          <a
            href={TENNITUS_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            Tennitus
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
              <span className="channel-label absolute top-4 left-4 z-10">
                AUDIOGRAM · PITCH MATCH
              </span>
              <span className="channel-label absolute top-4 right-4 z-10 text-primary">
                44.1 kHz
              </span>

              <svg
                viewBox="0 0 320 320"
                className="absolute inset-0 w-full h-full"
                aria-hidden
              >
                <defs>
                  <pattern
                    id="tn-grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                  </pattern>
                  <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity="0.9"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity="0.2"
                    />
                  </linearGradient>
                  <linearGradient
                    id="wave-fade"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    <stop offset="15%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="85%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Background grid */}
                <rect width="320" height="320" fill="url(#tn-grid)" />

                {/* Horizontal reference lines (audiogram dB rows) */}
                {[80, 120, 160, 200, 240].map((y) => (
                  <line
                    key={y}
                    x1="32"
                    y1={y}
                    x2="300"
                    y2={y}
                    stroke="hsl(var(--border))"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                ))}

                {/* dB axis labels */}
                {[
                  { y: 80, label: "20 dB" },
                  { y: 120, label: "40 dB" },
                  { y: 160, label: "60 dB" },
                  { y: 200, label: "80 dB" },
                  { y: 240, label: "100 dB" },
                ].map((r) => (
                  <text
                    key={r.label}
                    x="28"
                    y={r.y + 3}
                    fontSize="6"
                    fontFamily="JetBrains Mono"
                    fill="hsl(var(--foreground))"
                    opacity="0.35"
                    textAnchor="end"
                  >
                    {r.label}
                  </text>
                ))}

                {/* Audiogram bars */}
                {BAR_HEIGHTS.map((h, i) => {
                  const barW = 26;
                  const gap = (268 - FREQ_LABELS.length * barW) / (FREQ_LABELS.length - 1);
                  const x = 34 + i * (barW + gap);
                  const maxBarH = 160;
                  const barH = h * maxBarH;
                  const y = 240 - barH;
                  const isHighlight = i >= 4; // 4kHz+ — the "tinnitus zone"
                  return (
                    <motion.rect
                      key={FREQ_LABELS[i]}
                      x={x}
                      y={y}
                      width={barW}
                      height={barH}
                      fill={isHighlight ? "url(#bar-grad)" : "hsl(var(--foreground))"}
                      opacity={isHighlight ? 0.9 : 0.2}
                      rx={2}
                      initial={{ scaleY: 0, originY: 1 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                      style={{ transformOrigin: `${x + barW / 2}px 240px` }}
                    />
                  );
                })}

                {/* Frequency labels */}
                {FREQ_LABELS.map((label, i) => {
                  const barW = 26;
                  const gap = (268 - FREQ_LABELS.length * barW) / (FREQ_LABELS.length - 1);
                  const x = 34 + i * (barW + gap) + barW / 2;
                  return (
                    <text
                      key={label}
                      x={x}
                      y="256"
                      fontSize="7"
                      fontFamily="JetBrains Mono"
                      letterSpacing="1"
                      fill="hsl(var(--foreground))"
                      opacity="0.5"
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  );
                })}

                {/* Hz axis label */}
                <text
                  x="160"
                  y="270"
                  fontSize="6"
                  fontFamily="JetBrains Mono"
                  letterSpacing="2"
                  fill="hsl(var(--foreground))"
                  opacity="0.3"
                  textAnchor="middle"
                >
                  FREQUENCY (Hz)
                </text>

                {/* 4kHz pitch-match marker */}
                {(() => {
                  const barW = 26;
                  const gap = (268 - FREQ_LABELS.length * barW) / (FREQ_LABELS.length - 1);
                  const markerX = 34 + 4 * (barW + gap) + barW / 2;
                  return (
                    <g>
                      <line
                        x1={markerX}
                        y1="68"
                        x2={markerX}
                        y2="240"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.75"
                        strokeDasharray="3 3"
                        opacity="0.5"
                      />
                      <circle cx={markerX} cy="68" r="5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.7">
                        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <text
                        x={markerX + 8}
                        y="64"
                        fontSize="6.5"
                        fontFamily="JetBrains Mono"
                        fill="hsl(var(--primary))"
                        opacity="0.9"
                      >
                        4 kHz · MATCHED
                      </text>
                    </g>
                  );
                })()}

                {/* Animated sine wave band (top strip) */}
                <g clipPath="none">
                  <rect x="0" y="28" width="320" height="40" fill="hsl(var(--background))" opacity="0.6" />
                  <svg x="0" y="28" width="320" height="40" overflow="hidden">
                    <AnimatedWave />
                  </svg>
                </g>
              </svg>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>LOCAL-FIRST · NO CLOUD</span>
                <span className="flex items-center gap-2">
                  <span className="led animate-blink" /> SPIKE ACTIVE
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-px bg-border border border-border text-[10px] font-mono uppercase tracking-widest">
              <div className="bg-surface p-2 text-center text-muted-foreground">TRACK</div>
              <div className="bg-surface p-2 text-center text-muted-foreground">ANALYSE</div>
              <div className="bg-surface p-2 text-center text-muted-foreground">REPORT</div>
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
              People with tinnitus struggle to explain what's happening.{" "}
              <span className="text-foreground">
                Symptoms fluctuate across sleep, stress, and noise exposure
              </span>{" "}
              — but by the time an audiology appointment arrives, the detail is
              gone. Existing apps focus on masking. None turn the mess into a
              report a clinician can actually use.
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
              Skip the wellness promises. Build a low-burden capture loop —
              daily check-ins, spike logs, trigger tagging — then run a
              deterministic subtype classifier across the 14-day window. Surface
              stress, sleep, somatic, and noise-induced modifiers as associations
              with explicit evidence strings. Pair it with an AVFoundation
              pitch-matching engine and audiogram context, then export a
              structured PDF the clinician can read in three minutes.
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
            <p className="channel-label mb-2">DESIGN PRINCIPLE</p>
            <p className="text-foreground/85 italic">
              "Tennitus does not promise to cure tinnitus. It helps people
              understand, organise, and communicate their experience — so the
              appointment is worth having."
            </p>
          </motion.div>

          <motion.a
            href={TENNITUS_URL}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors"
          >
            <span className="w-8 h-px bg-current" />
            View Tennitus on GitHub
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default TinnitusSpotlight;
