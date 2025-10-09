"use client";

import type { FC, PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MotionRevealProps = PropsWithChildren<{
  delay?: number;
  className?: string;
}>;

const MotionReveal: FC<MotionRevealProps> = ({ children, delay = 0, className }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default MotionReveal;
