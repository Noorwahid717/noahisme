const withOpacityValue = (variable) => {
  return ({ opacityValue } = {}) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}) / 1)`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

module.exports = {
  content: ["./src/**/*.{astro,ts,tsx,js}"],
  theme: {
    extend: {
      colors: {
        bg: withOpacityValue("--color-bg"),
        surface: withOpacityValue("--color-surface"),
        text: withOpacityValue("--color-text"),
        text2: withOpacityValue("--color-text-muted"),
        accent: withOpacityValue("--color-accent"),
        success: withOpacityValue("--color-success"),
        divider: withOpacityValue("--color-divider")
      },
      borderRadius: { md: "12px", xl: "32px" },
      boxShadow: {
        soft: "0 18px 48px rgba(15, 24, 41, 0.12)",
        subtle: "0 10px 30px rgba(15, 24, 41, 0.08)"
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      screens: { xs: "360px" }
    }
  },
  plugins: []
};
