import { useState } from "react";

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#f0c674" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

function ProjectCard({ title, description, tech, link }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#1e2d40",
        borderRadius: "8px",
        padding: "24px 24px 20px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        transform: isHovered ? "translateY(-7px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 24px 48px rgba(0,0,0,0.45)"
          : "0 4px 16px rgba(0,0,0,0.25)",
        borderColor: isHovered ? "rgba(100,181,246,0.3)" : "rgba(255,255,255,0.08)",
        cursor: "default",
        width: "260px",
        minHeight: "250px",
      }}
    >
      {/* Top row: folder + link */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <FolderIcon />
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: isHovered ? "#64b5f6" : "#5a6a82",
              transition: "color 0.2s ease",
              display: "flex",
              padding: "4px",
            }}
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${title} on GitHub`}
          >
            <ExternalLinkIcon />
          </a>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          margin: "0 0 12px",
          fontSize: "19px",
          fontWeight: 600,
          color: isHovered ? "#64b5f6" : "#ccd6f6",
          transition: "color 0.2s ease",
          lineHeight: 1.3,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#7a8ba5",
          flex: 1,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {description}
      </p>

      {/* Tech tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          marginTop: "24px",
        }}
      >
        {tech.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Poppins', monospace",
              fontSize: "12px",
              color: "#5a7a9a",
              letterSpacing: "0.5px",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
