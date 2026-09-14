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
    "Final-year B.Tech Computer Science student (CGPA 7.96) at Poornima University, most recently a Software Developer Intern at Zentek Infosoft, specializing in backend engineering with Node.js, Express, and MongoDB. Experienced in secure, production-style REST APIs – JWT/OAuth authentication, RBAC, payment integration, and concurrency-safe data handling – on a strong Java and DSA foundation. Immediately available for Backend or Full-Stack Software Engineer roles.",
  tagline:
    "MERN stack developer building production-ready full-stack web applications - from clean React UIs to reliable Node services.",
};

export const stats = [
  { label: "CGPA", value: 7.96, decimals: 2, suffix: "" },
  { label: "GitHub repos", value: 16, decimals: 0, suffix: "+" },
  { label: "DSA problems solved", value: 70, decimals: 0, suffix: "+" },
  { label: "Internships", value: 2, decimals: 0, suffix: "" },
];

export const skills = [
  { group: "Languages", items: ["Java", "JavaScript", "Python", "SQL"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "API Development", "JWT & Google OAuth", "RBAC", "Rate Limiting", "Razorpay Payments"] },
  { group: "Databases", items: ["MongoDB (Mongoose)", "MySQL", "Schema Design", "Indexing", "Aggregation"] },
  { group: "Frontend", items: ["React.js", "Tailwind CSS", "HTML5", "CSS3"] },
  { group: "Tools & Platforms", items: ["Git", "GitHub", "Postman", "Cloudinary", "Render", "Vercel", "Netlify"] },
  { group: "CS Fundamentals", items: ["Data Structures & Algorithms", "OOP", "DBMS", "API Security", "Concurrency Control"] },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "Zentek Infosoft",
    period: "May 2026 - Aug 2026",
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
    caseStudy: "/case-study/yocart",
    description:
      "A premium MERN e-commerce platform separating a customer storefront, an isolated vendor namespace, and a glassmorphic Super Admin dashboard. Razorpay payments with HMAC verification, a database-driven festive theme engine, real-time admin notifications, and a full Recharts analytics suite.",
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
    title: "Thana-Thaya (Food Ordering)",
    tag: "Responsive Frontend",
    description:
      "A premium food delivery web application redesign featuring a keyframe-animated floating hero section, an interactive menu listing with quantity managers, active checkout drawers, and persistent cart state synced to localStorage. Calibrated for desktop, tablet, and mobile layouts.",
    stack: ["HTML5", "Tailwind CSS", "Vanilla JS", "Local Storage"],
    github: "https://github.com/KINSHUKHERE/Food-website",
    live: "",
  },
];

export const secondaryProjects = [
  {
    title: "BookHub App",
    tag: "Full-stack - Spring Boot",
    description:
      "A secure book discovery and management web application with backend APIs powered by Spring Boot and a responsive frontend interface.",
    stack: ["Java Spring Boot", "HTML5", "CSS3"],
    github: "https://github.com/KINSHUKHERE/BookHubApp",
    live: "",
  },
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
    title: "Tanjore Coffee",
    tag: "Responsive Frontend",
    description:
      "A sleek, brand-forward landing page for a coffee brand, optimized for mobile browsing with semantic layouts and custom JavaScript and CSS animations.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/KINSHUKHERE/Tanjore",
    live: "https://resplendent-bavarois-6964e1.netlify.app/",
  },
  {
    title: "Employee Performance Metrics",
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
    detail: "B.Tech in Computer Science - CGPA 7.96",
    period: "2023 - 2027",
    place: "Jaipur, Rajasthan",
  },
  {
    school: "Delhi Public School",
    detail: "12th CBSE Board - 64%",
    period: "2022 - 2023",
    place: "Pali, Rajasthan",
  },
];

export const certifications = [
  "NPTEL - Developing Software Skills and Personality (IIT Kanpur)",
  "Prayogam-2024 Website Showcase (Poornima University)",
  "SQL and Relational Databases 101 (IBM)",
];
