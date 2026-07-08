import { Github, Linkedin, Instagram, Mail, ArrowDown, Download, Search, Cog, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "./data";
import { RunActionButton } from "./RunActionButton";
import { ParticleField } from "./ParticleField";

const resumeSteps = [
  { id: 1, label: "Locating resume PDF...", icon: Search },
  { id: 2, label: "Preparing buffer...", icon: Cog },
  { id: 3, label: "Downloading...", icon: Download },
];

export function Hero() {

  return (
    <section 
      id="top" 
      className="relative w-full h-[100dvh] md:h-screen overflow-hidden bg-background flex items-center justify-center animate-fade-in"
      style={{ transform: "translate3d(0, 0, 0)", contain: "paint" }}
    >
      {/* Particle Background Layer (z-0) - Immersive constellation and interactive 3D wireframe particles */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Gradient Overlay Mask (z-10) - Consistent left-to-right blend to keep background clear on right */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          background: "linear-gradient(90deg, var(--background) 0%, color-mix(in oklab, var(--background) 45%, transparent) 60%, transparent 100%)",
        }}
      />

      {/* Bottom fade mask to blend background into next section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none" 
        style={{
          background: "linear-gradient(0deg, var(--background) 0%, transparent 100%)",
        }}
      />

      {/* Content Container (z-20 relative) - Center aligned and balanced */}
      <div className="relative z-20 mx-auto w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center h-full pt-16">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono-ui inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
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
          className="mt-4 sm:mt-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-none"
        >
          Kinshuk <span className="text-gradient block sm:inline">Khandelwal</span>
        </motion.h1>

        {/* Handle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 sm:mt-3 text-xs sm:text-sm font-mono text-muted-foreground/80 tracking-widest"
        >
          {profile.handle}
        </motion.p>

        {/* Tagline / Intro Description (Formatted with break) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 sm:mt-6 text-sm sm:text-lg text-muted-foreground/85 leading-relaxed max-w-3xl whitespace-pre-line"
        >
          {profile.tagline.replace(" - ", "\n- ")}
        </motion.p>

        {/* Action Buttons - Centered Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
        >
          {/* View Projects Button */}
          <a
            href="#projects"
            className="flex h-[46px] items-center gap-2 rounded-full bg-cyan-glow hover:brightness-110 px-6 text-sm font-semibold text-primary-foreground transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:scale-105"
          >
            View Projects <span className="font-light">→</span>
          </a>

          {/* Download Resume Button (Stateful Hover-Expand) */}
          <RunActionButton
            steps={resumeSteps}
            idleText="Download Resume"
            doneText="Downloaded!"
            href="https://raw.githubusercontent.com/KINSHUKHERE/Personal-Portfolio/main/public/Kinshuk_Khandelwal_Resume.pdf"
            download="Kinshuk_Khandelwal_Resume.pdf"
            idleIcon={Download}
          />

          {/* Get in Touch Button */}
          <a
            href="#contact"
            className="flex h-[46px] items-center justify-center rounded-full border border-border bg-surface/50 hover:bg-surface px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:border-cyan-glow hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 sm:mt-8 flex items-center justify-center gap-6 text-muted-foreground"
        >
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground">
            <Github className="size-5" />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[#0a66c2]">
            <Linkedin className="size-5" />
          </a>
          <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#e1306c]">
            <Instagram className="size-5" />
          </a>
          <a href={profile.socials.mail} aria-label="Email" className="transition-colors hover:text-foreground">
            <Mail className="size-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="font-mono-ui absolute bottom-6 sm:bottom-8 left-1/2 hidden sm:flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-semibold z-20 hover:text-foreground transition-colors"
      >
        scroll
        <ArrowDown className="size-3 animate-bounce" />
      </a>
    </section>
  );
}

