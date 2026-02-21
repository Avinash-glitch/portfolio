import "./ExperienceCard.css";

import { useState } from "react";

function ExperienceCard({ company, role, duration, details }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div

      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        width: "300px",
        height: "400px",
        perspective: "1000px",

        cursor: "pointer"
      }}
    >
      <div  className="experience-card"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          
          transformOrigin: "center", 
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front Side */}
        {/* Front Side */}
        <div
          className="experience-card"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            backfaceVisibility: "hidden",
            backgroundColor: "#464646",
            padding: "20px",
            borderRadius: "20px"
          }}
        >
          <h3 className="company">{company}</h3>
          <p className="role">{role}</p>
          <p className="duration">{duration}</p>
        </div>


        {/* Back Side */}
       <div
          className="experience-card"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            backgroundColor: "#878241",
            padding: "20px",
            borderRadius: "20px",
            top: 0,
            left: 0,
            transform: "rotateY(180deg)"
          }}
        >
          <p className="details">{details}</p>
        </div>

      </div>
    </div>
  );
}

export default ExperienceCard;
