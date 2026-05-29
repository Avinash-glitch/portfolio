import { useEffect, useState } from "react";

const links = [
  { id: "hero", label: "00", name: "Identity" },
  { id: "work", label: "01", name: "Work" },
  { id: "case-study", label: "02", name: "SoundMap" },
  { id: "tinnitus-spotlight", label: "03", name: "Tennitus" },
  { id: "experience", label: "04", name: "Timeline" },
  { id: "skills", label: "05", name: "Stack" },
  { id: "contact", label: "06", name: "Outro" },
];

const SideNav = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {links.map((l) => {
        const isActive = active === l.id;
        return (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="group flex items-center gap-3 justify-end"
            aria-label={l.name}
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-widest transition-all
                ${isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"}`}
            >
              {l.label} · {l.name}
            </span>
            <span
              className={`block h-px transition-all
                ${isActive ? "w-10 bg-primary" : "w-5 bg-muted-foreground group-hover:w-8 group-hover:bg-foreground"}`}
            />
          </a>
        );
      })}
    </nav>
  );
};

export default SideNav;
