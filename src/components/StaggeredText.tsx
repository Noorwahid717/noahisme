"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { createElement } from "react";

type SupportedElements = "p" | "h2" | "h3" | "span" | "div";

interface StaggeredTextProps {
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
  },
  word = {
    hidden: {
      opacity: 0,
      y: "40%",
    },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };

export default function StaggeredText({
  text,
  as = "p",
  className,
  delay = 0,
}: StaggeredTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (prefersReducedMotion) {
    return createElement(as, { className }, text);
  }

  const getMotionTag = () => {
    switch (as) {
      case "h2":
        return motion.h2;
      case "h3":
        return motion.h3;
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
      className={clsx("leading-tight", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      custom={delay}
    >
      {words.map((wordToken, index) => (
        <span key={`${wordToken}-${index}`} className="inline-block overflow-hidden">
          <motion.span variants={word} className="inline-block will-change-transform">
            {wordToken}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
