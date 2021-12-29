module.exports = {
  presets: [require("@renderlesskit/react-tailwind/preset")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "node_modules/@renderlesskit/react-tailwind/**/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
