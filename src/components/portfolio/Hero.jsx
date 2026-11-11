import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MetallicStar, MetallicLightning } from "./HeroAccents";
import { ResumeModal } from "./ResumeModal";
import { trackEvent } from "../../lib/analytics";

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mobileFlipped, setMobileFlipped] = useState(false);
  const sectionRef = useRef(null);

  // Automatically flip from black & white image to color image after 1 second on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileFlipped(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic layout & animation metrics to ensure pixel-perfect landing at Get Started button
  const [metrics, setMetrics] = useState(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const isMobile = vw < 640;
    const bottomGap = isMobile ? 17 : 20;
    const w1 = Math.min(Math.max(160, vw * 0.145), 245);
    const h1 = Math.min(Math.max(260, vh * 0.34), 325);
    const w2 = Math.min(Math.max(280, vw * 0.28), 440);
    const h2 = w2 * 1.25;
    const aboutTopPadding = isMobile ? 128 : vw < 1024 ? 160 : 192;
    const initialCardBottom = vh - bottomGap;
    const fallbackTargetBottom = vh + aboutTopPadding + h2;
    const deltaY = fallbackTargetBottom - initialCardBottom;
    const scrollTarget = Math.max(vh * 0.85, vh + aboutTopPadding * 0.5);
    return { vw, vh, isMobile, bottomGap, w1, h1, w2, h2, deltaY, scrollTarget };
  });

  useEffect(() => {
    const updateMetrics = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 640;
      const bottomGap = isMobile ? 17 : 20;

      const w1 = Math.min(Math.max(160, vw * 0.145), 245);
      const h1 = Math.min(Math.max(260, vh * 0.34), 325);

      let w2 = Math.min(Math.max(280, vw * 0.28), 440);
      let h2 = w2 * 1.25;

      const heroEl = sectionRef.current;
      const heroHeight = heroEl ? heroEl.offsetHeight : vh;
      const initialCardBottom = heroHeight - bottomGap;

      const slotEl = document.getElementById("about-card-target");
      const btnEl = document.getElementById("about-get-started");

      let deltaY = (isMobile ? 128 : vw < 1024 ? 160 : 192) + h2 + bottomGap;
      let scrollTarget = vh * 1.25;

      if (slotEl && heroEl) {
        const slotRect = slotEl.getBoundingClientRect();
        const heroRect = heroEl.getBoundingClientRect();
        // Slot bottom relative to Hero top (strictly invariant to scroll)
        const slotBottomFromHeroTop = slotRect.bottom - heroRect.top;
        deltaY = slotBottomFromHeroTop - initialCardBottom;
        if (slotRect.width > 0) w2 = slotRect.width;
        if (slotRect.height > 0) h2 = slotRect.height;
      }

      if (btnEl) {
        const btnRect = btnEl.getBoundingClientRect();
        const btnDocBottom = btnRect.bottom + window.scrollY;
        // Complete scroll animation right when the Get Started button becomes visible in the viewport
        scrollTarget = Math.max(vh * 0.85, btnDocBottom - vh * 0.82);
      } else {
        const aboutTopPadding = isMobile ? 128 : vw < 1024 ? 160 : 192;
        scrollTarget = Math.max(vh * 0.85, vh + aboutTopPadding * 0.5);
      }

      setMetrics({ vw, vh, isMobile, bottomGap, w1, h1, w2, h2, deltaY, scrollTarget });
    };

    updateMetrics();
    const t1 = setTimeout(updateMetrics, 100);
    const t2 = setTimeout(updateMetrics, 400);
    window.addEventListener("resize", updateMetrics);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", updateMetrics);
    };
  }, []);

  // Track global scrollY from Hero down into About
  const { scrollY } = useScroll();

  // Scroll progress normalized from 0 (top of page) to 1 (when reaching Get Started button in About)
  const scrollProgress = useTransform(scrollY, (latest) => {
    const target = metrics.scrollTarget || 1000;
    if (target <= 0) return 0;
    return Math.min(Math.max(latest / target, 0), 1);
  });

  // 3D Flip: The flip completes earlier (by p = 0.68) so the 2nd image faces forward and is easily visible while traveling down
  const rotateY = useTransform(scrollProgress, (p) => {
    const flipP = Math.min(Math.max(p / 0.68, 0), 1);
    return flipP * 180;
  });
  const rotateX = useTransform(scrollProgress, (p) => {
    const flipP = Math.min(Math.max(p / 0.68, 0), 1);
    return Math.sin(flipP * Math.PI) * 7;
  });
  const rotateZ = useTransform(scrollProgress, (p) => {
    const flipP = Math.min(Math.max(p / 0.68, 0), 1);
    return Math.sin(flipP * Math.PI) * -3;
  });

  // Downward travel: eases down promptly to keep the flipping animation positioned lower on the screen
  const y = useTransform(scrollProgress, (p) => Math.pow(p, 0.88) * metrics.deltaY);

  // Expand width and height from 1st image aspect ratio to 2nd image aspect ratio
  const width = useTransform(
    scrollProgress,
    (p) => metrics.w1 + (metrics.w2 - metrics.w1) * p
  );
  const height = useTransform(
    scrollProgress,
    (p) => metrics.h1 + (metrics.h2 - metrics.h1) * p
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative z-20 w-full min-h-[100dvh] sm:h-[100dvh] sm:min-h-[640px] overflow-x-clip overflow-y-visible bg-[#F4F1ED] text-[#111111] font-['Archivo',sans-serif] flex flex-col justify-between select-none"
    >
      {/* Subtle paper grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply z-0"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* =========================================================================
          DESKTOP HERO STAGE (sm:flex) - Preserves 100% of the original desktop design
          ========================================================================= */}
      <div className="hidden sm:flex flex-col justify-between w-full h-full flex-1">
        {/* Top spacer to ensure clear clearance below the top navbar */}
        <div className="w-full pt-20 md:pt-24" />

        {/* Main Center Stage: ASPIRING SOFTWARE ENGINEER + Star + Lightning Bolt */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto px-4 sm:px-8">
          <div className="relative flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto">
            {/* Row 0: ASPIRING */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase tracking-[0.25em] text-[#767676] mb-1 sm:mb-2 select-none text-center"
            >
              ASPIRING
            </motion.div>

            {/* Row 1: SOFTWARE with Star placed comfortably in the left margin */}
            <div className="relative inline-flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [-3, 3, -3],
                  rotate: [-8, -12, -8],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.15 },
                  scale: { duration: 0.6, delay: 0.15 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute -left-16 sm:-left-22 md:-left-26 lg:-left-32 -top-4 sm:-top-6 md:-top-8 w-[70px] sm:w-[90px] md:w-[105px] lg:w-[115px] h-[70px] sm:h-[90px] md:h-[105px] lg:h-[115px] z-30 pointer-events-none"
              >
                <MetallicStar />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(66px,11.8vw,196px)] font-black uppercase text-[#111111] leading-[0.88] tracking-[-0.045em] m-0 select-none text-center"
                style={{ fontWeight: 950 }}
              >
                SOFTWARE
              </motion.h1>
            </div>

            {/* Row 2: ENGINEER with Lightning Bolt in the right margin */}
            <div className="relative inline-flex items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(66px,11.8vw,196px)] font-black uppercase text-[#111111] leading-[0.88] tracking-[-0.045em] m-0 select-none text-center"
                style={{ fontWeight: 950 }}
              >
                ENGINEER
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [3, -3, 3],
                  rotate: [10, 14, 10],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.2 },
                  scale: { duration: 0.6, delay: 0.2 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute -right-14 sm:-right-18 md:-right-22 lg:-right-28 top-6 sm:top-8 md:top-10 w-[50px] sm:w-[65px] md:w-[75px] lg:w-[85px] h-[80px] sm:h-[105px] md:h-[120px] lg:h-[135px] z-30 pointer-events-none"
              >
                <MetallicLightning />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Desktop Footer Bar: ©2026, Tagline, Action Buttons */}
        <footer className="relative z-30 pb-[20px] px-6 sm:px-10 lg:px-14 flex items-end justify-between w-full pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="ml-2 sm:ml-6 md:ml-12 lg:ml-20 text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111111] leading-none select-none pointer-events-auto"
          >
            ©2026
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-end gap-3 sm:gap-4 pointer-events-auto"
          >
            <span className="hidden md:inline-block text-[#767676] text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase mb-2 select-none">
              /CREATING SINCE 2023
            </span>

            <div className="flex flex-col items-end gap-1.5 sm:gap-2">
              <a
                href="#projects"
                onClick={() => trackEvent("cta_click", { cta: "view_projects", location: "hero" })}
                className="px-4 py-2 sm:px-5 sm:py-2 rounded-xl bg-[#000000] text-[#ffffff] text-xs sm:text-sm font-semibold shadow-md hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-95 text-center min-w-[125px] sm:min-w-[140px]"
              >
                View Projects
              </a>

              <a
                href="#contact"
                onClick={() => trackEvent("cta_click", { cta: "contact", location: "hero" })}
                className="px-4 py-2 sm:px-5 sm:py-2 rounded-xl bg-[#000000] text-[#ffffff] text-xs sm:text-sm font-semibold shadow-md hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-95 text-center min-w-[125px] sm:min-w-[140px]"
              >
                Get in Touch
              </a>

              <button
                type="button"
                onClick={() => {
                  setResumeOpen(true);
                  trackEvent("resume_preview", { location: "hero" });
                }}
                className="px-4 py-2 sm:px-5 sm:py-2 rounded-xl bg-[#ffffff] text-[#000000] border border-black/10 text-xs sm:text-sm font-bold shadow-sm hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-95 text-center min-w-[125px] sm:min-w-[140px] cursor-pointer"
              >
                Resume ↗
              </button>
            </div>
          </motion.div>
        </footer>
      </div>

      {/* =========================================================================
          DESKTOP 3D FLIPPING CARD (sm:block) - Only active on desktop/tablet screens
          ========================================================================= */}
      <motion.div
        style={{
          y,
          width,
          height,
          perspective: 1400,
        }}
        className="hidden sm:block absolute bottom-[20px] left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none"
      >
        <motion.div
          style={{
            rotateY,
            rotateX,
            rotateZ,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full cursor-pointer group"
        >
          {/* FRONT FACE (0°): 1st Image (Hero Black & White Portrait) */}
          <div
            className="absolute inset-0 w-full h-full rounded-[20px] sm:rounded-[22px] overflow-hidden bg-black border border-black/15 shadow-[0_14px_34px_rgba(0,0,0,0.18)]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            <img
              src="/images/hero-portrait-bw.webp"
              alt="Kinshuk Khandelwal - Software Engineer"
              className="w-full h-full object-cover object-center filter contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
          </div>

          {/* BACK FACE (180°): 2nd Image (About Red Studio Portrait) */}
          <div
            className="absolute inset-0 w-full h-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#111111] border border-black/10 shadow-[0_20px_48px_rgba(0,0,0,0.28)]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <img
              src="/images/about-portrait-red.webp"
              alt="Kinshuk Khandelwal - Red Studio Portrait"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] ring-1 ring-inset ring-black/10 pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          MOBILE HERO VIEW (sm:hidden) - Clean vertical flow, no overlap, static photo
          ========================================================================= */}
      <div className="flex sm:hidden flex-col justify-between items-center w-full min-h-[100dvh] pt-24 pb-6 px-5 z-10">
        {/* Center Content: Decreased Title size + Static Photo directly underneath */}
        <div className="flex flex-col items-center justify-center my-auto w-full gap-5">
          {/* Decreased Title Size with ASPIRING prefix */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-xs xs:text-sm font-black uppercase tracking-[0.22em] text-[#767676] mb-1 select-none">
              ASPIRING
            </span>
            <h1
              className="text-[36px] xs:text-[42px] font-black uppercase text-[#111111] leading-[0.92] tracking-[-0.04em] m-0 select-none"
              style={{ fontWeight: 950 }}
            >
              SOFTWARE
            </h1>
            <h1
              className="text-[36px] xs:text-[42px] font-black uppercase text-[#111111] leading-[0.92] tracking-[-0.04em] m-0 select-none"
              style={{ fontWeight: 950 }}
            >
              ENGINEER
            </h1>
          </div>

          {/* Mobile Photo Card: Shows B&W initially, automatically 3D-flips to Color Red after 2s */}
          <div
            className="w-[185px] xs:w-[205px] aspect-[3/4] max-h-[275px] select-none cursor-pointer"
            style={{ perspective: 1000 }}
            onClick={() => setMobileFlipped((prev) => !prev)}
            title="Tap to flip photo"
          >
            <motion.div
              animate={{ rotateY: mobileFlipped ? 180 : 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full h-full"
            >
              {/* FRONT FACE (0°): Black & White Portrait */}
              <div
                className="absolute inset-0 w-full h-full rounded-[22px] overflow-hidden bg-black border border-black/15 shadow-[0_12px_28px_rgba(0,0,0,0.16)]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                <img
                  src="/images/hero-portrait-bw.webp"
                  alt="Kinshuk Khandelwal - Software Engineer"
                  className="w-full h-full object-cover object-center filter contrast-[1.08]"
                  loading="eager"
                />
              </div>

              {/* BACK FACE (180°): Color Red Studio Portrait */}
              <div
                className="absolute inset-0 w-full h-full rounded-[22px] overflow-hidden bg-[#111111] border border-black/10 shadow-[0_12px_28px_rgba(0,0,0,0.16)]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <img
                  src="/images/about-portrait-red.webp"
                  alt="Kinshuk Khandelwal - Red Studio Portrait"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                <div className="absolute inset-0 rounded-[22px] ring-1 ring-inset ring-black/10 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Footer: ©2026 only on left, Resume button only on right */}
        <div className="w-full flex items-center justify-between pt-2 pb-1 select-none pointer-events-auto">
          <span className="text-2xl xs:text-3xl font-normal tracking-tight text-[#111111] leading-none">
            ©2026
          </span>
          <button
            type="button"
            onClick={() => {
              setResumeOpen(true);
              trackEvent("resume_preview", { location: "hero_mobile" });
            }}
            className="px-5 py-2.5 rounded-xl bg-[#ffffff] text-[#000000] border border-black/15 text-xs xs:text-sm font-bold shadow-sm hover:bg-neutral-100 transition-all active:scale-95 text-center cursor-pointer"
          >
            Resume ↗
          </button>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
