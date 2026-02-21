import pythonLogo from "../assets/python.svg" ;
import cppLogo from "../assets/cplusplus.svg";
import streamlitLogo from "../assets/streamlit.svg";
import juceLogo from "../assets/juce.svg";
import langchainLogo from "../assets/langchain.svg";
import arduinoLogo from "../assets/arduino.svg";
import SQLogo from "../assets/mysql.svg";
import scalaLogo from "../assets/scala.svg";
// import matlabLogo from "../assets/matlab.svg";
// import abletonLogo from "../assets/ableton.svg";
import jiraLogo from "../assets/jira.svg";
import labviewLogo from "../assets/labview.svg";
import umlLogo from "../assets/uml.svg";
import airtableLogo from "../assets/airtable.svg";
import gitlabLogo from "../assets/gitlab.svg";

import { useEffect, useRef, useState } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const sections = [
  {
    id: "technical",
    heading: "Technical Skills",
    items: [
      { id: 1, name: "Python",           logo: pythonLogo, level: 5 },
      { id: 2, name: "C/C++",          logo: cppLogo,    level: 4 },
      { id: 3, name: "Embedded C",       logo: null,       level: 4 },
      { id: 4, name: "C#",               logo: null,       level: 3 },
      { id: 5, name: "VHDL",             logo: null,       level: 3 },
      { id: 6, name: "SQL",              logo: SQLogo,       level: 4 },
      { id: 7, name: "Scala",            logo: scalaLogo,       level: 3 },
      { id: 8, name: "Signal Processing",logo: null,       level: 4 },
      { id: 9, name: "Machine Learning", logo: null,       level: 4 },
      { id: 10, name: "GitLab",   logo: gitlabLogo,          level: 5 },
    ],
  },
  {
    id: "softwares",
    heading: "Softwares & Frameworks",
    items: [
      { id: 1,  name: "MATLAB",    logo: null,          level: 4 },
      { id: 2,  name: "JUCE",      logo: juceLogo,      level: 5 },
      { id: 3,  name: "Langchain", logo: langchainLogo, level: 4 },
      { id: 4,  name: "Streamlit", logo: streamlitLogo, level: 4 },
      { id: 5,  name: "Unity",     logo: null,          level: 3 },
      { id: 6,  name: "Vivado",    logo: null,          level: 3 },
      { id: 7,  name: "Arduino",   logo: arduinoLogo,   level: 4 },
      { id: 8,  name: "Jira",      logo: jiraLogo,          level: 4 },
      { id: 9,  name: "Tableau",   logo: null,          level: 3 },
      { id: 10, name: "Ableton",   logo: null,          level: 5 },
      { id: 11, name: "Labview",   logo: labviewLogo,          level: 5 },
      { id: 12, name: "UML",   logo: umlLogo,          level: 5 },
      { id: 13, name: "Airtable",   logo: airtableLogo,          level: 5 },
    ],
  },
  {
    id: "certifications",
    heading: "Certifications",
    isCerts: true,
    items: [
      { id: 1, title: "Advanced C++",                  issuer: "Issued Certificate" },
      { id: 2, title: "Audio Signal Processing",       issuer: "Issued Certificate" },
      { id: 3, title: "Advanced NLP and Agentic AI",   issuer: "Issued Certificate" },
    ],
  },
  {
    id: "hobbies",
    heading: "Hobbies",
    isHobbies: true,
    items: [
      { id: 1, name: "Drumming",    emoji: "🥁" },
      { id: 2, name: "Football",    emoji: "⚽" },
      { id: 3, name: "Audio Tech",  emoji: "🎧" },
      { id: 4, name: "Astrophysics",emoji: "🔭" },
    ],
  },
];

const TOTAL_CIRCLES = 5;
const LETTERS = ["S", "K", "I", "L", "L", "S"];

/* ─── SKILL CIRCLES ─────────────────────────────────────────────────── */
function SkillCircles({ level, animate }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!animate) { setFilled(0); return; }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setFilled(i);
      if (i >= level) clearInterval(iv);
    }, 140);
    return () => clearInterval(iv);
  }, [animate, level]);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {Array.from({ length: TOTAL_CIRCLES }).map((_, idx) => (
        <div
          key={idx}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: idx < filled ? "#ebd39b" : "transparent",
            border: "1.5px #b76363",
            transition: "background 0.2s",
          }}
        />
      ))}
    </div>
  );
}

