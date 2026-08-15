"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdPushPin } from "react-icons/md";

// Organized Projects
const landingPageProjects = [
  {
    id: 1,
    title: "Digital Agency Website",
    description:
      "Modern agency site with a sleek UI and contact form integration.",
    image: "/p2.png",
    link: "https://digitaloctagon.netlify.app",
    tags: ["React", "Tailwind"],
  },
  {
    id: 2,
    title: "DietMate UI",
    description:
      "A clean, responsive landing page concept for a nutrition and diet platform.",
    image: "/p3.png",
    link: "https://dietmateui.netlify.app",
    tags: ["UI/UX", "Landing Page"],
  },
];

const ecommerceProjects = [
  {
    id: 1,
    title: "Easy Rent Now - Vacation Rental Platform",
    description:
      "A full-featured Airbnb-like vacation rental platform with interactive maps, booking calendar, property filters, and host management system.",
    image: "/easy-rent-now-1.png",
    link: "https://easy-rent-now-vacation-rental-platf.vercel.app",
    tags: ["Next.js", "React", "Tailwind", "Maps API"],
  },
  {
    id: 2,
    title: "Sync Vibes - Headphone eCommerce Landing",
    description:
      "Modern e-commerce platform for premium wireless headphones with product showcase, pricing tiers, and secure checkout experience.",
    image: "/sync-vibes-1.png",
    link: "https://sync-vibes.vercel.app",
    tags: ["Nextjs", "Tailwind", "eCommerce Landing"],
  },
  {
    id: 3,
    title: "Caffio - Coffee Shop Website",
    description:
      "Beautiful coffee shop website featuring product listings, menu showcase, and sleek design with smooth animations.",
    image: "/caffio-1.png",
    link: "https://caffio1x.vercel.app",
    tags: ["React", "Tailwind", "UI/UX"],
  },
];

const fullStackProjects = [
  {
    id: 1,
    title: "Background Remover AI",
    description:
      "An AI-powered full-stack web app that instantly removes image backgrounds with high accuracy.",
    image: "/p7.png",
    link: "https://quickbgremove.netlify.app",
    tags: ["AI", "React", "Tailwind", "Node"],
  },
  {
    id: 2,
    title: "Full Stack Notes App",
    description:
      "MERN stack app to save, manage, and organize your notes and todos efficiently.",
    image: "/p1.png",
    link: "https://keepnotesandtodos.netlify.app",
    tags: ["MERN", "Full Stack"],
  },
  {
    id: 3,
    title: "Blog with Admin Panel",
    description:
      "Full-stack blog platform with admin panel for content management.",
    image: "/p6.png",
    link: "https://techscrolls.netlify.app",
    tags: ["CMS", "React", "Node"],
  },
];

const ProjectCard = ({ project }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 shadow-lg"
  >
    <div className="relative h-48">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-800 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={project.link}
        target="_blank"
        className="inline-block px-4 py-2 bg-amber-500 text-gray-900 rounded-md font-medium hover:bg-amber-600 transition-colors"
      >
        View Project
      </Link>
    </div>
  </motion.div>
);

const Work = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          My <span className="text-amber-400">Projects</span>
        </motion.h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A showcase of my work spanning UI/UX, full-stack apps, and advanced AI
          integrations.
        </p>
      </div>

      {/* Featured Project */}
      <section className="w-full md:w-[70%] lg:w-[60%] mx-auto mb-20 border border-gray-800 rounded-lg pt-10 p-6 bg-gray-900 shadow-lg relative">
        <MdPushPin className="absolute left-2 top-2 text-2xl text-red-600 animate-pulse" />
        <div>
          <Image
            src="/buyer.png"
            alt="SmartStyler"
            width={800}
            height={400}
            className="rounded-lg object-cover overflow-hidden"
          />
        </div>
        <h3 className="text-xl font-bold my-2">
          SmartStyler - Multi-Vendor Fashion Marketplace
        </h3>
        <p className="text-gray-300 mb-4">
          My Final Year Project (FYP) and most ambitious build to date.
          SmartStyler is a MERN + React Native platform combining e-commerce
          with fashion AI. It features a reel-based product browsing experience,
          intelligent ML-driven recommendations, and a smart chatbot for
          seamless customer support merging innovation with style.
        </p>
        <Link
          href={"/smartstyler"}
          className="inline-block w-full text-center px-4 py-2 bg-amber-500 text-gray-900 rounded-md font-medium hover:bg-amber-600 transition-colors"
        >
          View Project
        </Link>
      </section>

      {/* eCommerce & Service Platforms */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          eCommerce Landing & Service Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecommerceProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Full Stack Projects */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          Full Stack Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fullStackProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      {/* Landing Page Projects */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          Landing Pages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landingPageProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a project in mind?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how I can help bring your ideas to life.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-amber-500 text-gray-900 text-xl font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Work;
