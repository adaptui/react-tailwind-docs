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

// src/plugin.ts
var import_graceful_fs = __toESM(require("graceful-fs"));
var import_util = __toESM(require("util"));

// src/utils.ts
var import_fs = __toESM(require("fs"));
function getLocaleFromFilename(name) {
  const localeRegex = /\.([a-zA-Z-]+)?\.(mdx?|jsx?|json)$/;
  const match = name.match(localeRegex);
  if (match)
    return match[1];
  return void 0;
}
function removeExtension(name) {
  const match = name.match(/^([^.]+)/);
  return match !== null ? match[1] : "";
}
var parseJsonFile = (content, path3) => {
  let parsed = {};
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error(`Error parsing ${path3}, make sure it's a valid JSON 
` + err);
  }
  return parsed;
};
var existsSync = (f) => {
  try {
    import_fs.default.accessSync(f, import_fs.default.constants.F_OK);
    return true;
  } catch (_) {
    return false;
  }
};

// src/plugin.ts
var import_path2 = __toESM(require("path"));
var import_slash = __toESM(require("slash"));
var import_gray_matter = __toESM(require("gray-matter"));

// src/page-map.ts
var import_path = __toESM(require("path"));
var extension = /\.mdx?$/;
var metaExtension = /meta\.?([a-zA-Z-]+)?\.json/;
function findPagesDir(dir = process.cwd()) {
  if (existsSync(import_path.default.join(dir, "pages")))
    return "pages";
  if (existsSync(import_path.default.join(dir, "src/pages")))
    return "src/pages";
  throw new Error("> Couldn't find a `pages` directory. Please create one under the project root");
}

// src/plugin.ts
var { readdir, readFile } = import_graceful_fs.default;
function collectFiles(_0) {
  return __async(this, arguments, function* (dir, route = "/", fileMap = {}) {
    const files = yield import_util.default.promisify(readdir)(dir, { withFileTypes: true });
    const items = (yield Promise.all(files.map((f) => __async(this, null, function* () {
      const filePath = import_path2.default.resolve(dir, f.name);
      const fileRoute = (0, import_slash.default)(import_path2.default.join(route, removeExtension(f.name).replace(/^index$/, "")));
      if (f.isDirectory()) {
        if (fileRoute === "/api")
          return null;
        const { items: children } = yield collectFiles(filePath, fileRoute, fileMap);
        if (!children || !children.length)
          return null;
        return {
          name: f.name,
          children,
          route: fileRoute
        };
      } else if (extension.test(f.name)) {
        const locale = getLocaleFromFilename(f.name);
        const fileContents = yield import_util.default.promisify(readFile)(filePath, "utf-8");
        const { data } = (0, import_gray_matter.default)(fileContents);
        if (Object.keys(data).length) {
          fileMap[filePath] = {
            name: removeExtension(f.name),
            route: fileRoute,
            frontMatter: data,
            locale
          };
          return fileMap[filePath];
        }
        fileMap[filePath] = {
          name: removeExtension(f.name),
          route: fileRoute,
          locale
        };
        return fileMap[filePath];
      } else if (metaExtension.test(f.name)) {
        const content = yield import_util.default.promisify(readFile)(filePath, "utf-8");
        const meta = parseJsonFile(content, filePath);
        const locale = f.name.match(metaExtension)[1];
        fileMap[filePath] = {
          name: "meta.json",
          meta,
          locale
        };
        return fileMap[filePath];
      }
    })))).filter(Boolean);
    return {
      items,
      fileMap
    };
  });
}
var PageMapCache = class {
  constructor() {
    this.cache = { items: [], fileMap: {} };
  }
  set(data) {
    this.cache.items = data.items;
    this.cache.fileMap = data.fileMap;
  }
  clear() {
    this.cache = null;
  }
  get() {
    return this.cache;
  }
};
var pageMapCache = new PageMapCache();
var NextraPlugin = class {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync("NextraPlugin", (_, callback) => __async(this, null, function* () {
      const result = yield collectFiles(import_path2.default.join(process.cwd(), findPagesDir()), "/");
      pageMapCache.set(result);
      callback();
    }));
  }
};

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
      const nextra = new NextraPlugin();
      if (!config.plugins) {
        config.plugins = [nextra];
      } else {
        config.plugins.push(nextra);
      }
      config.module.rules.push({
        test: markdownExtensionTest,
        use: [
          options.defaultLoaders.babel,
          {
            loader: "nextra/loader",
            options: __spreadProps(__spreadValues({}, nextraConfig), { locales, defaultLocale, pageMapCache })
          }
        ]
      });
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });
};
