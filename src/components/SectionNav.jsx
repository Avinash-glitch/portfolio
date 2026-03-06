import { useEffect, useState } from "react";
import "./SectionNav.css";

const links = [
  { id: "hero", label: "Introduction" },
  { id: "projects", label: "Projects" },
  { id: "workflows", label: "Workflows" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
];

function SectionNav() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const updateActive = () => {
      const marker = window.innerHeight * 0.35;
      let currentId = sections[0].id;

      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= marker) currentId = section.id;
      }

      setActiveId(currentId);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <nav className="section-nav" aria-label="Section navigation">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`section-nav__link ${activeId === link.id ? "is-active" : ""}`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export default SectionNav;


