import { useEffect } from "react";
import { Backdrop } from "./components/portfolio/Backdrop";
import { Contact } from "./components/portfolio/Contact";
import { Education } from "./components/portfolio/Education";
import { Experience } from "./components/portfolio/Experience";
import { Footer } from "./components/portfolio/Footer";
import { Hero } from "./components/portfolio/Hero";
import { Marquee } from "./components/portfolio/Marquee";
import { Nav } from "./components/portfolio/Nav";
import { PerspectiveStage } from "./components/portfolio/PerspectiveStage";
import { Projects } from "./components/portfolio/Projects";
import { ScrollProgress } from "./components/portfolio/ScrollProgress";
import { Skills } from "./components/portfolio/Skills";
import { SmoothScroll } from "./components/portfolio/SmoothScroll";
import { About } from "./components/portfolio/About";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default function App() {
  useDocumentTitle("Kinshuk Khandelwal - MERN Stack Developer");

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Backdrop />
      <Nav />
      <main className="relative min-h-screen">
        <Hero />
        <PerspectiveStage max={3}>
          <About />
          <Experience />
        </PerspectiveStage>
        <Marquee />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
