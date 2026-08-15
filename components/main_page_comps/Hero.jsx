"use client";
import React from "react";
import { motion } from "framer-motion";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { Highlight } from "@/components/ui/hero-highlight";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br  from-gray-900 to-black text-white ">
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
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-4xl mb-8 leading-tight"
          >
            <motion.span
              className="block mb-4 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hi, Iam{" "}
              <Highlight className="font-secondary text-black my-5">Zaryab Ali</Highlight>
            </motion.span>

            <motion.span
              className="block my-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              A Passionate{" "}
              <Highlight className="text-black font-extrabold text-6xl">
                Software Engineer
              </Highlight>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-300 mb-8 text-lg"
          >
            As a Software Engineer specializing in full-stack web development
            with the MERN stack, I dont just build applications I solve real
            problems through critical thinking and innovative solutions. My
            expertise goes beyond implementing requirements to architecting
            systems backend, optimizing for performance, and bridging technical
            possibilities with business objectives.
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
              href="/Zaryab's CV (Software Engineer).pdf"
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

export default Hero;
