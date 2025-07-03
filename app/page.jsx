"use client";
import React from "react";
import { motion } from "framer-motion";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { Highlight } from "@/components/ui/hero-highlight";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white  relative">
      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[45vh] md:h-[85vh] md:w-1/2 flex items-center justify-center relative"
        >
          <Avatar />
        </motion.div>

        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Advanced
            <Highlight className="text-black m-2">Full-Stack</Highlight>{" "}
            Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-300 mb-8 text-lg"
          >
            As a full-stack developer with expertise in the MERN stack, I craft
            seamless digital experiences by merging advanced frontend and
            backend technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link
              href="/portfolio"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded transition-colors"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 font-medium rounded transition-colors"
            >
              Contact Me
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a
              href="/resume.pdf"
              download
              className="inline-block px-6 py-2 border border-white hover:bg-white hover:text-gray-900 rounded transition-colors"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
