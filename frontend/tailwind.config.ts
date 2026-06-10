import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#c2965dff",
        primary: {
          DEFAULT: "#F9A826",
          light: "#FBBD5E",
          dark: "#E08D0D",
        },
        text: {
          DEFAULT: "#8D6E64",
          light: "#A89189",
          dark: "#6D4C41",
        },
        status: {
          active: "#4CAF50",
          resting: "#F9A826",
          feeding: "#FF9800",
          anomaly: "#F44336",
          online: "#4CAF50",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FDF8F0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;