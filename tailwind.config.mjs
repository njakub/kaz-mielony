/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#282828",
        primary: "#e8c074",
        secondary: "#fdf8f0",
        // Extended palette for better contrast
        dark: "#1a1a1a", // Darker background for depth
        "dark-alt": "#3a3a3a", // Lighter dark for cards/surfaces
        "text-dark": "#2d2d2d", // Dark text for light backgrounds
        "text-light": "#f5f5f5", // Light text for dark backgrounds
        accent: "#d4a853", // Darker golden accent
        "accent-light": "#f2d18a", // Lighter golden accent
        muted: "#8a8a8a", // Muted text
        surface: "#333333", // Card/surface background
        border: "#4a4a4a", // Border color
        // Keep some amber variants for compatibility
        amber: {
          50: "#fdf8f0",
          100: "#fdf8f0",
          600: "#e8c074",
          700: "#d4a853",
          800: "#c19639",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#f5f5f5",
            h1: {
              color: "#f5f5f5",
            },
            h2: {
              color: "#e8c074",
            },
            h3: {
              color: "#d4a853",
            },
            h4: {
              color: "#f5f5f5",
            },
            p: {
              color: "#f5f5f5",
            },
            strong: {
              color: "#f5f5f5",
            },
            ol: {
              color: "#f5f5f5",
              listStyleType: "decimal",
              paddingLeft: "2rem",
              marginLeft: "1rem",
            },
            "ol > li": {
              color: "#f5f5f5",
              marginBottom: "1rem",
              paddingLeft: "0.5rem",
            },
            "ol > li::marker": {
              color: "#e8c074",
              fontWeight: "bold",
            },
            ul: {
              color: "#f5f5f5",
              listStyle: "none",
              paddingLeft: "0",
            },
            "ul > li": {
              position: "relative",
              paddingLeft: "1.5rem",
              marginBottom: "0.5rem",
              color: "#f5f5f5",
            },
            "ul > li::before": {
              content: "'•'",
              position: "absolute",
              left: "0",
              top: "0",
              color: "#e8c074",
              fontWeight: "bold",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
