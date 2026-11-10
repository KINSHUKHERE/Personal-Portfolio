import { motion } from "framer-motion";
import { trackEvent } from "../../lib/analytics";

export function SectionLabel({ children }) {
  return (
    <div className="font-mono text-xs uppercase tracking-wider text-[#767676] mb-3">
      // {children}
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#111111] leading-tight">
      {children}
    </h2>
  );
}

export function Section({ id, label, title, subtitle, className = "", children }) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        onViewportEnter={() => trackEvent("section_view", { section_id: id })}
        className="mb-12 sm:mb-16 text-center"
      >
        <SectionLabel>{label}</SectionLabel>
        <SectionTitle>{title}</SectionTitle>
        {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-[#767676] text-base sm:text-lg leading-relaxed">{subtitle}</p> : null}
      </motion.div>
      {children}
    </section>
  );
}
