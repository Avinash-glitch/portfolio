import { useState } from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const projects = [
    {
      title: "Multi-band Compression with AI guidance",
      description: "Built a Multi-band compressor using Linkwitz-Riley filters...",
      tech: ["cpp", "juce"],
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
    },
    {
      title: "Multi-band Compression plugin with AI guidance in juce",
      description: "Built a Multi-band compressor using Linkwitz-Riley filters...",
      tech: ["cpp", "juce", "python"],
    },
  ];

  const total = projects.length;

  const rotate = (direction) => {
    if (direction === "left") {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    } else {
      setActiveIndex((prev) => (prev + 1) % total);
    }
  };

  return (
    <section
      style={{
        padding: "80px 20px",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 style={{ textAlign: "center", fontSize: "38px", marginBottom: "30px" }}>
        Featured Projects
      </h2>

      {/* Arrows */}
      <button
        onClick={() => rotate("left")}
        style={arrowStyle("left", isHovered)}
      >
        ◀
      </button>

      <button
        onClick={() => rotate("right")}
        style={arrowStyle("right", isHovered)}
      >
        ▶
      </button>

      {/* Carousel */}
      <div
        style={{
          position: "relative",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1000px",
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
                  translateX(${offset * 350}px)
                  rotateY(${offset * -30}deg)
                `,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
                zIndex: total - Math.abs(offset),
              }}
            >
              <ProjectCard {...project} />
            </div>
          );
        })}
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
