"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Loader from "@/components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true); // Initially show loader

  useEffect(() => {
    // Simulate simultaneous loading
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after content is ready
    }, 2000); // Set timeout for 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Website content */}
      <BackgroundBeamsWithCollision className="z-10">
        <div className="flex flex-col md:flex-row px-8 sm:px-8 md:px-12 lg:px-20 xl:px-40">
          {/* IMAGE CONTAINER */}
          <div className="h-[45vh] md:h-[85vh] md:w-1/2 flex items-center justify-center relative">
            <Avatar />
          </div>
          {/* TEXT CONTAINER */}
          <div className="h-[45vh] md:h-[85vh] md:w-1/2 flex flex-col gap-4 justify-center items-center md:items-start">
            <HeroHighlight>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [20, -5, 0] }}
                transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                className="text-2xl sm:text-3xl font-bold text-center md:text-4xl md:text-left"
              >
                Advanced
                <Highlight className="text-black m-2">
                  Full-Stack
                </Highlight>{" "}
                Solutions with Engaging Animations
              </motion.h1>
            </HeroHighlight>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ x: "-100vw" }}
              animate={{ x: "0vw" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-sm text-center md:text-left"
            >
              As a full-stack developer with expertise in the MERN stack, I
              craft seamless digital experiences by merging advanced frontend
              and backend technologies.
            </motion.p>

            <div className="flex gap-4">
              <motion.button
                initial={{ x: "-100vw" }}
                animate={{ x: "0vw" }}
                transition={{ duration: 0.8, ease: "easeIn" }}
                className="px-8 py-2 border border-black bg-transparent text-black dark:border-white relative group transition duration-200"
              >
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
                <span className="relative">
                  <Link href="/portfolio">View My Work</Link>
                </span>
              </motion.button>

              <motion.button
                initial={{ x: "100vw" }}
                animate={{ x: "0vw" }}
                transition={{ duration: 0.8, ease: "easeIn" }}
                className="px-8 py-2 border border-black bg-transparent text-black dark:border-white relative group transition duration-200"
              >
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
                <span className="relative">
                  <Link href="/contact">Contact Me</Link>
                </span>
              </motion.button>
            </div>

            <motion.button
              initial={{ opacity: 0, y: "100px" }}
              animate={{ opacity: 1, y: "0px" }}
              transition={{ duration: 0.8, ease: "easeIn" }}
              className="px-8 py-0.5 border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-lg"
            >
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </motion.button>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default Home;
