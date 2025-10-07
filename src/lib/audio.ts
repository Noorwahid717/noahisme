import { Howl } from "howler";
import { audioData } from "./audio-data";

type SFXKey = "click" | "hover" | "success";

type HowlMap = Record<SFXKey, Howl>;

const isBrowser = typeof window !== "undefined";

const prefersReducedMotion =
  isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let enabled = isBrowser
  ? (localStorage.getItem("audio-enabled") ?? (prefersReducedMotion ? "false" : "true")) === "true"
  : !prefersReducedMotion;
let volume = isBrowser ? parseFloat(localStorage.getItem("audio-volume") ?? "0.3") : 0.3;

const createHowl = (key: SFXKey, vol: number) =>
  new Howl({
    src: [audioData[key]],
    format: ["wav"],
    volume: key === "hover" ? Math.min(vol, 0.2) : key === "success" ? Math.min(vol, 0.25) : vol,
    html5: false,
  });

let sounds: HowlMap | null = null;

function ensureHowls() {
  if (!isBrowser) return;
  if (sounds) return;
  sounds = {
    click: createHowl("click", volume),
    hover: createHowl("hover", volume),
    success: createHowl("success", volume),
  };
}

export function play(name: SFXKey) {
  if (!enabled) return;
  ensureHowls();
  try {
    sounds?.[name].play();
  } catch (error) {
    console.warn("Failed to play sound", error);
  }
}

export function setEnabled(value: boolean) {
  enabled = value;
  if (isBrowser) {
    localStorage.setItem("audio-enabled", String(value));
  }
}

export function setVolume(value: number) {
  volume = value;
  ensureHowls();
  if (sounds) {
    Object.entries(sounds).forEach(([key, howl]) => {
      const typedKey = key as SFXKey;
      const targetVolume =
        typedKey === "hover"
          ? Math.min(value, 0.2)
          : typedKey === "success"
            ? Math.min(value, 0.25)
            : value;
      howl.volume(targetVolume);
    });
  }
  if (isBrowser) {
    localStorage.setItem("audio-volume", String(value));
  }
}

export const audioState = {
  get enabled() {
    return enabled;
  },
  get volume() {
    return volume;
  },
};
