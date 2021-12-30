var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/stork-index.ts
var import_path = __toESM(require("path"));
var import_graceful_fs = __toESM(require("graceful-fs"));
var import_child_process = __toESM(require("child_process"));
var import_util = require("util");
var import_download = __toESM(require("download"));
var { promises: fs, statSync, mkdirSync } = import_graceful_fs.default;
var execFile = (0, import_util.promisify)(import_child_process.default.execFile);
var isProduction = process.env.NODE_ENV === "production";
var STORK_WASM = "https://github.com/jameslittle230/stork/releases/download/v1.1.0/stork.wasm";
var indexed = false;
function buildStorkIndex(storkPath, locales) {
  return __async(this, null, function* () {
    if (indexed)
      return;
    if (!isProduction)
      return;
    indexed = true;
    const assetDir = import_path.default.join(process.cwd(), "public");
    locales = locales || ["default"];
    for (const locale of locales) {
      const tomlFile = import_path.default.join(assetDir, `index-${locale}.toml`);
      let toml = yield fs.readFile(tomlFile, "utf-8");
      toml += "[output]\n";
      toml += `filename = "${import_path.default.join(assetDir, `index-${locale}.st`)}"
`;
      toml += `excerpts_per_result = 1
`;
      yield fs.writeFile(tomlFile, toml);
      yield execFile(storkPath, ["--build", tomlFile]);
      console.log(`Finished Stork index for locale: ${locale}`);
    }
    const storkWasmPath = import_path.default.join(assetDir, "stork.wasm");
    try {
      statSync(storkWasmPath);
    } catch (err) {
      console.log("No stork.wasm found, downloading from GitHub...");
      yield (0, import_download.default)(STORK_WASM, assetDir);
    }
  });
}

// src/index.js
var defaultExtensions = ["js", "jsx", "ts", "tsx"];
var markdownExtensions = ["md", "mdx"];
var markdownExtensionTest = /\.mdx?$/;
var STORK_PATH = process.env.STORK_PATH || "stork";
module.exports = (...args) => (nextConfig = {}) => {
  var _a, _b;
  const nextraConfig = typeof args[0] === "string" ? {
    theme: args[0],
    themeConfig: args[1]
  } : args[0];
  const locales = ((_a = nextConfig.i18n) == null ? void 0 : _a.locales) || null;
  const defaultLocale = ((_b = nextConfig.i18n) == null ? void 0 : _b.defaultLocale) || null;
  let pageExtensions = nextConfig.pageExtensions || [...defaultExtensions];
  if (locales) {
    console.log("You have i18n enabled for Nextra.");
    if (!defaultLocale) {
      console.error("Default locale is missing.");
    }
    pageExtensions = pageExtensions.concat(markdownExtensions.map((ext) => defaultLocale + "." + ext));
  } else {
    pageExtensions = pageExtensions.concat(markdownExtensions);
  }
  if (nextraConfig.unstable_stork) {
    console.log("You have Stork indexing enabled for Nextra. Stork binary:", STORK_PATH);
    const originalHeaders = nextConfig.headers || (() => []);
    nextConfig.headers = () => __async(exports, null, function* () {
      return [
        ...yield originalHeaders(),
        {
          source: `/:index(index-.+.st)`,
          headers: [
            {
              key: "content-type",
              value: "application/wasm"
            }
          ]
        }
      ];
    });
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
      if (nextraConfig.unstable_stork) {
        config.plugins.push({
          apply: (compiler) => {
            compiler.hooks.done.tap("buildStorkIndex", () => {
              buildStorkIndex(STORK_PATH, locales);
            });
          }
        });
      }
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });
};
