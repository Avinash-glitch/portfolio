import { motion } from "framer-motion";
import { Phone, Mail, Github, Linkedin, ArrowDown } from "lucide-react";
import Waveform from "./Waveform";

const contacts = [
  { href: "tel:+447767926439", label: "+44 7767 926439", icon: Phone, short: "PHONE" },
  { href: "mailto:Kannan.avinash.ak@gmail.com", label: "Kannan.avinash.ak@gmail.com", icon: Mail, short: "MAIL" },
  { href: "https://github.com/Avinash-glitch", label: "Avinash-glitch", icon: Github, short: "GIT" },
  { href: "https://www.linkedin.com/in/avinash-kannan/", label: "avinash-kannan", icon: Linkedin, short: "LINKEDIN" },
];

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-between pt-20 pb-12">
      {/* Top status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        <div className="flex items-center gap-3">
          <span className="led animate-blink" />
          <span>SIGNAL · LIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>LON · UK</span>
          <span>2026 / EST.</span>
        </div>
      </motion.div>

      {/* Main */}
      <div className="relative z-10 py-12">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="channel-label mb-6"
        >
          CH.00 — Identity
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9] tracking-tighter"
        >
          AVINASH
          <br />
          <span className="text-primary">KANNAN</span>
          <span className="text-primary animate-blink">_</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 max-w-2xl text-lg sm:text-xl text-foreground/80 leading-relaxed"
        >
          Product engineer working across{" "}
          <span className="text-foreground font-medium">agentic AI</span>,{" "}
          <span className="text-foreground font-medium">audio DSP</span> and{" "}
          <span className="text-foreground font-medium">embedded systems</span>.
          I turn complex technical capabilities into software people actually use — and ship.
        </motion.p>

        {/* Contact rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border max-w-3xl"
        >
          {contacts.map(({ href, label, icon: Icon, short }) => (
            <a
              key={short}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group bg-background p-4 hover:bg-surface transition-colors flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4 text-primary" />
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                  {short}
                </span>
              </div>
              <span className="text-xs text-foreground/70 truncate group-hover:text-foreground transition-colors">
                {label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Waveform footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative"
      >
        <div className="h-32 sm:h-40 -mx-2 opacity-90">
          <Waveform />
        </div>
        <div className="flex items-center justify-between mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>↓ SCROLL · CH.01 — WORK</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
          <span className="hidden sm:inline">44.1KHZ · 24-BIT</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
