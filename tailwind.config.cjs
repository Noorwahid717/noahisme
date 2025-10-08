module.exports = {
  content: ["./src/**/*.{astro,ts,tsx,js}"],
  theme: {
    extend: {
      colors: {
        bg: "#0F1115",
        surface: "#15181F",
        text: "#F5F7FA",
        text2: "#C7CCD9",
        accent: "#8AA4FF",
        success: "#7BE0B8",
        divider: "#2B3242"
      },
      borderRadius: { md: "8px" },
      boxShadow: { soft: "0 8px 24px rgba(0,0,0,0.12)" },
      fontFamily: {
        heading: ["Spectral", "serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      screens: { xs: "360px" }
    }
  },
  plugins: []
};
