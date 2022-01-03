var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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

// src/wasm-loader.js
var wasm_loader_exports = {};
__export(wasm_loader_exports, {
  init: () => init,
  wasm_register_index: () => wasm_register_index,
  wasm_search: () => wasm_search
});
function getObject(idx) {
  return heap[idx];
}
function dropObject(idx) {
  if (idx < 36)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
function passStringToWasm0(arg, malloc, realloc) {
  if (typeof arg !== "string")
    throw new Error("expected a string argument");
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    if (ret.read !== arg.length)
      throw new Error("failed to pass whole string");
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}
function wasm_register_index(name, data) {
  try {
    const retptr = wasm.__wbindgen_export_0.value - 16;
    wasm.__wbindgen_export_0.value = retptr;
    var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.wasm_register_index(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_export_0.value += 16;
    wasm.__wbindgen_free(r0, r1);
  }
}
function wasm_search(name, query) {
  try {
    const retptr = wasm.__wbindgen_export_0.value - 16;
    wasm.__wbindgen_export_0.value = retptr;
    var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.wasm_search(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_export_0.value += 16;
    wasm.__wbindgen_free(r0, r1);
  }
}
function logError(f) {
  return function() {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      let error = function() {
        try {
          return e instanceof Error ? `${e.message}

Stack:
${e.stack}` : e.toString();
        } catch (_) {
          return "<failed to stringify thrown value>";
        }
      }();
      console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
      throw e;
    }
  };
}
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  if (typeof heap_next !== "number")
    throw new Error("corrupt heap");
  heap[idx] = obj;
  return idx;
}
function load(module, imports) {
  return __async(this, null, function* () {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return yield WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") !== "application/wasm") {
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = yield module.arrayBuffer();
      return yield WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = yield WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  });
}
function init(input) {
  return __async(this, null, function* () {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_error_4bb6c2a97407129a = logError(function(arg0, arg1) {
      try {
        console.error(getStringFromWasm0(arg0, arg1));
      } finally {
        wasm.__wbindgen_free(arg0, arg1);
      }
    });
    imports.wbg.__wbg_new_59cb74e423758ede = logError(function() {
      var ret = new Error();
      return addHeapObject(ret);
    });
    imports.wbg.__wbg_stack_558ba5917b466edd = logError(function(arg0, arg1) {
      var ret = getObject(arg1).stack;
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    });
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
      takeObject(arg0);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    const { instance, module } = yield load(yield fetch(input), imports);
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    return wasm;
  });
}
var wasm, heap, heap_next, cachedTextDecoder, cachegetUint8Memory0, WASM_VECTOR_LEN, cachedTextEncoder, encodeString, cachegetInt32Memory0;
var init_wasm_loader = __esm({
  "src/wasm-loader.js"() {
    heap = new Array(32).fill(void 0);
    heap.push(void 0, null, true, false);
    heap_next = heap.length;
    cachedTextDecoder = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    });
    cachedTextDecoder.decode();
    cachegetUint8Memory0 = null;
    WASM_VECTOR_LEN = 0;
    cachedTextEncoder = new TextEncoder("utf-8");
    encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
      return cachedTextEncoder.encodeInto(arg, view);
    } : function(arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return {
        read: arg.length,
        written: buf.length
      };
    };
    cachegetInt32Memory0 = null;
  }
});

// src/index.tsx
import React18, { useMemo as useMemo5, useState as useState6 } from "react";
import { SkipNavContent } from "@reach/skip-nav";
import cn8 from "classnames";
import { useRouter as useRouter7 } from "next/router";
import { ThemeProvider } from "next-themes";

// src/misc/active-anchor.tsx
import React, { createContext, useContext, useState } from "react";
var ActiveAnchorContext = createContext({});
var ActiveAnchorSetterContext = createContext((s) => s);
var useActiveAnchor = () => useContext(ActiveAnchorContext);
var useActiveAnchorSet = () => useContext(ActiveAnchorSetterContext);
var ActiveAnchor = ({ children }) => {
  const state = useState({});
  return /* @__PURE__ */ React.createElement(ActiveAnchorContext.Provider, {
    value: state[0]
  }, /* @__PURE__ */ React.createElement(ActiveAnchorSetterContext.Provider, {
    value: state[1]
  }, children));
};

