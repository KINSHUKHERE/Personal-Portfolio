import { Github, ExternalLink, BookOpen, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Section } from "./Section";
import { featuredProjects, secondaryProjects } from "./data";
import { trackEvent } from "../../lib/analytics";
import { linkHandler } from "../../lib/navigation";

function TiltCard({ children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(
      x * 6
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
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#111113] text-[#F4F1ED] border border-black/10 transition-[transform,box-shadow] duration-200 will-change-transform shadow-[0_12px_36px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.28)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Subtle fine noise overlay on dark card matching reference */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-10"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundRepeat: "repeat",
        }}
      />
      {children}
    </div>
  );
}

function Card({ p, isFeatured }) {
  return (
    <TiltCard>
      {p.image && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-white/10">
          <img
            src={p.image}
            alt={`${p.title} preview`}
            loading="lazy"
            width={800}
            height={450}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="relative z-20 flex flex-1 flex-col p-7 sm:p-8 justify-between">
        <div>
          {/* Top tag in muted light uppercase */}
          <div className="font-mono flex items-center justify-between text-[11px] uppercase tracking-wider text-[#a1a1aa] mb-3">
            <span>{p.tag}</span>
          </div>

          {/* Project Title in pure bold white Archivo */}
          <h3 className="text-2xl sm:text-[26px] font-bold leading-snug text-[#ffffff] tracking-[-0.02em]">
            {p.title}
          </h3>

          {/* Description matching the testimonial card paragraph style */}
          <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-[#d4d4d8] font-normal">
            {p.description}
          </p>

          {/* Stack Pills with dark glass background and light text */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90 border border-white/5"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons in Black & White Theme */}
        <div className="flex flex-wrap items-center gap-2.5 pt-8 mt-4 border-t border-white/10">
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
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#ffffff] text-[#000000] px-4 py-2 text-xs font-semibold transition-all hover:bg-neutral-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
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
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 text-white px-3.5 py-2 text-xs font-semibold transition-all hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Github className="size-3.5" />
              GitHub
            </a>
          )}
          {p.caseStudy && (
            <a
              href={p.caseStudy}
              onClick={(e) => {
                trackEvent("project_link_click", { project: p.title, link_type: "case_study" });
                linkHandler(p.caseStudy)(e);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 text-white px-3.5 py-2 text-xs font-semibold transition-all hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <BookOpen className="size-3.5" />
              Case study
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

function ProjectGrid({ items, isFeatured }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 sm:gap-7">
      {items.map((p) => (
        <div
          key={p.title}
          className="w-full md:w-[calc(50%-0.875rem)] lg:w-[calc(33.333%-1.2rem)]"
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
      <span className="font-mono text-xs uppercase tracking-wider text-[#767676]">
        // {kicker}
      </span>
      <h3 className="text-base sm:text-lg font-semibold text-[#111111] tracking-tight">{title}</h3>
      <div className="ml-2 h-px flex-1 bg-[#e2ded7]" />
    </div>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      label="projects"
      title="Selected Work."
      subtitle="Production full-stack platforms, scalable architectures, and responsive web applications."
    >
      <GroupHeading kicker="featured" title="Featured Platforms" />
      <ProjectGrid items={featuredProjects} isFeatured={true} />

      <div className="mt-16 sm:mt-20">
        <GroupHeading kicker="more" title="Additional Applications & Tools" />
        <ProjectGrid items={secondaryProjects} isFeatured={false} />
      </div>
    </Section>
  );
}
