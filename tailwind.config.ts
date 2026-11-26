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
        cream: "#faf7f0",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(16, 26, 63, 0.18)",
        card: "0 4px 24px -6px rgba(16, 26, 63, 0.10)",
        lift: "0 30px 60px -20px rgba(16, 26, 63, 0.35)",
        glow: "0 0 0 1px rgba(217,155,31,0.25), 0 8px 30px -8px rgba(217,155,31,0.45)",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #060a1c 0%, #0a1230 45%, #1a285c 100%)",
        "gold-gradient": "linear-gradient(135deg, #f5db94 0%, #eaad33 45%, #d99b1f 100%)",
        "gold-text": "linear-gradient(100deg, #f5db94 0%, #eaad33 40%, #f5db94 60%, #d99b1f 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(6%, -4%) scale(1.1)" },
          "66%": { transform: "translate(-5%, 5%) scale(0.95)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "slow-zoom": {
          from: { transform: "scale(1.12)" },
          to: { transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "0% center" },
          to: { backgroundPosition: "200% center" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "80%": { transform: "translateY(14px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        aurora: "aurora 18s ease-in-out infinite",
        "aurora-slow": "aurora 26s ease-in-out infinite reverse",
        marquee: "marquee 40s linear infinite",
        "slow-zoom": "slow-zoom 14s ease-out forwards",
        shimmer: "shimmer 6s linear infinite",
        "scroll-dot": "scroll-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
