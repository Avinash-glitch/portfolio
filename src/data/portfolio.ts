export type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string | null;
  featured?: boolean;
  signal?: string; // tagline like "DSP · C++ · JUCE"
};

export const projects: Project[] = [
  {
    title: "SoundMap",
    description: "Your Spotify library, mapped by the people who actually listen with you. Tracks are positioned by playlist co-occurrence — songs that share playlists sit closer — and BYOK AI names the regions and curates from natural-language prompts.",
    tech: ["Python", "FastAPI", "Co-occurrence", "BYOK AI", "Canvas"],
    link: "https://github.com/Avinash-glitch/SoundMap",
    featured: true,
    signal: "SOCIAL · MUSIC VIS",
  },
  {
    title: "Multi-band Compressor",
    description: "Professional-grade VST/AU plugin built in JUCE. Linkwitz-Riley filters split the spectrum into independent bands with per-band dynamics, gain staging, and a custom GUI.",
    tech: ["C++", "JUCE", "DSP"],
    link: "https://github.com/Avinash-glitch/multiBandCompressor_Mixer",
    featured: true,
    signal: "AUDIO PLUGIN · DSP",
  },
  {
    title: "Embedded Foot Pressure Monitor",
    description: "64-sensor FSR array driven by dual Arduino Mega 2560s with Python-based realtime visualisation. Used for gait research and biomechanics analysis.",
    tech: ["Arduino", "Embedded C", "Python"],
    link: "https://github.com/Avinash-glitch/Array-sensor-using-Arduino-mega-2560.git",
    signal: "EMBEDDED · SENSOR FUSION",
  },
  {
    title: "Gait Analysis",
    description: "Realtime gait pattern classification using embedded pressure sensors and signal processing. Detects walking biomechanics and surface anomalies on-device.",
    tech: ["Python", "Signal Processing", "Arduino"],
    link: null,
    signal: "ML · BIOMECHANICS",
  },
  {
    title: "Shift Sense",
    description: "Algorithmic shift-scheduling tool on Streamlit. Constraint-solving across teams with per-employee preference weighting and conflict resolution.",
    tech: ["Python", "Streamlit", "Optimization"],
    link: "https://github.com/Avinash-glitch/shiftSense",
    signal: "OPTIMIZATION · WEB APP",
  },
  {
    title: "Battleships",
    description: "Fully playable Battleships in Python with turn-based logic, Tkinter grid interaction and an AI opponent that learns hit clustering patterns.",
    tech: ["Python", "Tkinter", "Game AI"],
    link: "https://github.com/Avinash-glitch/Battleships.git",
    signal: "GAME · AI",
  },
];

export type Experience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  details: string[];
};

export const experiences: Experience[] = [
  {
    id: "amazon",
    company: "Amazon",
    role: "Software Development Engineer — Transportation",
    duration: "Sept 2025 — March 2026",
    details: [
      "Designed and shipped a Python + Streamlit rota generation app that auto-allocates staff to daily tasks based on schedules, holidays and ops requirements — now used live by the team.",
      "Improved workforce planning efficiency by 50% and team productivity by 40% via fair rotation logic.",
      "Built internal browser-extension tooling in JavaScript to automate repetitive workflows, cutting manual effort and lifting pipeline efficiency by 29%.",
    ],
  },
  {
    id: "uob",
    company: "University of Birmingham",
    role: "Research Assistant",
    duration: "Nov 2023 — March 2024",
    details: [
      "Architected a distributed embedded sensing system using dual Arduino Mega 2560s in master–slave configuration to synchronously acquire data from a 64-sensor FSR pressure array.",
      "Designed a deterministic I2C inter-board protocol and a Python pipeline for real-time frame reconstruction, nonlinear resistance-to-pressure calibration and dynamic pressure-map visualisation.",
      "Implemented signal smoothing and anomaly detection to identify sustained pressure asymmetry patterns linked to early Charcot pathology.",
      "Worked with clinical and academic teams to translate raw sensor data into medically interpretable metrics for an in-progress research paper.",
    ],
  },
  {
    id: "swar",
    company: "Swar Systems",
    role: "Audio Software Developer",
    duration: "Sept 2022 — Sept 2023",
    details: [
      "Engineered physical-modelling synthesis algorithms in C++/JUCE for bow-stringed classical instruments, targeting stable low-latency real-time performance.",
      "Implemented advanced DSP — circular buffering, fractional delay lines, interpolation, parameter smoothing, non-linear mapping — with atomic variables and explicit memory management for real-time safety.",
      "Mapped bow pressure, velocity and position to excitation/resonance parameters with curve fitting and time-varying control models, lifting perceived sound quality by ~80%.",
    ],
  },
  {
    id: "haarty",
    company: "Haarty Hanks",
    role: "Project Manager",
    duration: "Feb 2021 — July 2023",
    details: [
      "Owned end-to-end product delivery for UK pharmaceutical, food industry and e-commerce clients — wrote product specs and coordinated cross-functional teams.",
      "Liaised with developers and designers on workflows, UX and architecture using Node.js, HTML/CSS and the Magento e-commerce platform.",
      "Delivered Stripe and PayPal integrations and shipped features through stakeholder approval and iterative cycles.",
    ],
  },
  {
    id: "graymatics",
    company: "Graymatics",
    role: "Algorithm Engineer Intern",
    duration: "Feb 2021 — July 2023",
    details: [
      "Designed an event-detection algorithm using Mel-Spectrograms and ML (SVM, Random Forest, CNN, RNN) to localise suspicious sounds — gunshots, glass shattering — in real time.",
      "Integrated the system with a CCTV network so cameras automatically rotate toward detected sound sources, demonstrating end-to-end multimedia system integration.",
    ],
  },
  {
    id: "reliance",
    company: "Reliance Industries",
    role: "R&D Electronic Engineer Intern",
    duration: "Jun 2018 — Dec 2018",
    details: [
      "Built SMART NB-IoT devices around the BC95 module (inbuilt PIC microcontroller) wired to a range of sensors per use case.",
      "Programmed the MCU in Embedded C to drive interrupts, issue AT commands and publish sensor data to the platform over MQTT.",
      "Ran extensive validation cycles to ensure consistent device-to-platform-to-mobile data delivery.",
    ],
  },
];

export const skillCategories = [
  {
    title: "AI & Agentic Systems",
    band: "HF",
    skills: ["Anthropic SDK", "OpenAI API", "LangChain", "RAG Pipelines", "Multi-Agent Orchestration", "MediaPipe", "Prompt Engineering"],
  },
  {
    title: "Languages",
    band: "MID",
    skills: ["Python", "C++", "JavaScript", "TypeScript", "Embedded C", "SQL", "VHDL", "Scala"],
  },
  {
    title: "Frameworks & Platforms",
    band: "LOW",
    skills: ["React", "Vite", "Flask", "Streamlit", "JUCE", "Arduino", "Node"],
  },
  {
    title: "Product & Tooling",
    band: "SUB",
    skills: ["Product Design", "System Design", "GitLab", "Jira", "Airtable", "Whimsical", "Tableau"],
  },
];

export const certifications = [
  "Advanced NLP and Agentic AI",
  "Advanced C++",
  "Audio Signal Processing",
];

export const hobbies = [
  { name: "Drumming", icon: "Drum" },
  { name: "Football", icon: "Goal" },
  { name: "Audio Tech", icon: "AudioWaveform" },
  { name: "Astrophysics", icon: "Telescope" },
] as const;
