var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/index.js
var defaultExtensions = ["js", "jsx", "ts", "tsx"];
var markdownExtensions = ["md", "mdx"];
var markdownExtensionTest = /\.mdx?$/;
module.exports = (...args) => (nextConfig = {}) => {
  var _a, _b;
  const nextraConfig = typeof args[0] === "string" ? {
    theme: args[0],
    themeConfig: args[1]
  } : args[0];
  const locales = ((_a = nextConfig.i18n) == null ? void 0 : _a.locales) || null;
  const defaultLocale = ((_b = nextConfig.i18n) == null ? void 0 : _b.defaultLocale) || null;
  let pageExtensions = nextConfig.pageExtensions || [...defaultExtensions];
  pageExtensions = pageExtensions.concat(markdownExtensions);
  if (locales) {
    console.log("[Nextra] You have Next.js i18n enabled, read here (TODO: link) for the docs.");
  }
  return Object.assign({}, nextConfig, {
    pageExtensions,
    webpack(config, options) {
      config.module.rules.push({
        test: markdownExtensionTest,
        use: [
          options.defaultLoaders.babel,
          {
            loader: "nextra/loader",
            options: __spreadProps(__spreadValues({}, nextraConfig), { locales, defaultLocale })
          }
        ]
      });
      if (!config.plugins)
        config.plugins = [];
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });
};