// src/misc/default.config.tsx
import React2 from "react";
var defaultTheme = {
  docsRepositoryBase: "https://github.com/shuding/nextra",
  titleSuffix: " \u2013 Nextra",
  nextLinks: true,
  prevLinks: true,
  search: true,
  darkMode: true,
  defaultMenuCollapsed: false,
  font: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} \xA9 Nextra.`,
  footerEditLink: "Edit this page",
  logo: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("span", {
    className: "mr-2 font-extrabold hidden md:inline"
  }, "Nextra"), /* @__PURE__ */ React2.createElement("span", {
    className: "text-slate-600 font-normal hidden md:inline"
  }, "The Next Docs Builder")),
  head: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("meta", {
    name: "msapplication-TileColor",
    content: "#ffffff"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "theme-color",
    content: "#ffffff"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), /* @__PURE__ */ React2.createElement("meta", {
    httpEquiv: "Content-Language",
    content: "en"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "description",
    content: "Nextra: the next docs builder"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "twitter:site",
    content: "@shuding_"
  }), /* @__PURE__ */ React2.createElement("meta", {
    property: "og:title",
    content: "Nextra: the next docs builder"
  }), /* @__PURE__ */ React2.createElement("meta", {
    property: "og:description",
    content: "Nextra: the next docs builder"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "apple-mobile-web-app-title",
    content: "Nextra"
  }))
};
var default_config_default = defaultTheme;

// src/misc/theme.tsx
import React3, { useContext as useContext2, useEffect, useMemo, useRef } from "react";
import { MDXProvider } from "@mdx-js/react";
import Slugger from "github-slugger";
import Link from "next/link";
import Highlight, { defaultProps } from "prism-react-renderer";
import "intersection-observer";
var THEME = {
  plain: {
    backgroundColor: "transparent"
  },
  styles: [
    {
      types: ["keyword", "builtin"],
      style: {
        color: "#ff0078",
        fontWeight: "bold"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "#999",
        fontStyle: "italic"
      }
    },
    {
      types: ["variable", "language-javascript"],
      style: {
        color: "#0076ff"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "#d9931e",
        fontStyle: "normal"
      }
    },
    {
      types: ["boolean", "regex"],
      style: {
        color: "#d9931e"
      }
    }
  ]
};
var ob = {};
var obCallback = {};
var createOrGetObserver = (rootMargin) => {
  if (!ob[rootMargin]) {
    obCallback[rootMargin] = [];
    ob[rootMargin] = new IntersectionObserver((e) => {
      obCallback[rootMargin].forEach((cb) => cb(e));
    }, {
      rootMargin,
      threshold: [0, 1]
    });
  }
  return ob[rootMargin];
};
function useIntersect(margin, ref, cb) {
  useEffect(() => {
    const callback = (entries) => {
      let e;
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].target === ref.current) {
          e = entries[i];
          break;
        }
      }
      if (e)
        cb(e);
    };
    const observer = createOrGetObserver(margin);
    obCallback[margin].push(callback);
    if (ref.current)
      observer.observe(ref.current);
    return () => {
      const idx = obCallback[margin].indexOf(callback);
      if (idx >= 0)
        obCallback[margin].splice(idx, 1);
      if (ref.current)
        observer.unobserve(ref.current);
    };
  }, []);
}
var HeaderLink = (_a) => {
  var _b = _a, {
    tag: Tag,
    children,
    slugger,
    withObserver = true
  } = _b, props = __objRest(_b, [
    "tag",
    "children",
    "slugger",
    "withObserver"
  ]);
  const setActiveAnchor = useActiveAnchorSet();
  const obRef = useRef(null);
  const slug = slugger.slug(children);
  const anchor = /* @__PURE__ */ React3.createElement("span", {
    className: "subheading-anchor",
    id: slug,
    ref: obRef
  });
  const index = slugger.index++;
  useIntersect("0px 0px -50%", obRef, (e) => {
    const aboveHalfViewport = e.boundingClientRect.y + e.boundingClientRect.height <= e.rootBounds.y + e.rootBounds.height;
    const insideHalfViewport = e.intersectionRatio > 0;
    setActiveAnchor((f) => {
      const ret = __spreadProps(__spreadValues({}, f), {
        [slug]: {
          index,
          aboveHalfViewport,
          insideHalfViewport
        }
      });
      let activeSlug = "";
      let smallestIndexInViewport = Infinity;
      let largestIndexAboveViewport = -1;
      for (let s in f) {
        ret[s].isActive = false;
        if (ret[s].insideHalfViewport && ret[s].index < smallestIndexInViewport) {
          smallestIndexInViewport = ret[s].index;
          activeSlug = s;
        }
        if (smallestIndexInViewport === Infinity && ret[s].aboveHalfViewport && ret[s].index > largestIndexAboveViewport) {
          largestIndexAboveViewport = ret[s].index;
          activeSlug = s;
        }
      }
      if (ret[activeSlug])
        ret[activeSlug].isActive = true;
      return ret;
    });
  });
  return /* @__PURE__ */ React3.createElement(Tag, __spreadValues({}, props), anchor, /* @__PURE__ */ React3.createElement("a", {
    href: "#" + slug,
    className: "text-current no-underline no-outline"
  }, children, /* @__PURE__ */ React3.createElement("span", {
    className: "anchor-icon",
    "aria-hidden": true
  }, "#")));
};
var H2 = ({ slugger }) => (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ React3.createElement(HeaderLink, __spreadValues({
    tag: "h2",
    slugger
  }, props), children);
};
var H3 = ({ slugger }) => (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ React3.createElement(HeaderLink, __spreadValues({
    tag: "h3",
    slugger
  }, props), children);
};
var H4 = ({ slugger }) => (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ React3.createElement(HeaderLink, __spreadValues({
    tag: "h4",
    slugger
  }, props), children);
};
var H5 = ({ slugger }) => (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ React3.createElement(HeaderLink, __spreadValues({
    tag: "h5",
    slugger
  }, props), children);
};
var H6 = ({ slugger }) => (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ React3.createElement(HeaderLink, __spreadValues({
    tag: "h6",
    slugger
  }, props), children);
};
var A = (_a) => {
  var _b = _a, {
    children
  } = _b, props = __objRest(_b, [
    "children"
  ]);
  const isExternal = props.href && props.href.startsWith("https://");
  if (isExternal) {
    return /* @__PURE__ */ React3.createElement("a", __spreadValues({
      target: "_blank",
      rel: "noreferrer"
    }, props), children);
  }
  return props.href ? /* @__PURE__ */ React3.createElement(Link, {
    href: props.href
  }, /* @__PURE__ */ React3.createElement("a", __spreadValues({}, props), children)) : /* @__PURE__ */ React3.createElement(React3.Fragment, null);
};
var PreContext = React3.createContext({});
var Pre = (_a) => {
  var _b = _a, {
    children
  } = _b, props = __objRest(_b, [
    "children"
  ]);
  return /* @__PURE__ */ React3.createElement(PreContext.Provider, {
    value: props
  }, /* @__PURE__ */ React3.createElement("pre", null, children));
};
var Code = ({
  children,
  className
}) => {
  const { highlight } = useContext2(PreContext);
  const highlightedRanges = useMemo(() => {
    return highlight ? highlight.split(",").map((r) => {
      if (r.includes("-")) {
        return r.split("-").map((v) => parseInt(v, 10));
      }
      return +r;
    }) : [];
  }, [highlight]);
  if (!className)
    return /* @__PURE__ */ React3.createElement("code", null, children);
  if (typeof children !== "string")
    return /* @__PURE__ */ React3.createElement("code", null, children);
  const language = className.replace(/language-/, "");
  return /* @__PURE__ */ React3.createElement(Highlight, __spreadProps(__spreadValues({}, defaultProps), {
    code: children.trim(),
    language,
    theme: THEME
  }), ({ className: className2, style, tokens, getLineProps, getTokenProps }) => /* @__PURE__ */ React3.createElement("code", {
    className: className2,
    style: __spreadValues({}, style)
  }, tokens.map((line, i) => /* @__PURE__ */ React3.createElement("div", __spreadProps(__spreadValues({
    key: i
  }, getLineProps({ line, key: i })), {
    style: highlightedRanges.some((r) => Array.isArray(r) ? r[0] <= i + 1 && i + 1 <= r[1] : r === i + 1) ? {
      background: "var(--c-highlight)",
      margin: "0 -1rem",
      padding: "0 1rem"
    } : {}
  }), line.map((token, key) => /* @__PURE__ */ React3.createElement("span", __spreadValues({
    key
  }, getTokenProps({ token, key }))))))));
};
var Table = ({ children }) => {
  return /* @__PURE__ */ React3.createElement("div", {
    className: "table-container"
  }, /* @__PURE__ */ React3.createElement("table", null, children));
};
var getComponents = (args) => ({
  h2: H2(args),
  h3: H3(args),
  h4: H4(args),
  h5: H5(args),
  h6: H6(args),
  a: A,
  pre: Pre,
  code: Code,
  table: Table
});
var MDXTheme = ({ children }) => {
  const slugger = new Slugger();
  slugger.index = 0;
  return /* @__PURE__ */ React3.createElement(MDXProvider, {
    components: getComponents({ slugger })
  }, children);
};
var theme_default = MDXTheme;

// src/utils/get-fs-route.ts
var getFSRoute = (asPath, locale) => {
  if (!locale)
    return asPath.replace(new RegExp("/index(/|$)"), "$1");
  return asPath.replace(new RegExp(`.${locale}(/|$)`), "$1").replace(new RegExp("/index(/|$)"), "$1");
};

// src/utils/menu-context.ts
import { createContext as createContext2, useContext as useContext3 } from "react";
var MenuContext = createContext2({
  menu: false,
  setMenu: () => {
  },
  defaultMenuCollapsed: true
});
function useMenuContext() {
  return useContext3(MenuContext);
}

// src/utils/normalize-pages.tsx
import getTitle from "title";
function getMetaTitle(meta) {
  if (typeof meta === "string")
    return meta;
  if (typeof meta === "object")
    return meta.title;
  return "";
}
function getMetaItemType(meta) {
  if (typeof meta === "object")
    return meta.type;
  return "docs";
}
function getMetaHidden(meta) {
  if (typeof meta === "object")
    return meta.hidden || false;
  return false;
}
function normalizePages({
  list,
  locale,
  defaultLocale,
  route,
  docsRoot = ""
}) {
  let meta = "";
  for (let item of list) {
    if (item.name === "meta.json") {
      if (locale === item.locale) {
        meta = item.meta;
        break;
      }
      if (!meta) {
        meta = item.meta;
      }
    }
  }
  if (!meta) {
    meta = {};
  }
  const metaKeys = Object.keys(meta);
  const hasLocale = /* @__PURE__ */ new Map();
  if (locale) {
    list.forEach((a) => a.locale === locale ? hasLocale.set(a.name, true) : null);
  }
  const directories = [];
  const flatDirectories = [];
  const docsDirectories = [];
  const flatDocsDirectories = [];
  const pageDirectories = [];
  const flatPageDirectories = [];
  let activeType = void 0;
  let activeIndex = 0;
  list.filter((a) => a.name !== "meta.json" && !a.name.startsWith("_") && (a.locale === locale || (a.locale === defaultLocale || !a.locale) && !hasLocale.get(a.name))).sort((a, b) => {
    const indexA = metaKeys.indexOf(a.name);
    const indexB = metaKeys.indexOf(b.name);
    if (indexA === -1 && indexB === -1)
      return a.name < b.name ? -1 : 1;
    if (indexA === -1)
      return 1;
    if (indexB === -1)
      return -1;
    return indexA - indexB;
  }).forEach((a) => {
    if (typeof meta !== "object")
      return;
    const title = getMetaTitle(meta[a.name]) || getTitle(a.name);
    const type = getMetaItemType(meta[a.name]) || "docs";
    const hidden = getMetaHidden(meta[a.name]);
    const isCurrentDocsTree = type === "docs" && route.startsWith(docsRoot);
    if (a.route === route) {
      activeType = type;
      switch (type) {
        case "nav":
          activeIndex = flatPageDirectories.length;
          break;
        case "docs":
        default:
          if (isCurrentDocsTree) {
            activeIndex = flatDocsDirectories.length;
          }
      }
    }
    const normalizedChildren = a.children ? normalizePages({
      list: a.children,
      locale,
      defaultLocale,
      route,
      docsRoot: type === "nav" ? a.route : docsRoot
    }) : void 0;
    if (normalizedChildren) {
      if (normalizedChildren.activeIndex !== void 0 && normalizedChildren.activeType !== void 0) {
        activeType = normalizedChildren.activeType;
        switch (activeType) {
          case "nav":
            activeIndex = flatPageDirectories.length + normalizedChildren.activeIndex;
            break;
          case "docs":
            activeIndex = flatDocsDirectories.length + normalizedChildren.activeIndex;
            break;
        }
      }
    }
    const item = __spreadProps(__spreadValues({}, a), {
      title,
      type,
      children: normalizedChildren ? [] : void 0
    });
    const docsItem = __spreadProps(__spreadValues({}, a), {
      title,
      type,
      children: normalizedChildren ? [] : void 0
    });
    const pageItem = __spreadProps(__spreadValues({}, a), {
      title,
      type,
      hidden,
      children: normalizedChildren ? [] : void 0
    });
    if (normalizedChildren) {
      switch (type) {
        case "nav":
          pageItem.children.push(...normalizedChildren.pageDirectories);
          docsDirectories.push(...normalizedChildren.docsDirectories);
          if (!normalizedChildren.flatPageDirectories.length && normalizedChildren.flatDirectories.length) {
            pageItem.firstChildRoute = normalizedChildren.flatDirectories[0].route;
            flatPageDirectories.push(pageItem);
          }
          break;
        case "docs":
        default:
          if (isCurrentDocsTree) {
            Array.isArray(docsItem.children) && docsItem.children.push(...normalizedChildren.docsDirectories);
            pageDirectories.push(...normalizedChildren.pageDirectories);
          }
      }
      flatDirectories.push(...normalizedChildren.flatDirectories);
      flatPageDirectories.push(...normalizedChildren.flatPageDirectories);
      flatDocsDirectories.push(...normalizedChildren.flatDocsDirectories);
      Array.isArray(item.children) && item.children.push(...normalizedChildren.directories);
    } else {
      flatDirectories.push(item);
      switch (type) {
        case "nav":
          flatPageDirectories.push(pageItem);
          break;
        case "docs":
        default:
          if (isCurrentDocsTree) {
            flatDocsDirectories.push(docsItem);
          }
      }
    }
    directories.push(item);
    switch (type) {
      case "nav":
        pageDirectories.push(pageItem);
        break;
      case "docs":
      default:
        if (isCurrentDocsTree) {
          docsDirectories.push(docsItem);
        }
    }
  });
  return {
    activeType,
    activeIndex,
    directories,
    flatDirectories,
    docsDirectories,
    flatDocsDirectories,
    pageDirectories,
    flatPageDirectories
  };
}

// src/config.ts
import React4 from "react";
var ThemeConfigContext = React4.createContext({});
var useConfig = () => React4.useContext(ThemeConfigContext);

// src/footer.tsx
import React7 from "react";
import cn from "classnames";
import Link2 from "next/link";
import { useRouter } from "next/router";
import parseGitUrl from "parse-git-url";

// src/icons/arrow-right.tsx
import React5 from "react";
var ArrowRight = (_a) => {
  var _b = _a, { height = 24 } = _b, props = __objRest(_b, ["height"]);
  return /* @__PURE__ */ React5.createElement("svg", __spreadValues({
    height,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /* @__PURE__ */ React5.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 5l7 7-7 7"
  }));
};
var arrow_right_default = ArrowRight;

// src/utils/render-component.tsx
import React6 from "react";
var renderComponent = (ComponentOrNode, props) => {
  if (!ComponentOrNode)
    return null;
  if (typeof ComponentOrNode === "function") {
    return /* @__PURE__ */ React6.createElement(ComponentOrNode, __spreadValues({}, props));
  }
  return ComponentOrNode;
};
var render_component_default = renderComponent;

// src/footer.tsx
var NextLink = ({ route, title, isRTL }) => {
  return /* @__PURE__ */ React7.createElement(Link2, {
    href: route
  }, /* @__PURE__ */ React7.createElement("a", {
    className: cn("text-lg font-medium p-4 -m-4 no-underline text-slate-600 hover:text-blue-600 flex items-center", { "ml-2": !isRTL, "mr-2": isRTL }),
    title
  }, title, /* @__PURE__ */ React7.createElement(arrow_right_default, {
    className: cn("transform inline flex-shrink-0", {
      "rotate-180 mr-1": isRTL,
      "ml-1": !isRTL
    })
  })));
};
var PrevLink = ({ route, title, isRTL }) => {
  return /* @__PURE__ */ React7.createElement(Link2, {
    href: route
  }, /* @__PURE__ */ React7.createElement("a", {
    className: cn("text-lg font-medium p-4 -m-4 no-underline text-slate-600 hover:text-blue-600 flex items-center", { "mr-2": !isRTL, "ml-2": isRTL }),
    title
  }, /* @__PURE__ */ React7.createElement(arrow_right_default, {
    className: cn("transform inline flex-shrink-0", {
      "rotate-180 mr-1": !isRTL,
      "ml-1": isRTL
    })
  }), title));
};
var createEditUrl = (repository, filepath) => {
  const repo = parseGitUrl(repository || "");
  if (!repo)
    throw new Error("Invalid `docsRepositoryBase` URL!");
  switch (repo.type) {
    case "github":
      return `https://github.com/${repo.owner}/${repo.name}/blob/${repo.branch || "main"}/${repo.subdir || "pages"}${filepath}`;
    case "gitlab":
      return `https://gitlab.com/${repo.owner}/${repo.name}/-/blob/${repo.branch || "master"}/${repo.subdir || "pages"}${filepath}`;
  }
  return "#";
};
var EditPageLink = ({
  repository,
  text,
  filepath
}) => {
  const url = createEditUrl(repository, filepath);
  const { locale } = useRouter();
  return /* @__PURE__ */ React7.createElement("a", {
    className: "text-sm",
    href: url,
    target: "_blank",
    rel: "noreferrer"
  }, text ? render_component_default(text, {
    locale
  }) : "Edit this page");
};
var NavLinks = ({
  flatDirectories,
  currentIndex,
  isRTL
}) => {
  const config = useConfig();
  let prev = flatDirectories[currentIndex - 1];
  let next = flatDirectories[currentIndex + 1];
  return /* @__PURE__ */ React7.createElement("div", {
    className: "flex flex-row items-center justify-between"
  }, /* @__PURE__ */ React7.createElement("div", null, prev && config.prevLinks ? /* @__PURE__ */ React7.createElement(PrevLink, {
    route: prev.route,
    title: prev.title,
    isRTL
  }) : null), /* @__PURE__ */ React7.createElement("div", null, config.nextLinks && next ? /* @__PURE__ */ React7.createElement(NextLink, {
    route: next.route,
    title: next.title,
    isRTL
  }) : null));
};
var Footer = ({
  filepathWithName,
  children
}) => {
  const { locale } = useRouter();
  const config = useConfig();
  return /* @__PURE__ */ React7.createElement("footer", {
    className: "mt-24"
  }, children, /* @__PURE__ */ React7.createElement("hr", null), config.footer ? /* @__PURE__ */ React7.createElement("div", {
    className: "mt-24 flex justify-between flex-col-reverse md:flex-row items-center md:items-end"
  }, /* @__PURE__ */ React7.createElement("span", {
    className: "text-slate-600"
  }, render_component_default(config.footerText, { locale })), /* @__PURE__ */ React7.createElement("div", {
    className: "mt-6"
  }), config.footerEditLink ? /* @__PURE__ */ React7.createElement(EditPageLink, {
    filepath: filepathWithName,
    repository: config.docsRepositoryBase,
    text: config.footerEditLink
  }) : null) : null);
};
var footer_default = Footer;

