# 🌌 Kinshuk Khandelwal's 3D Portfolio Website

A sleek, interactive, and fully responsive 3D developer portfolio designed to showcase projects, skills, and work experience using a hybrid 3D/2D user interface.

🔗 **Live Link:** [kinshukkhandelwal.qzz.io](https://kinshukkhandelwal.qzz.io)

---

## ✨ Key Features

* **🎥 Redesigned Hero Background:** Immersive full-screen background video integration with custom brightness settings, responsive gradient masks (desktop left-to-right, mobile top-to-bottom) for maximum legibility, and a slow-floating glassmorphic diagnostic HUD card (`USER: KINSHUK_KHANDELWAL`).
* **🟢 Smart Autoplay Audio & Controls:** Autoplays video unmuted by default with a graceful fallback to muted autoplay if browser permissions block audio. Features a glassmorphic bottom-right mute/unmute toggle button.
* **📱 Snappy Mobile Navigation:** Re-engineered mobile hamburger menu GSAP transitions, replacing nested timelines and random stagger values with unified stagger tweens. Tapping opens and renders navigation bubbles in under 0.37s (down from 1.2s).
* **💬 Recruiter FAQ Section:** A new glassmorphic accordion-style FAQ component positioned just above the contact form, answering 5 key recruitment questions (internship/full-time availability, MERN stack, SQL/NoSQL database skills, remote work, and relocation).
* **✉️ Upgraded Contact Terminal:** A futuristic message card wrapped in HUD corner brackets, featuring a simulated terminal header, focus-glowing cyber input fields, and custom social link buttons that light up with distinct brand colors (GitHub: white, LinkedIn: blue, Instagram: pink) on hover.
* **🗺️ Shift-Free Map Modal:** Refactored the inline Google Map widget to open inside a fixed fullscreen backdrop overlay, resolving previous layout shifts and visual stuttering. The map is centered at **Poornima University, Jaipur**.
* **🌀 Interactive 3D Canvas:** Immersive particle systems, starry background fields, and mouse-reactive stage components powered by **Three.js**, **React Three Fiber (R3F)**, and **Drei**.
* **🌓 Theme-Aware 404 & Offline State:** Custom-designed error views featuring swinging lantern SVG animations. Rethemed dynamically to match active color tokens (cyan/violet glow and surfaces) with connection drop monitoring.

---

## 🛠️ Tech Stack

* **Frontend Library:** React 19 (Hooks, Context, and State management)
* **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Animations:** GSAP, Framer Motion, Lenis
* **Styles:** Tailwind CSS v4, Vanilla CSS
* **Build System:** Vite
* **Email API:** EmailJS Browser API

---

## 🚀 Local Installation & Setup

Get a copy of this project running on your local machine by following these steps.

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

Since the `.env` file is excluded from version control via `.gitignore`, you need to set up environment variables manually in your deployment provider (e.g., Vercel, Netlify, or GitHub Pages):

1. Add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` as environment variables in your provider's dashboard.
2. Trigger a **new build/redeploy** to inject these keys into the compiled production bundle.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
