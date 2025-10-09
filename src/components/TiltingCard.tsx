"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";

interface TiltingCardProps {
  title: string;
  description: string;
  metric: string;
  icon?: string;
  index?: number;
}

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function TiltingCard({
  title,
  description,
  metric,
  icon = "✦",
  index = 0,
}: TiltingCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = Math.min(index * 0.1, 0.4);

  if (prefersReducedMotion) {
    return (
      <article className={baseClasses}>
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent/80">
            <span aria-hidden="true">{icon}</span>
            <span>In Focus</span>
          </div>
          <span className="rounded-full border border-divider/50 px-3 py-1 text-xs text-text2">
            {metric}
          </span>
        </header>
        <h3 className="mt-6 font-heading text-xl text-text">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-text2">{description}</p>
      </article>
    );
  }

  return (
    <motion.article
      className={baseClasses}
      initial={{ opacity: 0, rotateX: 12, rotateY: -8, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: easing, delay }}
      whileHover={{
        rotateX: -4,
        rotateY: 6,
        y: -6,
        boxShadow: "0 28px 60px rgba(14, 25, 50, 0.35)",
      }}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent/80">
          <span aria-hidden="true" className="text-base">
            {icon}
          </span>
          <span>In Focus</span>
        </div>
        <motion.span
          className="rounded-full border border-divider/50 px-3 py-1 text-xs text-text2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.1, ease: easing }}
        >
          {metric}
        </motion.span>
      </header>
      <h3 className="mt-6 font-heading text-xl text-text">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text2">{description}</p>
    </motion.article>
  );
}

const baseClasses = clsx(
  "group relative h-full rounded-2xl border border-divider/40 bg-surface/80 p-8",
  "backdrop-blur-sm shadow-subtle transition-transform duration-300"
);
