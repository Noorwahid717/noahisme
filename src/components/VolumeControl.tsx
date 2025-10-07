"use client";

import { useEffect, useState } from "react";
import { audioState, setEnabled, setVolume } from "~/lib/audio";

export default function VolumeControl() {
  const [enabled, updateEnabled] = useState(audioState.enabled);
  const [volume, updateVolume] = useState(audioState.volume);

  useEffect(() => {
    setEnabled(enabled);
  }, [enabled]);

  useEffect(() => {
    setVolume(volume);
  }, [volume]);

  const toggle = () => {
    updateEnabled((value: boolean) => !value);
  };

  const label = enabled ? "Bisukan audio" : "Aktifkan audio";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="focus-outline inline-flex h-10 w-10 items-center justify-center rounded-md border border-divider/60 bg-surface/60 text-text transition hover:border-accent/60"
        onClick={toggle}
        aria-label={label}
      >
        <span aria-hidden="true">{enabled ? "🔊" : "🔇"}</span>
      </button>
      <label className="sr-only" htmlFor="volume-slider">
        Volume audio
      </label>
      <input
        id="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.05"
        className="focus-outline h-1.5 w-28 cursor-pointer appearance-none rounded-full bg-divider accent-accent"
        value={volume}
        onChange={(event) => updateVolume(Number(event.target.value))}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={volume}
        aria-label="Atur volume audio"
      />
    </div>
  );
}
