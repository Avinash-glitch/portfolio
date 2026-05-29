import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import CaseStudy from "@/components/CaseStudy";
import TinnitusSpotlight from "@/components/TinnitusSpotlight";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import SideNav from "@/components/SideNav";

const Index = () => {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="container max-w-6xl">
        <Hero />
        <Projects />
        <CaseStudy />
        <TinnitusSpotlight />
        <Experience />
        <Skills />
        <Contact />
      </div>
    </main>
  );
};

export default Index;
