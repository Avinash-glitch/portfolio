import profilePic from "../assets/profile.jpeg";

// Make sure to import these fonts in index.html or via @import in CSS:
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">

function Hero() {
  return (
    <section
      style={{
        padding: "100px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
        flexWrap: "wrap",
      }}
    >
      {/* Left Content */}
      <div style={{ maxWidth: "600px" }}>
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "16px",
            color: "var(--text-main)",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
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
      </div>

      {/* Profile Image */}
      <div>
        <img
          src={profilePic}
          alt="Avikann"
          style={{
            width: "500px",
            height: "600px",
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
