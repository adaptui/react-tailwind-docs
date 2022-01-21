const colors = require("tailwindcss/colors");

module.exports = {
  presets: [require("@renderlesskit/react-tailwind/preset")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "node_modules/@renderlesskit/react-tailwind/**/*",
    "./.yalc/nextra-renderlesskit-theme-docs/dist/**/*",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#111",
        oldGray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
        },
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        gray: colors.gray,
        slate: colors.slate,
        neutral: colors.neutral,
        red: colors.red,
        orange: colors.orange,
        yellow: colors.yellow,
        prime: colors.blue,
      },
    },
  },
  plugins: [],
};
