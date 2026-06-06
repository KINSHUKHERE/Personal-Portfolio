import { useState } from "react";
import { Section } from "./Section";
import { profile } from "./data";
import { Github, Linkedin, Instagram, Mail, Phone, CalendarDays, ShieldAlert, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { ViewOnMap } from "./ViewOnMap";
import { InlineAction } from "./InlineAction";
import { motion } from "framer-motion";

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
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-stretch">
        
        {/* Left Column (col-span-5) - Direct Channels */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase text-cyan-400/80 mb-4 tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              [ Direct Channels ]
            </div>

            {/* Email Card */}
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur transition-all duration-300 hover:border-cyan-glow/50 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    email
                    <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-sm text-foreground group-hover:text-cyan-400 transition-colors font-mono">{profile.email}</div>
                </div>
              </div>
              <span className="text-cyan-400 font-mono transition-transform group-hover:translate-x-1 duration-300">
                →
              </span>
            </a>

            {/* Phone Card */}
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur transition-all duration-300 hover:border-cyan-glow/50 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <Phone className="size-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    phone
                    <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-sm text-foreground group-hover:text-cyan-400 transition-colors font-mono">{profile.phone}</div>
                </div>
              </div>
              <span className="text-cyan-400 font-mono transition-transform group-hover:translate-x-1 duration-300">
                →
              </span>
            </a>
          </div>

          {/* Social Links Panel */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase text-cyan-400/80 mb-2 tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              [ Networks ]
            </div>
            <div className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.02] max-w-max backdrop-blur-md">
              {[
                { href: profile.socials.github, icon: Github, label: "GitHub", colorClass: "hover:text-white hover:bg-white/5 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]" },
                { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn", colorClass: "hover:text-[#0077b5] hover:bg-[#0077b5]/5 hover:border-[#0077b5]/20 hover:shadow-[0_0_15px_rgba(0,119,181,0.15)]" },
                { href: profile.socials.instagram, icon: Instagram, label: "Instagram", colorClass: "hover:text-[#e1306c] hover:bg-[#e1306c]/5 hover:border-[#e1306c]/20 hover:shadow-[0_0_15px_rgba(225,48,108,0.15)]" },
              ].map(({ href, icon: Icon, label, colorClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`rounded-xl border border-white/10 bg-white/5 p-3 text-muted-foreground backdrop-blur transition-all duration-300 ${colorClass}`}
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="pt-4">
            <ViewOnMap address="Poornima University, Jaipur" />
          </div>
        </div>

        {/* Right Column (col-span-7) - Cyber Form Card */}
        <div className="col-span-12 md:col-span-7 relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 md:p-8 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          {/* Cyber Corner HUD Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/40 rounded-br-lg pointer-events-none" />

          {/* Form Header Readout */}
          <div className="flex items-center border-b border-white/10 pb-4 mb-6 text-[10px] uppercase tracking-widest text-cyan-400/80 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Contact Kinshuk Khandelwal
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="font-mono block text-[10px] uppercase tracking-wider text-cyan-400/70">
              Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1.5 block w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-3 text-xs text-white placeholder:text-muted-foreground/40 focus:border-cyan-400/50 focus:bg-neutral-900/80 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] focus:outline-none transition-all duration-300 font-mono"
                placeholder="INPUT_YOUR_NAME"
              />
            </label>

            <label className="font-mono block text-[10px] uppercase tracking-wider text-cyan-400/70">
              Email Address
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1.5 block w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-3 text-xs text-white placeholder:text-muted-foreground/40 focus:border-cyan-400/50 focus:bg-neutral-900/80 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] focus:outline-none transition-all duration-300 font-mono"
                placeholder="YOU@EXAMPLE.COM"
              />
            </label>

            <label className="font-mono block text-[10px] uppercase tracking-wider text-cyan-400/70">
              Transmission Content
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1.5 block w-full resize-none rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-3 text-xs text-white placeholder:text-muted-foreground/40 focus:border-cyan-400/50 focus:bg-neutral-900/80 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] focus:outline-none transition-all duration-300 font-mono"
                placeholder="WRITE_YOUR_MESSAGE_HERE..."
              />
            </label>

            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-400 flex items-center gap-3 font-mono"
              >
                <CheckCircle className="size-4 shrink-0 text-emerald-400" />
                <span>[SUCCESS] MESSAGE_TRANSMITTED_OK.</span>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-400 flex items-center gap-3 font-mono"
              >
                <ShieldAlert className="size-4 shrink-0 text-red-400" />
                <span>[ERROR] TRANSMISSION_FAILED. RETRY.</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold py-3 px-5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] glow-ring disabled:opacity-50 text-xs uppercase tracking-wider font-mono cursor-pointer flex items-center justify-center"
            >
              {status === "loading" ? "TRANSMITTING..." : "SEND_MESSAGE →"}
            </button>

            {status === "success" && (
              <div className="mt-6 flex flex-col items-center gap-3 border-t border-white/10 pt-6 animate-fade-in">
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground text-center">
                  Want to book a quick chat? Sync my calendar:
                </p>
                <InlineAction
                  label="Calendar"
                  icon={<CalendarDays className="size-5 text-cyan-400" />}
                  actionText="Sync Events"
                  onAction={async () => {
                    await new Promise((resolve) => setTimeout(resolve, 2500));
                  }}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
}
