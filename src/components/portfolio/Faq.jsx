import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    q: "Are you open to immediate internships or full-time opportunities?",
    a: "Yes! I am a final-year B.Tech CSE student (graduating in 2027) currently working as a Software Developer Intern at Zentek Infosoft. I am actively looking for full-stack, backend, or frontend developer roles and am ready to join immediately."
  },
  {
    q: "What is your primary technology stack?",
    a: "My core expertise is the MERN stack (MongoDB, Express.js, React, Node.js) and relational databases like MySQL. I also develop backend APIs in Java and scripts in Python."
  },
  {
    q: "How do you handle remote collaboration and communication?",
    a: "I am highly comfortable working remotely. I follow strict Git workflows, write clean commit histories, document APIs thoroughly via Postman, and communicate progress daily using Slack, Discord, or Loom."
  },
  {
    q: "Do you have database design and optimization experience?",
    a: "Yes. I design schemas and write optimized queries for MySQL and MongoDB. I focus on reducing query latency, structuring clean indexing, and designing resilient database models."
  },
  {
    q: "Are you open to relocating or working in a hybrid setup?",
    a: "Yes! I am open to relocating to major tech hubs across India (including Bangalore, Gurgaon, Pune, Noida, Hyderabad) for full-time opportunities, as well as working in hybrid or remote environments."
  }
];

export function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      label="faq"
      title="Frequently Asked Questions."
      subtitle="Quick answers to common questions recruiters ask about my skills and availability."
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border border-border/60 dark:border-white/10 bg-surface/50 dark:bg-white/[0.01] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-glow/30 ${
                isOpen ? "border-cyan-glow/50 bg-surface/80 dark:bg-white/[0.03] shadow-[0_0_20px_rgba(6,182,212,0.08)]" : ""
              }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-5 text-left font-mono-ui text-sm sm:text-base font-medium text-foreground transition-colors hover:text-cyan-glow dark:hover:text-cyan-400 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="size-4 shrink-0 text-cyan-500 dark:text-cyan-400" />
                  <span>{item.q}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="size-4 text-cyan-500 dark:text-cyan-400 shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="size-4 text-muted-foreground shrink-0 ml-3" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-border/40 dark:border-white/5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