// src/head.tsx
import React8 from "react";
import NextHead from "next/head";
function Head({ title, locale, meta }) {
  const config = useConfig();
  return /* @__PURE__ */ React8.createElement(NextHead, null, config.font ? /* @__PURE__ */ React8.createElement("link", {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css"
  }) : null, /* @__PURE__ */ React8.createElement("title", null, title, render_component_default(config.titleSuffix, { locale, config, title, meta })), config.font ? /* @__PURE__ */ React8.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `html{font-family:Inter,sans-serif}@supports(font-variation-settings:normal){html{font-family:'Inter var',sans-serif}}`
    }
  }) : null, render_component_default(config.head, { locale, config, title, meta }), config.unstable_faviconGlyph ? /* @__PURE__ */ React8.createElement("link", {
    rel: "icon",
    href: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='.9em' font-size='90' text-anchor='middle'>${config.unstable_faviconGlyph}</text><style>text{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";fill:black}@media(prefers-color-scheme:dark){text{fill:white}}</style></svg>`
  }) : null);
}

// src/navbar.tsx
import React15 from "react";
import cn5 from "classnames";
import Link6 from "next/link";
import { useRouter as useRouter5 } from "next/router";

// src/icons/discord.tsx
import React9 from "react";
var DiscordIcon = ({ height = 40 }) => {
  return /* @__PURE__ */ React9.createElement("svg", {
    height,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 146 146",
    "aria-hidden": "true"
  }, /* @__PURE__ */ React9.createElement("title", null, "Discord"), /* @__PURE__ */ React9.createElement("path", {
    d: "M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z",
    fillRule: "nonzero",
    fill: "currentColor"
  }));
};
var discord_default = DiscordIcon;