/* ─── SKILL CARD ─────────────────────────────────────────────────────── */
function SkillCard({ skill }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
      {skill.logo ? (
        <img
          src={skill.logo}
          alt={skill.name}
          style={{ width: 28, height: 28, objectFit: "contain", filter: "invert(1)" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      ) : (
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: "var(--card-bg)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 9, fontWeight: 700, color: "var(--accent)", letterSpacing: 0.5,
        }}>
          {skill.name.slice(0, 4).toUpperCase()}
        </div>
      )}
      <span style={{ flex: 1, fontSize: 14 }}>{skill.name}</span>
      <SkillCircles level={skill.level} animate={inView} />
    </div>
  );
}

/* ─── CERT CARD ──────────────────────────────────────────────────────── */
function CertCard({ cert, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: "14px 18px",
        borderRadius: 10,
        background: "#836666",
        border: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 14,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.4s ${index * 0.1}s, transform 0.4s ${index * 0.1}s`,
      }}
    >
      <span style={{ fontSize: 22 }}>🏅</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{cert.title}</div>
        <div style={{ fontSize: 12, opacity: 0.6 }}>{cert.issuer}</div>
      </div>
    </div>
  );
}

/* ─── HOBBY TAG ──────────────────────────────────────────────────────── */
function HobbyTag({ hobby, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: "10px 18px",
        borderRadius: 999,
        background: "#603f3f",
        border: "1px solid var(--border)",
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: 14,
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.9)",
        transition: `opacity 0.35s ${index * 0.08}s, transform 0.35s ${index * 0.08}s`,
      }}
    >
      <span>{hobby.emoji}</span>
      <span>{hobby.name}</span>
    </div>
  );
}

/* ─── VERTICAL SECTION TITLE ─────────────────────────────────────────── */
function VerticalSectionTitle({ heading }) {
  return (
    <div
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "rotate(180deg)",
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#6ab1b37b",
        opacity: 0.55,
        userSelect: "none",
        alignSelf: "stretch",
        display: "flex",
        justifyContent: "center",
        paddingLeft: 6,
        whiteSpace: "nowrap",
        
        paddingLeft: 6,
      }}
    >
      {heading}
    </div>
  );
}

/* ─── SECTION BLOCK ──────────────────────────────────────────────────── */
function SectionBlock({ section }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "stretch", paddingBottom: 36 }}>
      {/* Main content */}
      <div style={{ flex: 1 }}>
        <h2 style={{
          fontSize: 0, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", opacity: 0.4, marginBottom: 30,
        }}>
          {section.heading}
        </h2>

        {!section.isCerts && !section.isHobbies && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {section.items.map(skill => <SkillCard key={skill.id} skill={skill} />)}
          </div>
        )}

        {section.isCerts && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {section.items.map((cert, i) => <CertCard key={cert.id} cert={cert} index={i} />)}
          </div>
        )}

        {section.isHobbies && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {section.items.map((h, i) => <HobbyTag key={h.id} hobby={h} index={i} />)}
          </div>
        )}
      </div>

      {/* Right vertical title — purely decorative, no animation */}
      <VerticalSectionTitle heading={section.heading} />
    </div>
  );
}

/* ─── VERTICAL SKILLS TRACKER ────────────────────────────────────────── */
function SkillsTracker({ contentRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
    const el = contentRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight;

    const start = winH * 0.8;  // when animation starts
    const end = -rect.height * 0.2; // when animation ends

    const progress = (start - rect.top) / (start - end);

    setProgress(Math.min(1, Math.max(0, progress)));
  };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [contentRef]);

  const litCount = Math.round(progress * LETTERS.length);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 4, position: "sticky", top: "30vh", height: "fit-content",
    }}>
      {LETTERS.map((letter, i) => {
        const lit = i < litCount;
        return (
          <span
            key={i}
            style={{
              fontSize: 35, fontWeight: 800, letterSpacing: "0.1em",
              color: lit ? "#ff4848" : "#ecc5c5",
              transition: "color 0.3s",
              userSelect: "none",
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────────── */
export default function Skillset() {
  const contentRef = useRef(null);

  return (
    <section style={{ display: "flex", gap: 12,paddingTop: 200 }}>
      {/* Page title */}
      <h1 style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "rotate(180deg)",
        fontSize: 28, fontWeight: 800, letterSpacing: "0.05em",
        alignSelf: "flex-start", marginRight: 8,
        marginTop: '200px', marginBottom: '200px',
      }}>
        {/* Skillset */}
      </h1>

      {/* Left: vertical SKILLS tracker */}
      <SkillsTracker contentRef={contentRef} />

      {/* Subtle vertical divider */}
      <div style={{ width: 1, background: "var(--border)", alignSelf: "stretch" }} />

      {/* Right: stacked sections */}
      <div ref={contentRef} style={{ flex: 1 }}>
        {sections.map(section => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}