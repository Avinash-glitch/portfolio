import { useState } from "react";
import pythonLogo from "../assets/python.svg";
import cppLogo from "../assets/cplusplus.svg";
import streamlitLogo from "../assets/streamlit.svg";
import juceLogo from "../assets/juce.svg";
import langchainLogo from "../assets/langchain.svg";
import arduinoLogo from "../assets/arduino.svg";
import htmlLogo from "../assets/html5.svg";
// import matlabLogo from "../assets/matlab.svg";
// import abletonLogo from "../assets/ableton.svg";

const techLogos = {
  python: pythonLogo,
  cpp: cppLogo,
  streamlit: streamlitLogo,
  juce: juceLogo,
  arduino: arduinoLogo,
  // gitkraken: gitkrakenLogo,
  // matlab: matlabLogo,
  // ableton: abletonLogo,
  langchain: langchainLogo,
  HTML:htmlLogo
};

function ProjectCard({ title, description, tech, link }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        backgroundColor: isHovered ? "#408537" : "#35445b",
        color: "#cbd5e1",
        boxShadow: isHovered
          ? "0 12px 30px rgba(0,0,0,0.3)"
          : "0 4px 8px rgba(167, 103, 103, 0.1)",
        cursor: "pointer",
        minHeight: "200px",
        maxHeight: "200px",
        minWidth: "300px",
        maxWidth: "300px",
        padding: "20px",
      }}
    >
      {/* Title */}
      <h3
        style={{
          fontSize: "18px",
          marginBottom: "10px",
          fontWeight: 700,
          color: isHovered ? "#362c4b" : "#e2e8f0",
        }}
      >
        {title}
      </h3>

      {/* Description with highlighted text */}
      <p style={{ marginBottom: "10px", lineHeight: 1.5, fontSize: "14px" }}>
        {description.split("**").map((part, i) =>
          i % 2 === 1 ? (
            <span
              key={i}
              style={{
                fontWeight: "700",
                color: isHovered ? "#ffe4b5" : "#fbbf24",
              }}
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>

      {/* Tech */}
      <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",  
            marginTop: "30px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {tech.map((item, index) => (
            <img
              key={index}
              src={techLogos[item]}
              alt={item}
              style={{
  
                width: "30px",
                height: "30px",
                filter: isHovered ? "invert(1)" : "invert(0)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
      </div>


      {/* Transparent "See More" overlay panel */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "40px",
          width: "100%",
          background: "linear-gradient(to left, rgba(38, 34, 34, 0.4), transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
          color: "#ffffff",
          fontWeight: 800,
          textDecoration: "none",
          opacity: isHovered ? 0.4 : 0,
          transition: "opacity 0.3s ease",
          fontSize: "11px",
          letterSpacing: "0.25px",
          fontFamily: "'Poppins', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        View Github Repo →
      </a>
    </div>
  );
}

export default ProjectCard;
