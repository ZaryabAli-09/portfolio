export const SOCIAL_LINKS = [
  {
    url: "https://github.com/ZaryabAli-09",
    icon: "/github.png",
    alt: "GitHub",
  },
  {
    url: "https://www.linkedin.com/in/zaryab-ali-softdev",
    icon: "/linkedin.png",
    alt: "LinkedIn",
  },
];

export const EMAIL = "zaryabkhan248@gmail.com";

// Dot colors reference the design-system tokens defined in tailwind.config.js
// (highlight / accent / success / heading) — no hex codes hardcoded here.
export const TOOLBOX = [
  {
    title: "Niche",
    dot: "bg-accent",
    items: ["Mapbox", "BabylonJS", "Unity 3D", "3D Web (legacy)"],
  },
  {
    title: "Languages & Frameworks",
    dot: "bg-highlight",
    items: ["TypeScript", "React", "Next.js", "React Native", "Python"],
  },
  {
    title: "A past life",
    dot: "bg-accent",
    items: ["Ruby", "PHP", "Rust", "C++", "C#", "Bash", "Inno Setup"],
  },
  {
    title: "Backend & Auth",
    dot: "bg-success",
    items: ["PostgreSQL", "Supabase", "Auth0", "Azure Functions", "Stripe"],
  },
  {
    title: "Platform & AI",
    dot: "bg-heading",
    items: ["Monorepos", "MCP", "TanStack", "Expo", "OpenAI"],
  },
  {
    title: "Leading",
    dot: "bg-highlight",
    items: ["Leadership", "Mentorship", "Problem Solving", "Communication"],
  },
];

// category: "work" (client / professional work) or "side" (personal builds).
// Adjust the category + role/period text per project as needed — these are
// placeholders based on the descriptions already in the codebase.
export const PROJECTS = [
  {
    id: "smartstyler",
    title: "SmartStyler — Multi-Vendor Fashion Marketplace",
    role: "Creator & Lead Engineer",
    period: "Final Year Project",
    description:
      "My most ambitious build to date. A MERN + React Native platform combining e-commerce with fashion AI — reel-based product browsing, ML-driven recommendations, and a smart support chatbot.",
    image: "/buyer.png",
    link: "/smartstyler",
    tags: ["MERN", "React Native", "AI", "Chatbot"],
    category: "side",
  },
  {
    id: "easy-rent-now",
    title: "Easy Rent Now — Vacation Rental Platform",
    role: "Creator & Developer",
    period: "Freelance",
    description:
      "A full-featured Airbnb-like vacation rental platform with interactive maps, a booking calendar, property filters, and a host management system.",
    image: "/easy-rent-now-1.png",
    link: "https://easy-rent-now-vacation-rental-platf.vercel.app",
    tags: ["Next.js", "React", "Tailwind", "Maps API"],
    category: "work",
  },
  {
    id: "sync-vibes",
    title: "Sync Vibes — Headphone eCommerce Landing",
    role: "Creator & Developer",
    period: "Freelance",
    description:
      "Modern e-commerce landing page for premium wireless headphones with a product showcase, pricing tiers, and a secure checkout experience.",
    image: "/sync-vibes-1.png",
    link: "https://sync-vibes.vercel.app",
    tags: ["Next.js", "Tailwind", "eCommerce"],
    category: "work",
  },
  {
    id: "caffio",
    title: "Caffio — Coffee Shop Website",
    role: "Creator & Developer",
    period: "Freelance",
    description:
      "Beautiful coffee shop website featuring product listings, a menu showcase, and a sleek design with smooth animations.",
    image: "/caffio-1.png",
    link: "https://caffio1x.vercel.app",
    tags: ["React", "Tailwind", "UI/UX"],
    category: "work",
  },
  {
    id: "bg-remover",
    title: "Background Remover AI",
    role: "Creator & Developer",
    period: "Personal Project",
    description:
      "An AI-powered full-stack web app that instantly removes image backgrounds with high accuracy.",
    image: "/p7.png",
    link: "https://quickbgremove.netlify.app",
    tags: ["AI", "React", "Tailwind", "Node"],
    category: "side",
  },
  {
    id: "notes-app",
    title: "Full Stack Notes App",
    role: "Creator & Developer",
    period: "Personal Project",
    description:
      "MERN stack app to save, manage, and organize your notes and todos efficiently.",
    image: "/p1.png",
    link: "https://keepnotesandtodos.netlify.app",
    tags: ["MERN", "Full Stack"],
    category: "side",
  },
  {
    id: "blog-admin",
    title: "Blog with Admin Panel",
    role: "Creator & Developer",
    period: "Personal Project",
    description:
      "Full-stack blog platform with an admin panel for content management.",
    image: "/p6.png",
    link: "https://techscrolls.netlify.app",
    tags: ["CMS", "React", "Node"],
    category: "side",
  },
  {
    id: "digital-agency",
    title: "Digital Agency Website",
    role: "Creator & Developer",
    period: "Freelance",
    description:
      "Modern agency site with a sleek UI and contact form integration.",
    image: "/p2.png",
    link: "https://digitaloctagon.netlify.app",
    tags: ["React", "Tailwind"],
    category: "work",
  },
  {
    id: "dietmate",
    title: "DietMate UI",
    role: "Creator & Developer",
    period: "Freelance",
    description:
      "A clean, responsive landing page concept for a nutrition and diet platform.",
    image: "/p3.png",
    link: "https://dietmateui.netlify.app",
    tags: ["UI/UX", "Landing Page"],
    category: "work",
  },
];
