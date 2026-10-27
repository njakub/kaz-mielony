/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — pulled from the "Kaz Cooks History" channel banner
        ink: "#161513", // Deepest background
        charcoal: "#282828", // Banner charcoal
        graphite: "#32312e", // Raised surfaces
        smoke: "#45433f", // Borders on dark
        gold: {
          DEFAULT: "#e5c074", // Banner mustard
          light: "#f2d9a4",
          deep: "#c99a3e",
        },
        cream: "#fbf7ef", // Banner off-white
        paper: "#f3ecdf", // Light surfaces
        tomato: "#e0644a", // Sparing accent for alerts/timers

        // Legacy tokens kept so older markup keeps working
        background: "#282828",
        primary: "#e5c074",
        secondary: "#fbf7ef",
        dark: "#161513",
        "dark-alt": "#32312e",
        "text-dark": "#282828",
        "text-light": "#fbf7ef",
        accent: "#c99a3e",
        "accent-light": "#f2d9a4",
        muted: "#9a958c",
        surface: "#32312e",
        border: "#45433f",
      },
      fontFamily: {
        display: ['"Anton"', "Impact", '"Arial Narrow"', "sans-serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "word-in": {
          "0%": { transform: "translateY(60%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "word-in": "word-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
