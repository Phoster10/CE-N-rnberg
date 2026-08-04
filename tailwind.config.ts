import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef1f8",
          100: "#d6ddef",
          200: "#adbadf",
          300: "#7e8fc9",
          400: "#4f63ad",
          500: "#324690",
          600: "#233473",
          700: "#1a285c",
          800: "#101a3f", // primary navy
          900: "#0a1230",
          950: "#060a1c",
        },
        gold: {
          50: "#fdf8ec",
          100: "#faedc7",
          200: "#f5db94",
          300: "#efc35c",
          400: "#eaad33",
          500: "#d99b1f", // primary gold
          600: "#b87a17",
          700: "#935c16",
          800: "#784918",
          900: "#653c18",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(16, 26, 63, 0.18)",
        card: "0 4px 24px -6px rgba(16, 26, 63, 0.12)",
        glow: "0 0 0 1px rgba(217,155,31,0.25), 0 8px 30px -8px rgba(217,155,31,0.35)",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #0a1230 0%, #101a3f 55%, #1a285c 100%)",
        "gold-gradient": "linear-gradient(135deg, #eaad33 0%, #d99b1f 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
