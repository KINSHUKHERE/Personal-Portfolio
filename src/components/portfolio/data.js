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
    "Final-year B.Tech CSE student (CGPA 8.16) at Poornima University, currently a Software Developer Intern at Zentek Infosoft. I ship full-stack web apps with the MERN stack - clean React frontends backed by Node, Express, MongoDB and PostgreSQL services. Targeting backend or full-stack roles where I can write production-ready code from day one.",
  tagline:
    "MERN stack developer building production-ready full-stack web applications - from clean React UIs to reliable Node services.",
};

export const stats = [
  { label: "CGPA", value: 8.16, decimals: 2, suffix: "" },
  { label: "GitHub repos", value: 10, decimals: 0, suffix: "+" },
  { label: "DSA problems solved", value: 250, decimals: 0, suffix: "+" },
  { label: "Internships", value: 2, decimals: 0, suffix: "" },
];

export const skills = [
  { group: "Languages", items: ["Java", "JavaScript", "Python"] },
  { group: "Frontend", items: ["React", "HTML5", "CSS3", "Tailwind"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { group: "Databases", items: ["MongoDB", "MySQL"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Postman"] },
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
      "Optimizing backend services in PostgreSQL and MongoDB for faster data retrieval and lower query latency.",
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
    title: "MERN Ecommerce Platform",
    tag: "Full-stack - MERN",
    description:
      "End-to-end ecommerce app with auth, product catalog, cart and order flow built on MongoDB, Express, React and Node.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/KINSHUKHERE/Ecommerce-Website-MERN-",
    live: "",
  },
  {
    title: "Expense Tracker",
    tag: "Full-stack - MongoDB",
    description:
      "Track income and expenses with category breakdowns, persistent storage in MongoDB and a clean dashboard view.",
    stack: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/KINSHUKHERE/ExpenseTrackerMongoDB",
    live: "",
  },
  {
    title: "BookHub App",
    tag: "Full-stack - Web",
    description:
      "Book discovery and management app - browse, search and curate your reading list with a responsive UI.",
    stack: ["React", "Node.js", "Express"],
    github: "https://github.com/KINSHUKHERE/BookHubApp",
    live: "",
  },
];

export const secondaryProjects = [
  {
    title: "Thana-Thaya - Food Ordering",
    tag: "Responsive Frontend",
    description:
      "Responsive food-ordering web app with an interactive menu UI, frontend-backend state validation, cart calculations and a simulated secure payment workflow integrated with Google Forms for order capture.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/KINSHUKHERE/Food-website",
    live: "",
  },
  {
    title: "Tanjore Coffee - Business Site",
    tag: "Responsive Frontend",
    description:
      "Brand showcase site for a coffee business - smooth scroll, CSS-driven micro-animations, semantic HTML and a product-forward layout optimized for mobile-first browsing.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/KINSHUKHERE/Tanjore",
    live: "",
  },
  {
    title: "Todo Website",
    tag: "Frontend - React",
    description:
      "Minimal, fast todo app with persistent state - deployed live on Vercel. Add, complete and filter tasks.",
    stack: ["React", "Vite", "Tailwind"],
    github: "https://github.com/KINSHUKHERE/Todo-Website",
    live: "https://todo-website-iota.vercel.app",
  },
  {
    title: "Personal Portfolio v1",
    tag: "Portfolio - Web",
    description:
      "First-iteration personal portfolio built with semantic HTML and CSS - mobile-first responsive layout, accessible markup and zero frameworks. Deployed live on Vercel.",
    stack: ["HTML", "CSS"],
    github: "https://github.com/KINSHUKHERE/Personal-Portfolio",
    live: "https://personal-portfolio-ecru-rho.vercel.app",
  },
];

export const projects = [...featuredProjects, ...secondaryProjects];

export const education = [
  {
    school: "Poornima University",
    detail: "B.Tech in Computer Science - CGPA 8.16",
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
