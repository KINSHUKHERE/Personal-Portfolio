/**
 * Google Analytics 4 (gtag.js) integration.
 *
 * Set VITE_GA_MEASUREMENT_ID in .env (and in your Netlify env vars) to enable.
 * Analytics only load in production builds, so local dev traffic never pollutes
 * your reports. To test locally, also set VITE_GA_DEBUG=true — events then show
 * up in GA4's DebugView.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const DEBUG = import.meta.env.VITE_GA_DEBUG === "true";
const ENABLED = Boolean(MEASUREMENT_ID) && (import.meta.env.PROD || DEBUG);

let initialized = false;

export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;

  if (!ENABLED) {
    if (import.meta.env.DEV && !MEASUREMENT_ID) {
      console.info("[analytics] VITE_GA_MEASUREMENT_ID is not set - GA is off.");
    }
    return;
  }

  initialized = true;

  window.dataLayer = window.dataLayer || [];
  // gtag relies on `arguments`, so this must stay a function declaration.
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    // We send page_view manually so the client-side route changes in App.jsx
    // (the 404 view) are counted correctly.
    send_page_view: false,
    ...(DEBUG ? { debug_mode: true } : {}),
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  trackPageview();
}

export function trackPageview(path) {
  if (!ENABLED || typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_path: path ?? window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!ENABLED || typeof window.gtag !== "function") return;

  window.gtag("event", name, params);
}

/** Click on a link that leaves the site (socials, repos, live demos, resume). */
export function trackOutbound(label, url, extra = {}) {
  trackEvent("outbound_click", { link_label: label, link_url: url, ...extra });
}
