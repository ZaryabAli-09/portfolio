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
    color: "from-blue-300 to-violet-300",
    title: "Next.js Medium Blog",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, maiores excepturi. Ut exercitationem laboriosam quisquam tempora accusantium numquam, minima itaque?",
    img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    link: "https://moderntechfeed.com",
  },
  {
    id: 2,
    color: "from-blue-400 to-violet-400",
    title: "React Email Website",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, maiores excepturi. Ut exercitationem laboriosam quisquam tempora accusantium numquam, minima itaque?",
    img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    link: "https://moderntechfeed.com",
  },
  {
    id: 3,
    color: "from-blue-500 to-violet-500",
    title: "Chat App",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, maiores excepturi. Ut exercitationem laboriosam quisquam tempora accusantium numquam, minima itaque?",
    img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    link: "https://moderntechfeed.com",
  },
  {
    id: 4,
    color: "from-blue-600 to-violet-600",
    title: "Notes App",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, maiores excepturi. Ut exercitationem laboriosam quisquam tempora accusantium numquam, minima itaque?",
    img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    link: "https://moderntechfeed.com",
  },
  {
    id: 5,
    color: "from-blue-700 to-violet-700",
    title: "Todo App",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, maiores excepturi. Ut exercitationem laboriosam quisquam tempora accusantium numquam, minima itaque?",
    img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    link: "https://moderntechfeed.com",
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
          <div className="absolute top-96">
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
                  className={`h-screen w-screen flex items-center justify-center bg-gradient-to-r${item.color}`}
                >
                  <div className="flex flex-col gap-8 text-white m-auto w-1/2">
                    <h1>{item.title}</h1>
                    <div className="relative">
                      <Image
                        width={400}
                        height={400}
                        src={item.img}
                        alt="myimage1"
                      />
                    </div>
                    <p>{item.desc}</p>
                    <Link href={item.link}>
                      <button>SEE DEMO</button>
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

        <motion.button className="border p-6 rounded-xl text-4xl md:text-6xl bg-black text-white shadow-2xl mt-5 hover:text-black hover:bg-white">
          <Link href={"/contact"}>Let's Connect</Link>
        </motion.button>
      </div>
    </div>
  );
};

export default Portfolio;
