"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";

interface ProcessStepCardProps {
  step: string;
  title: string;
  description: string;
  index?: number;
}

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProcessStepCard({
  step,
  title,
  description,
  index = 0,
}: ProcessStepCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = Math.min(index * 0.12, 0.48);

  const cardClass = clsx(
    "group relative flex h-full flex-col gap-6 rounded-[2rem] border border-white/10",
    "bg-surface/95 p-8 text-left shadow-[0_30px_60px_rgba(10,16,28,0.25)]",
    "transition-transform duration-500"
  );

  const style = {
    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.08), 0 30px 60px rgba(10, 16, 28, 0.25)",
  };

  if (prefersReducedMotion) {
    return (
      <div className={cardClass} style={style}>
        <span className="text-5xl font-heading text-accent/80">{step}</span>
        <div className="space-y-3">
          <h3 className="font-heading text-xl text-text">{title}</h3>
          <p className="text-sm leading-relaxed text-text2">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={cardClass}
      style={style}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: easing, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <span className="text-5xl font-heading text-accent/80">{step}</span>
      <div className="space-y-3">
        <h3 className="font-heading text-xl text-text">{title}</h3>
        <p className="text-sm leading-relaxed text-text2">{description}</p>
      </div>
    </motion.div>
  );
}
