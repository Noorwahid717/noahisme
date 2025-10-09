"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { createElement } from "react";

type SupportedElements = "p" | "blockquote" | "h2" | "span" | "div";

interface BlurStaggerTextProps {
  text: string;
  as?: SupportedElements;
  className?: string;
  delay?: number;
}

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.08,
      delayChildren: delay,
    },
  }),
};

const wordVariant = {
  hidden: {
    opacity: 0,
    y: "35%",
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: easing,
    },
  },
};

export default function BlurStaggerText({
  text,
  as = "p",
  className,
  delay = 0,
}: BlurStaggerTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (prefersReducedMotion) {
    return createElement(as, { className }, text);
  }

  const getMotionTag = () => {
    switch (as) {
      case "blockquote":
        return motion.blockquote;
      case "h2":
        return motion.h2;
      case "span":
        return motion.span;
      case "div":
        return motion.div;
      default:
        return motion.p;
    }
  };
  const MotionTag = getMotionTag();

  return (
    <MotionTag
      className={clsx("leading-relaxed", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      custom={delay}
    >
      {words.map((token, index) => (
        <span key={`${token}-${index}`} className="inline-block overflow-hidden">
          <motion.span variants={wordVariant} className="inline-block will-change-transform">
            {token}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
