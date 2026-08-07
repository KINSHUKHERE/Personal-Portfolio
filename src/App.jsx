import { useEffect, useRef, useState } from "react";
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
import { CaseStudyYoCart } from "./components/portfolio/CaseStudyYoCart";
import { CommandPalette } from "./components/portfolio/CommandPalette";
import { trackEvent, trackPageview } from "./lib/analytics";
import { navigate } from "./lib/navigation";

const HOME_TITLE = "Kinshuk Khandelwal - MERN Stack Developer";

// Client-side routes served off index.html (see netlify.toml). Titles live here
// so a child page can't race the parent's title effect.
const ROUTES = {
  "/case-study/yocart": {
    title: "YoCart Case Study - Kinshuk Khandelwal",
    render: (goHome) => <CaseStudyYoCart onBack={goHome} />,
  },
};

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const route = ROUTES[currentPath.replace(/\/$/, "")] ?? null;
  useDocumentTitle(route ? route.title : HOME_TITLE);

  // The initial page_view is sent by initAnalytics(); this only reports the
  // client-side path changes that follow (e.g. landing on / leaving the 404).
  const isFirstPath = useRef(true);
  useEffect(() => {
    const isKnown = currentPath === "/" || ROUTES[currentPath.replace(/\/$/, "")];

    if (isFirstPath.current) {
      isFirstPath.current = false;
    } else {
      trackPageview(currentPath);
    }

    if (!isKnown) trackEvent("page_not_found", { page_path: currentPath });
  }, [currentPath]);

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

  const goHome = () => navigate("/");

  if (route) {
    return (
      <>
        <Backdrop />
        <CommandPalette onNavigate={navigate} />
        {route.render(goHome)}
        <Footer />
      </>
    );
  }

  if (currentPath !== "/") {
    return <ErrorPage type="404" onHome={goHome} />;
  }

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Backdrop />
      <Nav />
      <CommandPalette onNavigate={navigate} />
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
