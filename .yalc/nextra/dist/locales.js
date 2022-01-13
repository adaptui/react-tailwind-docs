var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/locales.ts
var locales_exports = {};
__export(locales_exports, {
  locales: () => locales,
  withLocales: () => withLocales
});
var import_server = require("next/server");
var PUBLIC_FILE = /\.(.*)$/;
function locales(request) {
  const shouldHandleLocale = !PUBLIC_FILE.test(request.nextUrl.pathname) && !request.nextUrl.pathname.includes("/api/") && !request.nextUrl.pathname.includes("/.nextra/");
  if (shouldHandleLocale) {
    let href = request.nextUrl.href || "/";
    if (href.endsWith("/" + request.nextUrl.locale))
      href += "/";
    if (href.endsWith("/"))
      href += "index";
    const locale = "." + (request.cookies["NEXT_LOCALE"] || request.nextUrl.locale);
    if (!href.endsWith(locale)) {
      return import_server.NextResponse.rewrite(href + locale);
    }
  }
}
function withLocales(middleware) {
  return (...args) => {
    return locales(args[0]) || middleware(...args);
  };
}
module.exports = __toCommonJS(locales_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  locales,
  withLocales
});
