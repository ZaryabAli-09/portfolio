import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SOCIAL_LINKS } from "@/lib/constants";

const ICONS = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
};

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-primary border-t-2 border-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* wavy divider */}
        <svg
          viewBox="0 0 800 24"
          preserveAspectRatio="none"
          className="w-full h-6 text-highlight mt-10 mb-8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 12C40 2 80 22 120 12C160 2 200 22 240 12C280 2 320 22 360 12C400 2 440 22 480 12C520 2 560 22 600 12C640 2 680 22 720 12C750 5 780 15 800 12"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10">
          {/* Left */}
          <div>
            <p className="font-secondary text-highlight text-3xl mb-1">
              Let&apos;s build something.
            </p>
            <p className="text-description text-sm">
              © {new Date().getFullYear()} Zaryab Ali. Hand-drawn with care.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICONS[social.alt];
                return (
                  <a
                    key={social.alt}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.alt}
                    className="text-heading p-2.5 border-2 border-transparent hover:border-heading hover:bg-primary rounded-full transition-all hover:scale-110"
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
