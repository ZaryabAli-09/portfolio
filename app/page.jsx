"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Avatar from "@/components/Avatar";
import Link from "next/link";

const Home = () => {
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    // Set a timeout to show the Avatar after 3-4 seconds
    const timer = setTimeout(() => {
      setShowAvatar(true);
    }, 1000); // Adjust the delay as needed (e.g., 3000 ms for 3 seconds)

    // Clear the timeout if the component is unmounted before the timer completes
    return () => clearTimeout(timer);
  }, []);

  const headingVariants = {
    hidden: { x: "100vw" },
    visible: { x: "0vw" },
  };
  const paragraphVariants = {
    hidden: { x: "-100vw" },
    visible: { x: "0vw" },
  };
  return (
    <div className="flex h-[85vh]   flex-col md:flex-row  px-8 sm:px-8 md:px-12 lg:px-20 xl:px-40 ">
      {/* IMAGE CONTAINER  */}
      <div className="h-[45vh]   md:h-[85vh] md:w-1/2 flex items-center justify-center  relative  ">
        {showAvatar ? <Avatar /> : "Avatar loading..."}
      </div>
      {/* TEXT CONATINER  */}
      <div className="h-[40vh] md:h-[85vh] md:w-1/2   flex flex-col gap-3 justify-center items-center md:items-start">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "easeOut" }}
          className=" text-2xl sm:text-3xl font-bold text-center md:text-4xl md:text-left "
        >
          Advanced Full-Stack Solutions with Engaging Animations
        </motion.h2>
        {/* DESC  */}
        <motion.p
          variants={paragraphVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-sm    text-center md:text-left"
        >
          As a full-stack developer with expertise in the MERN stack, I craft
          seamless digital experiences by merging advanced frontend and backend
          technologies. Leveraging tools like Framer Motion, I integrate
          engaging animations to create visually captivating projects that
          exceed user expectations.
        </motion.p>
        <div className="flex gap-4 ">
          <motion.button
            className="border p-2 rounded-md bg-black text-white text-sm"
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeIn" }}
          >
            <Link href={"/portfolio"}> View My Work </Link>
          </motion.button>

          <motion.button
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="border p-2 rounded-md text-sm"
          >
            <Link href={"/contact"}>Contact Me</Link>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;
