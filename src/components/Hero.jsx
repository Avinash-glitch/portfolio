import phoneIcon from "../assets/phone.svg";
import gmailIcon from "../assets/gmail.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";
import "./Hero.css";

function Hero() {
  return (
    <section id="hero" className="hero">
      <p className="hero-greeting">Hi, my name is</p>

      <h1 className="hero-name">Avinash Kannan</h1>

      <h2 className="hero-tagline">I build things that make life simpler.</h2>

      <p className="hero-bio">
        A curious engineer with a knack for coding and project management,
        passionate about music and technology, and driven to build products
        that turn complex systems into simple, intuitive experiences.
      </p>

      <div className="hero-contact-icons">
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
    </section>
  );
}

export default Hero;
