import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MetallicStar, MetallicLightning } from "./HeroAccents";
import { ResumeModal } from "./ResumeModal";
import { trackEvent } from "../../lib/analytics";

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const sectionRef = useRef(null);

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
    const scrollTarget = vh + aboutTopPadding + h2 * 0.4;
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
        // Complete scroll animation when user reaches the Get Started button (comfortable eye-level)
        scrollTarget = Math.max(vh * 1.05, btnDocBottom - vh * 0.65);
      } else {
        const aboutTopPadding = isMobile ? 128 : vw < 1024 ? 160 : 192;
        scrollTarget = vh + aboutTopPadding + h2 * 0.4;
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

  // 3D Flip from 0deg to 180deg (switches faces edge-on at 90deg)
  const rotateY = useTransform(scrollProgress, (p) => p * 180);
  const rotateX = useTransform(scrollProgress, (p) => Math.sin(p * Math.PI) * 7);
  const rotateZ = useTransform(scrollProgress, (p) => Math.sin(p * Math.PI) * -3);

  // Downward travel during scroll to land perfectly aligned with Get Started button
  const y = useTransform(scrollProgress, (p) => p * metrics.deltaY);

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
      className="relative z-20 w-full h-[100dvh] min-h-[640px] overflow-x-clip overflow-y-visible bg-[#F4F1ED] text-[#111111] font-['Archivo',sans-serif] flex flex-col justify-between select-none"
    >
      {/* Subtle paper grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply z-0"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Top spacer to ensure clear clearance below the top navbar */}
      <div className="w-full pt-20 md:pt-24" />

      {/* Main Center Stage: SOFTWARE ENGINEER + Star + Lightning Bolt */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto px-4 sm:px-8">
        <div className="relative flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto">
          
          {/* Row 1: SOFTWARE with Star placed comfortably in the left margin */}
          <div className="relative inline-flex items-center justify-center">
            {/* 3D Metallic Star */}
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

            {/* Line 1 Text: SOFTWARE */}
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
            {/* Line 2 Text: ENGINEER */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(66px,11.8vw,196px)] font-black uppercase text-[#111111] leading-[0.88] tracking-[-0.045em] m-0 select-none text-center"
              style={{ fontWeight: 950 }}
            >
              ENGINEER
            </motion.h1>

            {/* 3D Metallic Lightning Bolt */}
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

      {/* Centered Portrait Card:
          - Increased width & height
          - Bottom gap increased by 40% (now ~20px, bottom-[17px] sm:bottom-[20px])
          - Curved from all 4 corners: rounded-[20px] sm:rounded-[22px]
          - Overlaps the bottom of SOFTWARE ENGINEER
      */}
      <motion.div
        style={{
          y,
          width,
          height,
          perspective: 1400,
        }}
        className="absolute bottom-[17px] sm:bottom-[20px] left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none"
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

      {/* Bottom Footer Bar:
          - ©2026 on the bottom left
          - /CREATING SINCE 2023 and stacked action buttons on the bottom right
          - Bottom gap precisely aligned with the person portrait card (20px)
      */}
      <footer className="relative z-30 pb-[17px] sm:pb-[20px] px-6 sm:px-10 lg:px-14 flex items-end justify-between w-full pointer-events-none">
        {/* Bottom Left: ©2026 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="ml-2 sm:ml-6 md:ml-12 lg:ml-20 text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111111] leading-none select-none pointer-events-auto"
        >
          ©2026
        </motion.div>

        {/* Bottom Right: Tagline + Stacked Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-end gap-3 sm:gap-4 pointer-events-auto"
        >
          {/* Metadata / Tagline */}
          <span className="hidden md:inline-block text-[#767676] text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase mb-2 select-none">
            /CREATING SINCE 2023
          </span>

          {/* Stacked Action Buttons */}
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

      {/* Resume Modal */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
