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

// Phosphor Icons inline SVG
const Icons = {
  Puzzle: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M165.78,224H224a8,8,0,0,0,8-8V165.78a8,8,0,0,0-8-8H216a32,32,0,0,1-32-32,8,8,0,0,0-8-8H157.78a8,8,0,0,0-8,8V134a32,32,0,0,1-32,32,8,8,0,0,0-8,8v18.22a8,8,0,0,0,8,8H126a32,32,0,0,1,32,32v8A8,8,0,0,0,165.78,224ZM98.22,117.78V108a32,32,0,0,1-32-32v-8a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8V98.22a8,8,0,0,0,8,8H40a32,32,0,0,1,32,32,8,8,0,0,0,8,8h8.22A8,8,0,0,0,98.22,117.78ZM216,40H165.78a8,8,0,0,0-8,8V56a32,32,0,0,1-32,32,8,8,0,0,0-8,8v8.22a8,8,0,0,0,8,8H134a32,32,0,0,1,32,32v8a8,8,0,0,0,8,8h50.22a8,8,0,0,0,8-8V48A8,8,0,0,0,216,40ZM40,157.78a8,8,0,0,0,8-8V142a32,32,0,0,1,32-32h8a8,8,0,0,0,8-8V90.22a8,8,0,0,0-8-8H80a32,32,0,0,1-32-32V40a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8v58.22a8,8,0,0,0,8,8h8a32,32,0,0,1,32,32v19.56A8,8,0,0,0,40,157.78Z"></path>
    </svg>
  ),
  Brain: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"></path>
    </svg>
  ),
  Cog: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
    </svg>
  ),
  Rocket: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224ZM128,112a12,12,0,1,0-12-12A12,12,0,0,0,128,112Zm95.62,43.83-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83ZM99.43,184h57.14c21.12-37.54,25.07-73.48,11.74-106.88C156.55,47.64,134.49,29,128,24c-6.51,5-28.57,23.64-40.33,53.12C74.36,110.52,78.31,146.46,99.43,184Zm-15,5.85Q68.28,160.5,64.83,132.16L48,152.36,60.36,208l.18-.13ZM208,152.36l-16.83-20.2q-3.42,28.28-19.56,57.69l23.85,18,.18.13Z"></path>
    </svg>
  ),
};

// Step icons and colors
const stepConfig = {
  "01": {
    Icon: Icons.Puzzle,
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/20",
    shadowColor: "shadow-blue-500/20",
  },
  "02": {
    Icon: Icons.Brain,
    color: "from-teal-500 to-teal-600",
    textColor: "text-teal-500",
    borderColor: "border-teal-500/20",
    shadowColor: "shadow-teal-500/20",
  },
  "03": {
    Icon: Icons.Cog,
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-500",
    borderColor: "border-purple-500/20",
    shadowColor: "shadow-purple-500/20",
  },
  "04": {
    Icon: Icons.Rocket,
    color: "from-cyan-500 to-cyan-600",
    textColor: "text-cyan-500",
    borderColor: "border-cyan-500/20",
    shadowColor: "shadow-cyan-500/20",
  },
};

export default function ProcessStepCard({
  step,
  title,
  description,
  index = 0,
}: ProcessStepCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = Math.min(index * 0.15, 0.6); // Increased delay for better stagger
  const config = stepConfig[step as keyof typeof stepConfig] || stepConfig["01"];

  const cardClass = clsx(
    "group relative flex h-full flex-col gap-6 rounded-2xl border border-divider/30",
    "bg-surface/95 p-8 text-left shadow-subtle backdrop-blur-sm",
    "transition-all duration-500 cursor-pointer",
    "hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
  );

  const style = {
    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.08), 0 30px 60px rgba(10, 16, 28, 0.15)",
  };

  if (prefersReducedMotion) {
    return (
      <div className={cardClass} style={style}>
        {/* Icon with gradient background */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${config.color} shadow-lg`}
          >
            <div className="w-8 h-8 text-white">
              <config.Icon />
            </div>
          </div>
          <span
            className={`text-5xl font-heading font-bold bg-gradient-to-br ${config.color} bg-clip-text text-transparent`}
          >
            {step}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="font-heading text-xl font-semibold text-text">{title}</h3>
          <p className="text-sm leading-relaxed text-text2">{description}</p>
        </div>

        {/* Connector line indicator (hidden on last card) */}
        {index < 3 && (
          <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-gradient-to-r from-accent/30 to-transparent xl:block" />
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={cardClass}
      style={style}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: easing, delay }}
      whileHover={{ y: -12, scale: 1.03 }}
    >
      {/* Icon with gradient background */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
      >
        <motion.div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${config.color} shadow-lg`}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 text-white">
            <config.Icon />
          </div>
        </motion.div>
        <span
          className={`text-5xl font-heading font-bold bg-gradient-to-br ${config.color} bg-clip-text text-transparent`}
        >
          {step}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <h3 className="font-heading text-xl font-semibold text-text transition-colors duration-200 group-hover:text-accent">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-text2">{description}</p>
      </motion.div>

      {/* Connector line (hidden on last card and mobile) */}
      {index < 3 && (
        <motion.div
          className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-gradient-to-r from-accent/40 to-transparent xl:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
        />
      )}

      {/* Progress dot */}
      <motion.div
        className={`absolute -bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gradient-to-br ${config.color}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.5 }}
      />
    </motion.div>
  );
}
