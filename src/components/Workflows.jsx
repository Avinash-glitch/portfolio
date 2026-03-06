import "./Workflows.css";
import { useEffect, useRef, useState } from "react";
import auditSoftwareWorkflow from "../assets/Energie audit software workflow.png";
import bibleNotesWorkflow from "../assets/features.png";
import combinationLockWorkflow from "../assets/combination_lock.png";
const workflows = [
  {
    id: "wf-1",
    title: "Audit Software Onboarding",
    link: "https://whimsical.com/energie-audit-software-workflow-BWaBhtRVrGkLpDf6eMob2B@or4CdLRbgroXQ6UrLkwJCY8ZNFwZW79nQdsE8DbiK",
    description: "The energy audit software workflow starts when a sales partner receives a lead and the customer completes registration and uploads required documents. A P1 employee performs a quality check on the contract; if issues are found, the sales partner coordinates corrections with the customer. Once approved, a P2 employee assigns an engineer to the case. The subsidy application is then submitted either by the engineer or by a P3 employee. The system tracks the government application status, alerts the sales partner if it’s rejected, and updates the customer once confirmation is received. After approval, the engineer books and completes the inspection before the deadline, submits the inspection report, and all relevant parties are notified of completion.",
    screenshot:
      auditSoftwareWorkflow,
  },
  {
    id: "wf-2",
    title: "Note Taking App User flow",
    link: "https://whimsical.com/features-5GBjW3Qnr2RV67kZA1GrqB",
    description: "A powerful, verse-centric Bible study platform designed to help you capture insights, organize thoughts, and reflect deeply. Users can create Notes, Cards, and SOAP studies directly from Bible verses, with automatic verse linking and optional timestamps from audio recordings. Content can be tagged by Preacher, grouped into Notebooks, and easily searched across the app.The Bible reader supports multiple translations, highlights, and quick actions—letting users create notes or studies without breaking their reading flow. Built-in audio tools, guided reflection questions, and export options make it easy to study, reflect, and share insights anytime.",
    screenshot:
      bibleNotesWorkflow,
  },
  {
    id: "wf-3",
    title: "FPGA Combination Lock",
    link: "https://whimsical.com/combination-lock-7FMzW3GpPq2eRbLeT8RnX7",
    description: `The FPGA Combination Lock is a digital access control system implemented on an FPGA using hardware description logic and a Finite State Machine (FSM) architecture. The purpose of the system is to simulate a secure electronic lock that allows a user to unlock, change, or reset a PIN through controlled input mechanisms.

The lock operates using toggle switches and push buttons on the FPGA development board. The user enters a four-digit PIN sequentially using the toggle switches, and each digit is confirmed using a push button input (BTNC). The system verifies the digits one at a time through dedicated states such as Check 1st Digit, Check 2nd Digit, Check 3rd Digit, and Check 4th Digit. If each digit matches the stored PIN value, the system progresses to the next validation state. If any digit is incorrect, the system transitions to a Wrong PIN/Error state, and the lock remains secured.

The system provides user feedback through display messages such as LOCK, UNLOCK, SET PIN, CHANGE PIN, RESET, ERROR, and SUCCESS. These messages guide the user through the interaction process and indicate the system’s current state.`,
      screenshot:combinationLockWorkflow,
  },

];

const renderAnimatedDescription = (description) =>
  description.split(" ").map((word, index) => (
    <span key={`${word}-${index}`} className="workflow-word" style={{ animationDelay: `${index * 55}ms` }}>
      {word}
    </span>
  ));

function Workflows() {
  const [openInfoCardId, setOpenInfoCardId] = useState(null);
  const openCardRef = useRef(null);

  const toggleInfo = (id) => {
    setOpenInfoCardId((currentId) => (currentId === id ? null : id));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!openInfoCardId || !openCardRef.current) {
        return;
      }

      if (!openCardRef.current.contains(event.target)) {
        setOpenInfoCardId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openInfoCardId]);

  return (
    <section id="workflows" style={{ marginTop: "80px" }}>
      <h2 style={{ textAlign: "center", fontSize: "38px", marginBottom: "12px" }}>
        Workflows
      </h2>
      <div className="workflow-masonry">
        {workflows.map((item, index) => (
          <article
            key={item.id}
            ref={openInfoCardId === item.id ? openCardRef : null}
            className={`workflow-card ${openInfoCardId === item.id ? "is-info-open" : ""}`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="workflow-hover-layer" aria-hidden="true">
              <button
                type="button"
                className="workflow-hover-action workflow-hover-info"
                onClick={() => toggleInfo(item.id)}
              >
                Info
              </button>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="workflow-hover-action workflow-hover-view"
              >
                View Workflow
              </a>
            </div>

            {openInfoCardId === item.id ? (
              <div className="workflow-body">
                <div className="workflow-info-panel" role="region" aria-label={`${item.title} details`}>
                  <button type="button" className="workflow-info-cancel" onClick={() => setOpenInfoCardId(null)}>
                    Cancel
                  </button>
                  <p>{renderAnimatedDescription(item.description)}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="workflow-image-wrap">
                  <img src={item.screenshot} alt={`${item.title} screenshot`} className="workflow-image" />
                </div>

                <div className="workflow-body">
                  <h3>{item.title}</h3>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workflows;
