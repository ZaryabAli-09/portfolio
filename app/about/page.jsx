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

  // Transform scroll progress for different animations
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const skillCategories = [
    {
      title: "Core Technologies",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 80 },
        { name: "React.js", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "MongoDB", level: 75 },
      ],
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Frontend Expertise",
      skills: [
        { name: "HTML5 & CSS3", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 85 },
        { name: "Three.js", level: 70 },
        { name: "Material UI", level: 80 },
        { name: "Bootstrap", level: 75 },
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "DevOps & Deployment",
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "Vercel", level: 80 },
        { name: "Netlify", level: 75 },
        { name: "AWS EC2", level: 70 },
        { name: "CI/CD Pipelines", level: 70 },
      ],
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Design & CMS",
      skills: [
        { name: "Figma", level: 75 },
        { name: "Adobe Illustrator", level: 70 },
        { name: "Canva", level: 80 },
        { name: "WordPress", level: 75 },
        { name: "Elementor", level: 70 },
      ],
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Sticky Scroll Indicator */}
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
          {/* Biography Section */}
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
                  className="rounded-full border-4 border-amber-400 shadow-xl group-hover:shadow-amber-400/30 transition-all duration-300"
                  alt="Zaryab Ali"
                  priority
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-amber-400/50 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
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
                  Iam Zaryab Ali, a passionate Full-Stack Developer specializing
                  in the MERN stack, currently completing my Software
                  Engineering degree at Iqra National University, Peshawar.
                  Hailing from Katlang, Mardan, I combine technical expertise
                  with creative problem-solving to deliver exceptional digital
                  experiences.
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

          {/* Skills Section */}
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
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education Section */}
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
                  {/* Bachelor's Degree */}
                  <div>
                    <h4 className="text-xl font-bold">
                      Bachelor of Software Engineering
                    </h4>
                    <p className="text-gray-300">
                      Iqra National University, Peshawar
                    </p>
                    <p className="text-gray-400">2020 - 2025 (Expected)</p>
                    <p className="mt-2 text-gray-300">
                      Software Engineering with coursework in Web Technologies,
                      Database Systems, Software Architecture, Programming,
                      Requirements Engineering, and more.
                    </p>
                  </div>

                  {/* F.Sc */}
                  <div className="mt-6 border-t border-gray-700 pt-6">
                    <h4 className="text-xl font-bold">F.Sc</h4>
                    <p className="text-gray-300">
                      Peshawar Model Degree College, Hayatabad
                    </p>
                    <p className="text-gray-400">2019 - 2021</p>
                  </div>

                  {/* Matriculation */}
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
