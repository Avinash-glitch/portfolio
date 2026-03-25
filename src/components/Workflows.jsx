import "./Workflows.css";
import auditSoftwareWorkflow from "../assets/Energie audit software workflow.png";
import bibleNotesWorkflow from "../assets/Features.png";
import combinationLockWorkflow from "../assets/combination_lock.png";

const workflows = [
  {
    id: "wf-1",
    title: "Audit Software Onboarding",
    link: "https://whimsical.com/energie-audit-software-workflow-BWaBhtRVrGkLpDf6eMob2B@or4CdLRbgroXQ6UrLkwJCY8ZNFwZW79nQdsE8DbiK",
    description:
      "End-to-end onboarding workflow for an energy audit platform — from lead intake and document upload through contract QA, engineer assignment, subsidy application tracking, and final inspection reporting.",
    tags: ["Whimsical", "Product Design", "Process Mapping"],
    screenshot: auditSoftwareWorkflow,
  },
  {
    id: "wf-2",
    title: "Note Taking App User Flow",
    link: "https://whimsical.com/features-5GBjW3Qnr2RV67kZA1GrqB",
    description:
      "User flow for a verse-centric Bible study app — covering note creation, SOAP studies, audio timestamps, preacher tagging, multi-translation reading, and content export.",
    tags: ["Whimsical", "UX Flow", "Mobile App"],
    screenshot: bibleNotesWorkflow,
  },
  {
    id: "wf-3",
    title: "FPGA Combination Lock FSM",
    link: "https://whimsical.com/combination-lock-7FMzW3GpPq2eRbLeT8RnX7",
    description:
      "Finite State Machine design for a digital combination lock on FPGA — sequential PIN verification, change/reset flows, and user feedback states mapped across hardware I/O.",
    tags: ["Whimsical", "FPGA", "State Machine"],
    screenshot: combinationLockWorkflow,
  },
];

function Workflows() {
  return (
    <section id="workflows" style={{ marginTop: "80px" }}>
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
            03.
          </span>
          Workflows
        </h2>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", flex: 1 }} />
      </div>

      {/* Workflow rows */}
      <div className="workflow-list">
        {workflows.map((item, index) => (
          <div key={item.id} className={`workflow-row ${index % 2 === 1 ? "workflow-row--reverse" : ""}`}>
            {/* Screenshot */}
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="workflow-image-link"
            >
              <div className="workflow-image-container">
                <img src={item.screenshot} alt={`${item.title} diagram`} className="workflow-image" />
                <div className="workflow-image-overlay" />
              </div>
            </a>

            {/* Text content */}
            <div className={`workflow-content ${index % 2 === 1 ? "workflow-content--left" : ""}`}>
              <p className="workflow-overline">Case Study</p>
              <h3 className="workflow-title">{item.title}</h3>
              <div className="workflow-desc-card">
                <p>{item.description}</p>
              </div>
              <div className="workflow-tags">
                {item.tags.map((tag, i) => (
                  <span key={i} className="workflow-tag">{tag}</span>
                ))}
              </div>
              <a href={item.link} target="_blank" rel="noreferrer" className="workflow-link">
                View Workflow
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workflows;
