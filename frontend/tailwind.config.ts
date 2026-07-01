import type { Config } from "tailwindcss";

/**
 * PoultryVision — dark "cyberpunk HUD" theme.
 * Amber primary, cyan secondary, green = healthy, red = anomaly, on near-black surfaces.
 */
const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces (darkest -> lighter panels)
        background: "#06060a",
        surface: {
          DEFAULT: "#0d0e15", // panel background
          muted: "#12131c", // nested / inset background
          raised: "#171826", // hover / active panel
        },
        border: {
          DEFAULT: "#1e2030",
          strong: "#2a2d42",
        },
        // Amber primary accent
        primary: {
          DEFAULT: "#f9a826",
          light: "#fbbd5e",
          dark: "#e08d0d",
        },
        // Cyan/teal secondary accent
        secondary: {
          DEFAULT: "#2dd4bf",
          light: "#5eead4",
          dark: "#14b8a6",
        },
        // Text ramp on dark
        text: {
          DEFAULT: "#e5e7eb",
          muted: "#9ca3af",
          dim: "#6b7280",
        },
        // Semantic status colors
        status: {
          active: "#22c55e",
          resting: "#f9a826",
          feeding: "#ff9800",
          anomaly: "#f44336",
          online: "#22c55e",
          offline: "#6b7280",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        card: "10px",
      },
      boxShadow: {
        // Subtle amber glow used on active/emphasis panels (polish pass will extend this)
        glow: "0 0 0 1px rgba(249,168,38,0.20), 0 0 18px rgba(249,168,38,0.08)",
        "glow-cyan": "0 0 0 1px rgba(45,212,191,0.20), 0 0 18px rgba(45,212,191,0.08)",
        card: "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