// src/icons/github.tsx
import React10 from "react";
var Github = ({ height = 40 }) => {
  return /* @__PURE__ */ React10.createElement("svg", {
    height,
    viewBox: "2 2 20 20",
    fill: "none",
    "aria-hidden": "true"
  }, /* @__PURE__ */ React10.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z",
    fill: "currentColor"
  }));
};
var github_default = Github;

// src/locale-switch.tsx
import React11 from "react";
import cn2 from "classnames";
import Link3 from "next/link";
import { useRouter as useRouter2 } from "next/router";

// src/utils/use-mounted.ts
import { useEffect as useEffect2, useState as useState2 } from "react";
var useMounted = () => {
  const [mounted, setMounted] = useState2(false);
  useEffect2(() => {
    setMounted(true);
  }, []);
  return mounted;
};
var use_mounted_default = useMounted;

// src/locale-switch.tsx
function LocaleSwitch({ options, isRTL }) {
  const { locale, asPath } = useRouter2();
  const mounted = use_mounted_default();
  return /* @__PURE__ */ React11.createElement("details", {
    className: "locale-switch relative"
  }, /* @__PURE__ */ React11.createElement("summary", {
    className: "text-current p-2 cursor-pointer outline-none",
    tabIndex: 0
  }, /* @__PURE__ */ React11.createElement("svg", {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, /* @__PURE__ */ React11.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
  })), /* @__PURE__ */ React11.createElement("span", {
    className: "sr-only"
  }, "Languages")), mounted ? /* @__PURE__ */ React11.createElement("ul", {
    className: cn2("locale-dropdown absolute block bg-white dark:bg-dark border dark:border-slate-700 py-1 rounded shadow-lg", { "right-0": !isRTL, "left-0": isRTL })
  }, Array.isArray(options) && options.map((l) => /* @__PURE__ */ React11.createElement("li", {
    key: l.locale
  }, /* @__PURE__ */ React11.createElement(Link3, {
    href: asPath,
    locale: l.locale
  }, /* @__PURE__ */ React11.createElement("a", {
    className: cn2("block no-underline text-current py-2 px-4 hover:bg-slate-200 dark:hover:bg-slate-800 whitespace-nowrap", {
      "font-semibold": locale === l.locale,
      "bg-slate-100 dark:bg-slate-900": locale === l.locale
    })
  }, l.text))))) : null);
}

