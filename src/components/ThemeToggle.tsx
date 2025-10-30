"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "theme-preference";

function getSystemTheme() {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem(THEME_KEY) ?? getSystemTheme();
  });

  useEffect(() => {
    const themeRoot = document.documentElement;
    themeRoot.dataset.theme = theme;
    themeRoot.classList.toggle("theme-light", theme === "light");
    themeRoot.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current: string) => (current === "dark" ? "light" : "dark"));
  };

  const label = theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap";

  return (
    <button
      type="button"
      className="focus-outline inline-flex h-10 w-10 items-center justify-center rounded-full border border-divider/60 bg-surface/80 text-text2 transition-colors duration-200 hover:border-accent/60 hover:text-text"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true" className="text-lg">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
