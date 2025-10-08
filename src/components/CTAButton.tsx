"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { play } from "~/lib/audio";

interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
}

const baseClasses =
  "focus-outline inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition will-change-transform";

export default function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: CTAButtonProps) {
  const Component = href ? motion.a : motion.button;
  const styles = clsx(
    baseClasses,
    variant === "primary" && "bg-accent text-bg shadow-soft",
    variant === "ghost" &&
      "border border-divider/80 bg-transparent text-text hover:border-accent/60",
    className
  );

  const handleClick = () => {
    play("click");
    onClick?.();
  };

  const componentProps = href ? { href } : { type };

  return (
    <Component
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={styles}
      onClick={handleClick}
      {...componentProps}
    >
      {children}
    </Component>
  );
}
