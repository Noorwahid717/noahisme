module.exports = {
  content: ["./src/**/*.{astro,ts,tsx,js}"],
  theme: {
    extend: {
      colors: {
        bg: "#0E0F10",
        surface: "#151719",
        text: "#E7E9EC",
        text2: "#A8AFB7",
        accent: "#8AA4FF",
        success: "#86E3C3",
        divider: "#2A2D31"
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
