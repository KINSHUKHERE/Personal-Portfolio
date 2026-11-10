import { motion } from "framer-motion";
import { Section } from "./Section";
import { skills } from "./data";

export function Skills() {
  return (
    <Section
      id="skills"
      label="skills"
      title="The toolkit."
      subtitle="Languages, frameworks, and developer tools I build with daily."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, index) => (
          <motion.div
            key={s.group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-black/10 bg-[#ffffff] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="font-mono mb-4 text-[11px] font-bold uppercase tracking-wider text-[#767676]">
                // {s.group}
              </div>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-xl border border-black/10 bg-[#F4F1ED] px-3 py-1.5 text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-[#ffffff] transition-colors cursor-default select-none"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
