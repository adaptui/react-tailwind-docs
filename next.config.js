const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_stork: false,
  unstable_staticImage: true,
});

module.exports = withNextra({});
