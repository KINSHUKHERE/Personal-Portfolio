export const profile = {
  name: "Kinshuk Khandelwal",
  handle: "@kinshukhere",
  role: "MERN Stack Developer",
  location: "Jaipur, Rajasthan",
  email: "herekinshuk@gmail.com",
  phone: "+91 8058442748",
  resumeUrl: "https://raw.githubusercontent.com/KINSHUKHERE/Personal-Portfolio/main/public/Kinshuk_Khandelwal_Resume.pdf",
  socials: {
    github: "https://github.com/KINSHUKHERE",
    linkedin: "https://www.linkedin.com/in/kinshuk-khandelwal-43024b290/",
    instagram: "https://www.instagram.com/_kinshuk._.khandelwal_/",
    mail: "mailto:herekinshuk@gmail.com",
  },
  summary:
    "Final-year B.Tech CSE student (CGPA 7.92) at Poornima University, currently a Software Developer Intern at Zentek Infosoft. I ship full-stack web apps with the MERN stack - clean React frontends backed by Node, Express, and MongoDB services. Targeting backend or full-stack roles where I can write production-ready code from day one.",
  tagline:
    "MERN stack developer building production-ready full-stack web applications - from clean React UIs to reliable Node services.",
};

export const stats = [
  { label: "CGPA", value: 7.92, decimals: 2, suffix: "" },
  { label: "GitHub repos", value: 10, decimals: 0, suffix: "+" },
  { label: "DSA problems solved", value: 70, decimals: 0, suffix: "+" },
  { label: "Internships", value: 2, decimals: 0, suffix: "" },
];

export const skills = [
  { group: "Languages", items: ["Java", "JavaScript", "Python"] },
  { group: "Frontend", items: ["React", "HTML5", "CSS3", "Tailwind"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { group: "Databases", items: ["MongoDB", "Supabase"] },
  { group: "Tools", items: ["Git", "GitHub", "Vercel", "Netlify", "Render", "Postman"] },
  { group: "Foundations", items: ["DSA", "OOPs", "Web Dev"] },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "Zentek Infosoft",
    period: "May 2026 - Present",
    location: "Jaipur, Rajasthan",
    points: [
      "Designed and engineered YoCart, a premium MERN stack e-commerce platform with a customer storefront, an isolated vendor panel, and a glassmorphic Super Admin dashboard.",
      "Developed production-grade backend REST APIs secured via HttpOnly JWT cookies, Google OAuth, and custom role-based authorization middleware.",
      "Integrated Razorpay payment gateways with HMAC-SHA256 signature verification, and created a database-driven festive theme engine with keyframe-animated floating elements.",
      "Shipped a real-time SaaS business intelligence analytics dashboard using Recharts, showing sales trends, category metrics, and inventory health.",
      "Optimized MongoDB data schemas and lookup operations, reducing response latencies and implementing secure data validation.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "ShadowFox (Remote)",
    period: "Jun 2024 - Jul 2024",
    location: "Remote",
    points: [
      "Designed and delivered 3 responsive web projects in HTML, CSS and vanilla JavaScript within deadline.",
      "Built mobile-first, accessible UIs that scored 95+ on Lighthouse performance and accessibility.",
      "Crafted interactive components (carousels, modals, form flows) that improved engagement on the demo pages.",
      "Worked async with the remote team - wrote clean commit history and Loom walkthroughs for every PR.",
    ],
  },
];

export const featuredProjects = [
  {
    title: "YoCart",
    tag: "Full-stack - MERN",
    description:
      "A premium, high-performance MERN e-commerce platform with a clean separation between a customer storefront, an isolated vendor namespace (/vendor/*), and a glassmorphic Super Admin dashboard. Features a database-driven festive theme engine (Diwali, Christmas & more with keyframe-animated FloatingStickers), Razorpay payment integration with HMAC verification, real-time admin notification bell (10s polling), and a full SaaS analytics suite via Recharts — area charts, donut charts, bar charts, and top-product leaderboards. Secured end-to-end with HttpOnly JWT cookies, role-based middleware, and Google OAuth.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Recharts", "JWT", "Google OAuth", "Razorpay"],
    github: "https://github.com/KINSHUKHERE/Ecommerce-Website-MERN",
    live: "https://yocart.onrender.com/",
  },
  {
    title: "Expense Tracker",
    tag: "Full-stack - MongoDB",
    description:
      "A full-stack financial tracker with a dynamic dashboard to manage income and expenses, complete with category breakdowns and persistent storage.",
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/KINSHUKHERE/ExpenseTrackerMongoDB",
    live: "",
  },
  {
    title: "BookHub App",
    tag: "Full-stack - Spring Boot",
    description:
      "A secure book discovery and management web application with backend APIs powered by Spring Boot and a responsive frontend interface.",
    stack: ["Java Spring Boot", "HTML5", "CSS3"],
    github: "https://github.com/KINSHUKHERE/BookHubApp",
    live: "",
  },
];

export const secondaryProjects = [
  {
    title: "Todo List Website",
    tag: "Responsive Frontend",
    description:
      "A clean, responsive task management application featuring seamless task creation, deletion, Local Storage persistence, and dark mode toggle support.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/KINSHUKHERE/Todo-Website",
    live: "",
  },
  {
    title: "Thana-Thaya (Food Ordering)",
    tag: "Responsive Frontend",
    description:
      "A premium food delivery web application redesign featuring a keyframe-animated floating hero section, an interactive menu listing with quantity managers, active checkout drawers, and persistent cart state synced to localStorage. Calibrated for desktop, tablet, and mobile layouts.",
    stack: ["HTML5", "Tailwind CSS", "Vanilla JS", "Local Storage"],
    github: "https://github.com/KINSHUKHERE/Food-website",
    live: "",
  },
  {
    title: "Tanjore Coffee",
    tag: "Responsive Frontend",
    description:
      "A sleek, brand-forward landing page for a coffee brand, optimized for mobile browsing with semantic layouts and custom JavaScript and CSS animations.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/KINSHUKHERE/Tanjore",
    live: "https://resplendent-bavarois-6964e1.netlify.app/",
  },
  {
    title: "Employee Performance Matrices",
    tag: "Data Analysis - PowerBI",
    description:
      "Interactive business intelligence dashboard designed to analyze and visualize employee performance metrics, tracking productivity KPIs.",
    stack: ["PowerBI", "Data Analysis"],
    github: "https://github.com/KINSHUKHERE/EmployeePerformanceMatrices-BI-Project",
    live: "",
  },
];



export const education = [
  {
    school: "Poornima University",
    detail: "B.Tech in Computer Science - CGPA 7.92",
    period: "2023 - 2027",
    place: "Jaipur, Rajasthan",
  },
  {
    school: "Delhi Public School",
    detail: "12th CBSE Board - 64%",
    period: "2022 - 2023",
    place: "Jaipur, Rajasthan",
  },
];

export const certifications = [
  "NPTEL - Developing Software Skills and Personality (IIT Kanpur)",
  "Prayogam-2024 Website Showcase (Poornima University)",
  "SQL and Relational Databases 101 (IBM)",
];
