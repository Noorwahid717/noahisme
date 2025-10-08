"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const highlights = [
  "Arsitektur Astro Islands & React dengan performa tinggi.",
  "Sistem desain aksesibel dengan tipografi presisi.",
  "Integrasi animasi & audio yang patuh prefers-reduced-motion.",
];

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardTranslate = useTransform(scrollYProgress, [0, 1], [-40, 32]);
  const accentTranslate = useTransform(scrollYProgress, [0, 1], [24, -16]);

  const card = (
    <div className="relative overflow-hidden rounded-xl border border-divider/50 bg-surface/90 p-8 shadow-soft">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/15 via-transparent to-transparent" />
      <p className="text-xs uppercase tracking-[0.35em] text-accent/80">Spesialisasi</p>
      <ul className="mt-6 space-y-4 text-sm leading-relaxed text-text2">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center gap-4 rounded-full border border-divider/40 bg-bg/60 px-4 py-3 text-xs uppercase tracking-[0.3em] text-text2">
        <span>Kolaborasi global</span>
        <span className="h-1 w-1 rounded-full bg-divider/60" />
        <span>Studi kasus premium</span>
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div className="relative">
        {card}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-accent/20 blur-2xl md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 bottom-0 hidden h-36 w-36 rounded-3xl bg-gradient-to-br from-accent/10 via-accent/0 to-transparent blur-2xl md:block"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <motion.div style={{ y: cardTranslate }} className="relative">
        {card}
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ y: accentTranslate }}
        className="pointer-events-none absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-accent/20 blur-2xl md:block"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: accentTranslate }}
        className="pointer-events-none absolute -right-10 bottom-0 hidden h-36 w-36 rounded-3xl bg-gradient-to-br from-accent/10 via-accent/0 to-transparent blur-2xl md:block"
      />
    </div>
  );
}
