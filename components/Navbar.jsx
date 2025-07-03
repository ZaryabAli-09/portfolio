"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Image from "next/image";
import { motion } from "framer-motion";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/portfolio", title: "Portfolio" },
  { url: "/contact", title: "Contact" },
];

const socialLinks = [
  {
    url: "https://github.com/ZaryabAli-09",
    icon: "/github.png",
    alt: "GitHub",
  },

  {
    url: "https://www.linkedin.com/in/zaryab-ali-softdev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: "/linkedin.png",
    alt: "LinkedIn",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuVariants = {
    closed: { x: "100vw" },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    opened: { x: 0, opacity: 1 },
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <nav className="sticky h-full top-0 w-full z-50 bg-gray-900 border-b border-gray-800 shadow-md shadow-black">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-amber-400">
          Zaryab_Dev.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex gap-4 ml-6">
            {socialLinks.map((social) => (
              <Link
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src={social.icon}
                  alt={social.alt}
                  width={24}
                  height={24}
                  className="filter invert brightness-0"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <ImCross className="text-xl" />
          ) : (
            <GiHamburgerMenu className="text-2xl" />
          )}
        </button>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial="closed"
            animate="opened"
            variants={menuVariants}
            className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link) => (
              <motion.div key={link.url} variants={linkVariants}>
                <Link
                  href={link.url}
                  onClick={() => setOpen(false)}
                  className="text-3xl text-gray-300 hover:text-amber-400 transition-colors"
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}

            <div className="flex gap-6 mt-8">
              {socialLinks.map((social) => (
                <motion.div key={social.url} variants={linkVariants}>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={social.icon}
                      alt={social.alt}
                      width={32}
                      height={32}
                      className="filter invert brightness-0"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
