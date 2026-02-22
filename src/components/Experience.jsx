import ExperienceCard from "./ExperienceCard";
import experience from "../data/experience";

function Experience() {
  return (
    <section style={{ padding: "0px 0px" }}>
      <h2 style={{ fontSize: "38px", marginBottom: "80px", marginTop: "100px", textAlign: "center" }}>
        Work Experience
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "100px",
          alignItems: "start",
          justifyItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {experience.map((exp) => (
          <ExperienceCard
            key={exp.id}
            company={exp.company}
            role={exp.role}
            duration={exp.duration}
            details={exp.details}
          />
        ))}
      </div>
    </section>
  );
}

export default Experience;
