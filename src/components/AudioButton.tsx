"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { clsx } from "clsx";
import { audioData } from "~/lib/audio-data";
import { audioState, setEnabled } from "~/lib/audio";

type AudioButtonProps = {
  className?: string;
};

export default function AudioButton({ className }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [enabled, updateEnabled] = useState(audioState.enabled);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  const stopPlayback = () => {
    if (soundRef.current?.playing()) {
      soundRef.current.stop();
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(query.matches);

    query.addEventListener("change", handleChange);

    return () => {
      query.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    setEnabled(enabled);
    if (!enabled) {
      stopPlayback();
    }
  }, [enabled]);

  useEffect(() => {
    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const toggle = () => {
    if (isPlaying) {
      stopPlayback();
      updateEnabled(false);
      return;
    }

    if (!enabled) {
      updateEnabled(true);
    }

    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [audioData.success],
        format: ["wav"],
        loop: true,
        volume: Math.min(audioState.volume, 0.25),
      });
    }

    try {
      soundRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn("Gagal memutar audio demo", error);
    }
  };

  const label = isPlaying ? "Hentikan demo audio" : "Putar demo audio";

  return (
    <button
      type="button"
      onClick={toggle}
      className={clsx(
        "focus-outline inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
        "border-divider/60 bg-surface/60 text-text2 hover:border-accent/60 hover:text-text",
        isPlaying && "border-accent/70 text-accent",
        className
      )}
      aria-pressed={isPlaying}
      aria-label={label}
    >
      <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0.65, 1, 0.75].map((peak, index) => (
          <motion.span
            key={index}
            className="block w-[3px] rounded-full bg-current"
            initial={{ scaleY: 0.3 }}
            animate={
              prefersReducedMotion
                ? { scaleY: 0.3 }
                : isPlaying
                  ? { scaleY: [0.3, peak, 0.3] }
                  : { scaleY: 0.3 }
            }
            transition={
              prefersReducedMotion || !isPlaying
                ? { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                : {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.4,
                    ease: "easeInOut",
                    delay: index * 0.16,
                  }
            }
            style={{ transformOrigin: "bottom" }}
          />
        ))}
      </span>
      <span className="sr-only sm:not-sr-only sm:inline">{label}</span>
    </button>
  );
}
