module.exports = {
  presets: [require("@renderlesskit/react-tailwind/preset")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "node_modules/@renderlesskit/react-tailwind/**/*",
    "node_modules/nextra-renderlesskit-theme-docs/dist/**/*",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: { dark: "#111" },
    },
  },
  plugins: [],
};
