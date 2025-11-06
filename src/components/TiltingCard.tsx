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
  icon?: string;
  additionalMetrics?: Array<{ label: string; value: string }>;
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
  icon,
  additionalMetrics = [],
}: TiltingCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = Math.min(index * 0.1, 0.4);
  const config = categoryConfig[category];
  const [isHovered, setIsHovered] = React.useState(false);

  if (prefersReducedMotion) {
    return (
      <article className={baseClasses} style={{ borderColor: config.borderColor }}>
        <header className="relative flex flex-col gap-3">
          {/* Product icon - Right side */}
          <div
            className="absolute -right-2 -top-2 flex h-20 w-20 items-center justify-center rounded-full opacity-10 blur-sm"
            style={{ backgroundColor: config.bgColor }}
            aria-hidden="true"
          >
            {icon ? (
              <span className="text-3xl">{icon}</span>
            ) : (
              <div className="w-10 h-10" style={{ color: config.color }}>
                <config.Icon />
              </div>
            )}
          </div>
          {/* Category Badge - Top Left */}
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em]"
            style={{
              backgroundColor: config.bgColor,
              color: config.color,
            }}
          >
            <span>{config.label}</span>
            <div className="w-4 h-4" aria-hidden="true">
              <config.Icon />
            </div>
          </div>

          {/* Impact Badge - Below Category */}
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{
              borderColor: config.borderColor,
              color: config.color,
            }}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            {metric}
          </span>
        </header>

        <h3 className="mt-6 font-heading text-2xl leading-snug text-text">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-text2">{description}</p>

        {/* Additional Metrics */}
        {additionalMetrics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {additionalMetrics.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xs font-semibold" style={{ color: config.color }}>
                  {m.value}
                </span>
                <span className="text-xs text-text2/70">{m.label}</span>
              </div>
            ))}
          </div>
        )}

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
        y: -4,
        scale: 1.01,
      };

  return (
    <motion.article
      className={clsx(baseClasses, "cursor-pointer")}
      style={{ borderColor: config.borderColor }}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: easing as [number, number, number, number],
        delay: delay + 0.12 * index,
      }}
      whileHover={whileHoverEffect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <header className="relative flex flex-col gap-3">
        {/* Product icon with floating animation - Right side */}
        <motion.div
          className="absolute -right-2 -top-2 flex h-20 w-20 items-center justify-center rounded-full opacity-10 blur-sm"
          style={{ backgroundColor: config.bgColor }}
          aria-hidden="true"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.1,
            y: [0, -4, 0],
          }}
          transition={{
            scale: { duration: 0.5, delay: delay + 0.2 },
            opacity: { duration: 0.5, delay: delay + 0.2 },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <div className="w-10 h-10" style={{ color: config.color }}>
              <config.Icon />
            </div>
          )}
        </motion.div>
        {/* Category Badge - Top Left with stagger */}
        <motion.div
          className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em]"
          style={{
            backgroundColor: config.bgColor,
            color: config.color,
          }}
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + 0.08,
            ease: easing as [number, number, number, number],
          }}
        >
          <span>{config.label}</span>
          <div className="w-4 h-4" aria-hidden="true">
            <config.Icon />
          </div>
        </motion.div>

        {/* Impact Badge with expandable hover */}
        <motion.span
          className="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200"
          style={{
            borderColor: config.borderColor,
            color: config.color,
          }}
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + 0.14,
            ease: easing as [number, number, number, number],
          }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            animate={isHovered ? { rotate: [0, 10, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </motion.svg>
          {metric}
        </motion.span>
      </header>
      <motion.h3
        className="mt-6 font-heading text-2xl leading-snug text-text"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: delay + 0.2,
          ease: easing as [number, number, number, number],
        }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="mt-3 text-sm leading-relaxed text-text2"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: delay + 0.26,
          ease: easing as [number, number, number, number],
        }}
      >
        {description}
      </motion.p>

      {/* Additional Metrics with stagger */}
      {additionalMetrics.length > 0 && (
        <motion.div
          className="mt-4 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.32 }}
        >
          {additionalMetrics.map((m, i) => (
            <motion.div
              key={i}
              className="flex flex-col"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: delay + 0.32 + i * 0.08,
                ease: easing as [number, number, number, number],
              }}
            >
              <span className="text-sm font-semibold" style={{ color: config.color }}>
                {m.value}
              </span>
              <span className="text-xs text-text2/70">{m.label}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* CTA - View details with arrow slide animation */}
      <motion.div
        className="mt-6 flex items-center text-xs font-medium"
        style={{ color: config.color }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.4 }}
      >
        <span className={isHovered ? "underline underline-offset-2" : ""}>View details</span>
        <motion.svg
          className="ml-1.5 h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={isHovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      </motion.div>
    </motion.article>
  );
}

const baseClasses = clsx(
  "group relative h-full overflow-hidden rounded-2xl border bg-surface/90 p-6 sm:p-8",
  "backdrop-blur-sm shadow-subtle transition-all duration-300",
  "hover:shadow-[0_24px_56px_rgba(0,0,0,0.28)]"
);
