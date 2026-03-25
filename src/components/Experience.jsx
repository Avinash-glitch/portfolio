import { useState } from "react";
import "./Experience.css";
import experience from "../data/experience";

function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = experience[activeIdx];

  const detailPoints = active.details
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^(->|→|•)\s*/, ""));

  return (
    <section id="experience" style={{ marginTop: "100px" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "60px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 700,
            color: "#ccd6f6",
            whiteSpace: "nowrap",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span style={{ color: "#f0c674", fontFamily: "monospace", fontSize: "20px", marginRight: "10px" }}>
            04.
          </span>
          Work Experience
        </h2>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", flex: 1 }} />
      </div>

      {/* Tabbed layout */}
      <div className="exp-container">
        {/* Tab list (left side) */}
        <div className="exp-tabs" role="tablist">
          {/* Sliding highlight */}
          <div
            className="exp-tab-highlight"
            style={{ transform: `translateY(${activeIdx * 48}px)` }}
          />
          {experience.map((exp, idx) => (
            <button
              key={exp.id}
              role="tab"
              aria-selected={idx === activeIdx}
              className={`exp-tab ${idx === activeIdx ? "exp-tab--active" : ""}`}
              onClick={() => setActiveIdx(idx)}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Content panel (right side) */}
        <div className="exp-panel" role="tabpanel" key={active.id}>
          <h3 className="exp-role">
            {active.role}
            <span className="exp-company-inline"> @ {active.company}</span>
          </h3>
          <p className="exp-duration">{active.duration}</p>
          <ul className="exp-details">
            {detailPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Experience;
