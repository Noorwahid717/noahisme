"use client";

import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "~/components/CTAButton";
// import AudioButton from "~/components/AudioButton";
import { trackEvent } from "~/lib/analytics";
import { useEffect, useRef } from "react";

const HEADING_TEXT =
  "Full-Stack Web Developer — Backend & Frontend Specialist, fokus pada efisiensi dan arsitektur bersih.";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headingContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const wordVariant = {
  hidden: {
    y: "110%",
  },
  visible: {
    y: "0%",
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const subheadingVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
      delay: 0.25,
    },
  },
};

const ctaContainer = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
      delayChildren: 0.35,
      staggerChildren: 0.12,
    },
  },
};

const ctaItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

const words = HEADING_TEXT.split(" ");

export default function HeroIntro() {
  const prefersReducedMotion = useReducedMotion();
  const isBrowser = typeof window !== "undefined";
  const shouldAnimate = isBrowser && !prefersReducedMotion;
  const initialState = shouldAnimate ? "hidden" : "visible";

  const typedRef = useRef<HTMLSpanElement | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!typedRef.current || !shouldAnimate) return;

    let typed: { destroy?: () => void } | undefined;

    (async () => {
      const module = await import("typed.js");
      const Typed = module.default;
      typed = new Typed(typedRef.current!, {
        strings: [
          "Full-Stack Web Developer.",
          "Backend & Frontend Specialist.",
          "Building scalable, maintainable apps.",
        ],
        typeSpeed: isMobile ? 40 : 50, // Faster typing on mobile
        backSpeed: isMobile ? 30 : 40, // Faster backspace on mobile
        backDelay: 1800,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    })();

    return () => {
      if (typed && typeof typed.destroy === "function") {
        typed.destroy();
      }
    };
  }, [shouldAnimate]);

  return (
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-[0.35em] text-accent">Mohammad Noor Wahid</p>
      <motion.h1
        className="font-heading text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-[3.25rem] md:leading-[1.1]"
        variants={headingContainer}
        initial={initialState}
        animate="visible"
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="relative inline-block overflow-hidden">
            <motion.span variants={wordVariant} className="inline-block will-change-transform">
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.h1>
      <motion.p
        className="max-w-xl text-lg text-text2"
        variants={subheadingVariant}
        initial={initialState}
        animate="visible"
      >
        Saya membangun aplikasi web end-to-end — dari API hingga UI — dengan perhatian pada
        performa, aksesibilitas, dan arsitektur yang dapat diskalakan.
      </motion.p>
      <div className="text-lg text-accent/80">
        <span ref={typedRef} aria-live="polite" />
      </div>
      <motion.div
        className="flex flex-wrap items-center gap-4"
        variants={ctaContainer}
        initial={initialState}
        animate="visible"
      >
        <motion.div variants={ctaItem}>
          <CTAButton href="/contact" onClick={() => trackEvent("cta_primary_contact")}>
            Jadwalkan diskusi
          </CTAButton>
        </motion.div>
        <motion.div variants={ctaItem}>
          <CTAButton href="/projects" variant="ghost">
            Lihat studi kasus
          </CTAButton>
        </motion.div>
        {/* <motion.div data-testid="hero-audio-toggle" variants={ctaItem}>
          <AudioButton className="rounded-full border-divider/60 bg-surface/70 px-5 py-3" />
        </motion.div> */}
      </motion.div>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-text2">
        <span className="inline-flex items-center gap-2 rounded-full border border-divider/60 bg-surface/70 px-4 py-2 tracking-[0.2em] text-text2">
          <span className="h-2 w-2 rounded-full bg-success/80"></span> 3+ tahun pengalaman
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-divider/60 bg-surface/70 px-4 py-2 tracking-[0.2em] text-text2">
          <span className="h-2 w-2 rounded-full bg-accent/60"></span> Fokus aksesibilitas & animasi
        </span>
      </div>
    </div>
  );
}
