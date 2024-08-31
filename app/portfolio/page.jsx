"use client";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useScroll, motion, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import React from "react";

const items = [
  {
    id: 1,
    color: "bg-gradient-to-tr from-red-500 to-yellow-500",
    title: "Full Stack Notes App",
    desc: "Keep is a full MERN stack application that allows users to save and manage their notes and to-dos online. Seamlessly organize tasks and notes with a user-friendly interface for efficient productivity.",
    img: "p1.png",
    link: "keepnotesandtodos.netlify.app",
    minGradient: "bg-gradient-to-tr from-gray-200 to-gray-400", // Minimalistic gradient background
  },
  {
    id: 2,
    color: "bg-gradient-to-tr from-blue-900 to-purple-900",
    title: "Modern Digital Agency Web Page",
    desc: "DigitalOctagon is a modern digital agency website built with React and Tailwind CSS. Featuring a sleek design, it utilizes EmailJS for seamless project inquiries and client communication.",
    img: "p2.png",
    link: "https://digitaloctagon.netlify.app",
    minGradient: "bg-gradient-to-tr from-gray-300 to-gray-500", // Minimalistic gradient background
  },
  {
    id: 3,
    color: "bg-gradient-to-tr from-green-300 to-green-500",
    title: "AI Landing Page Inspiration",
    desc: "DietMate AI is an inspirational landing page designed for AI SaaS products. It showcases a sleek and modern interface, highlighting the innovative features and benefits of AI-driven solutions for personalized dietary management.",
    img: "p3.png",
    link: "https://dietmateui.netlify.app",
    minGradient: "bg-gradient-to-tr from-gray-400 to-gray-600", // Minimalistic gradient background
  },
  {
    id: 4,
    color: "bg-gradient-to-tr from-orange-400 to-orange-700",
    title: "Flags Guessing App",
    desc: "GameOfFlags is a flag guessing app built with React and powered by external APIs. It challenges users to identify country flags, offering an engaging and educational experience with a sleek, interactive interface.",
    img: "p4.png",
    link: "https://game-of-flags.netlify.app",
    minGradient: "bg-gradient-to-tr from-gray-500 to-gray-700", // Minimalistic gradient background
  },
  {
    id: 5,
    color: "bg-gradient-to-tr from-blue-400 to-blue-500",
    title: "RealTime Weather App",
    desc: "WeatherSpike is a React application that provides real-time weather data by integrating with third-party APIs. It offers users up-to-date weather information with a responsive and user-friendly interface.",
    img: "p5.png",
    link: "https://weatherspikebyzaryab.netlify.app",
    minGradient: "bg-gradient-to-tr from-gray-600 to-gray-800", // Minimalistic gradient background
  },
];

const Portfolio = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  scrollYProgress;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${items.length * 100}vw`]
  );
  return (
    <div className="">
      <div
        className={"relative"}
        style={{ height: `${items.length * 100}vh` }}
        ref={ref}
      >
        <div
          className="h-[85vh] flex items-center justify-center text-center text-8xl
        "
        >
          My Works{" "}
          <div className="absolute top-52 md:top-96">
            <ScrollIndicator />
          </div>
        </div>{" "}
        {/* <ScrollIndicator /> */}
        <div className="sticky top-0 flex h-screen gap-4 items-center overflow-x-hidden">
          <motion.div style={{ x: x }} className="flex ">
            <div className="h-screen w-screen"></div>
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`h-screen w-screen flex items-center justify-center ng-${item.minGradient}`}
                >
                  <div className="flex flex-col gap-8 text-white m-auto w-1/2">
                    <h1
                      className={`text-white p-2 rounded-lg text-md sm:text-xl md:text-2xl lg:w-[75%]  ${item.color}`}
                    >
                      {item.title}
                    </h1>
                    <div className="relative">
                      <Image
                        className="rounded-lg shadow-lg shadow-black border-2 border-black"
                        width={500}
                        height={600}
                        src={`/${item.img}`}
                        alt="myimage1"
                      />
                    </div>
                    <p className="text-black text-xs md:text-sm lg:w-[80%]">
                      {" "}
                      {item.desc}
                    </p>
                    <Link href={item.link}>
                      <h4
                        className={`text-white p-2 rounded-lg text-xl font-bold shadow-md shadow-black  w-fit transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black/50  ${item.color}`}
                      >
                        SEE DEMO
                      </h4>
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <div className=" h-[100vh] flex items-center justify-center flex-col gap-5 ">
        <div>
          <h1 className="text-center text-6xl md:text-8xl">
            {" "}
            Do you have projects?
          </h1>
        </div>

        <motion.button className="border p-6 rounded-xl text-4xl md:text-6xl bg-black text-white shadow-2xl mt-5 hover:text-black hover:bg-white transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black/50">
          <Link href={"/contact"}>Lets Connect</Link>
        </motion.button>
      </div>
    </div>
  );
};

export default Portfolio;
