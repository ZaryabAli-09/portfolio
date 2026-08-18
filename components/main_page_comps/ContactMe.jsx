"use client";

import { useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiCopy, FiCheck } from "react-icons/fi";
import Button from "@/components/common/Button";

const ICONS = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
};

const Contact = ({ siteSettings }) => {
  const [copied, setCopied] = useState(false);
  const email = siteSettings?.email || "zaryabkhan248@gmail.com";
  const socialLinks = (siteSettings?.socialLinks || []).map((link) => ({
    ...link,
    alt: link.label,
  }));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-dotted border-b-2 border-dashed border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <p className="font-secondary text-highlight text-xl mb-2">say hello</p>

        <h2 className="text-4xl md:text-5xl font-extrabold text-heading  leading-tight">
          Got something{" "}
          <span className="relative inline-block">
            <span className="relative z-10">worth building?</span>
            <svg
              className="absolute left-0 -bottom-1 w-full h-4 overflow-visible"
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="2"
                y1="4"
                x2="198"
                y2="6"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength="1"
                className="draw-in stroke-highlight"
                style={{ animationDelay: "0.2s" }}
              />
              <line
                x1="2"
                y1="12"
                x2="198"
                y2="10"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength="1"
                className="draw-in stroke-highlight"
                style={{ animationDelay: "0.5s" }}
              />
            </svg>
          </span>
        </h2>

        <p className="text-description max-w-xl mx-auto mb-10">
          I&apos;m always up for an interesting problem. The fastest way to
          reach me is email — or find me on any of the usual places.
        </p>

        <div className="inline-flex items-stretch gap-2">
          <Button
            variant="primary"
            href={`mailto:${email}`}
            icon={FiMail}
            iconPosition="left"
          >
            {email}
          </Button>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy email address"
            title={copied ? "Copied!" : "Copy email"}
            className="inline-flex items-center justify-center w-12 rounded-md bg-primary border-2 border-gray-900
              shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827]
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
              transition-all duration-150 ease-out"
          >
            {copied ? (
              <FiCheck className="w-4 h-4 text-success" />
            ) : (
              <FiCopy className="w-4 h-4 text-heading" />
            )}
          </button>
        </div>

        {copied && (
          <p className="font-secondary text-success text-lg mt-2">
            Copied to clipboard!
          </p>
        )}

        <div className="flex items-center justify-center gap-4 mt-8">
          {socialLinks.map((social) => {
            const Icon = ICONS[social.alt];
            return (
              <a
                key={social.alt}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.alt}
                className="text-heading p-3 border-2 border-transparent hover:border-heading hover:bg-primary rounded-full transition-all hover:scale-110"
              >
                {Icon && <Icon className="w-5 h-5" />}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
