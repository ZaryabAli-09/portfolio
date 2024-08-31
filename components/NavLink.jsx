"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, title, onClick }) => {
  const pathName = usePathname();
  return (
    <Link
      className={`rounded p-1 ${pathName === href && "bg-black text-white"}`}
      href={href}
      onClick={onClick}
    >
      {title}
    </Link>
  );
};

export default NavLink;
