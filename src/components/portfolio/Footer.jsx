import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { profile } from "./data";

const socials = [
  { href: profile.socials.github, icon: Github, label: "GitHub" },
  { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: profile.socials.instagram, icon: Instagram, label: "Instagram" },
  { href: profile.socials.mail, icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="font-mono-ui mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground sm:flex-row">
        <div>
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind and Three.js.
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="rounded-full border border-border bg-surface/60 p-2 text-muted-foreground transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
            >
              <Icon className="size-3.5" />
            </a>
          ))}
        </div>
        <div>
          <span className="text-cyan-glow">{">"}</span> always shipping.
        </div>
      </div>
    </footer>
  );
}
