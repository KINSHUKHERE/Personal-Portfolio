import { Section } from "./Section";
import { education, certifications } from "./data";

export function Education() {
  return (
    <Section id="education" label="education" title="Schooling and credentials.">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          {education.map((e) => (
            <div
              key={e.school}
              className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">{e.school}</h3>
                <span className="font-mono-ui text-xs text-muted-foreground">{e.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
              <p className="font-mono-ui mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                {e.place}
              </p>
            </div>
          ))}
        </div>
        <div>
          <div className="font-mono-ui mb-3 text-[11px] uppercase tracking-wider text-cyan-glow/80">
            certifications
          </div>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex gap-3 rounded-xl border border-border bg-surface/60 p-4 text-sm text-foreground/90 backdrop-blur"
              >
                <span className="font-mono-ui mt-0.5 text-cyan-glow/80">▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
