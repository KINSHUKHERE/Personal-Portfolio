import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    q: "Are you open to immediate internships or full-time opportunities?",
    a: "I graduate in 2027. I'm looking for fresher Backend or SDE roles, and internships."
  },
  {
    q: "Where are you open to working?",
    a: "Bangalore, Hyderabad, or remote."
  },
  {
    q: "What is your primary technology stack?",
    a: "Node.js, Express, MongoDB and React. I use Java for DSA and built a Spring Boot project (BookHub)."
  },
  {
    q: "What is your database experience?",
    a: "I design MongoDB schemas and use aggregation pipelines for YoCart's analytics."
  },
  {
    q: "How do you handle collaboration and communication?",
    a: "I follow strict Git workflows, write clean commit histories, document REST APIs thoroughly via Postman, and collaborate effectively in remote team settings."
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className={`rounded-[22px] border bg-[#ffffff] overflow-hidden transition-all duration-300 shadow-sm ${
                isOpen
                  ? "border-black/30 shadow-md ring-1 ring-black/10"
                  : "border-black/10 hover:border-black/25"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-['Archivo',sans-serif] text-sm sm:text-base font-bold text-[#111111] hover:text-black cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <HelpCircle className="size-4 shrink-0 text-[#111111]" />
                  <span>{item.q}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="size-4 text-[#111111] shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="size-4 text-[#767676] shrink-0 ml-2" />
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
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-black/5 text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
