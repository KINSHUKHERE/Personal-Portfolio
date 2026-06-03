import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "./data";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { href: profile.socials.github, icon: Github, label: "GitHub" },
  { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: profile.socials.mail, icon: Mail, label: "Email" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-background/60 border-b border-border/60"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono-ui text-sm tracking-tight text-cyan-glow">
          kinshuk<span className="text-foreground">.dev</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono-ui text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
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
          <a
            href="#contact"
            className="font-mono-ui ml-1 rounded-full border border-border bg-surface px-4 py-2 text-xs text-foreground transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
          >
            Hire me →
          </a>
        </div>
      </nav>
    </header>
  );
}
