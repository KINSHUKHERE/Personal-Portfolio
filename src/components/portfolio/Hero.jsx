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
  const hasCompletedOnce = useRef(false);
  const userInteracted = useRef(false);

  // Try unmuting the video
  const tryUnmute = () => {
    const video = videoRef.current;
    if (!video || hasCompletedOnce.current) return;

    if (!video.paused && video.muted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video unmuted by default (first time)
    if (!hasCompletedOnce.current) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }

    // Intersection Observer to play only when visible, pause when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused) {
            if (!hasCompletedOnce.current) {
              // Try playing unmuted first
              video.muted = false;
              setIsMuted(false);
              video.play().catch((err) => {
                console.log("Autoplay unmuted failed, playing muted:", err);
                video.muted = true;
                setIsMuted(true);
                video.play().catch((playErr) => {
                  console.log("Autoplay muted failed:", playErr);
                });
              });
            } else {
              // Completed once, loop muted
              video.muted = true;
              setIsMuted(true);
              video.play().catch((err) => {
                console.log("Play failed:", err);
              });
            }
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.1 } // Increased threshold to avoid minor triggers during scrolling
    );

    observer.observe(video);

    // Track user interaction to unmute video safely without browser autoplay blocks
    const handleInteraction = () => {
      if (userInteracted.current) return;
      userInteracted.current = true;
      tryUnmute();
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      observer.unobserve(video);
      observer.disconnect();
      removeListeners();
    };
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (hasCompletedOnce.current) {
      video.muted = true;
      setIsMuted(true);
    } else {
      // Laptop view unmuted attempt on refresh: try to set unmuted first
      video.muted = false;
      setIsMuted(false);

      // Safe autoplay fallback: if browser blocks unmuted playback and pauses the video,
      // detect it quickly and fall back to muted autoplay so it doesn't get stuck.
      setTimeout(() => {
        if (video.paused && !hasCompletedOnce.current) {
          console.log("Unmuted autoplay failed on load, falling back to muted autoplay.");
          video.muted = true;
          setIsMuted(true);
          video.play().catch((err) => {
            console.log("Muted autoplay fallback failed:", err);
          });
        }
      }, 80);

      // Mute the video after one full cycle seamlessly using browser native loop
      const muteAfterDuration = (durationSec) => {
        // Mute 100ms before cycle ends to ensure loop transition is silent
        const durationMs = Math.max(0, (durationSec * 1000) - 100);
        setTimeout(() => {
          if (!hasCompletedOnce.current) {
            hasCompletedOnce.current = true;
            video.muted = true;
            setIsMuted(true);
          }
        }, durationMs);
      };

      if (video.duration) {
        muteAfterDuration(video.duration);
      } else {
        const handleMetadata = () => {
          muteAfterDuration(video.duration);
          video.removeEventListener("loadedmetadata", handleMetadata);
        };
        video.addEventListener("loadedmetadata", handleMetadata);
      }
    }
  };

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

    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);

    if (!newMuted) {
      hasCompletedOnce.current = false;
    } else {
      hasCompletedOnce.current = true;
    }
  };

  return (
    <section 
      id="top" 
      className="dark relative w-full h-[100dvh] md:h-screen overflow-hidden bg-neutral-950 flex items-center justify-center animate-fade-in"
    >
      {/* Video Layer (z-0) - Configured for clearer display & object-[80%_center] to ensure avatar doesn't get cut off on mobile */}
      {/* Video Layer (z-0) - Uses hardware-accelerated native loop with no expensive CSS filters to prevent lagging */}
      <video
        ref={videoRef}
        src="/webvideo.mp4"
        autoPlay
        loop
        muted
        playsInline
        onPlay={handlePlay}
        className="absolute inset-0 w-full h-full object-cover object-[80%_center] z-0 pointer-events-none"
      />

      {/* Gradient Overlay Mask (z-10) - Consistent left-to-right blend to keep background clear on right */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/45 to-transparent" 
      />

      {/* Bottom fade mask to blend video into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />

      {/* Content Container (z-20 relative) - Fit exactly within dynamic viewport height on mobile */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-24 pb-12 md:py-0">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center w-full">
          
          {/* Left Column (col-span-12 on mobile, md:col-span-8 on desktop to avoid covering the avatar) */}
          <div className="col-span-12 md:col-span-8 flex flex-col justify-center items-start text-left z-20 max-w-md md:max-w-xl">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono-ui inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
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
              className="mt-4 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
            >
              Kinshuk <span className="text-gradient block sm:inline">Khandelwal</span>
            </motion.h1>

            {/* Profession / Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-2 sm:mt-3 text-sm sm:text-xl md:text-2xl font-semibold text-cyan-400 tracking-wider font-mono-ui"
            >
              {profile.role.toUpperCase()}
            </motion.h2>

            {/* Tagline / Intro Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3 sm:mt-4 text-xs sm:text-base text-muted-foreground leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            {/* Action Buttons - Horizontal Row with expanding hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 sm:mt-8 flex flex-row items-center gap-3 justify-start w-full"
            >
              {/* Download Resume Button (Stateful Hover-Expand) */}
              <RunActionButton
                steps={resumeSteps}
                idleText="Download Resume"
                doneText="Downloaded!"
                onComplete={handleResumeDownloadComplete}
                idleIcon={Download}
              />

              {/* Get in Touch Button (CSS Group Hover-Expand) */}
              <a
                href="#contact"
                className="group flex h-[46px] items-center gap-0 hover:gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 hover:px-5 transition-all duration-300 overflow-hidden max-w-[46px] hover:max-w-[150px] text-white hover:border-cyan-glow/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                <Mail className="size-4 shrink-0 text-white" />
                <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Get in Touch
                </span>
              </a>

              {/* WhatsApp Button (CSS Group Hover-Expand) */}
              <a
                href="https://wa.me/918058442748"
                target="_blank"
                rel="noreferrer"
                className="group flex h-[46px] items-center gap-0 hover:gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 hover:px-5 transition-all duration-300 overflow-hidden max-w-[46px] hover:max-w-[150px] text-emerald-400 hover:border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              >
                <MessageCircle className="size-4 shrink-0 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  WhatsApp
                </span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 sm:mt-8 flex items-center gap-4 sm:gap-5 text-muted-foreground"
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
