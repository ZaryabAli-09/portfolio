import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary: "bg-gray-900 border-2 border-gray-900 text-white",
  outline: "bg-primary  border-2 border-gray-900",
};

/**
 * Shared button used across the site — sticker-style with a hard offset
 * shadow that "presses in" on hover/active, no JS/animation libs needed.
 *
 * <Button variant="primary" href="/work" icon={ArrowUpRight}>See my work</Button>
 * <Button variant="outline" icon={Mail} iconPosition="left" onClick={...}>Get in touch</Button>
 */
const Button = ({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  icon: Icon,
  iconPosition = "right",
  className,
  ...props
}) => {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md  text-base font-bold",
    "shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827]",
    "hover:translate-x-[2px] hover:translate-y-[2px]",
    "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    "transition-all duration-150 ease-out",
    variantStyles[variant],
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
