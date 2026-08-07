import { Github, ExternalLink, BookOpen } from "lucide-react";
import { useRef } from "react";
import { Section } from "./Section";
import { featuredProjects, secondaryProjects } from "./data";
import { trackEvent } from "../../lib/analytics";
import { linkHandler } from "../../lib/navigation";

function TiltCard({ children, isFeatured }) {
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
  const borderTopClass = isFeatured ? "border-t-cyan-glow" : "border-t-violet-glow";
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border border-t-4 ${borderTopClass} bg-surface/60 backdrop-blur transition-[transform,border-color,box-shadow] duration-200 will-change-transform hover:border-cyan-glow/50`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

function Card({ p, isFeatured }) {
  const accentClass = isFeatured ? "cyan-glow" : "violet-glow";
  const badgeClass = isFeatured
    ? "border-cyan-glow/20 bg-cyan-glow/10 text-cyan-glow"
    : "border-violet-glow/20 bg-violet-glow/10 text-violet-glow";
  const hoverClass = isFeatured ? "hover:border-cyan-glow/60 hover:text-cyan-glow" : "hover:border-violet-glow/60 hover:text-violet-glow";

  return (
    <TiltCard isFeatured={isFeatured}>
      {p.image && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-border/60">
          <img
            src={p.image}
            alt={`${p.title} preview`}
            loading="lazy"
            width={800}
            height={450}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
      <div className={`font-mono-ui flex items-center justify-between text-[11px] uppercase tracking-wider text-${accentClass}/85`}>
        <span>{p.tag}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground">{p.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li
            key={s}
            className={`rounded-md border ${badgeClass} px-2 py-0.5 text-[11px] font-semibold`}
          >
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        {p.github && (
          <a
            href={p.github}
            onClick={() =>
              trackEvent("project_link_click", {
                project: p.title,
                link_type: "github",
                featured: isFeatured,
              })
            }
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-hi/70 px-3 py-1.5 text-xs text-foreground/90 transition-colors ${hoverClass}`}
          >
            <Github className="size-3.5" />
            Link
          </a>
        )}
        {p.live && (
          <a
            href={p.live}
            onClick={() =>
              trackEvent("project_link_click", {
                project: p.title,
                link_type: "live_demo",
                featured: isFeatured,
              })
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            <ExternalLink className="size-3.5" />
            Demo
          </a>
        )}
        {p.caseStudy && (
          <a
            href={p.caseStudy}
            onClick={(e) => {
              trackEvent("project_link_click", { project: p.title, link_type: "case_study" });
              linkHandler(p.caseStudy)(e);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 px-3 py-1.5 text-xs font-medium text-cyan-glow transition-colors hover:border-cyan-glow hover:bg-cyan-glow/20"
          >
            <BookOpen className="size-3.5" />
            Case study
          </a>
        )}
      </div>
      </div>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-${accentClass}/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
      />
    </TiltCard>
  );
}

/**
 * Flex-wrap rather than a grid so a trailing incomplete row centres itself
 * instead of leaving an orphan card hugging the left edge.
 */
function ProjectGrid({ items, isFeatured }) {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {items.map((p) => (
        <div
          key={p.title}
          className="w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
        >
          <Card p={p} isFeatured={isFeatured} />
        </div>
      ))}
    </div>
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
      <GroupHeading kicker="highlighted" title="The work I'd show you first" />
      <ProjectGrid items={featuredProjects} isFeatured={true} />

      <div className="mt-16">
        <GroupHeading kicker="more" title="Responsive frontends and side projects" />
        <ProjectGrid items={secondaryProjects} isFeatured={false} />
      </div>
    </Section>
  );
}
