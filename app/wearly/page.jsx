"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ProjectPanels = () => {
  const techStack = {
    frontend: [
      "React",
      "React Native",
      "Redux Toolkit",
      "Tailwind CSS",
      "Material UI ",
    ],
    backend: ["Node.js", "Express", "MongoDB", "Mongoose"],
    integrations: [
      "Stripe API",
      "Chatling AI",
      "Cloudinary",
      "WebSockets",
      "JWT Auth",
    ],
    devops: ["Netlify", "Render", "CI/CD Pipelines"],
  };
  const panels = [
    {
      id: 1,
      title: "User Web App",
      description:
        "The primary shopping interface for customers with AI-powered chatbot, secure chat system and seamless purchasing",
      features: [
        "Product browsing with filters",
        "Real time chat with sellers",
        "Easy to navigate product categories",
        "AI chatbot customer support",
        "User authentication and profiles",
        "Browsing History",
        "Order history and management",
        "Real-time order tracking",
        "Wishlist management",
        "Secure checkout (Stripe/COD)",
      ],
      image: "/buyer.png",
      link: "https://wearlypk.netlify.app",
      tags: [
        "React",
        "Redux",
        "Tailwind CSS",
        "JWT Auth",
        "Google OAuth",
        "Stripe API",
        "WebSockets",
        "Chatling Ai",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "Netlify",
        "Render",
        "CI/CD",
      ],
    },
    {
      id: 2,
      title: "Seller Panel",
      description:
        "Comprehensive dashboard for vendors to manage their store and products",
      features: [
        "Product management (CRUD)",
        "Sales analytics dashboard",
        "Order processing system",
        "Inventory management",
        "Customer chat interface",
      ],
      image: "/seller.png",
      link: "https://sellerwearlypk.netlify.app",
      tags: [
        "React",
        "Redux",
        "ReChart.js",
        "WebSockets",
        "Tailwind CSS",
        "Material UI",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "Cloudinary",
        "JWT Auth",
        "Netlify",
        "Cloudinary",
        "CI/CD",
        "Render",
      ],
    },
    {
      id: 3,
      title: "Admin Panel",
      description: "Centralized control center for platform administration",
      features: [
        "User/seller management",
        "Dispute resolution system",
        "Platform analytics",
        "Content moderation",
        "System configuration",
      ],
      image: "/admin.png",
      link: "https://adminwearlypk.netlify.app",
      tags: [
        "React",
        "Redux",
        "ReChart.js",
        "Tailwind CSS",
        "Material UI",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "JWT Auth",
        "Netlify",
        "Render",
        "CI/CD",
      ],
    },
  ];

  const downloadThesis = () => {
    // Replace with actual PDF path
    window.open("/wearly-thesis.pdf", "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Title and Download Button */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400 leading-tight">
              WEARLY
            </h1>
            <p className="text-lg text-gray-300 mt-2">
              Multivendor E-Commerce Platform
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadThesis}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">
              Download Complete Thesis (PDF)
            </span>
            <span className="sm:hidden">Download Thesis</span>
          </motion.button>
        </motion.div>

        {/* Panels Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
        >
          {panels.map((panel) => (
            <motion.div
              key={panel.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-2xl hover:border-amber-400"
            >
              <div className="h-64 sm:h-72 relative overflow-hidden bg-gray-100">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                  className="hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-800">
                    {panel.title}
                  </h2>
                  <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {panel.id === 1
                      ? "Buyer"
                      : panel.id === 2
                      ? "Seller"
                      : "Admin"}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{panel.description}</p>

                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Key Features:
                  </h3>
                  <ul className="space-y-2">
                    {panel.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {panel.features.length > 5 && (
                    <div className="mt-2 text-sm text-gray-500 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {panel.features.length - 5} more features
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {panel.tags.slice(0, 5).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {panel.tags.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                      +{panel.tags.length - 5}
                    </span>
                  )}
                </div>

                {/* <Link href={panel.link} passHref> */}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  View Live Demo
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.a>
                {/* </Link> */}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack and Project Summary */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg
              className="w-6 h-6 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            Complete Project Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Tech Stack
              </h3>
              <div className="space-y-4">
                {Object.entries(techStack).map(([category, technologies]) => (
                  <div key={category}>
                    <h4 className="font-medium text-gray-600 capitalize mb-2">
                      {category}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-full shadow-sm border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Project Overview
              </h3>
              <p className="text-gray-600 mb-6">
                WEARLY is a full-stack multivendor e-commerce platform built
                with the MERN stack (MongoDB, Express.js, React.js, Node.js) and
                React Native for mobile. The platform serves as a
                fashion-focused marketplace connecting buyers, sellers, and
                administrators through three specialized interfaces with
                real-time features and secure payment processing.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-500">Interfaces</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-gray-500">Key Features</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-green-600">10+</div>
                  <div className="text-sm text-gray-500">Integrations</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-amber-600">2</div>
                  <div className="text-sm text-gray-500">
                    Deployment Services
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={downloadThesis}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mt-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download Full Thesis Document (PDF)
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectPanels;
