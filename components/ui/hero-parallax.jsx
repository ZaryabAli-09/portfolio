"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 2); // First 3 images
  const secondRow = products.slice(2, 4); // Next 3 images, starts from where the first row ended
  const thirdRow = products.slice(4, 6);
  const fourthRow = products.slice(5, 7);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 200, damping: 30, bounce: 100 };

  const translateFirstRow = useSpring(
    useTransform(scrollYProgress, [0, 3], [-300, 1000]),
    springConfig
  );
  const translateSecondRow = useSpring(
    useTransform(scrollYProgress, [0, 4], [200, -1000]),
    springConfig
  );
  const translateThirdRow = useSpring(
    useTransform(scrollYProgress, [0, 3], [-300, 1000]),
    springConfig
  );
  const translateFourthRow = useSpring(
    useTransform(scrollYProgress, [0, 2.5], [200, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-900, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className=" h-[280vh] md:h-[450vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse  mb-20 gap-5 md:gap-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateFirstRow}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 gap-5 md:gap-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateSecondRow}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse mb-20 gap-5 md:gap-20 ">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateThirdRow}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse gap-5 md:gap-20 ">
          {fourthRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateFourthRow}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        My Works <br /> Development Studio
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        I build beautiful products using the latest technologies and frameworks.
        As a passionate developer, I love creating amazing, innovative solutions
        that make a difference
      </p>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product  h-28 w-36 md:h-52 md:w-72 lg:h-80 lg:w-[28rem] overflow-hidden rounded-lg relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
