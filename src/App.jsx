import { useEffect, useRef, useState } from "react";
import { Contact } from "./components/portfolio/Contact";
import { Footer } from "./components/portfolio/Footer";
import { Hero } from "./components/portfolio/Hero";
import { Projects } from "./components/portfolio/Projects";
import { SmoothScroll } from "./components/portfolio/SmoothScroll";
import { About } from "./components/portfolio/About";
import { TopPill } from "./components/portfolio/TopPill";
import { ErrorPage } from "./components/portfolio/ErrorPage";
import { CaseStudyYoCart } from "./components/portfolio/CaseStudyYoCart";
import { CommandPalette } from "./components/portfolio/CommandPalette";
import { trackEvent, trackPageview } from "./lib/analytics";
import { navigate } from "./lib/navigation";

const HOME_TITLE = "Kinshuk Khandelwal - Software Engineer";

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
        {/* Sticky Top Navbar */}
        <header className="fixed top-5 sm:top-6 inset-x-0 z-50 flex justify-center pointer-events-none select-none">
          <div className="pointer-events-auto">
            <TopPill />
          </div>
        </header>
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
      {/* Sticky Top Navbar - 32px from top */}
      <header className="fixed top-7 sm:top-8 inset-x-0 z-50 flex justify-center pointer-events-none select-none">
        <div className="pointer-events-auto">
          <TopPill />
        </div>
      </header>

      <CommandPalette onNavigate={navigate} />
      <main className="relative min-h-screen bg-[#F4F1ED] text-[#111111] font-['Archivo',sans-serif]">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
