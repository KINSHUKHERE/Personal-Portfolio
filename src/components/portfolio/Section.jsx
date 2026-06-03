import { motion } from "framer-motion";

export function SectionLabel({ children }) {
  return <div className="font-mono-ui mb-3 text-xs text-cyan-glow/80">// {children}</div>;
}

export function SectionTitle({ children }) {
  return <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{children}</h2>;
}

export function Section({ id, label, title, subtitle, children }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <SectionLabel>{label}</SectionLabel>
        <SectionTitle>{title}</SectionTitle>
        {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p> : null}
      </motion.div>
      {children}
    </section>
  );
}
