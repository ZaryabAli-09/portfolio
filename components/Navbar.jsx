"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Image from "next/image";
import NavLink from "./NavLink";
import { motion } from "framer-motion";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/portfolio", title: "Portfolio" },
  { url: "/contact", title: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const listbgVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.3,
      },
    },
  };

  const mobileMenuLinksVariants = {
    closed: { x: -10, opacity: 0 },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  const handleMenuToggle = () => setOpen(!open);

  const handleLinkClick = () => {
    setOpen(false);
  };
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="h-[15vh] flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40">
      {/* desktop menu  */}
      <div className="hidden md:flex w-1/3 gap-4">
        {links.map((link, i) => (
          <NavLink title={link.title} href={link.url} key={i} />
        ))}
      </div>

      {/* LOGO  */}
      <div className="md:hidden lg:flex ">
        <Link
          className="font-extrabold text-2xl lg:text-4xl"
          href={links[0].url}
        >
          Zaryab_Dev.
        </Link>
      </div>

      <div className="hidden md:flex justify-center gap-4 w-1/3">
        <Link href={"https://github.com/ZaryabAli-09"} target="_blank">
          <Image src={"/github.png"} alt="github" width={24} height={24} />
        </Link>
        <Link
          href={
            "https://www.facebook.com/profile.php?id=100006969497679&mibextid=ZbWKwL"
          }
          target="_blank"
        >
          <Image src={"/facebook.png"} alt="facebook" width={24} height={24} />
        </Link>
        <Link
          href={"https://www.instagram.com/zky_07?igsh=Yng5dms4eTViY2dz"}
          target="_blank"
        >
          <Image
            src={"/instagram.png"}
            alt="instagram"
            width={24}
            height={24}
          />
        </Link>
        <Link
          href={
            "https://www.linkedin.com/in/zaryab-ali-softdev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          }
          target="_blank"
        >
          <Image src={"/linkedin.png"} alt="linkedin" width={24} height={24} />
        </Link>
      </div>

      {/* MENU BUTTON  */}
      <div className="md:hidden">
        {open ? (
          <ImCross
            className="text-3xl z-50 relative text-white cursor-pointer"
            onClick={handleMenuToggle}
          />
        ) : (
          <GiHamburgerMenu
            onClick={handleMenuToggle}
            className="text-4xl z-50 relative text-black cursor-pointer"
          />
        )}

        {/* MOBILE LINKS */}
        {open && (
          <motion.div
            variants={listbgVariants}
            initial="closed"
            animate="opened"
            className="absolute top-0 left-0 w-screen h-full bg-black text-white items-center justify-center flex flex-col  text-4xl gap-6 z-10"
          >
            {links.map((link, i) => (
              <motion.div variants={mobileMenuLinksVariants} key={i}>
                <Link href={link.url} onClick={handleLinkClick}>
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
