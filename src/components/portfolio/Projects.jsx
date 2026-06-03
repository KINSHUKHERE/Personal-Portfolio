import { Github, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { Section } from "./Section";
import { featuredProjects, secondaryProjects } from "./data";

function TiltCard({ children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(
      x * 8
    ).toFixed(2)}deg) translateY(-2px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition-[transform,border-color,box-shadow] duration-200 will-change-transform hover:border-cyan-glow/50"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

function Card({ p }) {
  return (
    <TiltCard>
      <div className="font-mono-ui flex items-center justify-between text-[11px] uppercase tracking-wider text-cyan-glow/80">
        <span>{p.tag}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground">{p.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li
            key={s}
            className="rounded-md border border-border bg-surface-hi/70 px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-hi/70 px-3 py-1.5 text-xs text-foreground/90 transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
          >
            <Github className="size-3.5" />
            Link
          </a>
        )}
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            <ExternalLink className="size-3.5" />
            Demo
          </a>
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />
    </TiltCard>
  );
}

function GroupHeading({ kicker, title }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="font-mono-ui text-[11px] uppercase tracking-wider text-cyan-glow/80">
        // {kicker}
      </span>
      <h3 className="text-lg font-medium text-foreground/90">{title}</h3>
      <div className="ml-2 h-px flex-1 bg-gradient-to-r from-border to-transparent" />
    </div>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      label="projects"
      title="Selected work."
      subtitle="A few things I've designed, built and shipped."
    >
      <GroupHeading kicker="featured" title="Full-stack MERN builds" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p) => (
          <Card key={p.title} p={p} />
        ))}
      </div>

      <div className="mt-16">
        <GroupHeading kicker="more" title="Responsive frontends and side projects" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {secondaryProjects.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </div>
      </div>
    </Section>
  );
}
