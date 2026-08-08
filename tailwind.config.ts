import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, soft, editorial palette — deliberately not clinical blue.
        paper: "#FBF8F3", // page background (warm cream)
        canvas: "#F4EEE4", // soft sand for alternating sections
        ink: "#2C2824", // primary text (warm near-black)
        muted: "#6A6157", // secondary text
        line: "#E4DCCF", // hairline borders
        sage: {
          50: "#EEF2EE",
          100: "#DCE5DD",
          200: "#BFCEC1",
          400: "#7B9581",
          600: "#4F6F5E", // primary accent (calm eucalyptus)
          700: "#3F5A4C",
          900: "#2A3B31",
        },
        blush: {
          100: "#F4E7E1",
          400: "#D3A08F",
          600: "#B87765", // warm secondary accent
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Iowan Old Style", "Palatino Linotype", "Palatino", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(44,40,36,0.04), 0 8px 24px rgba(44,40,36,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
