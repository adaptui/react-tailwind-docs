const withNextra = require("nextra")({
  theme: "nextra-renderlesskit-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_flexsearch: {
    codeblocks: true,
  },
  unstable_staticImage: true,
});

module.exports = withNextra({});
