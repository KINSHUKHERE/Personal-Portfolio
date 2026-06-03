import { Sparkles } from "lucide-react";
import { skills } from "./data";

const ITEMS = skills.flatMap((s) => s.items);

function Row({ reverse = false }) {
  return (
    <div
      className="marquee-track flex shrink-0 items-center gap-10 px-5"
      style={{ animationDirection: reverse ? "reverse" : "normal" }}
    >
      {ITEMS.concat(ITEMS).map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="font-mono-ui flex items-center gap-3 whitespace-nowrap text-2xl font-medium text-foreground/70 sm:text-3xl"
        >
          {t}
          <Sparkles className="size-4 text-cyan-glow/70" aria-hidden />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Tech stack marquee"
      className="relative isolate overflow-hidden border-y border-border/60 bg-surface/40 py-8 backdrop-blur"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />
      <div className="marquee-viewport flex">
        <Row />
        <Row />
      </div>
    </section>
  );
}
