export const profile = {
  name: "Kinshuk Khandelwal",
  handle: "@kinshukhere",
  role: "MERN Stack Developer",
  location: "Jaipur, Rajasthan",
  email: "herekinshuk@gmail.com",
  phone: "+91 8058442748",
  resumeUrl: "/resume.pdf",
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
  { label: "GitHub repos", value: 20, decimals: 0, suffix: "+" },
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
      "Developing production-grade REST APIs and full-stack features using the MERN stack.",
      "Optimizing backend services in MongoDB for faster data retrieval and lower query latency.",
      "Shipping responsive, accessible React UIs with reusable typed components and clean state management.",
      "Implementing JWT-based auth, role-based access control and protected dashboard routes.",
      "Collaborating on code reviews, Git workflows and CI deployments alongside senior engineers.",
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
      "A premium, responsive MERN stack e-commerce platform with a client-facing storefront and a glassmorphic admin dashboard. Features secure JWT verification, a Google OAuth profile completion wizard, real-time cart synchronization, a 2-page Stripe-style checkout with simulated payment gateways, automated stock inventory management, and an admin audit panel.",
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/KINSHUKHERE/Ecommerce-Website-MERN-",
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
      "A fully responsive, static food-ordering website featuring an interactive menu UI, static cart calculations, and clean layout transitions.",
    stack: ["HTML5", "CSS3", "JavaScript"],
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
    github: "",
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
