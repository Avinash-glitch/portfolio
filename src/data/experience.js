const experience = [
  {
    id: 1,
    company: "Amazon",
    role: "Software Development Engineer for Transportation",
    duration: "Sept 2025 - Present",
    details: `
-> Designed and implemented a rota generation application in Python using Streamlit UI, automatically allocating staff to daily tasks based on schedules, holidays, and operational requirements.

-> The tool is actively used by the team to streamline workforce planning, improving efficiency by 50%.

-> Ensured fair rotation and increased productivity by 40%.

-> Built internal operational tools as browser extensions in JavaScript to optimize and automate workflows, reducing manual effort and improving pipeline efficiency by 29%.
`
  },
  {
    id: 2,
    company: "University of Birmingham",
    role: "Research Assistant",
    duration: "Nov 2023 - March 2024",
    details: `
  Architected a distributed embedded sensing system using dual Arduino Mega 2560 microcontrollers in a master–slave configuration to synchronously acquire and process data from a 64-sensor FSR pressure array.

Designed a deterministic I2C-based inter-board communication framework and developed a Python data pipeline for real-time frame reconstruction, nonlinear resistance-to-pressure calibration, and dynamic pressure map visualisation.

Implemented signal smoothing and anomaly detection algorithms to identify sustained pressure asymmetry patterns associated with early Charcot pathology.

Collaborated with clinical and academic teams to translate sensor outputs into medically interpretable metrics, contributing to an ongoing research paper documenting system architecture, calibration methodology, and preliminary findings.
`
  },
  {
    id: 3,
    company: "Swar Systems",
    role: "Audio Software Developer",
    duration: "Sept 2022 - Sept 2023",
    details: `
• Engineered physical modeling synthesis algorithms in C++ using JUCE for bow-stringed classical instruments, targeting stable, low-latency real-time audio performance.
• Implemented advanced DSP techniques including circular buffering, fractional delay lines, interpolation, parameter smoothing, and non-linear mapping, with careful use of atomic variables and explicit memory management to maintain real-time safety.
• Applied curve-fitting, envelope shaping, and time-varying control models to map bow pressure, bow velocity, and bow position to excitation and resonance parameters, significantly enhancing expressive realism and improving perceived sound quality by ~80%.
`
  },
  {
    id: 4,
    company: "Haarty Hanks",
    role: "Project Manager",
    duration: "Feb 2021 - July 2023",
    details: `
• Managed end-to-end product delivery for UK-based pharmaceutical, food industry, and e-commerce clients, creating product specifications and coordinating cross-functional teams
• Liaised with developers and designers to define workflows, user experience, and technical architecture, primarily using Node.js, HTML/CSS with Magento e-commerce platform
• Delivered payment integrations (Stripe, PayPal) and ensured seamless feature delivery through stakeholder approval processes and iterative development cycles
`
  },
  {
    id: 5,
    company: "Graymatics",
    role: "Algorithm Engineer Intern",
    duration: "Feb 2021 - July 2023",
    details: `
•Designed and implemented an Event detection algorithm using Mel-Spectrograms and Machine learning (SVM, Random Forest, CNN, RNN) to identify and localize suspicious sounds (e.g., gunshots, glass shattering) in real-time.  
•Integrated the system with a CCTV network, enabling automatic camera rotation toward detected sound sources, showcasing multimedia system integration and real-time processing capabilities.

`
  },
  {
    id: 6,
    company: "Reliance Industries Limited",
    role: "Research Development Electronic Engineer Intern",
    duration: "Jun 2018 - Dec 2018",
    details: `
-> Worked on SMART NB-IoT devices by configuring the BC95 module (with inbuilt PIC microcontroller) connected to different sensors based on use case requirements.

-> Programmed the microcontroller in Embedded C to trigger interrupts, send specific AT commands, and publish sensor readings to the platform using MQTT protocol.

-> Conducted repeated test runs and validation cycles to ensure accurate, consistent sensor data delivery from device to platform and onward to the mobile application.
`
  },
];

export default experience;
