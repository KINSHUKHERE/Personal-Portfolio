import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "./data";
import { trackEvent } from "../../lib/analytics";

export function About() {
  return (
    <section
      id="about"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#F4F1ED] text-[#111111] font-['Archivo',sans-serif] flex flex-col justify-center items-center pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 lg:pb-36 px-6 sm:px-10 md:px-14 lg:px-20 select-none"
    >
      {/* Subtle paper grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px), radial-gradient(#111111 1px, #F4F1ED 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      {/* Main 3-Column Balanced Stage - Exact match to Reference */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 xl:gap-14">
        
        {/* Left Column: Heading "Hey!" at top + Bold intro paragraph at bottom */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full lg:max-w-[360px] xl:max-w-[400px] flex flex-col justify-between items-start self-stretch min-h-[300px] lg:min-h-[520px]"
        >
          <h2
            className="text-7xl sm:text-8xl lg:text-[100px] font-black tracking-[-0.04em] text-[#111111] leading-none m-0"
            style={{ fontWeight: 950 }}
          >
            Hey!
          </h2>

          <p className="mt-8 lg:mt-auto text-base sm:text-[17px] lg:text-[18px] leading-[1.38] text-[#111111] font-semibold max-w-[280px] sm:max-w-[320px]">
            I’m Kinshuk, a final-year Computer Science student based in {profile.location}, specializing in backend engineering, scalable REST APIs, and full-stack MERN platforms.
          </p>
        </motion.div>

        {/* Center Column: Invisible Placeholder reserving the exact footprint for 2nd image (Desktop only) */}
        <div className="hidden sm:flex shrink-0 flex-col justify-end items-center self-stretch invisible pointer-events-none" aria-hidden="true">
          <div
            id="about-card-target"
            className="relative w-[clamp(280px,28vw,440px)] aspect-[4/5]"
          />
        </div>

        {/* Right Column: Paragraphs in lower-half (non-bold) + Get Started & Actions at bottom */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full lg:max-w-[420px] xl:max-w-[460px] flex flex-col justify-end items-start self-stretch min-h-[300px] lg:min-h-[520px]"
        >
          <div className="w-full space-y-4">
            <p className="text-[14px] sm:text-[15px] leading-[1.48] text-[#111111] font-normal max-w-[340px] sm:max-w-[380px]">
              Most recently a Software Developer Intern at Zentek Infosoft, I design and build production-style applications with a heavy focus on API security, JWT/OAuth auth, RBAC, and resilient MongoDB schemas.
            </p>

            <p className="text-[14px] sm:text-[15px] leading-[1.48] text-[#111111] font-normal max-w-[340px] sm:max-w-[380px]">
              From architecting YoCart with concurrency-safe checkouts and Razorpay integration to solving 70+ DSA challenges in Java, I build software that is fast, secure, and production-ready.
            </p>

            <div className="pt-2">
              <a
                id="about-get-started"
                href="#contact"
                onClick={() => trackEvent("cta_click", { cta: "get_started", location: "about" })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/15 bg-[#F4F1ED] text-[#111111] text-xs sm:text-sm font-semibold hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Get Started</span>
                <span className="p-0.5 rounded-md border border-current text-xs">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 4 Key Metrics Bar - Single row on all devices */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1480px] mx-auto mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-black/10"
      >
        <div className="grid grid-cols-4 gap-2 xs:gap-4 sm:gap-8 lg:gap-12">
          {/* Stat 1: CGPA */}
          <div className="flex flex-col">
            <span className="text-xl xs:text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-none">
              7.96
            </span>
            <span className="text-[9px] xs:text-[11px] sm:text-sm font-mono uppercase text-[#767676] mt-1.5 sm:mt-2 tracking-tight sm:tracking-wider font-semibold leading-tight">
              CGPA
            </span>
          </div>

          {/* Stat 2: GitHub repos */}
          <div className="flex flex-col">
            <span className="text-xl xs:text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-none">
              16+
            </span>
            <span className="text-[9px] xs:text-[11px] sm:text-sm font-mono uppercase text-[#767676] mt-1.5 sm:mt-2 tracking-tight sm:tracking-wider font-semibold leading-tight">
              GitHub Repos
            </span>
          </div>

          {/* Stat 3: DSA problems solved */}
          <div className="flex flex-col">
            <span className="text-xl xs:text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-none">
              70+
            </span>
            <span className="text-[9px] xs:text-[11px] sm:text-sm font-mono uppercase text-[#767676] mt-1.5 sm:mt-2 tracking-tight sm:tracking-wider font-semibold leading-tight">
              DSA Solved
            </span>
          </div>

          {/* Stat 4: Internships */}
          <div className="flex flex-col">
            <span className="text-xl xs:text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-none">
              2
            </span>
            <span className="text-[9px] xs:text-[11px] sm:text-sm font-mono uppercase text-[#767676] mt-1.5 sm:mt-2 tracking-tight sm:tracking-wider font-semibold leading-tight">
              Internships
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
