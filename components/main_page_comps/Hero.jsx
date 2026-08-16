"use client";
import Image from "next/image";
import {
  FiArrowUpRight,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Button from "@/components/common/Button";

const socialLinks = [
  { url: "https://github.com/ZaryabAli-09", icon: FiGithub, alt: "GitHub" },
  {
    url: "https://www.linkedin.com/in/zaryab-ali-softdev",
    icon: FiLinkedin,
    alt: "LinkedIn",
  },
  { url: "https://x.com", icon: FaXTwitter, alt: "X" },
  { url: "https://instagram.com", icon: FiInstagram, alt: "Instagram" },
];

const Hero = () => {
  return (
    <section id="home" className="relative w-full bg-primary bg-dotted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Text Section */}
        <div>
          <p className="flex items-center gap-2 font-secondary text-secondary text-2xl mb-3">
            <span aria-hidden="true">✳️</span> Hey, I&apos;m
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-6">
            Zaryab Ali
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 max-w-xl">
            A{" "}
            <span className="relative inline-block font-semibold text-gray-900">
              full-stack MERN developer
              <svg
                className="absolute left-0 -bottom-1 w-full h-2 overflow-visible"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="1"
                  y1="6"
                  x2="99"
                  y2="6"
                  stroke="#B08968"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength="1"
                  className="draw-in"
                  style={{ animationDelay: "0.3s" }}
                />
              </svg>
            </span>{" "}
            who&apos;s been shipping software since{" "}
            <span className="relative inline-block px-2">
              <span className="relative z-10">2017</span>
              <svg
                className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] overflow-visible"
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <ellipse
                  cx="50"
                  cy="25"
                  rx="47"
                  ry="21"
                  fill="none"
                  stroke="#E4572E"
                  strokeWidth="2.5"
                  pathLength="1"
                  className="draw-in"
                  style={{ animationDelay: "1s" }}
                />
              </svg>
            </span>
            . I build web &amp; mobile products, APIs and developer tooling —
            and love turning ideas into shipped products.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" href="#work" icon={FiArrowUpRight}>
              See my work
            </Button>
            <Button
              variant="outline"
              href="#contact"
              icon={FiMail}
              iconPosition="left"
            >
              Get in touch
            </Button>

            <div className="flex items-center gap-5 ml-1">
              {socialLinks.map((social) => (
                <a
                  key={social.alt}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.alt}
                  className="text-gray-900 hover:text-secondary transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative">
            {/* curly arrow pointing at the photo */}
            <svg
              viewBox="0 0 80 60"
              className="hidden md:block absolute -left-16 top-1/2 w-16 h-12 text-secondary"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M70 5C55 5 20 15 15 40C13 48 18 53 25 50"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M14 40L25 50L18 58"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* framed photo — border radius jiggles gently, image itself stays put */}
            <div
              className="jiggle-border relative w-[280px] sm:w-[340px] md:w-[380px] aspect-[4/5] border-[10px] border-gray-900 bg-gray-100 overflow-hidden shadow-xl"
              style={{ borderRadius: "34px 20px 40px 18px" }}
            >
              <Image
                src="/zaryab.png"
                alt="Zaryab Ali"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* monitor-style stand */}
            <div className="mx-auto w-2/5 h-4 bg-gray-900 rounded-b-md" />
            <div className="mx-auto w-3/5 h-2 bg-gray-900 rounded-b-md" />

            <span className="absolute -bottom-2 -right-4 font-secondary text-secondary text-2xl rotate-[-6deg]">
              that&apos;s me 👋
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
