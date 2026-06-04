# 🌌 Kinshuk Khandelwal | 3D Developer Portfolio

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

Welcome to my interactive 3D developer portfolio! This application is designed to showcase my software development skills, projects, and work experience using a modern, immersive, and responsive 3D/2D hybrid interface.

🔗 **Live Link:** [kinshukkhandelwal.qzz.io](https://kinshukkhandelwal.qzz.io)

---

## ✨ Features

- **🌀 Interactive 3D Backgrounds:** Rich particle fields, dynamic meshes, and mouse-reactive stage components powered by **Three.js**, **React Three Fiber (R3F)**, and **Drei**.
- **🌗 Dark / Light Mode Support:** A seamless theme transition with custom slate/teal HSL variables for visual comfort.
- **📜 Lenis Smooth Scroll:** Natural and fluid scroll mechanics integrated throughout the user experience.
- **📈 GSAP & Framer Motion:** Responsive micro-animations, reveal-on-scroll elements, count-up stats, and slide-in panels.
- **✉️ Interactive Contact Form:** Connected directly with **EmailJS** API to deliver messages straight to my inbox, configured with SPF/DMARC compatibility and direct `reply-to` redirection.
- **💻 Console Terminal Simulation:** A retro-themed interactive command-line interface summarizing key info.
- **📱 Fully Responsive Design:** Clean, accessible layouts using modern Flexbox, Grid, and utility structures built on Tailwind v4.

---

## 🛠️ Tech Stack

* **Core:** React 19 (Hooks, Context, State), JavaScript (ES6+), HTML5, CSS3
* **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Animations:** GSAP (GreenSock Animation Platform), Framer Motion, Lenis (Smooth Scroll)
* **Styling:** Tailwind CSS v4, Vanilla CSS variables
* **Integration:** EmailJS Browser API, Lucide React (Icons)
* **Build Tool:** Vite

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

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

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
├── dist/                   # Production build outputs
├── src/
│   ├── components/
│   │   └── portfolio/     # All core portfolio components
│   │       ├── About.jsx            # About section with stats cards
│   │       ├── Contact.jsx          # Contact Form with EmailJS integration
│   │       ├── Education.jsx        # Academic details timeline
│   │       ├── Experience.jsx       # Internship details
│   │       ├── Hero.jsx             # Welcome screen with 3D canvas
│   │       ├── Nav.jsx              # Navigation and Theme Selector
│   │       ├── ParticleField.jsx    # Interactive 3D background stars
│   │       ├── Projects.jsx         # Portfolio projects showcasing MERN apps
│   │       ├── Terminal.jsx         # Interactive command-line simulation
│   │       └── data.js              # Centralized data file (skills, projects, etc.)
│   ├── App.jsx             # App layout entrypoint
│   ├── main.jsx            # React root mounting point
│   └── styles.css          # Core CSS, animations, HSL themes, and custom styles
├── package.json            # Scripts & project dependencies
├── vite.config.js          # Vite build configurations with Tailwind plugin
└── .gitignore              # Files ignored by git (e.g. .env, node_modules)
```

---

## ☁️ Deployment Configuration (Environment Variables)

To ensure the contact form works correctly on platforms like **Vercel**, **Netlify**, or **GitHub Pages**:
1. Register your environment variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`) in your deployment dashboard's settings.
2. Trigger a **new build/redeploy** to allow Vite to inject the variables into the production assets at compile time.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

Created with 🌌 by [Kinshuk Khandelwal](https://github.com/KINSHUKHERE)
