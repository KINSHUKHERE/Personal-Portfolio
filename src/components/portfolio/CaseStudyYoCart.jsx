import { useEffect } from "react";
import { ArrowLeft, Github, ExternalLink, ShieldCheck, CreditCard, Palette, BarChart3, Database } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "../../lib/analytics";

const META = [
  { label: "Role", value: "Sole developer" },
  { label: "Context", value: "Zentek Infosoft internship" },
  { label: "Timeline", value: "May - Aug 2026 (90 days)" },
  { label: "Type", value: "MERN e-commerce platform" },
];

const STACK = [
  "React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS",
  "Recharts", "JWT", "Google OAuth", "Razorpay",
];

const SURFACES = [
  {
    name: "Customer storefront",
    body: "Public browsing, cart and checkout. Optimised for first-visit speed, since this is the only surface most visitors ever see.",
  },
  {
    name: "Vendor namespace",
    body: "An isolated /vendor/* area where sellers manage their own catalogue and orders - scoped so a vendor can never read another vendor's data.",
  },
  {
    name: "Super Admin dashboard",
    body: "A glassmorphic control panel over the whole marketplace: users, vendors, inventory and the analytics suite.",
  },
];

const DECISIONS = [
  {
    icon: ShieldCheck,
    title: "HttpOnly JWT cookies, not localStorage",
    body: "Tokens in localStorage are readable by any script on the page, so a single XSS hole hands an attacker a valid session. Storing the JWT in an HttpOnly cookie puts it out of JavaScript's reach entirely. The trade-off is that cookies ride along automatically, so the API needs deliberate CORS and origin handling rather than getting it for free from an Authorization header.",
  },
  {
    icon: CreditCard,
    title: "Verifying Razorpay signatures server-side",
    body: "A client-reported \"payment succeeded\" is a claim, not a fact - anyone can call that endpoint. Every payment is confirmed by recomputing the HMAC-SHA256 signature from the order and payment IDs against the gateway secret, server-side. If the recomputed signature doesn't match, the order is not fulfilled.",
  },
  {
    icon: Database,
    title: "Role-based authorization as middleware",
    body: "Three surfaces means three permission levels, and scattering role checks through route handlers is how gaps appear. Authorization runs as middleware ahead of the handlers, so a new vendor or admin route is protected by default rather than by remembering to protect it.",
  },
  {
    icon: Palette,
    title: "A database-driven theme engine",
    body: "Festive themes - Diwali, Christmas and others, with keyframe-animated floating elements - are configured as data rather than hardcoded. A seasonal campaign becomes a database change instead of a redeploy, which matters when the calendar is not negotiable.",
  },
  {
    icon: BarChart3,
    title: "An analytics suite, not a stats page",
    body: "Sales trends, category performance, inventory health and top-product leaderboards, built with Recharts as area, donut and bar charts. Backed by optimised MongoDB schemas and lookup operations so the dashboard stays responsive as the collections grow.",
  },
];

function Kicker({ children }) {
  return (
    <div className="font-mono-ui mb-3 text-[11px] uppercase tracking-wider text-cyan-glow/80">
      // {children}
    </div>
  );
}

export function CaseStudyYoCart({ onBack }) {
  // Title is owned by App's route table so it can't be clobbered by effect order.
  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent("case_study_view", { project: "YoCart" });
  }, []);

  return (
    <main className="relative min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <button
          onClick={onBack}
          className="font-mono-ui mb-12 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-cyan-glow cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          back to portfolio
        </button>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Kicker>case study</Kicker>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            YoCart
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A multi-tenant MERN marketplace with three separate surfaces - a customer
            storefront, an isolated vendor panel and a Super Admin dashboard - built end to end
            over a 90-day internship.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {META.map((m) => (
              <div key={m.label}>
                <dt className="font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm text-foreground/90">{m.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <li
                key={s}
                className="rounded-md border border-cyan-glow/20 bg-cyan-glow/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-glow"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://yocart.onrender.com/"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("project_link_click", { project: "YoCart", link_type: "live_demo", location: "case_study" })}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-glow px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <ExternalLink className="size-3.5" />
              Live demo
            </a>
            <a
              href="https://github.com/KINSHUKHERE/Ecommerce-Website-MERN"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("project_link_click", { project: "YoCart", link_type: "github", location: "case_study" })}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-xs font-semibold text-foreground/90 transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
            >
              <Github className="size-3.5" />
              Source
            </a>
          </div>

          <p className="mt-4 font-mono-ui text-[11px] text-muted-foreground">
            The demo is hosted on a free Render instance - it sleeps when idle, so the first
            request can take up to a minute to wake it.
          </p>
        </motion.header>

        <hr className="my-14 border-border/60" />

        <section>
          <Kicker>the shape of it</Kicker>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Three audiences, one codebase
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A marketplace is not one application. A shopper, a seller and an operator want
            different things and are trusted differently, so YoCart is built as three distinct
            surfaces over shared services rather than one interface with features hidden by
            role.
          </p>

          <div className="mt-8 space-y-4">
            {SURFACES.map((s) => (
              <div key={s.name} className="rounded-xl border border-border bg-surface/50 p-5">
                <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-14 border-border/60" />

        <section>
          <Kicker>decisions</Kicker>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            The calls that mattered
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Most of this project was ordinary CRUD. These are the parts where the obvious
            approach was the wrong one.
          </p>

          <div className="mt-8 space-y-6">
            {DECISIONS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="mt-0.5 h-fit rounded-lg border border-cyan-glow/20 bg-cyan-glow/10 p-2 text-cyan-glow">
                  <Icon className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-14 border-border/60" />

        <section>
          <Kicker>next</Kicker>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What I would change
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The admin notification bell polls every 10 seconds. That was the right call to ship
            on time - it is trivial to reason about and has no infrastructure cost - but it
            means every open dashboard queries the API six times a minute whether anything
            happened or not. A WebSocket or server-sent events channel would carry the same
            feature at a fraction of the request volume, and it is the first thing I would
            replace if the platform took real traffic.
          </p>
        </section>

        <hr className="my-14 border-border/60" />

        <div className="text-center">
          <p className="text-muted-foreground">Want the long version?</p>
          <button
            onClick={onBack}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Back to portfolio
          </button>
        </div>
      </div>
    </main>
  );
}
