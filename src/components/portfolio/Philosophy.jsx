import { motion } from "framer-motion";
import { Section } from "./Section";
import { Cpu, Zap, ShieldCheck, GitBranch, Binary, Terminal } from "lucide-react";

const principles = [
  {
    code: "ARCH.01 // CLEAN_ARCHITECTURE",
    title: "SOLID Principles & DRY Code",
    description: "I write decoupled, maintainable code with strict modular boundaries. Components are designed to be highly reusable, readable, and easy to scale.",
    icon: Cpu,
    colorClass: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",
    shadowClass: "hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    glowBorder: "hover:border-cyan-400/40",
  },
  {
    code: "PERF.02 // LATENCY_REDUCTION",
    title: "Performance Optimization",
    description: "From database query indices to bundle minification and lazy-loading, I focus on low query response times and hitting 95+ scores on Lighthouse.",
    icon: Zap,
    colorClass: "text-amber-400 border-amber-400/20 bg-amber-400/5",
    shadowClass: "hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    glowBorder: "hover:border-amber-400/40",
  },
  {
    code: "SEC.03 // SYSTEM_HARDENING",
    title: "Robust Security Standards",
    description: "I integrate state-of-the-art JWT authentication schemes, bcrypt password hashing, secure session management, and strict inputs sanitization.",
    icon: ShieldCheck,
    colorClass: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
    shadowClass: "hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
    glowBorder: "hover:border-emerald-400/40",
  },
  {
    code: "COLLAB.04 // GIT_WORKFLOWS",
    title: "Agile & Continuous Sync",
    description: "I maintain clean Git histories, utilize branching strategies, write detailed code documentations, and coordinate seamlessly in peer reviews.",
    icon: GitBranch,
    colorClass: "text-violet-400 border-violet-400/20 bg-violet-400/5",
    shadowClass: "hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
    glowBorder: "hover:border-violet-400/40",
  },
];

export function Philosophy() {
  return (
    <Section
      id="philosophy"
      label="philosophy"
      title="How I Write Code."
      subtitle="Engineering standards and core principles I stick to on every project."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
        {principles.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-md transition-all duration-300 ${item.shadowClass} ${item.glowBorder}`}
            >
              {/* Cyber HUD Brackets for futuristic feel */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 rounded-tl pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 rounded-tr pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 rounded-bl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 rounded-br pointer-events-none" />

              <div>
                {/* Header terminal label */}
                <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-1.5">
                  <Binary className="size-3 text-cyan-400/60" />
                  <span>{item.code}</span>
                </div>

                {/* Styled icon box */}
                <div className={`inline-flex p-3 rounded-xl border ${item.colorClass} mb-4`}>
                  <Icon className="size-5" />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Status active/passive footer indicator */}
              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-muted-foreground/60">
                <span className="flex items-center gap-1">
                  <Terminal className="size-3 text-cyan-400/55" />
                  STABLE
                </span>
                <span>v1.0.0</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
