"use client";
import BicycleIcon from "@/components/SVG";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useInView, useScroll, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const About = () => {
  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        "HTML5",
        "CSS",
        "JavaScript",
        "React JS",
        "Tailwind CSS",
        "Bootstrap",
        "Framer Motion",
        "Three JS",
      ],
      gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      category: "Backend Development",
      skills: ["Node JS", "Express JS", "MongoDB"],
      gradient: "bg-gradient-to-r from-green-800 to-teal-900",
    },
    {
      category: "Design & Animation",
      skills: ["Canva", "Adobe Illustrator", "Framer Motion"],
      gradient: "bg-gradient-to-r from-pink-500 to-orange-400",
    },
    {
      category: "E-Commerce & CMS",
      skills: ["WooCommerce", "Elementor", "WordPress"],
      gradient: "bg-gradient-to-r from-purple-500 to-indigo-400",
    },
    {
      category: "Tools & Platforms",
      skills: ["Astra Theme", "OceanWP Theme", "WordPress", "Elementor"],
      gradient: "bg-gradient-to-r from-yellow-500 to-red-400",
    },
    {
      category: "Deployment & Cloud Services",
      skills: [
        "Git",
        "GitHub",
        "Vercel",
        "Netlify",
        "Hostinger",
        "AWS EC2",
        "Cloudinary",
      ],
      gradient: "bg-gradient-to-r from-gray-500 to-blue-500",
    },
  ];
  const skillRef = useRef();
  const conatinerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: conatinerRef });
  const skillRefInView = useInView(skillRef);
  return (
    <div ref={conatinerRef} style={{ height: "auto" }}>
      {/* CONTAINER  */}
      <div className="flex ">
        {/* TEXT CONTAINER  */}
        <div className=" p-4 sm:p-8 md:p-12 lg:p-14 xl:p-16 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64  items-center md:w-4/5 lg:w-1/2 ">
          {/* BIOGRAPHY   */}
          <div className=" flex flex-col     h-[85vh] ">
            <motion.h1
              initial={{ x: "-300px" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-bold text-4xl"
            >
              BIOGRAPHY
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className=" p-4"
            >
              <div className="relative inline-block">
                <Image
                  src="/zaryab.png"
                  width={190}
                  height={190}
                  className="rounded-full border-4 border-gradient shadow-lg"
                  alt="Zaryab Ali"
                />
                <div className="absolute inset-0 border-4 border-gradient rounded-full pointer-events-none" />
              </div>
            </motion.div>

            <motion.p
              initial={{ y: "30px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm"
            >
              I am Zaryab Ali, a final-year Software Engineering student at Iqra
              National University, Peshawar, with roots in Katlang, a vibrant
              area in the Mardan district of Khyber Pakhtunkhwa, Pakistan. As a
              full-stack MERN developer, I excel in leading and managing web
              development projects, offering tailored business solutions through
              advanced technologies like React.js, Node.js, and MongoDB. My
              expertise extends to integrating Framer Motion for creating
              visually engaging animations that enhance user experiences on
              websites. Alongside my technical skills, I am proficient in
              creative tools like Canva and Adobe Illustrator, enabling me to
              bring a unique blend of design and development to every project.
            </motion.p>
            <ScrollIndicator />
          </div>
          {/* SKILLS   */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            <motion.h1
              initial={{ x: "-300px", opacity: 0 }}
              animate={skillRefInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-bold text-4xl"
            >
              Skills
            </motion.h1>
            {skillCategories.map((category, index) => (
              <div key={category.category} className="flex flex-col gap-4">
                <motion.h2
                  initial={{ x: "-100px", opacity: 0 }}
                  animate={skillRefInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                  className="font-semibold text-2xl"
                >
                  {category.category}
                </motion.h2>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.button
                      key={skill}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={skillRefInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        delay: 0.5 + skillIndex * 0.1,
                        duration: 0.4,
                      }}
                      className={`text-white p-2 rounded ${category.gradient}`}
                    >
                      {skill}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* SVG CONTAINER  */}
        <div className="hidden lg:flex fixed right-10 top-32">
          <BicycleIcon scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
};

export default About;
