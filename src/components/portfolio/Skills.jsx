import { Section } from "./Section";
import { skills } from "./data";

export function Skills() {
  return (
    <Section
      id="skills"
      label="skills"
      title="The toolkit."
      subtitle="Languages, frameworks and tools I reach for daily."
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:auto-rows-fr lg:grid-cols-3">
        {skills.map((s) => (
          <div
            key={s.group}
            className="group relative overflow-hidden rounded-xl border border-border bg-surface/50 p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-cyan-glow/40"
          >
            <div className="font-mono-ui mb-3 text-[11px] uppercase tracking-wider text-cyan-glow/80">
              {s.group}
            </div>
            <ul className="flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li
                  key={it}
                  className="rounded-md border border-border bg-surface-hi/70 px-2.5 py-1 text-xs text-foreground/90"
                >
                  {it}
                </li>
              ))}
            </ul>
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-cyan-glow/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </Section>
  );
}
