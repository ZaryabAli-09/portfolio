"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const skillCategories = [
    {
      title: "Core Technologies",
      skills: [
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Frontend Expertise",
      skills: [
        "HTML5 & CSS3",
        "Tailwind CSS",
        "Framer Motion",
        "Three.js",
        "Material UI",
        "Bootstrap",
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "DevOps & Deployment",
      skills: [
        "Git & GitHub",
        "Vercel",
        "Netlify",
        "AWS EC2",
        "CI/CD Pipelines",
      ],
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Design & CMS",
      skills: ["Figma", "Adobe Illustrator", "Canva", "WordPress", "Elementor"],
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-amber-400 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <motion.div
          style={{ scale: scaleProgress, opacity: opacityProgress }}
          className="max-w-6xl mx-auto"
        >
          {/* Bio */}
          <section className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <div className="relative group lg:w-1/3">
                <Image
                  src="/zaryab.png"
                  width={320}
                  height={320}
                  className="rounded-full border-4 border-amber-400 shadow-xl"
                  alt="Zaryab Ali"
                  // priority
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent " />
              </div>

              <div className="lg:w-2/3">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  About <span className="text-amber-400">Me</span>
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-300 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  I am Zaryab Ali, a passionate Full-Stack Developer
                  specializing in the MERN stack, currently completing my
                  Software Engineering degree at Iqra National University,
                  Peshawar. Hailing from Katlang, Mardan, I combine technical
                  expertise with creative problem-solving to deliver exceptional
                  digital experiences.
                </motion.p>

                <motion.p
                  className="text-lg text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  With expertise ranging from React.js animations to Node.js
                  backend systems, I architect complete solutions that are
                  performant, scalable, and visually engaging. My design skills
                  with tools like Figma and Illustrator enable me to bridge the
                  gap between development and design seamlessly.
                </motion.p>
              </div>
            </motion.div>
          </section>

          {/* Skills */}
          <section className="mb-32">
            <motion.h2
              className="text-4xl font-bold mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              My <span className="text-amber-400">Skills</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                  <h3
                    className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                  >
                    {category.title}
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
            >
              <h3 className="text-3xl font-bold mb-6 text-amber-400">
                Education
              </h3>
              <div className="flex items-start gap-6">
                <div className="bg-amber-400/10 p-3 rounded-full border border-amber-400/30">
                  <svg
                    className="w-8 h-8 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div>
                    <h4 className="text-xl font-bold">
                      Bachelor of Software Engineering
                    </h4>
                    <p className="text-gray-300">
                      Iqra National University, Peshawar
                    </p>
                    <p className="text-gray-400">2020 - 2025 (Expected)</p>
                  </div>

                  <div className="mt-6 border-t border-gray-700 pt-6">
                    <h4 className="text-xl font-bold">F.Sc</h4>
                    <p className="text-gray-300">
                      Peshawar Model Degree College, Hayatabad
                    </p>
                    <p className="text-gray-400">2019 - 2021</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xl font-bold">
                      Matriculation (Science)
                    </h4>
                    <p className="text-gray-300">
                      Peshawar Model School, Mardan Campus
                    </p>
                    <p className="text-gray-400">Graduated 2018</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
