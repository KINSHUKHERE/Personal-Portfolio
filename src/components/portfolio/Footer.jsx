import { profile } from "./data";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="font-mono-ui mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground sm:flex-row">
        <div>
          Code + Coffee + React = Kinshuk © 2026
        </div>
        <div className="font-mono">
          <span className="text-cyan-glow">&gt;</span> always shipping.
        </div>
      </div>
    </footer>
  );
}
