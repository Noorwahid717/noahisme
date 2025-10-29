"use client";

import React from "react";
import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";

interface TiltingCardProps {
  title: string;
  description: string;
  metric: string;
  index?: number;
  category?: "education" | "retail" | "enterprise" | "tech";
}

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Phosphor Icons inline SVG
const Icons = {
  GraduationCap: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M176,207.24a119.79,119.79,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm40-54.41a8,8,0,0,0-8,8V240a8,8,0,0,0,16,0V160.83A8,8,0,0,0,216,152.83ZM96,175.94a119.79,119.79,0,0,0,16,7.73V240a8,8,0,0,1-16,0ZM80,160.83a8,8,0,0,0-8,8V240a8,8,0,0,0,16,0V168.83A8,8,0,0,0,80,160.83Zm120-53.16A103.26,103.26,0,0,1,128,128h0A103.26,103.26,0,0,1,56,107.67V96c0-48,40-88.72,88-96a104.15,104.15,0,0,1,56,96ZM40,160v40H24a8,8,0,0,1-8-8V168a8,8,0,0,1,8-8Zm192,0h16a8,8,0,0,1,8,8v24a8,8,0,0,1-8,8H232Z"></path>
    </svg>
  ),
  ShoppingCart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M232,72H70.55L57.44,27.08A16,16,0,0,0,42.13,16H24a8,8,0,0,0,0,16H42.13L55.24,76.92,73.67,131.85,65.4,152.5A24,24,0,0,0,86,184h3.5a32,32,0,1,0,61,0h34a32,32,0,1,0,57.89-17A8,8,0,0,0,240,160H96.18l8-19.7H198.82a24,24,0,0,0,22.84-17.24l19.27-64A8,8,0,0,0,232,72ZM104,200a16,16,0,1,1-16-16A16,16,0,0,1,104,200Zm96,0a16,16,0,1,1-16-16A16,16,0,0,1,200,200Z"></path>
    </svg>
  ),
  Building2: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M232,224H208V32h8a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16h8V224H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM64,32H192V224H160V160a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v64H64Zm80,192H112V168h32ZM88,64a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,64Zm0,32a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm0,32a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,128Z"></path>
    </svg>
  ),
  Sparkles: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"></path>
    </svg>
  ),
};

// Category-specific colors and configurations
const categoryConfig: Record<
  string,
  {
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
    Icon: () => React.JSX.Element;
  }
> = {
  education: {
    color: "rgb(59, 130, 246)", // Blue
    bgColor: "rgba(59, 130, 246, 0.08)",
    borderColor: "rgba(59, 130, 246, 0.2)",
    label: "Education",
    Icon: Icons.GraduationCap,
  },
  retail: {
    color: "rgb(16, 185, 129)", // Green
    bgColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.2)",
    label: "Retail",
    Icon: Icons.ShoppingCart,
  },
  enterprise: {
    color: "rgb(139, 92, 246)", // Purple
    bgColor: "rgba(139, 92, 246, 0.08)",
    borderColor: "rgba(139, 92, 246, 0.2)",
    label: "Enterprise",
    Icon: Icons.Building2,
  },
  tech: {
    color: "rgb(236, 72, 153)", // Pink
    bgColor: "rgba(236, 72, 153, 0.08)",
    borderColor: "rgba(236, 72, 153, 0.2)",
    label: "Technology",
    Icon: Icons.Sparkles,
  },
};

export default function TiltingCard({
  title,
  description,
  metric,
  index = 0,
  category = "tech",
}: TiltingCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = Math.min(index * 0.1, 0.4);
  const config = categoryConfig[category];

  if (prefersReducedMotion) {
    return (
      <article className={baseClasses} style={{ borderColor: config.borderColor }}>
        {/* Illustration thumbnail */}
        <div
          className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full opacity-10 blur-sm"
          style={{ backgroundColor: config.bgColor }}
          aria-hidden="true"
        >
          <div className="w-8 h-8" style={{ color: config.color }}>
            <config.Icon />
          </div>
        </div>

        <header className="relative flex items-start justify-between gap-3">
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em]"
            style={{
              backgroundColor: config.bgColor,
              color: config.color,
            }}
          >
            <div className="w-4 h-4" aria-hidden="true">
              <config.Icon />
            </div>
            <span className="hidden sm:inline">In Focus</span>
            <span className="sm:hidden">Focus</span>
          </div>
          <span
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              borderColor: config.borderColor,
              color: config.color,
            }}
          >
            {metric}
          </span>
        </header>
        <h3 className="mt-6 font-heading text-2xl leading-snug text-text">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-text2">{description}</p>

        {/* CTA */}
        <div
          className="mt-6 flex items-center gap-1.5 text-xs font-medium"
          style={{ color: config.color }}
        >
          <span>View details</span>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    );
  }

  // Disable hover effects on mobile for better performance
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const whileHoverEffect = isMobile
    ? {}
    : {
        rotateX: -4,
        rotateY: 6,
        y: -5,
        boxShadow: "0 28px 60px rgba(14, 25, 50, 0.35)",
      };

  return (
    <motion.article
      className={clsx(baseClasses, "cursor-pointer")}
      style={{ borderColor: config.borderColor }}
      initial={{ opacity: 0, rotateX: 12, rotateY: -8, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: easing, delay }}
      whileHover={whileHoverEffect}
    >
      {/* Illustration thumbnail with blur */}
      <motion.div
        className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full opacity-10 blur-sm"
        style={{ backgroundColor: config.bgColor }}
        aria-hidden="true"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <div className="w-8 h-8" style={{ color: config.color }}>
          <config.Icon />
        </div>
      </motion.div>

      <header className="relative flex items-start justify-between gap-3">
        <motion.div
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em]"
          style={{
            backgroundColor: config.bgColor,
            color: config.color,
          }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.05, ease: easing }}
        >
          <div className="w-4 h-4" aria-hidden="true">
            <config.Icon />
          </div>
          <span className="hidden sm:inline">In Focus</span>
          <span className="sm:hidden">Focus</span>
        </motion.div>
        <motion.span
          className="rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            borderColor: config.borderColor,
            color: config.color,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.1, ease: easing }}
        >
          {metric}
        </motion.span>
      </header>
      <h3 className="mt-6 font-heading text-2xl leading-snug text-text">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text2">{description}</p>

      {/* CTA - View details */}
      <motion.div
        className="mt-6 flex items-center gap-1.5 text-xs font-medium transition-all duration-200 group-hover:gap-2"
        style={{ color: config.color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      >
        <span>View details</span>
        <svg
          className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.article>
  );
}

const baseClasses = clsx(
  "group relative h-full overflow-hidden rounded-2xl border bg-surface/90 p-6 sm:p-8",
  "backdrop-blur-sm shadow-subtle transition-all duration-300",
  "hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
);
