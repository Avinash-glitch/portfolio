import "./ExperienceCard.css";

import { useState } from "react";

function ExperienceCard({ company, role, duration, details }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const detailPoints = details
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^(->|•|â€¢)\s*/, ""));

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        width: "300px",
        height: "400px",
        perspective: "1000px",
        cursor: "pointer",
      }}
    >
      <div
        className="experience-card"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transformOrigin: "center",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="experience-card"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backfaceVisibility: "hidden",
            backgroundColor: "#464646",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <h3 className="company">{company}</h3>
          <p className="role">{role}</p>
          <p className="duration">{duration}</p>
        </div>

        <div
          className="experience-card"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            backfaceVisibility: "hidden",
            backgroundColor: "#878241",
            padding: "20px",
            borderRadius: "20px",
            top: 0,
            left: 0,
            transform: "rotateY(180deg)",
            overflowY: "auto",
          }}
        >
          <ul className="details-list">
            {detailPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
