import { profile } from "./data";

const quickLinks = [
  { label: "Home", href: "#top" },
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#08080a] text-white border-t border-white/10 pt-16 sm:pt-20 md:pt-24">
      {/* Top Content Row */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 pb-12 sm:pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Left Column: Bold Headline */}
          <div className="md:col-span-5 lg:col-span-6">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] max-w-md">
              Scaling<br />
              Start-ups<br />
              for Growth.
            </h2>
          </div>

          {/* Middle Column: Quick Links with White Pill Buttons */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="font-mono text-xs sm:text-sm font-medium text-white/60 mb-4 tracking-wide">
              /Quick links
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-2.5 max-w-[280px]">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white text-neutral-950 text-xs sm:text-sm font-semibold shadow-sm transition-all duration-150 hover:scale-105 active:scale-95 hover:bg-neutral-200 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact info */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs sm:text-sm font-medium text-white/60 mb-4 tracking-wide">
              /Contact
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm sm:text-base font-medium text-white hover:text-cyan-glow transition-colors block break-all"
            >
              {profile.email}
            </a>

            <div className="mt-4 flex items-center gap-3 text-xs text-white/50">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>

            <div className="mt-8">
              <a
                href="#top"
                className="font-mono text-xs text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Giant Display Name: KINSHUK showing top ~80% */}
      <div className="relative w-full overflow-hidden flex justify-center pointer-events-none select-none">
        <div
          aria-hidden="true"
          className="w-full text-center font-display font-black uppercase whitespace-nowrap tracking-[-0.04em] text-[20vw] leading-[0.74] translate-y-[20%] text-[#1a1b20] transition-colors"
          style={{
            fontFamily: "var(--font-display)",
          }}
        >
          KINSHUK
        </div>
      </div>
    </footer>
  );
}
