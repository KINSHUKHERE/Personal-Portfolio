import { Section } from "./Section";
import { profile } from "./data";
import { Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <Section
      id="contact"
      label="contact"
      title="Let's build something."
      subtitle="Open to internships, freelance projects, and full-stack roles."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <a
            href={profile.socials.mail}
            className="group flex items-center justify-between rounded-xl border border-border bg-surface/60 p-5 backdrop-blur transition-colors hover:border-cyan-glow/50"
          >
            <div className="flex items-center gap-4">
              <Mail className="size-5 text-cyan-glow" />
              <div>
                <div className="font-mono-ui text-[11px] uppercase tracking-wider text-muted-foreground">
                  email
                </div>
                <div className="text-foreground">{profile.email}</div>
              </div>
            </div>
            <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>

          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="group flex items-center justify-between rounded-xl border border-border bg-surface/60 p-5 backdrop-blur transition-colors hover:border-cyan-glow/50"
          >
            <div className="flex items-center gap-4">
              <Phone className="size-5 text-cyan-glow" />
              <div>
                <div className="font-mono-ui text-[11px] uppercase tracking-wider text-muted-foreground">
                  phone
                </div>
                <div className="text-foreground">{profile.phone}</div>
              </div>
            </div>
            <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>

          <div className="flex gap-3 pt-2">
            {[
              { href: profile.socials.github, icon: Github, label: "GitHub" },
              { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: profile.socials.instagram, icon: Instagram, label: "Instagram" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-xl border border-border bg-surface/60 p-3 text-muted-foreground backdrop-blur transition-colors hover:border-cyan-glow/50 hover:text-cyan-glow"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget;
            const name = f.elements.namedItem("name").value;
            const email = f.elements.namedItem("email").value;
            const msg = f.elements.namedItem("message").value;
            window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
              `Portfolio inquiry - ${name}`,
            )}&body=${encodeURIComponent(`${msg}\n\nFrom: ${name} <${email}>`)}`;
          }}
          className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur"
        >
          <label className="font-mono-ui block text-[11px] uppercase tracking-wider text-muted-foreground">
            Name
            <input
              name="name"
              required
              className="mt-1.5 block w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-glow/60 focus:outline-none"
              placeholder="Your name"
            />
          </label>
          <label className="font-mono-ui mt-4 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-1.5 block w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-glow/60 focus:outline-none"
              placeholder="you@example.com"
            />
          </label>
          <label className="font-mono-ui mt-4 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="mt-1.5 block w-full resize-none rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-glow/60 focus:outline-none"
              placeholder="Tell me about your project..."
            />
          </label>
          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 glow-ring"
          >
            Send Message →
          </button>
        </form>
      </div>
    </Section>
  );
}
