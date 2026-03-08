import { useEffect, useState } from "react";
import profilePic from "../assets/profile.jpeg";
import phoneIcon from "../assets/linphone.svg";
import gmailIcon from "../assets/gmail.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";
import "./Hero.css";

// Make sure to import these fonts in index.html or via @import in CSS:
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">

function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      id="hero"
      style={{
        padding: "100px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}
    >
      {/* Left Content */}
      <div style={{ maxWidth: "600px", minWidth: 0 }}>
        <h1
          style={{
            fontSize: "46px",
            marginBottom: "16px",
            color: "var(--text-main)",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            whiteSpace: isMobile ? "normal" : "nowrap",
          }}
        >
          AVINASH KANNAN
        </h1>

        <h2
          style={{
            fontSize: "20px",
            marginBottom: "24px",
            color: "#a4b49a",
            fontWeight: 500,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Software Engineer | Music Enthusiast | Product Builder
        </h2>

        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.6",
            color: "#70bd41",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
          }}
        >
          A curious engineer with a knack for coding and project management,
          passionate about music and technology, and driven to build products
          that make people just a little lazier by turning complex systems into
          simple, intuitive experiences.
        </p>

        <div
          className="hero-contact-icons"
        >
          <a
            href="tel:+447767926439"
            aria-label="Call phone number"
            className="hero-contact-link"
            data-tooltip="Call: +44 7767926439"
          >
            <img src={phoneIcon} alt="Phone" className="hero-contact-icon" />
          </a>
          <a
            href="mailto:Kannan.avinash.ak@gmail.com"
            aria-label="Send email"
            className="hero-contact-link"
            data-tooltip="Email: Kannan.avinash.ak@gmail.com"
          >
            <img src={gmailIcon} alt="Email" className="hero-contact-icon" />
          </a>
          <a
            href="https://github.com/Avinash-glitch"
            target="_blank"
            rel="noreferrer"
            aria-label="Open GitHub profile"
            className="hero-contact-link"
            data-tooltip="GitHub: Avinash-glitch"
          >
            <img src={githubIcon} alt="GitHub" className="hero-contact-icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/avinash-kannan/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open LinkedIn profile"
            className="hero-contact-link"
            data-tooltip="LinkedIn: avinash-kannan"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="hero-contact-icon" />
          </a>
        </div>
      </div>

      {/* Profile Image */}
      <div>
        <img
          src={profilePic}
          alt="Avikann"
          style={{
            width: isMobile ? "min(92vw, 500px)" : "500px",
            height: isMobile ? "auto" : "600px",
            objectFit: "cover",
            border: "40px #18273b transparent solid",
            boxShadow: "0 0 1000px rgba(62, 104, 171, 0.25)",
          }}
        />
      </div>
    </section>
  );
}

export default Hero;
