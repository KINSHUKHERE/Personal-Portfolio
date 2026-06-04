import { Github, Linkedin, Instagram, Mail, ArrowDown, Download, Search, Cog } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleField } from "./ParticleField";
import { profile } from "./data";
import { RunActionButton } from "./RunActionButton";

const resumeSteps = [
  { id: 1, label: "Locating resume PDF...", icon: Search },
  { id: 2, label: "Preparing buffer...", icon: Cog },
  { id: 3, label: "Downloading...", icon: Download },
];

export function Hero() {
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

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <ParticleField />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono-ui inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
        >
          Kinshuk <span className="text-gradient">Khandelwal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono-ui mt-4 text-xs text-muted-foreground"
        >
          {profile.handle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 glow-ring"
          >
            View Projects
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <RunActionButton
            steps={resumeSteps}
            idleText="Download Resume"
            doneText="Downloaded!"
            onComplete={handleResumeDownloadComplete}
            idleIcon={Download}
          />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-cyan-glow/50"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
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

        <a
          href="#about"
          className="font-mono-ui absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cyan-glow font-semibold"
        >
          scroll
          <ArrowDown className="size-3 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
