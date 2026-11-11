export const profile = {
  name: "Kinshuk Khandelwal",
  handle: "@kinshukhere",
  role: "Backend Developer (Node.js)",
  location: "Jaipur, Rajasthan",
  email: "herekinshuk@gmail.com",
  resumeUrl: "https://raw.githubusercontent.com/KINSHUKHERE/Personal-Portfolio/main/public/Kinshuk_Khandelwal_Resume.pdf",
  socials: {
    github: "https://github.com/KINSHUKHERE",
    linkedin: "https://www.linkedin.com/in/kinshuk-khandelwal-43024b290/",
    mail: "mailto:herekinshuk@gmail.com",
  },
  summary:
    "Final-year Computer Science student in Jaipur, graduating in 2027. Building backend systems and full-stack web applications with Node.js, Express, MongoDB and React. Former Software Developer Intern at Zentek Infosoft with a focus on secure REST APIs (JWT, Google OAuth, RBAC), payment integration, and concurrency-safe data handling.",
  tagline: "Node.js · MongoDB · API Security",
  subtagline: "Final-year CSE · Graduating 2027",
};

export const stats = [
  { label: "DSA Problems", value: 70, decimals: 0, suffix: "+", sub: "Solved in Java" },
  { label: "REST API Groups", value: 15, decimals: 0, suffix: "+", sub: "YoCart Resource Groups" },
  { label: "User Roles", value: 3, decimals: 0, suffix: "", sub: "YoCart RBAC" },
  { label: "Internships", value: 2, decimals: 0, suffix: "", sub: "Zentek & ShadowFox" },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "Java", "Python", "SQL"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT", "Google OAuth", "RBAC", "Rate Limiting", "Razorpay"] },
  { group: "Databases", items: ["MongoDB (Mongoose)", "MySQL"] },
  { group: "Frontend", items: ["React.js", "Tailwind CSS", "HTML5", "CSS3"] },
  { group: "Tools", items: ["Git", "GitHub", "Postman", "Render", "Vercel", "Netlify", "Supabase"] },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "Zentek Infosoft",
    period: "May 2026 - Aug 2026",
    location: "Jaipur, Rajasthan",
    points: [
      "Built full-stack web apps with React.js, Node.js, Express.js, MongoDB and MySQL.",
      "Built REST APIs with JWT authentication, Google OAuth, role-based access and protected routes.",
      "Worked on debugging, feature development, Git workflows and deployment.",
      "Built YoCart's analytics dashboard (sales trends, category metrics, inventory) with Recharts.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "ShadowFox",
    period: "Jun 2024 - Jul 2024",
    location: "Remote",
    points: [
      "Built three responsive web projects with HTML, CSS and JavaScript.",
      "Made mobile-first, accessible interfaces.",
      "Built interactive components such as carousels, modals and form flows.",
    ],
  },
];

export const featuredProjects = [
  {
    title: "YoCart",
    tag: "Backend-focused MERN",
    caseStudy: "/case-study/yocart",
    description:
      "A marketplace with customer, vendor and admin roles. It has 15+ REST resource groups, secure login with JWT httpOnly cookies and Google OAuth, and role-based access. Razorpay payments are verified on the server with HMAC-SHA256, and checkout uses atomic stock updates to prevent overselling.",
    stack: ["Node.js", "Express", "MongoDB", "React.js", "JWT", "Google OAuth", "Razorpay", "Recharts", "Tailwind CSS"],
    github: "https://github.com/KINSHUKHERE/Ecommerce-Website-MERN",
    live: "https://yocart.onrender.com/",
  },
  {
    title: "BookHub",
    tag: "Java Spring Boot",
    description:
      "A backend-driven book management application built with Java Spring Boot. Exposes RESTful endpoints for catalog discovery, member tracking, and inventory operations with secure persistence.",
    stack: ["Java", "Spring Boot", "REST APIs", "MySQL", "HTML5", "CSS3"],
    github: "https://github.com/KINSHUKHERE/BookHubApp",
    live: "",
  },
  {
    title: "Expense Tracker",
    tag: "Full-stack - MongoDB",
    description:
      "A full-stack financial tracker with a dynamic dashboard to manage income and expenses, complete with category breakdowns and persistent storage.",
    stack: ["Node.js", "Express", "MongoDB", "React.js", "Tailwind CSS"],
    github: "https://github.com/KINSHUKHERE/ExpenseTrackerMongoDB",
    live: "",
  },
  {
    title: "Thana-Thaya (Food Ordering)",
    tag: "Responsive Frontend",
    description:
      "A responsive food-ordering website with interactive menu browsing and a persistent cart via LocalStorage, with dynamic quantity controls and smooth animations.",
    stack: ["HTML5", "Tailwind CSS", "JavaScript", "LocalStorage"],
    github: "https://github.com/KINSHUKHERE/Food-website",
    live: "",
  },
];

export const secondaryProjects = [];

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
  "SQL and Relational Databases 101 (IBM)",
  "NPTEL - Developing Software Skills and Personality (IIT Kanpur)",
  "Prayogam-2024 Website Showcase (Poornima University)",
];
