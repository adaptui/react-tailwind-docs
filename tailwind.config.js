const colors = require("tailwindcss/colors");

const makePrimaryColor =
  l =>
  ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(--nextra-theme-primary-hue) 100% ${l}%)`;
    }
    return `hsl(var(--nextra-theme-primary-hue) 100% ${l}% / ${opacityValue})`;
  };

const oldGrary = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
};

module.exports = {
  presets: [require("@adaptui/react-tailwind/preset")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "node_modules/@adaptui/react-tailwind/**/*",
    "node_modules/nextra-theme-docs/dist**/*",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#111",
        "theme-black": "#000",
        "theme-white": "#fff",
        "theme-gray": oldGrary,
        "theme-slate": colors.slate,
        "theme-neutral": colors.neutral,
        "theme-red": colors.red,
        "theme-orange": colors.orange,
        "theme-yellow": colors.yellow,
        "theme-blue": colors.blue,
        "theme-primary": {
          50: makePrimaryColor(97),
          100: makePrimaryColor(94),
          200: makePrimaryColor(86),
          300: makePrimaryColor(77),
          400: makePrimaryColor(66),
          500: makePrimaryColor(50),
          600: makePrimaryColor(45),
          700: makePrimaryColor(39),
          750: makePrimaryColor(35),
          800: makePrimaryColor(32),
          900: makePrimaryColor(24),
          1000: makePrimaryColor(12),
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      letterSpacing: {
        tight: "-0.015em",
      },
    },
  },
  plugins: [],
};
