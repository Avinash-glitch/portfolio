import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Animated oscilloscope-style waveform.
 * Pure SVG, GPU-friendly, scales to container width.
 */
const Waveform = ({ className = "" }: { className?: string }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setPhase((p) => (p + 0.06) % (Math.PI * 2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const width = 1200;
  const height = 200;
  const cy = height / 2;
  const points: string[] = [];
  const samples = 240;

  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * width;
    const t = (i / samples) * Math.PI * 6;
    const y =
      cy +
      Math.sin(t + phase) * 28 +
      Math.sin(t * 2.3 + phase * 1.7) * 14 +
      Math.sin(t * 0.7 + phase * 0.4) * 22;
    points.push(`${x},${y}`);
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="20%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="80%" stopColor="hsl(var(--primary-glow))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wave-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* center line */}
      <line x1="0" y1={cy} x2={width} y2={cy} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 6" />

      {/* fill under wave */}
      <motion.polyline
        points={`0,${cy} ${points.join(" ")} ${width},${cy}`}
        fill="url(#wave-fill)"
        stroke="none"
      />

      {/* main wave */}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="url(#wave-grad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Waveform;
