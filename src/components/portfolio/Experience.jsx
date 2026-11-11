import { useEffect, useRef } from "react";
import { Briefcase } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "./Section";
import { experience } from "./data";

gsap.registerPlugin(ScrollTrigger);

const techMap = {
  "Zentek Infosoft": ["React", "Node.js", "Express", "MongoDB", "Supabase", "Vercel", "Netlify", "Render", "Postman"],
  "ShadowFox (Remote)": ["HTML5", "CSS3", "JavaScript", "Responsive"],
};

export function Experience() {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray("[data-exp-card]").forEach((card) => {
        const side = card.dataset.side === "right" ? 60 : -60;
        gsap.fromTo(
          card,
          { x: side, opacity: 0, y: 30 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
      });

      gsap.utils.toArray("[data-exp-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: dot, start: "top 80%" },
          },
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="experience"
      label="experience"
      title="Where I've worked."
      subtitle="Production internships and hands-on software development."
    >
      <div ref={wrapRef} className="relative mx-auto max-w-5xl">
        {/* Animated Vertical Line */}
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-black/10 md:left-1/2 md:-translate-x-1/2">
          <div
            ref={lineRef}
            className="h-full w-full origin-top bg-gradient-to-b from-[#111111] via-neutral-700 to-[#111111]/10"
          />
        </div>

        <ul className="space-y-16">
          {experience.map((e, i) => {
            const right = i % 2 === 1;
            const tech = techMap[e.company] || [];
            return (
              <li key={e.role + e.company} className="relative">
                {/* Timeline Dot */}
                <span
                  data-exp-dot
                  className="absolute left-4 top-6 z-10 grid size-3.5 -translate-x-1/2 place-items-center rounded-full border border-black/20 bg-[#F4F1ED] md:left-1/2"
                >
                  <span className="size-1.5 rounded-full bg-[#111111] shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
                </span>

                <div className="grid md:grid-cols-2 md:gap-12">
                  <div className={right ? "md:order-2" : ""}>
                    <div
                      data-exp-card
                      data-side={right ? "right" : "left"}
                      className="ml-10 rounded-[24px] border border-black/10 bg-[#ffffff] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all hover:border-black/20 md:ml-0 text-[#111111]"
                    >
                      <div className="font-mono flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#767676]">
                        <Briefcase className="size-3.5 text-[#111111]" />
                        <span>{e.period}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold text-[#111111]">{e.company}</h3>
                      <p className="text-sm font-semibold text-[#767676]">{e.role}</p>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#444444]">
                        {e.points.map((pt) => (
                          <li key={pt} className="flex gap-2.5 items-start">
                            <span
                              aria-hidden
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-[#111111]"
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      {tech.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {tech.map((t) => (
                            <li
                              key={t}
                              className="font-mono rounded-full border border-black/10 bg-black/5 px-2.5 py-0.5 text-[11px] font-semibold text-[#111111]"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className={right ? "md:order-1" : ""} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
