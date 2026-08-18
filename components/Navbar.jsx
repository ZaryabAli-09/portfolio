"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const Navbar = ({ siteSettings = {} }) => {
  const [open, setOpen] = useState(false);
  const name = siteSettings.name || "Zaryab Ali";
  const role = siteSettings.role || "Full Stack Software Engineer";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary border-b-2 border-black opacity-95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3 shrink-0">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden border font-bold border-gray-900 shrink-0">
            <Image
              src="/zaryab.png"
              alt="Zaryab Ali"
              fill
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-gray-900">{name}</p>
            <p className="font-secondary text-highlight text-base -mt-0.5">
              {role}
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-primary px-4 sm:px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-gray-800 hover:text-gray-900 font-medium text-lg"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
