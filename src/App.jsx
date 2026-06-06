import { useEffect, useState } from "react";
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
import { ErrorPage } from "./components/portfolio/ErrorPage";
import { Faq } from "./components/portfolio/Faq";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default function App() {
  useDocumentTitle("Kinshuk Khandelwal - MERN Stack Developer");

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    const interval = setInterval(() => {
      if (window.location.pathname !== currentPath) {
        setCurrentPath(window.location.pathname);
      }
    }, 1000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("popstate", handlePopState);
      clearInterval(interval);
    };
  }, [currentPath]);

  if (isOffline) {
    return (
      <ErrorPage
        type="offline"
        onRetry={() => {
          setIsOffline(!navigator.onLine);
          if (navigator.onLine) {
            window.location.reload();
          }
        }}
      />
    );
  }

  if (currentPath !== "/") {
    return (
      <ErrorPage
        type="404"
        onHome={() => {
          window.history.pushState({}, "", "/");
          setCurrentPath("/");
        }}
      />
    );
  }

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
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
