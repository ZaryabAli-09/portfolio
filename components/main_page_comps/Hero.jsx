import Image from "next/image";
import {
  FiArrowUpRight,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
  FiTwitter,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SiClaudecode } from "react-icons/si";
import Button from "@/components/common/Button";
import { readSiteSettings } from "@/lib/contentStore";

const SOCIAL_ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  facebook: FiFacebook,
  twitter: FiTwitter,
  x: FaXTwitter,
};

const Hero = async () => {
  const siteSettings = await readSiteSettings();
  const name = siteSettings.name || "Zaryab Ali";
  const role = siteSettings.role || "full-stack MERN developer";
  const heroDescription =
    siteSettings.heroDescription ||
    "with 1.5+ years of professional experience, building production-ready web, mobile, AI, and cloud solutions since";
  const heroSince = siteSettings.heroSince || "2021";
  const socialLinks = siteSettings.socialLinks || [];

  return (
    <section id="home" className="relative w-full bg-primary bg-dotted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Text Section */}
        <div>
          <p className="flex items-center gap-2 font-secondary text-highlight text-2xl mb-3">
            <span>
              <SiClaudecode className="text-xl" />
            </span>{" "}
            Hey, I&apos;m
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] mb-6">
            {name}
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            A{" "}
            <span className="relative inline-block font-semibold ">
              {role}
              <svg
                className="absolute left-0 -bottom-1 w-full h-2 overflow-visible"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="3"
                  y1="10"
                  x2="99"
                  y2="6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength="1"
                  className="draw-in stroke-highlight"
                  style={{ animationDelay: "0.3s" }}
                />
              </svg>
              <svg
                className="absolute left-0 -bottom-1 w-full h-2 overflow-visible"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="3"
                  y1="7"
                  x2="99"
                  y2="6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength="1"
                  className="draw-in stroke-highlight"
                  style={{ animationDelay: "0.5s" }}
                />
              </svg>
            </span>{" "}
            {heroDescription}{" "}
            <span className="relative inline-block px-2">
              <span className="relative z-10">{heroSince}.</span>
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
                  style={{ animationDelay: "2s" }}
                />
              </svg>
              <svg
                className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] overflow-visible translate-x-[3px] translate-y-[2px]"
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
                  style={{ animationDelay: "1.2s" }}
                />
              </svg>
            </span>
            <br />
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

            <div className="flex items-center gap-4 ">
              {socialLinks.map((social) => {
                const Icon =
                  SOCIAL_ICONS[social.label?.toLowerCase()] || FiGithub;
                return (
                  <a
                    key={social.label || social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-heading p-3 border-2 border-transparent hover:border-heading hover:bg-primary rounded-full transition-all hover:scale-110"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative">
            {/* curly arrow pointing at the photo */}
            <svg
              viewBox="0 0 80 60"
              className="hidden md:block absolute -left-16 bottom-10 w-16 h-12 text-secondary"
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

            {/* outer frame (border + gap + shadow) */}
            <div
              className="relative w-[200px] sm:w-[240px] md:w-[250px] aspect-[4/5] rounded-2xl border-2 border-gray-900 bg-white p-2 rotate-[-2deg]"
              style={{
                boxShadow: "10px 12px 0px rgba(0,0,0,0.9)",
              }}
            >
              {/* inner photo, separated from border by the parent's padding */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/zaryab.png"
                  alt="Zaryab Ali"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <span className="absolute -bottom-3 -right-6 font-secondary text-secondary text-2xl rotate-[-6deg]">
              that&apos;s me 👋
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
