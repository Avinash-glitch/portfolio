import "./Skillset.css";

const categories = [
  {
    title: "AI & Agentic Systems",
    skills: ["LangChain", "Anthropic SDK", "OpenAI API", "MediaPipe", "Prompt Engineering", "RAG Pipelines", "Multi-Agent Orchestration"],
  },
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "C/C++", "Embedded C", "SQL", "VHDL", "Scala"],
  },
  {
    title: "Frameworks & Platforms",
    skills: ["React", "Flask", "Streamlit", "JUCE", "Arduino", "Vite"],
  },
  {
    title: "Product & Tooling",
    skills: ["Product Design", "System Design", "GitLab", "Jira", "Airtable", "Whimsical", "Tableau"],
  },
];

const certifications = [
  "Advanced NLP and Agentic AI",
  "Advanced C++",
  "Audio Signal Processing",
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
