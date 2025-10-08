"use client";

import { useEffect, useRef, useState } from "react";
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
      if (event.matches) {
        stopPlayback();
      }
    };

    setPrefersReducedMotion(query.matches);
    if (query.matches) {
      stopPlayback();
    }

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
    if (prefersReducedMotion) return;

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

  const label = prefersReducedMotion
    ? "Audio dimatikan mengikuti preferensi reduced motion"
    : isPlaying
      ? "Hentikan demo audio"
      : "Putar demo audio";

  return (
    <button
      type="button"
      onClick={toggle}
      className={clsx(
        "focus-outline inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
        "border-divider/60 bg-surface/60 text-text2 hover:border-accent/60 hover:text-text",
        isPlaying && "border-accent/70 text-accent",
        prefersReducedMotion && "cursor-not-allowed opacity-60",
        className
      )}
      aria-pressed={isPlaying}
      aria-label={label}
      disabled={prefersReducedMotion}
    >
      <span aria-hidden="true">{isPlaying ? "⏹" : "▶"}</span>
      <span className="sr-only sm:not-sr-only sm:inline">{label}</span>
    </button>
  );
}
