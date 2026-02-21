import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import profilePic from "./assets/profile.jpeg";
import Skillset from './components/Skillset';


function App() {
  return (

    <div style={{
      backgroundColor: "var(--bg-main)",
      minHeight: "100vh",
      color: "var(--text-main)",
      padding: "40px"
    }}>

      <Hero />
      <Projects />
      <Experience />
      
      <Skillset />
    </div>
  );
}

export default App;

