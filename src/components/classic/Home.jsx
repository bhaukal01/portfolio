import ClassicNavbar from "./sections/ClassicNavbar";
import Hero from "./sections/Hero";
import QuickFacts from "./sections/QuickFacts";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import Work from "./sections/pastWork.jsx";

export default function ClassicHome() {
  return (
    <div className="min-h-[calc(100vh-44px)]">
      <ClassicNavbar />
      <Hero />
      <QuickFacts />
      <Skills />
      <Work />
      {/* <Education /> */}
      {/* <Certifications /> */}
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
