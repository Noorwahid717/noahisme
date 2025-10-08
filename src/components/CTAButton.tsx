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
  "focus-outline inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 will-change-transform";

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
    variant === "primary" &&
      "bg-accent text-white shadow-subtle hover:shadow-soft hover:saturate-110",
    variant === "ghost" &&
      "border border-divider/60 bg-surface/80 text-text hover:border-accent/50 hover:text-accent",
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
