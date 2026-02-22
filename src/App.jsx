import './App.css'
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skillset from './components/Skillset';


function App() {
  return (

    <div style={{
      backgroundColor: "var(--bg-main)",
      minHeight: "100vh",
      color: "var(--text-main)",
      padding: "clamp(10px, 3.5vw, 40px)"
    }}>

      <Hero />
      <Projects />
      <Experience />
      
      <Skillset />
    </div>
  );
}

export default App;

