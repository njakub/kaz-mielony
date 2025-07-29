/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          600: "#d97706",
          700: "#b45309",
        },
      },
    },
  },
  plugins: [],
};
