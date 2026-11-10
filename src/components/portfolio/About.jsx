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

          <p className="mt-8 lg:mt-auto text-base sm:text-[17px] lg:text-[18px] leading-[1.38] text-[#111111] font-semibold max-w-[280px] sm:max-w-[310px]">
            I’m Kinshuk, a builder based in {profile.location}, currently engineering full-stack MERN platforms, high-throughput backend APIs, and modern digital experiences.
          </p>
        </motion.div>

        {/* Center Column: Invisible Placeholder reserving the exact footprint for 2nd image */}
        <div className="shrink-0 flex flex-col justify-end items-center self-stretch invisible pointer-events-none" aria-hidden="true">
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
            <p className="text-[14px] sm:text-[15px] leading-[1.48] text-[#111111] font-normal max-w-[340px] sm:max-w-[360px]">
              I’m a software developer with a strong focus on building modern, scalable, and conversion-driven web experiences.
            </p>

            <p className="text-[14px] sm:text-[15px] leading-[1.48] text-[#111111] font-normal max-w-[340px] sm:max-w-[360px]">
              Over the years, I’ve created and shipped multiple full-stack products, MERN e-commerce architectures, and secure REST APIs—helping platforms scale and launch faster.
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

      {/* 4 Key Metrics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1480px] mx-auto mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-black/10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Stat 1: CGPA */}
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-none">
              7.96
            </span>
            <span className="text-xs sm:text-sm font-mono uppercase text-[#767676] mt-2 tracking-wider font-semibold">
              CGPA
            </span>
          </div>

          {/* Stat 2: GitHub repos */}
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-none">
              16+
            </span>
            <span className="text-xs sm:text-sm font-mono uppercase text-[#767676] mt-2 tracking-wider font-semibold">
              GitHub Repos
            </span>
          </div>

          {/* Stat 3: DSA problems solved */}
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-none">
              70+
            </span>
            <span className="text-xs sm:text-sm font-mono uppercase text-[#767676] mt-2 tracking-wider font-semibold">
              DSA Problems Solved
            </span>
          </div>

          {/* Stat 4: Internships */}
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-none">
              2
            </span>
            <span className="text-xs sm:text-sm font-mono uppercase text-[#767676] mt-2 tracking-wider font-semibold">
              Internships
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