// src/search.tsx
import React12, {
  useCallback,
  useEffect as useEffect3,
  useMemo as useMemo2,
  useRef as useRef2,
  useState as useState3
} from "react";
import cn3 from "classnames";
import { matchSorter } from "match-sorter";
import Link4 from "next/link";
import { useRouter as useRouter3 } from "next/router";
var Item = ({ title, active, href, onMouseOver, search }) => {
  const highlight = title.toLowerCase().indexOf(search.toLowerCase());
  return /* @__PURE__ */ React12.createElement(Link4, {
    href
  }, /* @__PURE__ */ React12.createElement("a", {
    className: "block no-underline",
    onMouseOver
  }, /* @__PURE__ */ React12.createElement("li", {
    className: cn3("p-2", { active })
  }, title.substring(0, highlight), /* @__PURE__ */ React12.createElement("span", {
    className: "highlight"
  }, title.substring(highlight, highlight + search.length)), title.substring(highlight + search.length))));
};
var UP = true;
var DOWN = false;
var Search = ({ directories = [] }) => {
  const router = useRouter3();
  const [show, setShow] = useState3(false);
  const [search, setSearch] = useState3("");
  const [active, setActive] = useState3(0);
  const input = useRef2(null);
  const results = useMemo2(() => {
    if (!search)
      return [];
    return matchSorter(directories, search, { keys: ["title"] });
  }, [search]);
  const moveActiveItem = (up) => {
    const position = active + (up ? -1 : 1);
    const { length } = results;
    const next = (position + length) % length;
    setActive(next);
  };
  const handleKeyDown = useCallback((e) => {
    const { key, ctrlKey } = e;
    if (ctrlKey && key === "n" || key === "ArrowDown") {
      e.preventDefault();
      moveActiveItem(DOWN);
    }
    if (ctrlKey && key === "p" || key === "ArrowUp") {
      e.preventDefault();
      moveActiveItem(UP);
    }
    if (key === "Enter" && results && results[active]) {
      router.push(results[active].route);
    }
  }, [active, results, router]);
  useEffect3(() => {
    setActive(0);
  }, [search]);
  useEffect3(() => {
    const inputs = ["input", "select", "button", "textarea"];
    const down = (e) => {
      var _a;
      if (document.activeElement && inputs.indexOf(document.activeElement.tagName.toLowerCase()) === -1) {
        if (e.key === "/") {
          e.preventDefault();
          (_a = input.current) == null ? void 0 : _a.focus();
        } else if (e.key === "Escape") {
          setShow(false);
        }
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);
  const renderList = show && results.length > 0;
  return /* @__PURE__ */ React12.createElement("div", {
    className: "relative w-full nextra-search md:w-64"
  }, renderList && /* @__PURE__ */ React12.createElement("div", {
    className: "z-10 search-overlay",
    onClick: () => setShow(false)
  }), /* @__PURE__ */ React12.createElement("div", {
    className: "relative flex items-center"
  }, /* @__PURE__ */ React12.createElement("input", {
    onChange: (e) => {
      setSearch(e.target.value);
      setShow(true);
    },
    className: "block w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:ring",
    type: "search",
    placeholder: "Search documentation...",
    onKeyDown: handleKeyDown,
    onFocus: () => setShow(true),
    onBlur: () => setShow(false),
    ref: input,
    spellCheck: false
  }), show ? null : /* @__PURE__ */ React12.createElement("div", {
    className: "hidden sm:flex absolute inset-y-0 right-0 py-1.5 pr-1.5"
  }, /* @__PURE__ */ React12.createElement("kbd", {
    className: "inline-flex items-center px-2 font-sans text-sm font-medium text-slate-400 dark:text-slate-800 dark:border-slate-800 border rounded"
  }, "/"))), renderList && /* @__PURE__ */ React12.createElement("ul", {
    className: "absolute left-0 z-20 w-full p-0 m-0 mt-1 list-none border divide-y rounded shadow-md md:right-0 top-100 md:w-auto"
  }, results.map((res, i) => {
    return /* @__PURE__ */ React12.createElement(Item, {
      key: `search-item-${i}`,
      title: res.title,
      href: res.route,
      active: i === active,
      search,
      onMouseOver: () => setActive(i)
    });
  })));
};
var search_default = Search;

// src/stork-search.js
import React13, {
  Fragment,
  useCallback as useCallback2,
  useEffect as useEffect4,
  useMemo as useMemo3,
  useRef as useRef3,
  useState as useState4
} from "react";
import cn4 from "classnames";
import GraphemeSplitter from "grapheme-splitter";
import Link5 from "next/link";
import Router, { useRouter as useRouter4 } from "next/router";
var splitter = new GraphemeSplitter();
var TextWithHighlights = React13.memo(({ content, ranges }) => {
  const splittedText = content ? splitter.splitGraphemes(content) : [];
  const res = [];
  let id = 0, index = 0;
  for (const range of ranges) {
    res.push(/* @__PURE__ */ React13.createElement(Fragment, {
      key: id++
    }, splittedText.splice(0, range.beginning - index).join("")));
    res.push(/* @__PURE__ */ React13.createElement("span", {
      className: "highlight",
      key: id++
    }, splittedText.splice(0, range.end - range.beginning).join("")));
    index = range.end;
  }
  res.push(/* @__PURE__ */ React13.createElement(Fragment, {
    key: id++
  }, splittedText.join("")));
  return res;
});
var Item2 = ({ title, active, href, onMouseOver, excerpt }) => {
  return /* @__PURE__ */ React13.createElement(Link5, {
    href
  }, /* @__PURE__ */ React13.createElement("a", {
    className: "block no-underline",
    onMouseOver
  }, /* @__PURE__ */ React13.createElement("li", {
    className: cn4("py-2 px-4", { active })
  }, /* @__PURE__ */ React13.createElement("span", {
    className: "font-semibold"
  }, title), excerpt ? /* @__PURE__ */ React13.createElement("div", {
    className: "text-slate-600"
  }, /* @__PURE__ */ React13.createElement(TextWithHighlights, {
    content: excerpt.text,
    ranges: excerpt.highlight_ranges
  })) : null)));
};
var stork = {};
function Search2() {
  const router = useRouter4();
  const [show, setShow] = useState4(false);
  const [search, setSearch] = useState4("");
  const [active, setActive] = useState4(0);
  const setStork = useState4({})[1];
  const input = useRef3(null);
  const results = useMemo3(() => {
    if (!search)
      return [];
    const localeCode = Router.locale || "default";
    if (!stork[localeCode])
      return [];
    try {
      const json = stork[localeCode].wasm_search(`index-${localeCode}`, search);
      const obj = JSON.parse(json);
      if (!obj.results)
        return [];
      return obj.results.slice(0, 20).map((result) => {
        return {
          title: result.entry.title,
          route: result.entry.url,
          excerpt: result.excerpts[0]
        };
      });
    } catch (err) {
      console.error(err);
      return [];
    }
  }, [search]);
  const handleKeyDown = useCallback2((e) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (active + 1 < results.length) {
          setActive(active + 1);
          const activeElement = document.querySelector(`.nextra-stork ul > :nth-child(${active + 2})`);
          if (activeElement && activeElement.scrollIntoViewIfNeeded) {
            activeElement.scrollIntoViewIfNeeded();
          }
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (active - 1 >= 0) {
          setActive(active - 1);
          const activeElement = document.querySelector(`.nextra-stork ul > :nth-child(${active})`);
          if (activeElement && activeElement.scrollIntoViewIfNeeded) {
            activeElement.scrollIntoViewIfNeeded();
          }
        }
        break;
      }
      case "Enter": {
        router.push(results[active].route);
        break;
      }
      default:
        break;
    }
  }, [active, results, router]);
  const load2 = () => __async(this, null, function* () {
    const localeCode = Router.locale || "default";
    if (!stork[localeCode]) {
      stork[localeCode] = yield Promise.resolve().then(() => (init_wasm_loader(), wasm_loader_exports));
      setStork({});
      const init2 = stork[localeCode].init("/stork.wasm");
      const res = yield fetch(`/index-${localeCode}.st`);
      const buf = yield res.arrayBuffer();
      yield init2;
      stork[localeCode].wasm_register_index(`index-${localeCode}`, new Uint8Array(buf));
    }
  });
  useEffect4(() => {
    setActive(0);
  }, [search]);
  useEffect4(() => {
    const inputs = ["input", "select", "button", "textarea"];
    const down = (e) => {
      if (document.activeElement && inputs.indexOf(document.activeElement.tagName.toLowerCase()) === -1) {
        if (e.key === "/") {
          e.preventDefault();
          input.current.focus();
        } else if (e.key === "Escape") {
          setShow(false);
        }
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);
  const renderList = show && results.length > 0;
  return /* @__PURE__ */ React13.createElement("div", {
    className: "relative w-full nextra-search nextra-stork md:w-64"
  }, renderList && /* @__PURE__ */ React13.createElement("div", {
    className: "z-10 search-overlay",
    onClick: () => setShow(false)
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "relative flex items-center"
  }, /* @__PURE__ */ React13.createElement("input", {
    onChange: (e) => {
      setSearch(e.target.value);
      setShow(true);
    },
    className: "block w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:ring",
    type: "search",
    placeholder: "Search documentation...",
    onKeyDown: handleKeyDown,
    onFocus: () => {
      load2();
      setShow(true);
    },
    onBlur: () => setShow(false),
    ref: input,
    spellCheck: false
  }), show ? null : /* @__PURE__ */ React13.createElement("div", {
    className: "hidden sm:flex absolute inset-y-0 right-0 py-1.5 pr-1.5"
  }, /* @__PURE__ */ React13.createElement("kbd", {
    className: "inline-flex items-center px-2 font-sans text-sm font-medium text-slate-400 dark:text-slate-800 dark:border-slate-800 border rounded"
  }, "/"))), renderList && /* @__PURE__ */ React13.createElement("ul", {
    className: "absolute z-20 p-0 m-0 mt-1 divide-y top-full"
  }, results.map((res, i) => {
    return /* @__PURE__ */ React13.createElement(Item2, {
      key: `search-item-${i}`,
      title: res.title,
      href: res.route,
      excerpt: res.excerpt,
      active: i === active,
      onMouseOver: () => setActive(i)
    });
  })));
}

// src/theme-switch.tsx
import React14 from "react";
import { useTheme } from "next-themes";
function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const mounted = use_mounted_default();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return /* @__PURE__ */ React14.createElement("button", {
    className: "text-current p-2 cursor-pointer focus:ring outline-none",
    onClick: toggleTheme,
    "aria-label": "Toggle theme",
    onKeyDown: (e) => {
      if (e.key === "Enter")
        toggleTheme();
    }
  }, mounted && theme === "dark" ? /* @__PURE__ */ React14.createElement("svg", {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, /* @__PURE__ */ React14.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })) : mounted && theme === "light" ? /* @__PURE__ */ React14.createElement("svg", {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, /* @__PURE__ */ React14.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  })) : /* @__PURE__ */ React14.createElement("svg", {
    key: "undefined",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    shapeRendering: "geometricPrecision",
    "aria-hidden": "true"
  }));
}

// src/navbar.tsx
function Navbar({
  isRTL,
  flatDirectories,
  flatPageDirectories
}) {
  const config = useConfig();
  const { locale, asPath } = useRouter5();
  const activeRoute = getFSRoute(asPath, locale).split("#")[0];
  const { menu, setMenu } = useMenuContext();
  return /* @__PURE__ */ React15.createElement("nav", {
    className: "flex items-center bg-white z-20 fixed top-0 left-0 right-0 h-16 border-b border-slate-200 px-6 dark:bg-dark dark:border-slate-900 bg-opacity-[.97] dark:bg-opacity-100"
  }, /* @__PURE__ */ React15.createElement("div", {
    className: "w-full flex items-center mr-2"
  }, /* @__PURE__ */ React15.createElement(Link6, {
    href: "/"
  }, /* @__PURE__ */ React15.createElement("a", {
    className: "no-underline text-current inline-flex items-center hover:opacity-75"
  }, render_component_default(config.logo, { locale })))), flatPageDirectories ? flatPageDirectories.map((page) => {
    var _a;
    if (page.hidden)
      return null;
    let href = page.route;
    if (page.children) {
      href = (_a = page.firstChildRoute) != null ? _a : href;
    }
    return /* @__PURE__ */ React15.createElement(Link6, {
      href,
      key: page.route
    }, /* @__PURE__ */ React15.createElement("a", {
      className: cn5("no-underline whitespace-nowrap mr-4 hidden md:inline-block", page.route === activeRoute || activeRoute.startsWith(page.route + "/") ? "text-current" : "text-slate-500")
    }, page.title));
  }) : null, /* @__PURE__ */ React15.createElement("div", {
    className: "flex-1"
  }, /* @__PURE__ */ React15.createElement("div", {
    className: "hidden md:inline-block mr-2"
  }, config.customSearch || (config.search ? config.unstable_stork ? /* @__PURE__ */ React15.createElement(Search2, null) : /* @__PURE__ */ React15.createElement(search_default, {
    directories: flatDirectories
  }) : null))), config.darkMode ? /* @__PURE__ */ React15.createElement(ThemeSwitch, null) : null, config.i18n ? /* @__PURE__ */ React15.createElement(LocaleSwitch, {
    options: config.i18n,
    isRTL
  }) : null, config.projectLink || config.github ? /* @__PURE__ */ React15.createElement("a", {
    className: "text-current p-2",
    href: config.projectLink || config.github,
    target: "_blank",
    rel: "noreferrer"
  }, config.projectLinkIcon ? render_component_default(config.projectLinkIcon, { locale }) : /* @__PURE__ */ React15.createElement(React15.Fragment, null, /* @__PURE__ */ React15.createElement(github_default, {
    height: 24
  }), /* @__PURE__ */ React15.createElement("span", {
    className: "sr-only"
  }, "GitHub"))) : null, config.projectChatLink ? /* @__PURE__ */ React15.createElement("a", {
    className: "text-current p-2",
    href: config.projectChatLink,
    target: "_blank",
    rel: "noreferrer"
  }, config.projectChatLinkIcon ? render_component_default(config.projectChatLinkIcon, { locale }) : /* @__PURE__ */ React15.createElement(React15.Fragment, null, /* @__PURE__ */ React15.createElement(discord_default, {
    height: 24
  }), /* @__PURE__ */ React15.createElement("span", {
    className: "sr-only"
  }, "Discord"))) : null, /* @__PURE__ */ React15.createElement("button", {
    className: "block md:hidden p-2",
    onClick: () => setMenu(!menu)
  }, /* @__PURE__ */ React15.createElement("svg", {
    fill: "none",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /* @__PURE__ */ React15.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16M4 18h16"
  }))), /* @__PURE__ */ React15.createElement("div", {
    className: "-mr-2"
  }));
}

