# 🌌 Kinshuk Khandelwal's 3D Portfolio Website

A sleek, interactive, and fully responsive 3D developer portfolio designed to showcase projects, skills, and work experience using a hybrid 3D/2D user interface.

🔗 **Live Link:** [kinshukkhandelwal.qzz.io](https://kinshukkhandelwal.qzz.io)

---

## ✨ Key Features

* **🌀 Interactive 3D Canvas:** Immersive particle systems, starry background fields, and mouse-reactive stage components powered by **Three.js**, **React Three Fiber (R3F)**, and **Drei**.
* **🌓 Dark & Light Mode:** Seamless transition controls utilizing custom theme variables tailored for maximum readability and visual depth in both themes.
* **📜 Smooth Scrolling:** Native-feeling physics and momentum-based page navigation integrated using **Lenis** with page layout safety guards to prevent horizontal overflows.
* **📈 Elegant Animations:** Reveal-on-scroll elements, micro-interactions, counts, and slick card motions using **GSAP** and **Framer Motion**.
* **💻 Interactive Retro Terminal:** Simulate a classic CLI system displaying short summaries about my profile.
* **✉️ Direct Contact Form:** Fully integrated with **EmailJS** API for secure and instant message delivery, complete with custom templates.
* **🕯️ Theme-Aware 404 & Offline State:** Custom-designed error views featuring Swarup Kumar (`uiswarup`)'s swinging lantern SVG animation. Rethemed dynamically to match the site's active color tokens (cyan/violet glow and surfaces), with instant connection drop monitoring and URL routing protection.
* **🗓️ Interactive Widgets:** Built-in compact overlays like the expandable Google Maps widget (`ViewOnMap`) and the interactive watermelon-ui calendar scheduling drawer (`InlineAction`) shown after form submission.

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
