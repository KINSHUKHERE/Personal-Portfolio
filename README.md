# 🌌 Kinshuk Khandelwal's 3D Developer Portfolio

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=flat-square&logo=three.js)](https://threejs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A high-performance, responsive 3D developer portfolio designed to showcase projects, skills, and work experience using a hybrid 3D/2D user interface. Features smooth physics-based graphics, cursor-reactive elements, and state-of-the-art web design patterns.

🔗 **Live Link:** [kinshukkhandelwal.qzz.io](https://kinshukkhandelwal.qzz.io)

---

## ✨ Features & Visual Highlights

### 🌀 1. High-Fidelity 3D Interactive Backdrop
* **Double Concentric Octahedrons:** Features floating 3D wireframe octahedron shells with rotating inner solid cores that float dynamically using React Three Fiber (R3F) and `@react-three/drei`.
* **Rotational Drag Interaction:** Users can click, hold (PointerDown), and drag on any of the three floating diamonds to rotate them dynamically in 3D around their X and Y axes. When released, they retain their new rotation and float naturally.
* **Interactive Constellation & Spiderweb:** An interactive star field draws links connecting nodes. Moving your cursor draws cyan/teal spiderweb lines from your pointer to nearby stars, repelling particles on hover.
* **Theme-Adaptive Particle Density:** Automatically switches star density on theme toggle (up to **240 particles** in Dark Mode, scaled back to **120 particles** in Light Mode to maintain visual balance).

### 🎨 2. Theme-Adaptive Styling & Contrast Fixes
* **Living Ambient Glows:** Backdrop glows slowly float, scale, and drift over a 20–25s cycle using GPU-accelerated keyframe CSS animations.
* **Consistent Header Contrast:** Fully responsive navbar links, icons, and logo (`kinshuk.dev`) that adapt to active light/dark themes instantly, preventing low contrast at the top of the page.
* **Centered Hero Content:** availability badge, gradient title, recruiter CTA buttons, and social links aligned in a clean flex layout.

### 💼 3. Curated Project Showcase
* **YoCart (MERN Stack):** Enterprise-ready MERN e-commerce ecosystem featuring a customer storefront, an isolated vendor panel (`/vendor/*`), and a glassmorphic Super Admin dashboard. Powered by a database-driven festive theme engine, smart option swatch validation, Stripe-style checkouts, and Recharts SaaS analytics.
* **Tanjore Coffee (HTML/CSS/JS):** Beautiful, fully responsive coffee brand landing page with premium assets, smooth hover states, and clean layouts.
* **Todo Website (Vanilla JS):** A fast, lightweight checklist application for tracking developer tasks.

### 🛠️ 4. Technical Optimizations & SEO Essentials
* **120 FPS Render Loops:** Hoisted DOM queries and calculations out of ThreeJS and Canvas animation loops, cutting $O(N^2)$ checks down to a single check per frame.
* **Secure PDF Downloads:** Replaced Google Drive redirects for resume downloads with a secure, same-origin local file download (`/public/Kinshuk_Khandelwal_Resume.pdf`) matching Google Search Console safety guidelines.
* **Crawler-Ready Technical SEO:** Features a canonical `sitemap.xml` listing all pages, a configured `robots.txt` file, structured HTML5 semantic headings (single `<h1>` title), and crawlable navigation anchor links.
* **Theme Toggle Error Pages:** Custom offline and 404 views styled with swinging SVG lanterns that adapt dynamically to the active color theme.

---

## 🛠️ Tech Stack

* **Core Framework:** React 19 (Hooks, Context)
* **3D Rendering:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Animations:** GSAP, Framer Motion, Lenis (Smooth Scroll)
* **Styles:** Tailwind CSS v4, Vanilla CSS
* **Build System:** Vite
* **Email API:** EmailJS Browser API

---

## 🚀 Local Installation & Setup

Get a copy of this project running on your local machine by following these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/KINSHUKHERE/Personal-Portfolio.git
   cd Personal-Portfolio
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Run in Development Mode:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## ☁️ Deployment Environment Configuration

Since the `.env` file is excluded from version control via `.gitignore`, you need to set up environment variables manually in your deployment provider (e.g., Vercel, Netlify, or Render):

1. Add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` as environment variables in your provider's dashboard.
2. Trigger a **new build/redeploy** to inject these keys into the compiled production bundle.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
