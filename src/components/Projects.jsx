import { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Storypose",
    description: "An interactive pose-driven storytelling tool that uses real-time body pose estimation to map physical movements onto animated story characters.",
    tech: ["Python", "OpenCV", "MediaPipe"],
    link: "https://github.com/Avinash-glitch/Storypose",
  },
  {
    title: "Gait Analysis",
    description: "Real-time gait pattern analysis using embedded pressure sensors and signal processing to classify walking biomechanics and surface-level anomalies.",
    tech: ["Python", "Arduino", "Signal Processing"],
    link: null,
  },
  {
    title: "Bread & Jam",
    description: "A collaboration platform for musicians and producers to discover quality loops, share audio samples, and build creative partnerships.",
    tech: ["Python", "HTML", "JavaScript"],
    link: "https://github.com/Avinash-glitch/bread-and-jam",
  },
  {
    title: "Multi-band Compressor",
    description: "A professional-grade multi-band compressor plugin built in JUCE using Linkwitz-Riley filters for frequency-band splitting with independent dynamics per band.",
    tech: ["C++", "JUCE", "DSP"],
    link: "https://github.com/Avinash-glitch/multiBandCompressor_Mixer",
  },
  {
    title: "Shift Sense",
    description: "An automated shift-scheduling tool built on Streamlit that applies algorithmic constraint-solving to assign work shifts across teams.",
    tech: ["Python", "Streamlit", "HTML"],
    link: "https://github.com/Avinash-glitch/shiftSense",
  },
  {
    title: "Embedded Foot Pressure Monitor",
    description: "Foot-pressure monitoring system using a 64-sensor FSR array with dual Arduino Mega 2560 controllers and Python-based real-time data visualisation.",
    tech: ["Arduino", "Python", "Embedded C"],
    link: "https://github.com/Avinash-glitch/Array-sensor-using-Arduino-mega-2560.git",
  },
  {
    title: "Battleships",
    description: "A fully playable Battleships game in Python featuring turn-based logic, interactive Tkinter grid controls, and AI opponent move generation.",
    tech: ["Python", "Tkinter"],
    link: "https://github.com/Avinash-glitch/Battleships.git",
  },
];

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const lastWheelAtRef = useRef(0);
  const total = projects.length;
  const minSwipeDistance = 50;

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 720 : false;
  const sideCardOffset = isMobile ? 160 : 260;

  const rotate = (direction) => {
    if (direction === "left") {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    } else {
      setActiveIndex((prev) => (prev + 1) % total);
    }
  };

  const onWheel = (e) => {
    const now = Date.now();
    const primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
    const isHorizontalIntent =
      Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2 ||
      (e.shiftKey && Math.abs(e.deltaY) > 20);
    if (!isHorizontalIntent) return;
    if (now - lastWheelAtRef.current < 280) return;
    const delta = primaryDelta !== 0 ? primaryDelta : e.deltaY;
    if (Math.abs(delta) < 20) return;
    e.preventDefault();
    lastWheelAtRef.current = now;
    if (delta > 0) rotate("right");
    else rotate("left");
  };

  const onPointerDown = (e) => setStartX(e.clientX);

  const onPointerUp = (e) => {
    if (startX === null) return;
    const distance = startX - e.clientX;
    if (distance > minSwipeDistance) rotate("right");
    else if (distance < -minSwipeDistance) rotate("left");
    setStartX(null);
  };

  return (
    <section id="projects" style={{ marginTop: "80px" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "48px" }}>
        <h2 style={{
          margin: 0,
          fontSize: "26px",
          fontWeight: 700,
          color: "#ccd6f6",
          whiteSpace: "nowrap",
          fontFamily: "'Inter', sans-serif",
        }}>
          <span style={{ color: "#f0c674", fontFamily: "monospace", fontSize: "20px", marginRight: "10px" }}>
            02.
          </span>
          Featured Projects
        </h2>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", flex: 1 }} />
      </div>

      {/* Carousel */}
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
        style={{
          position: "relative",
          height: isMobile ? "300px" : "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1200px",
          userSelect: "none",
          touchAction: "pan-y",
          overflow: "hidden",
        }}
      >
        {projects.map((project, index) => {
          let offset = index - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                transition: "all 0.5s ease",
                transform: `
                  translateX(${offset * sideCardOffset}px)
                  scale(${Math.abs(offset) === 0 ? 1 : 0.8})
                  rotateY(${offset * -25}deg)
                `,
                opacity: Math.abs(offset) > 1 ? 0 : Math.abs(offset) === 0 ? 1 : 0.5,
                zIndex: total - Math.abs(offset),
                pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
              }}
            >
              <ProjectCard {...project} />
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: i === activeIndex ? "#64b5f6" : "rgba(255,255,255,0.2)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Footer link */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a
          href="https://github.com/Avinash-glitch"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#64b5f6",
            fontSize: "14px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            letterSpacing: "0.5px",
            textDecoration: "none",
            borderBottom: "1px solid transparent",
            paddingBottom: "2px",
            transition: "border-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#64b5f6")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
        >
          View full archive on GitHub
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Projects;
