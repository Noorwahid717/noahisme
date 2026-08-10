"use client";

import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "~/components/CTAButton";
// import AudioButton from "~/components/AudioButton";
import { trackEvent } from "~/lib/analytics";
import { useEffect, useRef, useState } from "react";

const HEADING_BEFORE = "Full-Stack Web Developer — ";
const HEADING_AFTER = ", fokus pada efisiensi dan arsitektur bersih.";

const ROLE_VARIANTS = ["Backend Engineer", "Frontend Specialist", "System Designer"];

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

export default function HeroIntro() {
  const prefersReducedMotion = useReducedMotion();
  const isBrowser = typeof window !== "undefined";
  const shouldAnimate = isBrowser && !prefersReducedMotion;
  const initialState = shouldAnimate ? "hidden" : "visible";

  const roleRef = useRef<HTMLSpanElement | null>(null);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!roleRef.current || !shouldAnimate) return;

    const element = roleRef.current;
    let timeoutId: number | undefined;
    let animationId: number | undefined;

    const typeSpeed = 50; // 50ms per character
    const eraseSpeed = 35; // 35ms per character (faster erase)
    const delayBetween = 1000; // 1s pause between role changes
    const maxLoops = 4; // Loop 4 times then stop

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let loopCount = 0;

    function type() {
      // Stop after max loops
      if (loopCount >= maxLoops && roleIndex === 0 && charIndex === 0 && !isDeleting) {
        element.textContent = ROLE_VARIANTS[0];
        setIsTyping(false);
        return;
      }

      const currentString = ROLE_VARIANTS[roleIndex];

      if (isDeleting) {
        element.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % ROLE_VARIANTS.length;

          // Increment loop counter when we complete a full cycle
          if (roleIndex === 0) {
            loopCount++;
          }

          animationId = window.setTimeout(type, delayBetween);
          return;
        }
      } else {
        element.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentString.length) {
          isDeleting = true;
          animationId = window.setTimeout(type, delayBetween);
          return;
        }
      }

      const speed = isDeleting ? eraseSpeed : typeSpeed;
      animationId = window.setTimeout(type, speed);
    }

    // Start typing after a short delay
    timeoutId = window.setTimeout(() => {
      type();
    }, 800);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      if (animationId !== undefined) {
        window.clearTimeout(animationId);
      }
    };
  }, [shouldAnimate]);

  return (
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-[0.35em] text-accent">Mohammad Noor Wahid</p>
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-[3.25rem] md:leading-[1.1]">
        {HEADING_BEFORE}
        <span
          ref={roleRef}
          className="text-accent relative inline-block min-w-[200px] sm:min-w-[240px]"
          aria-live="polite"
        >
          {shouldAnimate ? "" : ROLE_VARIANTS[0]}
          <span
            className={`inline-block w-[2px] h-[0.9em] bg-accent ml-[2px] align-middle ${
              isTyping ? "animate-cursor-blink" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        </span>
        {HEADING_AFTER}
      </h1>
      <motion.p
        className="max-w-xl text-lg text-text2"
        variants={subheadingVariant}
        initial={initialState}
        animate="visible"
      >
        Saya membangun aplikasi web end-to-end — dari API hingga UI — dengan perhatian pada
        performa, aksesibilitas, dan arsitektur yang dapat diskalakan.
      </motion.p>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="text-success/80"
          >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm49.66,85.66-58.34,56a8,8,0,0,1-11.09-.21l-26-28a8,8,0,0,1,11.94-10.66l20.38,22.48,52.74-50.58a8,8,0,1,1,11.3,11.33Z"></path>
          </svg>
          3+ tahun pengalaman
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-divider/60 bg-surface/70 px-4 py-2 tracking-[0.2em] text-text2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="text-accent/80"
          >
            <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
          </svg>
          Fokus aksesibilitas & animasi
        </span>
      </div>
    </div>
  );
}
