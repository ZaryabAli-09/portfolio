"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Background Remover AI",
    description:
      "Web app that uses AI to remove backgrounds from images instantly",
    image: "/p7.png",
    link: "https://quickbgremove.netlify.app",
    tags: ["AI", "React", "Tailwind"],
  },
  {
    id: 2,
    title: "Full Stack Notes App",
    description:
      "MERN stack application for saving and managing notes and todos",
    image: "/p1.png",
    link: "https://keepnotesandtodos.netlify.app",
    tags: ["MERN", "Full Stack"],
  },
  {
    id: 3,
    title: "Blog with Admin Panel",
    description: "Complete blog platform with content management system",
    image: "/p6.png",
    link: "https://techscrolls.netlify.app",
    tags: ["CMS", "React", "Node"],
  },
  {
    id: 4,
    title: "Digital Agency Website",
    description: "Modern agency site with contact form integration",
    image: "/p2.png",
    link: "https://digitaloctagon.netlify.app",
    tags: ["React", "Tailwind"],
  },
  {
    id: 5,
    title: "AI Landing Page",
    description: "Inspirational design for AI SaaS products",
    image: "/p3.png",
    link: "https://dietmateui.netlify.app",
    tags: ["UI/UX", "Landing Page"],
  },
  {
    id: 6,
    title: "Flags Guessing Game",
    description: "Interactive game to learn world flags",
    image: "/p4.png",
    link: "https://game-of-flags.netlify.app",
    tags: ["Game", "API"],
  },
  {
    id: 7,
    title: "Weather App",
    description: "Real-time weather information",
    image: "/p5.png",
    link: "https://weatherspikebyzaryab.netlify.app",
    tags: ["API", "React"],
  },
];

const ProjectCard = ({ project }) => {
  return (
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
};

const Portfolio = () => {
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
          Here are some of my recent works. Each project showcases different
          skills and technologies.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
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
            Let's discuss how I can help bring your ideas to life.
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

export default Portfolio;
