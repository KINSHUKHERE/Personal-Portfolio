import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { Section } from "./Section";
import { education, certifications } from "./data";

export function Education() {
  return (
    <Section
      id="education"
      label="education"
      title="Schooling and credentials."
      subtitle="Academic foundation, coursework, and professional industry certifications."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Education Column */}
        <div className="space-y-5">
          <div className="font-mono mb-2 text-xs font-bold uppercase tracking-wider text-[#767676] flex items-center gap-2">
            <GraduationCap className="size-4 text-[#111111]" />
            <span>Academic Degrees</span>
          </div>

          {education.map((e, index) => (
            <motion.div
              key={e.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[24px] border border-black/10 bg-[#ffffff] p-6 shadow-sm hover:shadow-md transition-all text-[#111111]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold text-[#111111]">{e.school}</h3>
                <span className="font-mono text-xs font-semibold text-[#767676]">{e.period}</span>
              </div>
              <p className="mt-2 text-sm text-[#444444] font-medium leading-relaxed">{e.detail}</p>
              <p className="font-mono mt-3 text-[11px] font-semibold uppercase tracking-wider text-[#767676]">
                {e.place}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Column */}
        <div>
          <div className="font-mono mb-4 text-xs font-bold uppercase tracking-wider text-[#767676] flex items-center gap-2">
            <Award className="size-4 text-[#111111]" />
            <span>Certifications & Honors</span>
          </div>

          <ul className="space-y-3.5">
            {certifications.map((c, index) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3.5 rounded-[20px] border border-black/10 bg-[#ffffff] p-5 text-sm font-semibold text-[#111111] shadow-sm hover:shadow-md transition-all hover:border-black/25"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-black/5 text-[#111111] font-mono text-xs font-bold">
                  ✓
                </span>
                <span>{c}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
