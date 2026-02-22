import { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(null);
  const lastWheelAtRef = useRef(0);
  const minSwipeDistance = 50;
  const projects = [
    {
      title: "Multi-band Compresser in JUCE",
      description: "Built a Multi-band compressor using Linkwitz-Riley filters...",
      tech: ["cpp", "juce"],
      link: 'https://github.com/Avinash-glitch/multiBandCompressor_Mixer'
    },
    {
      title: "Shift Sense",
      description: "A tool build on streamlit to automate shift assignments",
      tech: ["HTML", "streamlit", "python"],
      link: 'https://github.com/Avinash-glitch/shiftSense'
    },
    {
      title: "TikTok AI Blog Creator",
      description: "Designed an AI pipeline to automate editing...",
      tech: ["python", "streamlit", "langchain"],
    },
    {
      title: "Embedded Foot Pressure Monitor",
      description: "Developed a sensor-based monitoring system...",
      tech: ["arduino", "python"],
    }
   
  ];

  const total = projects.length;
  const sideCardOffset = 280;

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
  const onPointerDown = (e) => {
  setStartX(e.clientX);
    };

  const onPointerUp = (e) => {
    if (startX === null) return;

    const distance = startX - e.clientX;

    if (distance > minSwipeDistance) {
      rotate("right");
    } else if (distance < -minSwipeDistance) {
      rotate("left");
    }

    setStartX(null);
  };

  return (
    <section style={{ marginTop: "80px" }}
    
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 style={{ textAlign: "center", fontSize: "38px", marginBottom: "30px" }}>
        Featured Projects
      </h2>

      {/* Carousel */}
      <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onWheel={onWheel}
          style={{
            position: "relative",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1000px",
            userSelect: "none",
            touchAction: "pan-y",
            overflow: "visible",
          }}
        >

        {projects.map((project, index) => {
          // Circular offset calculation
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
                    rotateY(${offset * -30}deg)
                  `,
                  opacity: Math.abs(offset) > 1 ? 0 : Math.abs(offset) === 0 ? 1 : 0.65,
                  zIndex: total - Math.abs(offset),
                  pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
                }}
            >
              <ProjectCard {...project} />
            </div>
          );
        })}
        </div>

      {/* Draggable progress bar */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
        <input
          type="range"
          min={0}
          max={total - 1}
          value={activeIndex}
          onChange={(e) => setActiveIndex(Number(e.target.value))}
          style={{
            width: "200px",
            accentColor: "#fff",
            cursor: "pointer",
          }}
        />
      </div>
    </section>
  );
}

const arrowStyle = (position, isHovered) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [position]: 0,
  height: "100%",
  width: "90px",
  background:
    position === "left"
      ? "linear-gradient(to right, rgba(134, 126, 126, 0.4), transparent)"
      : "linear-gradient(to left, rgba(108, 108, 108, 0.4), transparent)",
  color: "#fff",
  fontSize: "30px",
  border: "none",
  outline:'none',
  cursor: "pointer",
  zIndex: 20,
  opacity: isHovered ? 1 : 0,
  transition: "opacity 0.3s ease",
});

export default Projects;
