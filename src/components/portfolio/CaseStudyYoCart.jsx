import { useEffect } from "react";
import { ArrowLeft, Github, ExternalLink, ShieldCheck, CreditCard, BarChart3, Database, RefreshCw, Layers, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "../../lib/analytics";

const META = [
  { label: "Role", value: "Full-Stack Developer" },
  { label: "Context", value: "Zentek Infosoft Internship" },
  { label: "Timeline", value: "May - Aug 2026 (90 days)" },
  { label: "Type", value: "Multi-role MERN marketplace" },
];

const STACK = [
  "Node.js", "Express.js", "MongoDB", "React.js", "Tailwind CSS",
  "JWT", "Google OAuth", "Razorpay", "Recharts",
];

const SURFACES = [
  {
    name: "Customer storefront",
    body: "Public catalog browsing, cart operations, and checkout. Optimized for first-visit speed, since this is the only surface public shoppers interact with.",
  },
  {
    name: "Vendor namespace (/vendor/*)",
    body: "An isolated portal where verified merchants manage their product catalogs and orders - strictly scoped with RBAC so a vendor can never access or modify another vendor's inventory.",
  },
  {
    name: "Super Admin dashboard (/admin/*)",
    body: "A centralized control panel overseeing the entire marketplace: users, vendor approvals, dispute management, and business intelligence analytics.",
  },
];

const DECISIONS = [
  {
    icon: ShieldCheck,
    title: "HttpOnly JWT cookies, not localStorage",
    body: "Tokens in localStorage are readable by any script on the page, meaning a single XSS flaw exposes the session. Storing the JWT in an HttpOnly cookie keeps it completely inaccessible to client-side JavaScript. Deliberate CORS and origin handling were implemented to protect against CSRF attacks.",
  },
  {
    icon: CreditCard,
    title: "Verifying Razorpay signatures server-side",
    body: "A client-reported 'payment succeeded' is a claim, not verified proof. Every transaction is confirmed on the server by recomputing the HMAC-SHA256 signature from the order and payment IDs against the gateway secret. In addition, the payable amount is re-validated against database pricing to prevent client-side price tampering.",
  },
  {
    icon: Database,
    title: "Role-based authorization as middleware",
    body: "Managing permissions across customer, vendor, and admin roles inside handlers creates security risks. Authorization runs as reusable middleware ahead of all handlers, guaranteeing that newly added routes are protected by default.",
  },
  {
    icon: BarChart3,
    title: "Analytics pipeline with MongoDB aggregation",
    body: "Sales trends, category distributions, inventory health, and top-product rankings are calculated dynamically using MongoDB aggregation pipelines and rendered via Recharts, avoiding slow client-side filtering.",
  },
];

function Kicker({ children }) {
  return (
    <div className="font-mono mb-3 text-[11px] uppercase tracking-wider text-neutral-400">
      // {children}
    </div>
  );
}

export function CaseStudyYoCart({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent("case_study_view", { project: "YoCart" });
  }, []);

  return (
    <main className="relative min-h-screen bg-[#111113] text-[#F4F1ED] font-['Archivo',sans-serif] selection:bg-white selection:text-black">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <button
          onClick={onBack}
          className="font-mono mb-12 inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors hover:text-white cursor-pointer"
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
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            YoCart
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-300">
            A multi-role marketplace with vendor-isolated data featuring three distinct surfaces - a customer
            storefront, an isolated vendor panel and a Super Admin dashboard. Engineered as a core full-stack production project during my Software Developer Internship at Zentek Infosoft.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {META.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white/90">{m.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/90"
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
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-xs font-semibold transition-all hover:bg-neutral-200"
            >
              <ExternalLink className="size-3.5" />
              Live demo
            </a>
            <a
              href="https://github.com/KINSHUKHERE/Ecommerce-Website-MERN"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("project_link_click", { project: "YoCart", link_type: "github", location: "case_study" })}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15"
            >
              <Github className="size-3.5" />
              GitHub Source
            </a>
          </div>

          <p className="mt-4 font-mono text-[11px] text-neutral-400">
            Note: The demo is hosted on a free Render instance which spins down during inactivity; cold start requests may take up to 45 seconds.
          </p>
        </motion.header>

        <hr className="my-14 border-white/10" />

        {/* System Architecture Diagram */}
        <section>
          <Kicker>architecture</Kicker>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            System Architecture & Request Lifecycle
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300 text-sm sm:text-base">
            High-level overview of how client surfaces communicate with protected backend resource groups and data stores:
          </p>

          <div className="mt-8 rounded-2xl border border-white/15 bg-black/40 p-6 font-mono text-xs text-neutral-300 overflow-x-auto">
            <div className="flex flex-col gap-3 min-w-[540px]">
              {/* Layer 1: Client Surfaces */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="flex-1 py-1 px-2 rounded bg-neutral-800 text-white font-semibold">Storefront (Buyer)</span>
                <span className="text-neutral-500">|</span>
                <span className="flex-1 py-1 px-2 rounded bg-neutral-800 text-white font-semibold">Vendor Panel (/vendor/*)</span>
                <span className="text-neutral-500">|</span>
                <span className="flex-1 py-1 px-2 rounded bg-neutral-800 text-white font-semibold">Super Admin (/admin/*)</span>
              </div>

              <div className="text-center text-neutral-500 text-sm">↓ Secure HTTPS REST APIs (15+ Resource Groups)</div>

              {/* Layer 2: API Gateway & Security */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                <div className="font-bold text-white mb-2">// Node.js & Express Security Gateway</div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <span className="p-1.5 rounded bg-black/60 border border-white/10">HttpOnly JWT / OAuth</span>
                  <span className="p-1.5 rounded bg-black/60 border border-white/10">RBAC Middleware</span>
                  <span className="p-1.5 rounded bg-black/60 border border-white/10">Rate Limiting & Helmet</span>
                </div>
              </div>

              <div className="text-center text-neutral-500 text-sm">↓ Authenticated Request Pipeline</div>

              {/* Layer 3: Core Domain Services */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                <div className="font-bold text-white mb-2">// Backend Business Engines</div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <span className="p-1.5 rounded bg-black/60 border border-white/10">Atomic Checkout Engine</span>
                  <span className="p-1.5 rounded bg-black/60 border border-white/10">Razorpay HMAC-SHA256</span>
                  <span className="p-1.5 rounded bg-black/60 border border-white/10">Aggregation Analytics</span>
                </div>
              </div>

              <div className="text-center text-neutral-500 text-sm">↓ Atomic Queries & Aggregations</div>

              {/* Layer 4: Storage */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center font-bold text-white">
                MongoDB Cluster (Isolated Vendor Documents · Products · Orders · Customers)
              </div>
            </div>
          </div>
        </section>

        <hr className="my-14 border-white/10" />

        {/* Surfaces Section */}
        <section>
          <Kicker>the shape of it</Kicker>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Three audiences, one codebase
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300 text-sm sm:text-base">
            YoCart is architected as three distinct surfaces over shared backend services rather than one interface with features hidden by role:
          </p>

          <div className="mt-8 space-y-4">
            {SURFACES.map((s) => (
              <div key={s.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <h3 className="text-base font-bold text-white">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-14 border-white/10" />

        {/* Checkout without overselling */}
        <section>
          <Kicker>concurrency & data integrity</Kicker>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Checkout without overselling
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300 text-sm sm:text-base">
            In an e-commerce marketplace, race conditions during checkout are a critical vulnerability:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5">
              <h3 className="text-sm font-bold text-red-300 flex items-center gap-2">
                <span>The Problem: Concurrent Race Conditions</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                If two shoppers attempt to purchase the final unit of an item simultaneously, naive check-then-update logic reads stock &gt; 0 for both buyers, decrementing the database twice and creating negative inventory (overselling).
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <span>The Solution: Atomic Compare-and-Decrement</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                Stock is reduced in MongoDB via atomic compare-and-decrement operations (<code className="bg-black/60 px-1.5 py-0.5 rounded text-emerald-300">$inc: &#123; stock: -quantity &#125;</code> conditioned on <code className="bg-black/60 px-1.5 py-0.5 rounded text-emerald-300">&#123; stock: &#123; $gte: quantity &#125; &#125;</code>). The database driver executes this as a single atomic CPU operation, guaranteeing that only one request can succeed.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <RefreshCw className="size-4 text-neutral-400" />
                <span>Multi-Item Rollback on Partial Failure</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                If an order contains multiple items and a subsequent item fails stock verification partway through the loop, previously decremented items are automatically compensated with rollback updates, preventing cart corruption.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-14 border-white/10" />

        {/* Architecture Decisions */}
        <section>
          <Kicker>decisions</Kicker>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Key Architecture & Security Decisions
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300 text-sm sm:text-base">
            Deliberate design choices made to enforce production-grade security and reliability:
          </p>

          <div className="mt-8 space-y-6">
            {DECISIONS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="mt-1 shrink-0 rounded-xl border border-white/15 bg-white/5 p-2 text-white">
                  <Icon className="size-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-14 border-white/10" />

        {/* What I would improve */}
        <section>
          <Kicker>retrospective</Kicker>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            What I'd improve
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300 text-sm sm:text-base">
            Honest engineering reflections on what I would enhance in the next iteration:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-bold text-white">1. Automated Integration & Concurrency Tests</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                Add end-to-end integration test suites using Jest and Supertest to automatically verify payment webhook verification, checkout race conditions, and RBAC boundary enforcement on continuous integration.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-bold text-white">2. Redis Caching Layer</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                Implement a Redis cache in front of frequently queried public catalog endpoints with tag-based invalidation when vendors update inventory, reducing direct database read load.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-bold text-white">3. Real-Time WebSockets & Containerized Cloud Deployment</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                Replace client-side HTTP polling for admin order notifications with persistent WebSockets or Server-Sent Events (SSE), and containerize the service with Docker for deployment on managed infrastructure.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-14 border-white/10" />

        <div className="text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white text-black px-6 py-3 text-sm font-bold transition-all hover:bg-neutral-200 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Back to portfolio
          </button>
        </div>
      </div>
    </main>
  );
}