// src/sidebar.tsx
import React16, { useEffect as useEffect5, useMemo as useMemo4, useState as useState5 } from "react";
import cn6 from "classnames";
import Slugger2 from "github-slugger";
import Link7 from "next/link";
import { useRouter as useRouter6 } from "next/router";

// src/utils/getHeadingText.ts
function getHeadingText(heading) {
  if (Array.isArray(heading.children) && heading.children.length === 1) {
    const content = heading.children[0];
    if (content.type === "text")
      return content.value;
  }
  return "";
}

// src/sidebar.tsx
var TreeState = {};
function Folder({ item, anchors }) {
  var _a;
  const { asPath, locale } = useRouter6();
  const routeOriginal = getFSRoute(asPath, locale);
  const route = routeOriginal.split("#")[0];
  const active = route === item.route + "/" || route + "/" === item.route + "/";
  const { defaultMenuCollapsed } = useMenuContext();
  const open = (_a = TreeState[item.route]) != null ? _a : !defaultMenuCollapsed;
  const [_, render] = useState5(false);
  useEffect5(() => {
    if (active) {
      TreeState[item.route] = true;
    }
  }, [active]);
  return /* @__PURE__ */ React16.createElement("li", {
    className: open ? "active" : ""
  }, /* @__PURE__ */ React16.createElement("button", {
    onClick: () => {
      if (active)
        return;
      TreeState[item.route] = !open;
      render((x) => !x);
    }
  }, item.title), /* @__PURE__ */ React16.createElement("div", {
    style: {
      display: open ? "initial" : "none"
    }
  }, Array.isArray(item.children) && /* @__PURE__ */ React16.createElement(Menu, {
    directories: item.children,
    base: item.route,
    anchors
  })));
}
function File({ item, anchors }) {
  const { setMenu } = useMenuContext();
  const { asPath, locale } = useRouter6();
  const route = getFSRoute(asPath, locale);
  const active = route === item.route + "/" || route + "/" === item.route + "/";
  const slugger = new Slugger2();
  const activeAnchor = useActiveAnchor();
  const title = item.title;
  if (anchors && anchors.length) {
    if (active) {
      let activeIndex = 0;
      const anchorInfo = anchors.map((anchor, i) => {
        const text = anchor;
        const slug = slugger.slug(text);
        if (activeAnchor[slug] && activeAnchor[slug].isActive) {
          activeIndex = i;
        }
        return { text, slug };
      });
      return /* @__PURE__ */ React16.createElement("li", {
        className: active ? "active" : ""
      }, /* @__PURE__ */ React16.createElement(Link7, {
        href: item.route
      }, /* @__PURE__ */ React16.createElement("a", null, title)), /* @__PURE__ */ React16.createElement("ul", null, anchors.map((_, i) => {
        const { slug, text } = anchorInfo[i];
        const isActive = i === activeIndex;
        return /* @__PURE__ */ React16.createElement("li", {
          key: `a-${slug}`
        }, /* @__PURE__ */ React16.createElement("a", {
          href: "#" + slug,
          onClick: () => setMenu(false),
          className: isActive ? "active-anchor" : ""
        }, /* @__PURE__ */ React16.createElement("span", {
          className: "flex text-sm"
        }, /* @__PURE__ */ React16.createElement("span", {
          className: "opacity-25"
        }, "#"), /* @__PURE__ */ React16.createElement("span", {
          className: "mr-2"
        }), /* @__PURE__ */ React16.createElement("span", {
          className: "inline-block"
        }, text))));
      })));
    }
  }
  return /* @__PURE__ */ React16.createElement("li", {
    className: active ? "active" : ""
  }, /* @__PURE__ */ React16.createElement(Link7, {
    href: item.route
  }, /* @__PURE__ */ React16.createElement("a", {
    onClick: () => setMenu(false)
  }, title)));
}
function Menu({ directories, anchors }) {
  return /* @__PURE__ */ React16.createElement("ul", null, directories.map((item) => {
    if (item.children) {
      return /* @__PURE__ */ React16.createElement(Folder, {
        key: item.name,
        item,
        anchors
      });
    }
    return /* @__PURE__ */ React16.createElement(File, {
      key: item.name,
      item,
      anchors
    });
  }));
}
var emptyHeading = [];
function Sidebar({
  directories,
  flatDirectories,
  fullDirectories,
  mdShow = true,
  headings = emptyHeading
}) {
  const config = useConfig();
  const anchors = useMemo4(() => headings.filter((v) => v.children && v.depth === 2 && v.type === "heading").map((v) => getHeadingText(v)).filter(Boolean), [headings]);
  const { menu } = useMenuContext();
  useEffect5(() => {
    if (menu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menu]);
  return /* @__PURE__ */ React16.createElement("aside", {
    className: cn6("fixed h-screen bg-white dark:bg-dark flex-shrink-0 w-full md:w-64 md:sticky z-20", menu ? "" : "hidden", mdShow ? "md:block" : ""),
    style: {
      top: "4rem",
      height: "calc(100vh - 4rem)"
    }
  }, /* @__PURE__ */ React16.createElement("div", {
    className: "sidebar border-slate-200 dark:border-slate-900 w-full p-4 pb-40 md:pb-16 h-full overflow-y-auto"
  }, /* @__PURE__ */ React16.createElement("div", {
    className: "mb-4 block md:hidden"
  }, config.customSearch || (config.search ? config.unstable_stork ? /* @__PURE__ */ React16.createElement(Search2, null) : /* @__PURE__ */ React16.createElement(search_default, {
    directories: flatDirectories
  }) : null)), /* @__PURE__ */ React16.createElement("div", {
    className: "hidden md:block"
  }, /* @__PURE__ */ React16.createElement(Menu, {
    directories,
    anchors: config.floatTOC ? [] : anchors
  })), /* @__PURE__ */ React16.createElement("div", {
    className: "md:hidden"
  }, /* @__PURE__ */ React16.createElement(Menu, {
    directories: fullDirectories,
    anchors
  }))));
}

// src/toc.tsx
import React17 from "react";
import cn7 from "classnames";
import Slugger3 from "github-slugger";
var indent = (level) => {
  switch (level) {
    case 3:
      return { marginLeft: "1rem " };
    case 4:
      return { marginLeft: "2rem " };
    case 5:
      return { marginLeft: "3rem " };
    case 6:
      return { marginLeft: "4rem " };
  }
  return {};
};
var emptyHeader = [];
function ToC({
  headings = emptyHeader
}) {
  const slugger = new Slugger3();
  const activeAnchor = useActiveAnchor();
  return /* @__PURE__ */ React17.createElement("div", {
    className: "w-64 hidden xl:block text-sm pl-4"
  }, headings ? /* @__PURE__ */ React17.createElement("ul", {
    className: "overflow-y-auto sticky max-h-[calc(100vh-4rem)] top-16 pt-8 pb-10 m-0 list-none"
  }, headings.filter((heading) => heading.type === "heading" && heading.depth > 1).map((heading) => {
    const text = getHeadingText(heading);
    const slug = slugger.slug(text);
    const state = activeAnchor[slug];
    return /* @__PURE__ */ React17.createElement("li", {
      key: slug,
      style: indent(heading.depth)
    }, /* @__PURE__ */ React17.createElement("a", {
      href: `#${slug}`,
      className: cn7("no-underline hover:text-slate-900 dark:hover:text-slate-100", state && state.isActive ? "text-slate-900 dark:text-slate-100 font-semibold" : "text-slate-600")
    }, text));
  })) : null);
}

// src/index.tsx
import "focus-visible";
function useDirectoryInfo(pageMap) {
  const { locale, defaultLocale, asPath } = useRouter7();
  return useMemo5(() => {
    const fsPath = getFSRoute(asPath, locale).split("#")[0];
    return normalizePages({
      list: pageMap,
      locale,
      defaultLocale,
      route: fsPath
    });
  }, [pageMap, locale, defaultLocale, asPath]);
}
function Body({ meta, toc, filepathWithName, navLinks, children }) {
  return /* @__PURE__ */ React18.createElement(React18.Fragment, null, /* @__PURE__ */ React18.createElement(SkipNavContent, null), meta.full ? /* @__PURE__ */ React18.createElement("article", {
    className: "relative pt-16 w-full overflow-x-hidden"
  }, children) : /* @__PURE__ */ React18.createElement("article", {
    className: "docs-container relative pt-16 pb-16 px-6 md:px-8 w-full max-w-full flex min-w-0"
  }, /* @__PURE__ */ React18.createElement("main", {
    className: "max-w-screen-md mx-auto pt-4 z-10 min-w-0 w-full"
  }, /* @__PURE__ */ React18.createElement(theme_default, null, children), /* @__PURE__ */ React18.createElement(footer_default, {
    filepathWithName
  }, navLinks)), toc));
}
var Layout = (props) => {
  const { filename, pageMap, meta, children, titleText, headings } = props;
  const { route, locale } = useRouter7();
  const config = useConfig();
  const {
    activeType,
    activeIndex,
    flatPageDirectories,
    docsDirectories,
    flatDirectories,
    flatDocsDirectories,
    directories
  } = useDirectoryInfo(pageMap);
  const filepath = route.slice(0, route.lastIndexOf("/") + 1);
  const filepathWithName = filepath + filename;
  const title = meta.title || titleText || "Untitled";
  const isRTL = useMemo5(() => {
    if (!config.i18n)
      return config.direction === "rtl" || null;
    const localeConfig = config.i18n.find((l) => l.locale === locale);
    return localeConfig && localeConfig.direction === "rtl";
  }, [config.i18n, locale]);
  const [menu, setMenu] = useState6(false);
  if (activeType === "nav") {
    return /* @__PURE__ */ React18.createElement(React18.Fragment, null, /* @__PURE__ */ React18.createElement(Head, {
      title,
      locale,
      meta
    }), /* @__PURE__ */ React18.createElement(MenuContext.Provider, {
      value: {
        menu,
        setMenu,
        defaultMenuCollapsed: !!config.defaultMenuCollapsed
      }
    }, /* @__PURE__ */ React18.createElement("div", {
      className: cn8("nextra-container main-container flex flex-col", {
        rtl: isRTL,
        page: true
      })
    }, /* @__PURE__ */ React18.createElement(Navbar, {
      isRTL,
      flatDirectories,
      flatPageDirectories
    }), /* @__PURE__ */ React18.createElement(ActiveAnchor, null, /* @__PURE__ */ React18.createElement("div", {
      className: "flex flex-1 h-full"
    }, /* @__PURE__ */ React18.createElement(Sidebar, {
      directories: flatPageDirectories,
      flatDirectories,
      fullDirectories: directories,
      mdShow: false,
      headings
    }), /* @__PURE__ */ React18.createElement(Body, {
      meta,
      filepathWithName,
      navLinks: null
    }, children))))));
  }
  return /* @__PURE__ */ React18.createElement(React18.Fragment, null, /* @__PURE__ */ React18.createElement(Head, {
    title,
    locale,
    meta
  }), /* @__PURE__ */ React18.createElement(MenuContext.Provider, {
    value: {
      menu,
      setMenu,
      defaultMenuCollapsed: !!config.defaultMenuCollapsed
    }
  }, /* @__PURE__ */ React18.createElement("div", {
    className: cn8("nextra-container main-container flex flex-col", {
      rtl: isRTL
    })
  }, /* @__PURE__ */ React18.createElement(Navbar, {
    isRTL,
    flatDirectories,
    flatPageDirectories
  }), /* @__PURE__ */ React18.createElement(ActiveAnchor, null, /* @__PURE__ */ React18.createElement("div", {
    className: "flex flex-1 h-full"
  }, /* @__PURE__ */ React18.createElement(Sidebar, {
    directories: docsDirectories,
    flatDirectories,
    fullDirectories: directories,
    headings
  }), /* @__PURE__ */ React18.createElement(Body, {
    meta,
    filepathWithName,
    toc: /* @__PURE__ */ React18.createElement(ToC, {
      headings: config.floatTOC ? headings : null
    }),
    navLinks: /* @__PURE__ */ React18.createElement(NavLinks, {
      flatDirectories: flatDocsDirectories,
      currentIndex: activeIndex,
      isRTL
    })
  }, children))))));
};
var DocsLayout = (opts, config) => {
  const extendedConfig = Object.assign({}, default_config_default, config);
  return (props) => {
    return /* @__PURE__ */ React18.createElement(ThemeConfigContext.Provider, {
      value: extendedConfig
    }, /* @__PURE__ */ React18.createElement(ThemeProvider, {
      attribute: "class"
    }, /* @__PURE__ */ React18.createElement(Layout, __spreadValues(__spreadValues({}, opts), props))));
  };
};
var src_default = DocsLayout;
export {
  src_default as default
};
