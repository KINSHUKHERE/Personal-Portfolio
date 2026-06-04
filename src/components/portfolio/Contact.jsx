import { useState } from "react";
import { Section } from "./Section";
import { profile } from "./data";
import { Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: "New Message from Portfolio",
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus("error");
      });
  };

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
            href={`mailto:${profile.email}`}
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
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur"
        >
          <label className="font-mono-ui block text-[11px] uppercase tracking-wider text-muted-foreground">
            Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1.5 block w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-glow/60 focus:outline-none"
              placeholder="you@example.com"
            />
          </label>
          <label className="font-mono-ui mt-4 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="mt-1.5 block w-full resize-none rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-glow/60 focus:outline-none"
              placeholder="Tell me about your project..."
            />
          </label>

          {status === "success" && (
            <div className="mt-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
              Message sent successfully!
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
              Failed to send message. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 glow-ring disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
    </Section>
  );
}
