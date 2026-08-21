import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 sm:py-40 relative">
      <div className="text-center max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="channel-label mb-6 inline-flex items-center gap-3"
        >
          <span className="led animate-blink" />
          CH.07 — Outro
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-[0.9]"
        >
          Let's build
          <br />
          <span className="text-primary">something loud.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg text-foreground/70"
        >
          I'm taking on new product engineering work in AI, audio, and embedded systems.
          If your project lives anywhere near that intersection, I want to hear about it.
        </motion.p>

        <motion.a
          href="mailto:Kannan.avinash.ak@gmail.com"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group mt-12 inline-flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-[0.2em] hover:bg-primary-glow transition-colors"
        >
          Send a signal
          <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
        </motion.a>
      </div>

      {/* Footer rail */}
      <div className="mt-32 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>© {new Date().getFullYear()} · Avinash Kannan</span>
        <span className="flex items-center gap-2">
          <span className="led animate-blink" /> React · Vite
        </span>
        <span>EOF</span>
      </div>
    </section>
  );
};

export default Contact;
