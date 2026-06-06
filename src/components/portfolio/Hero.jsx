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

    // Try to play unmuted by default
    video.muted = false;
    setIsMuted(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // If unmuted autoplay is blocked, fallback to muted autoplay
        console.log("Autoplay unmuted blocked by browser, falling back to muted:", error);
        video.muted = true;
        setIsMuted(true);
        video.play().catch((err) => {
          console.error("Muted autoplay also failed:", err);
        });
      });
    }
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
        style={{ filter: "brightness(0.65) contrast(1.1)" }}
      />

      {/* Gradient Overlay Mask (z-10) - Tweaked for clearer background visibility */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent md:bg-gradient-to-r max-md:bg-gradient-to-b max-md:from-neutral-950/85 max-md:via-neutral-950/30" 
      />

      {/* Content Container (z-20 relative) */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-24 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
          
          {/* Left Column (col-span-7) - Constrained on mobile to stay on the left side of the avatar */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center items-start text-left z-20 max-w-[75%] sm:max-w-[70%] md:max-w-none">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono-ui inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
            </motion.div>

            {/* Name Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
            >
              Kinshuk <span className="text-gradient block sm:inline">Khandelwal</span>
            </motion.h1>

            {/* Profession / Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-base sm:text-xl md:text-2xl font-semibold text-cyan-400 tracking-wider font-mono-ui"
            >
              {profile.role.toUpperCase()}
            </motion.h2>

            {/* Tagline / Intro Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4 justify-start w-full"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition-all hover:border-cyan-glow/50 duration-300"
              >
                Get in Touch
              </a>
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918058442748"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-2.5 text-sm font-medium text-emerald-400 backdrop-blur transition-all hover:border-emerald-500/50 duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              >
                <MessageCircle className="size-4 shrink-0" />
                WhatsApp
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-5 text-muted-foreground"
            >
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-cyan-glow">
                <Github className="size-5" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[#0a66c2]">
                <Linkedin className="size-5" />
              </a>
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#e1306c]">
                <Instagram className="size-5" />
              </a>
              <a href={profile.socials.mail} aria-label="Email" className="transition-colors hover:text-cyan-glow">
                <Mail className="size-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column (col-span-5) - Aligns right to stay aligned with avatar placement */}
          <div className="col-span-12 md:col-span-5 flex justify-end items-center z-20 mt-6 md:mt-0">
            {/* Floating Glassmorphic HUD Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
              }}
              className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] rounded-xl p-3 sm:p-4 font-mono text-[10px] sm:text-xs text-cyan-400 max-w-[240px] sm:max-w-[280px] w-full relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="flex items-center gap-1.5 font-bold tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                  </span>
                  [SYS_ACTIVE]
                </span>
                <span className="text-[9px] sm:text-[10px] text-cyan-400/50">NODE_v20.11</span>
              </div>
              <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-[11px] leading-relaxed">
                <p><span className="text-white/60">USER:</span> KINSHUK_KHANDELWAL</p>
                <p><span className="text-white/60">ROLE:</span> MERN_DEV</p>
                <p className="hidden sm:block"><span className="text-white/60">LOC:</span> JAIPUR_IN [26.91° N]</p>
                <p><span className="text-white/60">STATUS:</span> ACTIVE</p>
                <div className="pt-1.5 border-t border-white/5 mt-1.5 flex items-center justify-between text-[9px] sm:text-[10px] text-cyan-400/60">
                  <span>SECURE</span>
                  <span>100% ONLINE</span>
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
