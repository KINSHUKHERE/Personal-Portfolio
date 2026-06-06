import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Instagram, Mail, ArrowDown, Download, Search, Cog, Volume2, VolumeX, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "./data";
import { RunActionButton } from "./RunActionButton";

const resumeSteps = [
  { id: 1, label: "Locating resume PDF...", icon: Search },
  { id: 2, label: "Preparing buffer...", icon: Cog },
  { id: 3, label: "Downloading...", icon: Download },
];

export function Hero() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video muted by default on load
    video.muted = true;
    setIsMuted(true);

    video.play().catch((error) => {
      console.error("Muted autoplay failed:", error);
    });
  }, []);

  const handleResumeDownloadComplete = () => {
    const downloadUrl = "https://docs.google.com/uc?export=download&id=1XdSATUSsZl44TVMXtewYCuXgmxRVvjuD";
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "Kinshuk_Khandelwal_Resume.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section 
      id="top" 
      className="relative w-full min-h-screen overflow-hidden bg-neutral-950 flex items-center justify-center"
    >
      {/* Video Layer (z-0) - Configured for clearer display & object-right to preserve avatar on mobile */}
      <video
        ref={videoRef}
        src="/webvideo.mp4"
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-right z-0 pointer-events-none"
        style={{ filter: "brightness(0.75) contrast(1.05)" }}
      />

      {/* Gradient Overlay Mask (z-10) - Consistent left-to-right blend to keep background clear on right */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/45 to-transparent" 
      />

      {/* Bottom fade mask to blend video into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />

      {/* Content Container (z-20 relative) */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Side-by-side grid layout on all viewports to prevent layout overflow */}
        <div className="grid grid-cols-12 gap-3 sm:gap-6 items-center w-full">
          
          {/* Left Column (col-span-7) - Holds typography and action items */}
          <div className="col-span-7 flex flex-col justify-center items-start text-left z-20">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono-ui inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs text-muted-foreground backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
            </motion.div>

            {/* Name Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 sm:mt-6 text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
            >
              Kinshuk <span className="text-gradient block sm:inline">Khandelwal</span>
            </motion.h1>

            {/* Profession / Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-1.5 sm:mt-3 text-xs xs:text-sm sm:text-xl md:text-2xl font-semibold text-cyan-400 tracking-wider font-mono-ui"
            >
              {profile.role.toUpperCase()}
            </motion.h2>

            {/* Tagline / Intro Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-2 sm:mt-4 max-w-xl text-[10px] xs:text-xs sm:text-base text-muted-foreground leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-4 justify-start w-full"
            >
              <RunActionButton
                steps={resumeSteps}
                idleText="Download Resume"
                doneText="Downloaded!"
                onComplete={handleResumeDownloadComplete}
                idleIcon={Download}
              />
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-sm font-medium text-white backdrop-blur transition-all hover:border-cyan-glow/50 duration-300"
              >
                Get in Touch
              </a>
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918058442748"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-sm font-medium text-emerald-400 backdrop-blur transition-all hover:border-emerald-500/50 duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              >
                <MessageCircle className="size-3.5 sm:size-4 shrink-0" />
                WhatsApp
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 sm:mt-8 flex items-center gap-4 sm:gap-5 text-muted-foreground"
            >
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-cyan-glow">
                <Github className="size-4 sm:size-5" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[#0a66c2]">
                <Linkedin className="size-4 sm:size-5" />
              </a>
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#e1306c]">
                <Instagram className="size-4 sm:size-5" />
              </a>
              <a href={profile.socials.mail} aria-label="Email" className="transition-colors hover:text-cyan-glow">
                <Mail className="size-4 sm:size-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column (col-span-5) - Holds the floating diagnostics card */}
          <div className="col-span-5 flex justify-end items-center z-20">
            {/* Floating Glassmorphic HUD Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
              }}
              className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] rounded-xl p-2 sm:p-4 font-mono text-[8px] xs:text-[9px] sm:text-xs text-cyan-400 max-w-[130px] xs:max-w-[160px] sm:max-w-[240px] md:max-w-[280px] w-full relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5 text-[7px] xs:text-[8px] sm:text-[10px]">
                <span className="flex items-center gap-1 font-bold tracking-wider">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  </span>
                  [SYS]
                </span>
                <span className="text-cyan-400/50">NODE_v20</span>
              </div>
              <div className="space-y-0.5 sm:space-y-1 text-[7px] xs:text-[8px] sm:text-[11px] leading-tight sm:leading-relaxed">
                <p><span className="text-white/60">USR:</span> KINSHUK_K</p>
                <p><span className="text-white/60">SYS:</span> ACTIVE</p>
                <p className="hidden xs:block"><span className="text-white/60">LOC:</span> JAIPUR_IN</p>
                <div className="pt-1 border-t border-white/5 mt-1 flex items-center justify-between text-[6px] xs:text-[7px] sm:text-[10px] text-cyan-400/60">
                  <span>SECURE</span>
                  <span>100% OK</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="font-mono-ui absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-semibold z-20 hover:text-white transition-colors"
      >
        scroll
        <ArrowDown className="size-3 animate-bounce" />
      </a>

      {/* Mute / Unmute Button (z-20 relative to overlay) */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute Video" : "Mute Video"}
        className="absolute bottom-8 right-6 md:right-8 z-20 p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-white transition-all backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)] duration-300 cursor-pointer"
      >
        {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </section>
  );
}
