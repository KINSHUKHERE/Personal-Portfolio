import { useState } from "react";
import { Github, Linkedin, Instagram, Mail, Check, Send } from "lucide-react";
import { profile } from "./data";
import { trackEvent, trackOutbound } from "../../lib/analytics";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent("contact_form_submit", { location: "contact" });

    // Compose mailto link so the message goes directly to Kinshuk's inbox
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name || "Portfolio Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject details:\n${formData.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28 font-['Archivo',sans-serif] select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading + Subtitle + Social Icons */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full pt-2">
          <div>
            {/* Kicker */}
            <div className="font-mono text-xs uppercase tracking-wider text-[#767676] mb-4">
              // contact
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-[-0.04em] text-[#111111] leading-[1.05] m-0">
              Let&apos;s build something.
            </h2>

            {/* Subtitle */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#767676] max-w-md">
              Open to internships, freelance projects, and full-stack roles. Fill out the form or reach out directly.
            </p>
          </div>

          {/* Social Icon Pills (matching reference bottom-left) */}
          <div className="flex items-center gap-2.5 pt-12 sm:pt-20">
            <a
              href={profile.socials.github}
              onClick={() => trackOutbound("GitHub", profile.socials.github, { location: "contact" })}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 text-[#111111] transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Github className="size-4" />
            </a>

            <a
              href={profile.socials.linkedin}
              onClick={() => trackOutbound("LinkedIn", profile.socials.linkedin, { location: "contact" })}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 text-[#111111] transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Linkedin className="size-4" />
            </a>

            <a
              href={profile.socials.instagram}
              onClick={() => trackOutbound("Instagram", profile.socials.instagram, { location: "contact" })}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 text-[#111111] transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Instagram className="size-4" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              onClick={() => trackEvent("email_click", { location: "contact" })}
              aria-label="Email"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 text-[#111111] transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Dark Form Card (matching reference right card) */}
        <div className="lg:col-span-6 w-full">
          <div className="relative rounded-[28px] sm:rounded-[32px] bg-[#111113] text-[#F4F1ED] border border-black/10 p-7 sm:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.18)] overflow-hidden">
            
            {/* Subtle fine noise overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-10"
              style={{
                backgroundImage: "url('/images/noise.png')",
                backgroundRepeat: "repeat",
              }}
            />

            <form onSubmit={handleSubmit} className="relative z-20 flex flex-col gap-5">
              {/* Field 1: Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs sm:text-sm font-medium text-white/90 mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Field 2: Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs sm:text-sm font-medium text-white/90 mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Field 3: Your Project / Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs sm:text-sm font-medium text-white/90 mb-2"
                >
                  Your Project
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project"
                  className="w-full bg-[#1c1c1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors min-h-[130px] resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full py-3.5 px-6 rounded-xl bg-[#ffffff] text-[#000000] text-sm font-bold hover:bg-neutral-200 transition-all cursor-pointer shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <Check className="size-4 text-emerald-600" />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <Send className="size-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
