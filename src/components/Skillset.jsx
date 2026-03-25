import "./Skillset.css";

const categories = [
  {
    title: "Languages",
    skills: ["Python", "C/C++", "Embedded C", "C#", "VHDL", "Scala", "SQL", "JavaScript"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "JUCE", "Streamlit", "Langchain", "Arduino", "Unity"],
  },
  {
    title: "Tools & Platforms",
    skills: ["GitLab", "Jira", "Airtable", "MATLAB", "LabVIEW", "Vivado", "Tableau", "Ableton", "Whimsical"],
  },
  {
    title: "Domains",
    skills: ["Signal Processing", "Machine Learning", "NLP & Agentic AI", "Embedded Systems", "Audio DSP", "UML & System Design"],
  },
];

const certifications = [
  "Advanced C++",
  "Audio Signal Processing",
  "Advanced NLP and Agentic AI",
];

const hobbies = [
  { name: "Drumming", emoji: "🥁" },
  { name: "Football", emoji: "⚽" },
  { name: "Audio Tech", emoji: "🎧" },
  { name: "Astrophysics", emoji: "🔭" },
];

export default function Skillset() {
  return (
    <section id="skills" className="skills-section">
      {/* Section header */}
      <div className="skills-header">
        <h2>
          <span className="skills-number">05.</span>
          My Skill Stack
        </h2>
        <div className="skills-header-line" />
      </div>

      {/* Skill categories */}
      <div className="skills-grid">
        {categories.map((cat) => (
          <div key={cat.title} className="skills-category">
            <h3 className="skills-category-title">{cat.title}</h3>
            <div className="skills-tags">
              {cat.skills.map((skill) => (
                <span key={skill} className="skills-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="skills-category" style={{ marginTop: "40px" }}>
        <h3 className="skills-category-title">Certifications</h3>
        <div className="skills-tags">
          {certifications.map((cert) => (
            <span key={cert} className="skills-tag skills-tag--cert">{cert}</span>
          ))}
        </div>
      </div>

      {/* Hobbies */}
      <div className="skills-category" style={{ marginTop: "40px" }}>
        <h3 className="skills-category-title">When I'm Not Coding</h3>
        <div className="skills-tags">
          {hobbies.map((h) => (
            <span key={h.name} className="skills-tag skills-tag--hobby">
              <span className="skills-hobby-emoji">{h.emoji}</span>
              {h.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
