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

// src/index.tsx
import React23, { useMemo as useMemo3, useState as useState6 } from "react";
import { RenderlesskitProvider } from "@renderlesskit/react-tailwind";
import { SkipNavContent } from "@reach/skip-nav";
import cn8 from "classnames";
import { useRouter as useRouter8 } from "next/router";
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
  projectLink: "https://github.com/shuding/nextra",
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
    className: "text-gray-600 font-normal hidden md:inline"
  }, "The Next Docs Builder")),
  head: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("meta", {
    name: "msapplication-TileColor",
    content: "#ffffff"
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
  })),
  searchPlaceholder: ({ locale }) => {
    if (locale === "zh-CN")
      return "\u641C\u7D22\u6587\u6863...";
    return "Search documentation...";
  },
  unstable_searchResultEmpty: () => /* @__PURE__ */ React2.createElement("span", {
    className: "block p-8 text-center text-gray-400 text-sm select-none"
  }, "No results found.")
};
var default_config_default = defaultTheme;

// src/misc/theme.tsx
import React3, { useEffect, useRef } from "react";
import innerText from "react-innertext";
import { Button } from "@renderlesskit/react-tailwind";
import { useClipboard } from "@chakra-ui/hooks";
import { MDXProvider } from "@mdx-js/react";
import Slugger from "github-slugger";
import Link from "next/link";
import "intersection-observer";
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
  const slug = slugger.slug(innerText(children));
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
var Code = (props) => {
  const { children } = props;
  if (typeof children == "string")
    return /* @__PURE__ */ React3.createElement("code", null, children);
  return /* @__PURE__ */ React3.createElement("code", {
    className: "relative"
  }, children, /* @__PURE__ */ React3.createElement(CopyButton, null));
};
var CopyButton = (_a) => {
  var _b = _a, { code } = _b, props = __objRest(_b, ["code"]);
  const { hasCopied, onCopy } = useClipboard("");
  return /* @__PURE__ */ React3.createElement("span", {
    className: "absolute right-0 top-0"
  }, /* @__PURE__ */ React3.createElement(Button, __spreadValues({
    size: "sm",
    onClick: onCopy
  }, props), hasCopied ? "Copied!" : "Copy"));
};

// src/utils/get-fs-route.ts
var getFSRoute = (asPath, locale) => {
  if (!locale)
    return asPath.replace(new RegExp("/index(/|$)"), "$1");
  return asPath.replace(new RegExp(`.${locale}(/|$)`), "$1").replace(new RegExp("/index(/|$)"), "$1").split("#")[0] || "/";
};

// src/utils/menu-context.ts
import { createContext as createContext2, useContext as useContext2 } from "react";
var MenuContext = createContext2({
  menu: false,
  setMenu: () => {
  },
  defaultMenuCollapsed: true
});
function useMenuContext() {
  return useContext2(MenuContext);
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
import React14 from "react";
import cn2 from "classnames";
import Link2 from "next/link";
import { useRouter as useRouter2 } from "next/router";

// src/icons/arrow-right.tsx
import React5 from "react";
var ArrowRight = (props) => {
  return /* @__PURE__ */ React5.createElement("svg", __spreadValues({
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
var renderComponent = (ComponentOrNode, props, functionOnly) => {
  if (!ComponentOrNode)
    return null;
  if (typeof ComponentOrNode === "function") {
    if (functionOnly)
      return ComponentOrNode(props);
    return /* @__PURE__ */ React6.createElement(ComponentOrNode, __spreadValues({}, props));
  }
  return ComponentOrNode;
};
var render_component_default = renderComponent;

// src/locale-switch.tsx
import React10 from "react";
import { useRouter } from "next/router";

// src/icons/globe.tsx
import React7 from "react";
function Globe() {
  return /* @__PURE__ */ React7.createElement("svg", {
    viewBox: "0 0 20 20",
    width: "1em",
    height: "1em",
    fill: "currentColor"
  }, /* @__PURE__ */ React7.createElement("path", {
    fillRule: "evenodd",
    d: "M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z",
    clipRule: "evenodd"
  }));
}

// src/select.tsx
import React9 from "react";
import { Listbox, Transition } from "@headlessui/react";
import cn from "classnames";

// src/icons/check.tsx
import React8 from "react";
function Check() {
  return /* @__PURE__ */ React8.createElement("svg", {
    viewBox: "0 0 20 20",
    width: "1em",
    height: "1em",
    fill: "currentColor"
  }, /* @__PURE__ */ React8.createElement("path", {
    fillRule: "evenodd",
    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

// src/select.tsx
function Menu({ options, selected, onChange }) {
  return /* @__PURE__ */ React9.createElement(Listbox, {
    value: selected,
    onChange
  }, ({ open }) => /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement(Listbox.Button, {
    className: cn("rounded-md px-2 w-full text-left font-medium cursor-default text-xs h-7 transition-colors text-gray-600 dark:text-gray-400 focus:outline-none", open ? "bg-gray-200 dark:bg-prime-100 dark:bg-opacity-10 text-gray-900 dark:text-gray-50" : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-prime-100 dark:hover:bg-opacity-5 dark:hover:text-gray-50")
  }, selected.name), /* @__PURE__ */ React9.createElement(Transition, {
    show: open,
    as: React9.Fragment,
    leave: "transition",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  }, /* @__PURE__ */ React9.createElement(Listbox.Options, {
    className: "menu absolute bottom-[130%] min-w-full z-20 mt-1 bg-white dark:bg-neutral-800 dark:ring-white dark:ring-opacity-20 shadow-lg max-h-64 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm"
  }, options.map((option) => /* @__PURE__ */ React9.createElement(Listbox.Option, {
    key: option.key,
    value: option,
    className: ({ active }) => cn(option.key === selected.key ? "" : "", active ? "text-prime-500 bg-prime-50 dark:bg-prime-500 dark:bg-opacity-10" : "text-gray-800 dark:text-gray-100", "cursor-default select-none relative py-1.5 pl-3 pr-9 whitespace-nowrap")
  }, option.name, option.key === selected.key ? /* @__PURE__ */ React9.createElement("span", {
    className: cn("absolute inset-y-0 right-0 flex items-center pr-3")
  }, /* @__PURE__ */ React9.createElement(Check, null)) : null))))));
}

// src/locale-switch.tsx
function LocaleSwitch({ options }) {
  const router = useRouter();
  const { locale, asPath } = router;
  const selected = options.find((l) => locale === l.locale);
  return /* @__PURE__ */ React10.createElement(Menu, {
    onChange: (option) => {
      const date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3);
      document.cookie = `NEXT_LOCALE=${option.key}; expires=${date.toUTCString()}; path=/`;
      window.location.href = asPath;
    },
    selected: {
      key: selected.locale,
      name: /* @__PURE__ */ React10.createElement("div", {
        className: "flex items-center gap-2"
      }, /* @__PURE__ */ React10.createElement(Globe, null), /* @__PURE__ */ React10.createElement("span", null, selected.text))
    },
    options: options.map((l) => ({
      key: l.locale,
      name: l.text
    }))
  });
}

// src/theme-switch.tsx
import React13 from "react";
import { useTheme } from "next-themes";

// src/icons/moon.tsx
import React11 from "react";
function Sun() {
  return /* @__PURE__ */ React11.createElement("svg", {
    viewBox: "0 0 20 20",
    width: "1em",
    height: "1em",
    fill: "currentColor"
  }, /* @__PURE__ */ React11.createElement("path", {
    d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
  }));
}

// src/icons/sun.tsx
import React12 from "react";
function Moon() {
  return /* @__PURE__ */ React12.createElement("svg", {
    viewBox: "0 0 20 20",
    width: "1em",
    height: "1em",
    fill: "currentColor"
  }, /* @__PURE__ */ React12.createElement("path", {
    fillRule: "evenodd",
    d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",
    clipRule: "evenodd"
  }));
}

// src/theme-switch.tsx
function ThemeSwitch({ lite = true }) {
  const { theme, setTheme, systemTheme } = useTheme();
  const renderedTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = React13.useState(false);
  React13.useEffect(() => setMounted(true), []);
  return /* @__PURE__ */ React13.createElement(Menu, {
    onChange: (option) => {
      setTheme(option.key);
    },
    selected: {
      key: theme || "",
      name: mounted ? /* @__PURE__ */ React13.createElement("div", {
        className: "flex items-center gap-2 capitalize"
      }, renderedTheme === "dark" ? /* @__PURE__ */ React13.createElement(Sun, null) : /* @__PURE__ */ React13.createElement(Moon, null), lite ? "" : /* @__PURE__ */ React13.createElement("span", null, theme)) : ""
    },
    options: [
      {
        key: "light",
        name: "Light"
      },
      {
        key: "dark",
        name: "Dark"
      },
      {
        key: "system",
        name: "System"
      }
    ]
  });
}

// src/footer.tsx
var NextLink = ({ route, title, isRTL }) => {
  return /* @__PURE__ */ React14.createElement(Link2, {
    href: route
  }, /* @__PURE__ */ React14.createElement("a", {
    className: cn2("text-lg font-medium p-4 -m-4 no-underline transition-colors text-gray-600 dark:text-gray-300 dark:hover:text-prime-500 hover:text-prime-500 flex items-center", { "ml-2": !isRTL, "mr-2": isRTL }),
    title
  }, title, /* @__PURE__ */ React14.createElement(arrow_right_default, {
    height: 24,
    className: cn2("transform inline flex-shrink-0", {
      "rotate-180 mr-1": isRTL,
      "ml-1": !isRTL
    })
  })));
};
var PrevLink = ({ route, title, isRTL }) => {
  return /* @__PURE__ */ React14.createElement(Link2, {
    href: route
  }, /* @__PURE__ */ React14.createElement("a", {
    className: cn2("text-lg font-medium p-4 -m-4 no-underline transition-colors text-gray-600 dark:text-gray-300 dark:hover:text-prime-500 hover:text-prime-500 flex items-center", { "mr-2": !isRTL, "ml-2": isRTL }),
    title
  }, /* @__PURE__ */ React14.createElement(arrow_right_default, {
    height: 24,
    className: cn2("transform inline flex-shrink-0", {
      "rotate-180 mr-1": !isRTL,
      "ml-1": isRTL
    })
  }), title));
};
var NavLinks = ({
  flatDirectories,
  currentIndex,
  isRTL
}) => {
  const config = useConfig();
  let prev = flatDirectories[currentIndex - 1];
  let next = flatDirectories[currentIndex + 1];
  return /* @__PURE__ */ React14.createElement("div", {
    className: "mt-16 mb-8 flex flex-row items-center justify-between"
  }, /* @__PURE__ */ React14.createElement("div", null, prev && config.prevLinks ? /* @__PURE__ */ React14.createElement(PrevLink, {
    route: prev.route,
    title: prev.title,
    isRTL
  }) : null), /* @__PURE__ */ React14.createElement("div", null, config.nextLinks && next ? /* @__PURE__ */ React14.createElement(NextLink, {
    route: next.route,
    title: next.title,
    isRTL
  }) : null));
};
var Footer = ({ menu }) => {
  const { locale } = useRouter2();
  const config = useConfig();
  return /* @__PURE__ */ React14.createElement("footer", {
    className: "bg-gray-100 dark:bg-neutral-900"
  }, /* @__PURE__ */ React14.createElement("div", {
    className: cn2("py-2 border-b dark:border-neutral-800", menu ? "" : "md:hidden")
  }, /* @__PURE__ */ React14.createElement("div", {
    className: "max-w-[90rem] mx-auto"
  }, /* @__PURE__ */ React14.createElement("div", {
    className: "inline-flex px-4"
  }, config.i18n ? /* @__PURE__ */ React14.createElement("div", {
    className: "flex-1 relative"
  }, /* @__PURE__ */ React14.createElement(LocaleSwitch, {
    options: config.i18n
  })) : null, config.darkMode ? /* @__PURE__ */ React14.createElement("div", {
    className: "grow-0 relative"
  }, /* @__PURE__ */ React14.createElement(ThemeSwitch, {
    lite: false
  })) : null))), /* @__PURE__ */ React14.createElement("div", {
    className: "max-w-[90rem] mx-auto pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] py-12"
  }, /* @__PURE__ */ React14.createElement("div", {
    className: "flex justify-between flex-col-reverse md:flex-row items-center md:items-end"
  }, /* @__PURE__ */ React14.createElement("span", {
    className: "text-gray-600 dark:text-gray-400"
  }, render_component_default(config.footerText, { locale })), /* @__PURE__ */ React14.createElement("div", {
    className: "mt-6"
  }))));
};
var footer_default = Footer;

// src/head.tsx
import React15 from "react";
import NextHead from "next/head";
import { useTheme as useTheme2 } from "next-themes";
function Head({ title, locale, meta }) {
  const config = useConfig();
  const { theme, systemTheme } = useTheme2();
  const renderedTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = React15.useState(false);
  React15.useEffect(() => setMounted(true), []);
  return /* @__PURE__ */ React15.createElement(NextHead, null, config.font ? /* @__PURE__ */ React15.createElement("link", {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css"
  }) : null, /* @__PURE__ */ React15.createElement("title", null, title, render_component_default(config.titleSuffix, { locale, config, title, meta })), config.font ? /* @__PURE__ */ React15.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `html{font-family:Inter,sans-serif}@supports(font-variation-settings:normal){html{font-family:'Inter var',sans-serif}}`
    }
  }) : null, render_component_default(config.head, { locale, config, title, meta }), config.unstable_faviconGlyph ? /* @__PURE__ */ React15.createElement("link", {
    rel: "icon",
    href: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='.9em' font-size='90' text-anchor='middle'>${config.unstable_faviconGlyph}</text><style>text{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";fill:black}@media(prefers-color-scheme:dark){text{fill:white}}</style></svg>`
  }) : null, !mounted ? /* @__PURE__ */ React15.createElement(React15.Fragment, null, /* @__PURE__ */ React15.createElement("meta", {
    name: "theme-color",
    content: "#ffffff",
    media: "(prefers-color-scheme: light)"
  }), /* @__PURE__ */ React15.createElement("meta", {
    name: "theme-color",
    content: "#111111",
    media: "(prefers-color-scheme: dark)"
  })) : /* @__PURE__ */ React15.createElement("meta", {
    name: "theme-color",
    content: renderedTheme === "dark" ? "#111111" : "#ffffff"
  }), /* @__PURE__ */ React15.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, viewport-fit=cover"
  }));
}

// src/navbar.tsx
import React20 from "react";
import cn5 from "classnames";
import Link5 from "next/link";
import { useRouter as useRouter5 } from "next/router";

// src/icons/discord.tsx
import React16 from "react";
var DiscordIcon = ({ height = 40 }) => {
  return /* @__PURE__ */ React16.createElement("svg", {
    height,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 146 146",
    "aria-hidden": "true"
  }, /* @__PURE__ */ React16.createElement("title", null, "Discord"), /* @__PURE__ */ React16.createElement("path", {
    d: "M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z",
    fillRule: "nonzero",
    fill: "currentColor"
  }));
};
var discord_default = DiscordIcon;

// src/icons/github.tsx
import React17 from "react";
var Github = ({ height = 40 }) => {
  return /* @__PURE__ */ React17.createElement("svg", {
    height,
    viewBox: "2 2 20 20",
    fill: "none",
    "aria-hidden": "true"
  }, /* @__PURE__ */ React17.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z",
    fill: "currentColor"
  }));
};
var github_default = Github;

// src/flexsearch.js
import React18, {
  Fragment,
  memo,
  useCallback,
  useEffect as useEffect2,
  useRef as useRef2,
  useState as useState2
} from "react";
import { Transition as Transition2 } from "@headlessui/react";
import cn3 from "classnames";
import FlexSearch from "flexsearch";
import Link3 from "next/link";
import Router, { useRouter as useRouter3 } from "next/router";
var Item = ({ page, first, title, active, href, onHover, excerpt }) => {
  return /* @__PURE__ */ React18.createElement(React18.Fragment, null, first ? /* @__PURE__ */ React18.createElement("div", {
    className: "mx-2.5 px-2.5 pb-1.5 mb-2 mt-6 first:mt-0 border-b font-semibold uppercase text-xs text-gray-500 select-none dark:text-gray-300 dark:border-opacity-10"
  }, page) : null, /* @__PURE__ */ React18.createElement(Link3, {
    href
  }, /* @__PURE__ */ React18.createElement("a", {
    className: "block no-underline",
    onMouseMove: onHover
  }, /* @__PURE__ */ React18.createElement("li", {
    className: cn3({ active })
  }, /* @__PURE__ */ React18.createElement("div", {
    className: "font-semibold dark:text-white leading-5"
  }, title), excerpt ? /* @__PURE__ */ React18.createElement("div", {
    className: "excerpt mt-1 text-gray-600 text-sm leading-[1.35rem] dark:text-gray-400"
  }, excerpt) : null))));
};
var MemoedStringWithMatchHighlights = memo(function StringWithMatchHighlights({ content, search }) {
  const splittedText = content.split("");
  const escappedSearch = search.trim().replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  const regexp = RegExp("(" + escappedSearch.split(" ").join("|") + ")", "ig");
  let match;
  let id = 0;
  let index = 0;
  const res = [];
  while ((match = regexp.exec(content)) !== null) {
    res.push(/* @__PURE__ */ React18.createElement(Fragment, {
      key: id++
    }, splittedText.splice(0, match.index - index).join("")));
    res.push(/* @__PURE__ */ React18.createElement("span", {
      className: "highlight",
      key: id++
    }, splittedText.splice(0, regexp.lastIndex - match.index).join("")));
    index = regexp.lastIndex;
  }
  res.push(/* @__PURE__ */ React18.createElement(Fragment, {
    key: id++
  }, splittedText.join("")));
  return res;
});
var indexes = {};
function Search() {
  const config = useConfig();
  const router = useRouter3();
  const [loading, setLoading] = useState2(false);
  const [show, setShow] = useState2(false);
  const [search, setSearch] = useState2("");
  const [active, setActive] = useState2(0);
  const [results, setResults] = useState2([]);
  const input = useRef2(null);
  const doSearch = () => {
    if (!search)
      return;
    const localeCode = Router.locale || "default";
    const index = indexes[localeCode];
    if (!index)
      return;
    const pages = {};
    const results2 = [].concat(...index.search(search, { enrich: true, limit: 10, suggest: true }).map((r) => r.result)).map((r, i) => __spreadProps(__spreadValues({}, r), {
      index: i,
      matchTitle: r.doc.content.indexOf(search) > r.doc.content.indexOf(" _NEXTRA_ ")
    })).sort((a, b) => {
      if (a.matchTitle !== b.matchTitle)
        return a.matchTitle ? -1 : 1;
      if (a.doc.page !== b.doc.page)
        return a.doc.page > b.doc.page ? 1 : -1;
      return a.index - b.index;
    }).map((item) => {
      const firstItemOfPage = !pages[item.doc.page];
      pages[item.doc.page] = true;
      return {
        first: firstItemOfPage,
        route: item.doc.url,
        page: item.doc.page,
        title: /* @__PURE__ */ React18.createElement(MemoedStringWithMatchHighlights, {
          content: item.doc.title,
          search
        }),
        excerpt: item.doc.title !== item.doc.content ? /* @__PURE__ */ React18.createElement(MemoedStringWithMatchHighlights, {
          content: item.doc.content.replace(/ _NEXTRA_ .*$/, ""),
          search
        }) : null
      };
    });
    setResults(results2);
  };
  useEffect2(doSearch, [search]);
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (active + 1 < results.length) {
          setActive(active + 1);
          const activeElement = document.querySelector(`.nextra-flexsearch ul > a:nth-of-type(${active + 2})`);
          if (activeElement && activeElement.scrollIntoView) {
            activeElement.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
          }
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (active - 1 >= 0) {
          setActive(active - 1);
          const activeElement = document.querySelector(`.nextra-flexsearch ul > a:nth-of-type(${active})`);
          if (activeElement && activeElement.scrollIntoView) {
            activeElement.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
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
  const load = () => __async(this, null, function* () {
    const localeCode = Router.locale || "default";
    if (!indexes[localeCode] && !loading) {
      setLoading(true);
      const data = yield (yield fetch(`/_next/static/chunks/nextra-data-${localeCode}.json`)).json();
      const index = new FlexSearch.Document({
        cache: 100,
        tokenize: "full",
        document: {
          id: "id",
          index: "content",
          store: ["title", "content", "url", "page"]
        },
        context: {
          resolution: 9,
          depth: 1,
          bidirectional: true
        },
        filter: ["_NEXTRA_"]
      });
      for (let route in data) {
        for (let heading in data[route].data) {
          const [hash, text] = heading.split("#");
          const title = text || data[route].title;
          const url = route + (hash ? "#" + hash : "");
          const paragraphs = (data[route].data[heading] || "").split("\n").filter(Boolean);
          if (!paragraphs.length) {
            index.add({
              id: url,
              url,
              title,
              content: title,
              page: data[route].title
            });
          }
          for (let i = 0; i < paragraphs.length; i++) {
            index.add({
              id: url + "_" + i,
              url,
              title,
              content: paragraphs[i] + (i === 0 ? " _NEXTRA_ " + title : ""),
              page: data[route].title
            });
          }
        }
      }
      indexes[localeCode] = index;
      setLoading(false);
      setSearch((s) => s ? s + " " : s);
    }
  });
  useEffect2(() => {
    setActive(0);
  }, [search]);
  useEffect2(() => {
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
  const renderList = show && !!search;
  return /* @__PURE__ */ React18.createElement("div", {
    className: "relative w-full nextra-search nextra-flexsearch md:w-64"
  }, renderList && /* @__PURE__ */ React18.createElement("div", {
    className: "z-10 search-overlay",
    onClick: () => setShow(false)
  }), /* @__PURE__ */ React18.createElement("div", {
    className: "relative flex items-center"
  }, /* @__PURE__ */ React18.createElement("input", {
    onChange: (e) => {
      setSearch(e.target.value);
      setShow(true);
    },
    className: "block w-full px-3 py-2 leading-tight rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-white hover:bg-opacity-5 transition-colors dark:focus:bg-dark dark:focus:ring-gray-100 dark:focus:ring-opacity-20",
    type: "search",
    placeholder: render_component_default(config.searchPlaceholder, {
      locale: router.locale
    }, true),
    onKeyDown: handleKeyDown,
    onFocus: () => {
      load();
      setShow(true);
    },
    ref: input,
    spellCheck: false
  }), renderList ? null : /* @__PURE__ */ React18.createElement("div", {
    className: "hidden sm:flex absolute inset-y-0 right-0 py-1.5 pr-1.5 select-none pointer-events-none"
  }, /* @__PURE__ */ React18.createElement("kbd", {
    className: "inline-flex items-center px-2 font-mono text-sm font-medium bg-white dark:bg-dark dark:bg-opacity-50 text-gray-400 dark:text-gray-500 dark:border-gray-100 dark:border-opacity-20 border rounded"
  }, "/"))), /* @__PURE__ */ React18.createElement(Transition2, {
    show: renderList,
    as: React18.Fragment,
    leave: "transition duration-100",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  }, /* @__PURE__ */ React18.createElement("ul", {
    className: "absolute z-20 p-0 m-0 mt-2 top-full py-2.5"
  }, loading ? /* @__PURE__ */ React18.createElement("span", {
    className: "p-8 text-center text-gray-400 text-sm select-none flex justify-center"
  }, /* @__PURE__ */ React18.createElement("svg", {
    className: "animate-spin -ml-1 mr-2 h-5 w-5 text-gray-400",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /* @__PURE__ */ React18.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /* @__PURE__ */ React18.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })), /* @__PURE__ */ React18.createElement("span", null, "Loading...")) : results.length === 0 ? render_component_default(config.unstable_searchResultEmpty, {
    locale: router.locale
  }) : results.map((res, i) => {
    return /* @__PURE__ */ React18.createElement(Item, {
      first: res.first,
      key: `search-item-${i}`,
      page: res.page,
      title: res.title,
      href: res.route,
      excerpt: res.excerpt,
      active: i === active,
      onHover: () => setActive(i)
    });
  }))));
}

// src/search.tsx
import React19, {
  useCallback as useCallback2,
  useEffect as useEffect3,
  useMemo,
  useRef as useRef3,
  useState as useState3
} from "react";
import cn4 from "classnames";
import { matchSorter } from "match-sorter";
import Link4 from "next/link";
import { useRouter as useRouter4 } from "next/router";
var Item2 = ({ title, active, href, onMouseOver, search }) => {
  const highlight = title.toLowerCase().indexOf(search.toLowerCase());
  return /* @__PURE__ */ React19.createElement(Link4, {
    href
  }, /* @__PURE__ */ React19.createElement("a", {
    className: "block no-underline",
    onMouseOver
  }, /* @__PURE__ */ React19.createElement("li", {
    className: cn4("p-2", { active })
  }, title.substring(0, highlight), /* @__PURE__ */ React19.createElement("span", {
    className: "highlight"
  }, title.substring(highlight, highlight + search.length)), title.substring(highlight + search.length))));
};
var UP = true;
var DOWN = false;
var Search2 = ({ directories = [] }) => {
  const router = useRouter4();
  const config = useConfig();
  const [show, setShow] = useState3(false);
  const [search, setSearch] = useState3("");
  const [active, setActive] = useState3(0);
  const input = useRef3(null);
  const results = useMemo(() => {
    if (!search)
      return [];
    return matchSorter(directories, search, { keys: ["title"] });
  }, [directories, search]);
  const moveActiveItem = (up) => {
    const position = active + (up ? -1 : 1);
    const { length } = results;
    const next = (position + length) % length;
    setActive(next);
  };
  const handleKeyDown = useCallback2((e) => {
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
  return /* @__PURE__ */ React19.createElement("div", {
    className: "relative w-full nextra-search md:w-64"
  }, renderList && /* @__PURE__ */ React19.createElement("div", {
    className: "z-10 search-overlay",
    onClick: () => setShow(false)
  }), /* @__PURE__ */ React19.createElement("div", {
    className: "relative flex items-center"
  }, /* @__PURE__ */ React19.createElement("input", {
    onChange: (e) => {
      setSearch(e.target.value);
      setShow(true);
    },
    className: "block w-full px-3 py-2 leading-tight bg-black bg-opacity-[.03] rounded-lg appearance-none focus:outline-none focus:ring hover:bg-opacity-5 transition-colors",
    type: "search",
    placeholder: render_component_default(config.searchPlaceholder, {
      locale: router.locale
    }, true),
    onKeyDown: handleKeyDown,
    onFocus: () => setShow(true),
    onBlur: () => setShow(false),
    ref: input,
    spellCheck: false
  }), show ? null : /* @__PURE__ */ React19.createElement("div", {
    className: "hidden sm:flex absolute inset-y-0 right-0 py-1.5 pr-1.5 select-none pointer-events-none"
  }, /* @__PURE__ */ React19.createElement("kbd", {
    className: "inline-flex items-center px-2 font-mono text-sm font-medium bg-white text-gray-400 dark:text-gray-800 dark:border-gray-400 border rounded"
  }, "/"))), renderList && /* @__PURE__ */ React19.createElement("ul", {
    className: "absolute left-0 z-20 w-full p-0 py-2.5 m-0 mt-1 list-none border divide-y rounded shadow-md md:right-0 top-100 md:w-auto"
  }, results.map((res, i) => {
    return /* @__PURE__ */ React19.createElement(Item2, {
      key: `search-item-${i}`,
      title: res.title,
      href: res.route,
      active: i === active,
      search,
      onMouseOver: () => setActive(i)
    });
  })));
};
var search_default = Search2;

// src/navbar.tsx
function Navbar({
  flatDirectories,
  flatPageDirectories
}) {
  const config = useConfig();
  const { locale, asPath } = useRouter5();
  const activeRoute = getFSRoute(asPath, locale);
  const { menu, setMenu } = useMenuContext();
  return /* @__PURE__ */ React20.createElement("div", {
    className: "nextra-nav-container z-20 sticky top-0 before:bg-white before:bg-opacity-[.85] before:backdrop-blur-md before:absolute before:block before:w-full before:h-full before:z-[-1] dark:before:bg-dark dark:before:bg-opacity-80 dark:before:border-b dark:before:border-white dark:before:border-opacity-10"
  }, /* @__PURE__ */ React20.createElement("nav", {
    className: "flex max-w-[90rem] mx-auto items-center left-0 right-0 h-16 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]"
  }, /* @__PURE__ */ React20.createElement("div", {
    className: "w-full flex items-center mr-2"
  }, /* @__PURE__ */ React20.createElement(Link5, {
    href: "/"
  }, /* @__PURE__ */ React20.createElement("a", {
    className: "no-underline text-current inline-flex items-center hover:opacity-75"
  }, render_component_default(config.logo, { locale })))), flatPageDirectories ? flatPageDirectories.map((page) => {
    var _a;
    if (page.hidden)
      return null;
    let href = page.route;
    if (page.children) {
      href = (_a = page.firstChildRoute) != null ? _a : href;
    }
    const isActive = page.route === activeRoute || activeRoute.startsWith(page.route + "/");
    return /* @__PURE__ */ React20.createElement(Link5, {
      href,
      key: page.route
    }, /* @__PURE__ */ React20.createElement("a", {
      className: cn5("no-underline whitespace-nowrap mr-4 hidden md:inline-block", isActive ? "text-current" : "text-gray-500"),
      "aria-selected": isActive
    }, page.title));
  }) : null, /* @__PURE__ */ React20.createElement("div", {
    className: "flex-1"
  }, /* @__PURE__ */ React20.createElement("div", {
    className: "hidden md:inline-block mr-2"
  }, config.customSearch || (config.search ? config.unstable_flexsearch ? /* @__PURE__ */ React20.createElement(Search, null) : /* @__PURE__ */ React20.createElement(search_default, {
    directories: flatDirectories
  }) : null))), config.projectLink || config.github ? /* @__PURE__ */ React20.createElement("a", {
    className: "text-current p-2",
    href: config.projectLink || config.github,
    target: "_blank",
    rel: "noreferrer"
  }, config.projectLinkIcon ? render_component_default(config.projectLinkIcon, { locale }) : /* @__PURE__ */ React20.createElement(React20.Fragment, null, /* @__PURE__ */ React20.createElement(github_default, {
    height: 24
  }), /* @__PURE__ */ React20.createElement("span", {
    className: "sr-only"
  }, "GitHub"))) : null, config.projectChatLink ? /* @__PURE__ */ React20.createElement("a", {
    className: "text-current p-2",
    href: config.projectChatLink,
    target: "_blank",
    rel: "noreferrer"
  }, config.projectChatLinkIcon ? render_component_default(config.projectChatLinkIcon, { locale }) : /* @__PURE__ */ React20.createElement(React20.Fragment, null, /* @__PURE__ */ React20.createElement(discord_default, {
    height: 24
  }), /* @__PURE__ */ React20.createElement("span", {
    className: "sr-only"
  }, "Discord"))) : null, /* @__PURE__ */ React20.createElement("button", {
    className: "block md:hidden p-2",
    onClick: () => setMenu(!menu)
  }, /* @__PURE__ */ React20.createElement("svg", {
    fill: "none",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /* @__PURE__ */ React20.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16M4 18h16"
  }))), /* @__PURE__ */ React20.createElement("div", {
    className: "-mr-2"
  })));
}

// src/sidebar.tsx
import React21, { useEffect as useEffect4, useMemo as useMemo2, useState as useState4 } from "react";
import cn6 from "classnames";
import Slugger2 from "github-slugger";
import Link6 from "next/link";
import { useRouter as useRouter6 } from "next/router";

// src/utils/get-heading-text.ts
function getHeadingText(heading) {
  return heading.value || "";
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
  const [_, render] = useState4(false);
  useEffect4(() => {
    if (active) {
      TreeState[item.route] = true;
    }
  }, [active]);
  return /* @__PURE__ */ React21.createElement("li", {
    className: open ? "active" : ""
  }, /* @__PURE__ */ React21.createElement("button", {
    onClick: () => {
      if (active)
        return;
      TreeState[item.route] = !open;
      render((x) => !x);
    }
  }, /* @__PURE__ */ React21.createElement("span", {
    className: "flex items-center justify-between gap-2"
  }, item.title, /* @__PURE__ */ React21.createElement(arrow_right_default, {
    height: "1em",
    className: cn6(open ? "rotate-90" : "", "transition-transform")
  }))), /* @__PURE__ */ React21.createElement("div", {
    style: {
      display: open ? "initial" : "none"
    }
  }, Array.isArray(item.children) && /* @__PURE__ */ React21.createElement(Menu2, {
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
      return /* @__PURE__ */ React21.createElement("li", {
        className: active ? "active" : ""
      }, /* @__PURE__ */ React21.createElement(Link6, {
        href: item.route
      }, /* @__PURE__ */ React21.createElement("a", null, title)), /* @__PURE__ */ React21.createElement("ul", null, anchors.map((_, i) => {
        const { slug, text } = anchorInfo[i];
        const isActive = i === activeIndex;
        return /* @__PURE__ */ React21.createElement("li", {
          key: `a-${slug}`
        }, /* @__PURE__ */ React21.createElement("a", {
          href: "#" + slug,
          onClick: () => setMenu(false),
          className: isActive ? "active-anchor" : ""
        }, /* @__PURE__ */ React21.createElement("span", {
          className: "flex text-sm"
        }, /* @__PURE__ */ React21.createElement("span", {
          className: "opacity-25"
        }, "#"), /* @__PURE__ */ React21.createElement("span", {
          className: "mr-2"
        }), /* @__PURE__ */ React21.createElement("span", {
          className: "inline-block"
        }, text))));
      })));
    }
  }
  return /* @__PURE__ */ React21.createElement("li", {
    className: active ? "active" : ""
  }, /* @__PURE__ */ React21.createElement(Link6, {
    href: item.route
  }, /* @__PURE__ */ React21.createElement("a", {
    onClick: () => setMenu(false)
  }, title)));
}
function Menu2({ directories, anchors }) {
  return /* @__PURE__ */ React21.createElement("ul", null, directories.map((item) => {
    if (item.children) {
      return /* @__PURE__ */ React21.createElement(Folder, {
        key: item.name,
        item,
        anchors
      });
    }
    return /* @__PURE__ */ React21.createElement(File, {
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
  asPopover = false,
  headings = emptyHeading
}) {
  const config = useConfig();
  const anchors = useMemo2(() => headings.filter((v) => v.children && v.depth === 2 && v.type === "heading").map((v) => getHeadingText(v)).filter(Boolean), [headings]);
  const { menu } = useMenuContext();
  useEffect4(() => {
    if (menu) {
      document.body.classList.add("overflow-hidden", "md:overflow-auto");
    } else {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
    }
  }, [menu]);
  return /* @__PURE__ */ React21.createElement("aside", {
    className: cn6("fixed flex-shrink-0 w-full md:w-64 md:sticky z-[15] top-[4rem] self-start overflow-y-auto h-full md:h-auto", menu ? "bg-white dark:bg-dark" : "bg-transparent hidden", asPopover ? "md:hidden" : "md:block"),
    style: {
      height: "calc(var(--vh) - 4rem)"
    }
  }, /* @__PURE__ */ React21.createElement("div", {
    className: "sidebar w-full h-full md:h-auto pl-[calc(env(safe-area-inset-left)-1.5rem)]"
  }, /* @__PURE__ */ React21.createElement("div", {
    className: "p-4",
    style: {
      minHeight: "calc(var(--vh) - 4rem - 61px)"
    }
  }, /* @__PURE__ */ React21.createElement("div", {
    className: "mb-4 block md:hidden"
  }, config.customSearch || (config.search ? config.unstable_flexsearch ? /* @__PURE__ */ React21.createElement(Search, null) : /* @__PURE__ */ React21.createElement(search_default, {
    directories: flatDirectories
  }) : null)), /* @__PURE__ */ React21.createElement("div", {
    className: "hidden md:block"
  }, /* @__PURE__ */ React21.createElement(Menu2, {
    directories,
    anchors: config.floatTOC ? [] : anchors
  })), /* @__PURE__ */ React21.createElement("div", {
    className: "md:hidden"
  }, /* @__PURE__ */ React21.createElement(Menu2, {
    directories: fullDirectories,
    anchors
  }))), /* @__PURE__ */ React21.createElement("div", {
    className: "sticky bottom-0 mx-4 border-t dark:border-prime-100 dark:border-opacity-10 shadow-[0_-12px_12px_white] dark:shadow-none"
  }, /* @__PURE__ */ React21.createElement("div", {
    className: "bg-white dark:bg-dark py-4 flex gap-1",
    style: {
      paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)"
    }
  }, config.i18n ? /* @__PURE__ */ React21.createElement("div", {
    className: "flex-1 relative"
  }, /* @__PURE__ */ React21.createElement(LocaleSwitch, {
    options: config.i18n
  })) : null, config.darkMode ? /* @__PURE__ */ React21.createElement("div", {
    className: cn6("grow-0 relative", { locale: config.i18n })
  }, /* @__PURE__ */ React21.createElement(ThemeSwitch, null)) : null))));
}

// src/toc.tsx
import React22 from "react";
import cn7 from "classnames";
import Slugger3 from "github-slugger";
import { useRouter as useRouter7 } from "next/router";
import parseGitUrl from "parse-git-url";

// src/utils/use-mounted.ts
import { useEffect as useEffect5, useState as useState5 } from "react";
var useMounted = () => {
  const [mounted, setMounted] = useState5(false);
  useEffect5(() => {
    setMounted(true);
  }, []);
  return mounted;
};
var use_mounted_default = useMounted;

// src/toc.tsx
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
var useCreateFeedbackUrl = (repository, filepath, labels) => {
  const mounted = use_mounted_default();
  if (!mounted)
    return "#";
  const repo = parseGitUrl(repository || "");
  if (!repo)
    throw new Error("Invalid `docsRepositoryBase` URL!");
  const pageTitle = document.title;
  switch (repo.type) {
    case "github":
      return `https://github.com/${repo.owner}/${repo.name}/issues/new?title=${encodeURIComponent(`Feedback for \u201C${pageTitle}\u201D`)}&labels=${labels || ""}`;
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
  const { locale } = useRouter7();
  return /* @__PURE__ */ React22.createElement("a", {
    className: "text-xs font-medium no-underline block text-gray-500 mb-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
    href: url,
    target: "_blank",
    rel: "noreferrer"
  }, text ? render_component_default(text, {
    locale
  }) : "Edit this page");
};
var FeedbackLink = ({
  repository,
  text,
  filepath,
  labels
}) => {
  const url = useCreateFeedbackUrl(repository, filepath, labels);
  const { locale } = useRouter7();
  return /* @__PURE__ */ React22.createElement("a", {
    className: "text-xs font-medium no-underline block text-gray-500 mb-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
    href: url,
    target: "_blank",
    rel: "noreferrer"
  }, text ? render_component_default(text, {
    locale
  }) : "Feedback");
};
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
  headings = emptyHeader,
  filepathWithName
}) {
  const slugger = new Slugger3();
  const activeAnchor = useActiveAnchor();
  const config = useConfig();
  const hasMetaInfo = config.feedbackLink || config.footerEditLink;
  return /* @__PURE__ */ React22.createElement("div", {
    className: "w-64 hidden xl:block text-sm px-4"
  }, /* @__PURE__ */ React22.createElement("div", {
    className: "overflow-y-auto sticky max-h-[calc(var(--vh)-4rem)] top-16 pt-8 pb-10"
  }, headings ? /* @__PURE__ */ React22.createElement("ul", {
    className: "m-0 list-none"
  }, /* @__PURE__ */ React22.createElement("p", {
    className: "font-semibold tracking-tight mb-4"
  }, "On This Page"), headings.filter((heading) => heading.type === "heading" && heading.depth > 1).map((heading) => {
    const text = getHeadingText(heading);
    const slug = slugger.slug(text);
    const state = activeAnchor[slug];
    return /* @__PURE__ */ React22.createElement("li", {
      key: slug,
      style: indent(heading.depth)
    }, /* @__PURE__ */ React22.createElement("a", {
      href: `#${slug}`,
      className: cn7("no-underline inline-block", heading.depth === 2 ? "font-semibold" : "", state && state.isActive ? "text-prime-500 subpixel-antialiased" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"),
      "aria-selected": state == null ? void 0 : state.isActive
    }, text));
  })) : null, hasMetaInfo ? /* @__PURE__ */ React22.createElement("hr", {
    className: "dark:border-prime-100 dark:border-opacity-10"
  }) : null, config.feedbackLink ? /* @__PURE__ */ React22.createElement(FeedbackLink, {
    filepath: filepathWithName,
    repository: config.docsRepositoryBase,
    labels: config.feedbackLabels,
    text: config.feedbackLink
  }) : null, config.footerEditLink ? /* @__PURE__ */ React22.createElement(EditPageLink, {
    filepath: filepathWithName,
    repository: config.docsRepositoryBase,
    text: config.footerEditLink
  }) : null));
}

// src/index.tsx
import "focus-visible";

// src/polyfill.tsx
if (typeof window !== "undefined") {
  let onResize;
  if (window.visualViewport) {
    onResize = () => {
      const vh = window.visualViewport.height;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.visualViewport.addEventListener("resize", onResize);
    onResize();
  } else {
    onResize = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", onResize);
    onResize();
  }
}

// src/index.tsx
function useDirectoryInfo(pageMap) {
  const { locale, defaultLocale, asPath } = useRouter8();
  return useMemo3(() => {
    const fsPath = getFSRoute(asPath, locale);
    return normalizePages({
      list: pageMap,
      locale,
      defaultLocale,
      route: fsPath
    });
  }, [pageMap, locale, defaultLocale, asPath]);
}
var Body = ({ meta, toc, navLinks, children }) => {
  return /* @__PURE__ */ React23.createElement(React23.Fragment, null, /* @__PURE__ */ React23.createElement(SkipNavContent, null), meta.full ? /* @__PURE__ */ React23.createElement("article", {
    className: "relative w-full overflow-x-hidden"
  }, /* @__PURE__ */ React23.createElement(MDXTheme, null, children)) : /* @__PURE__ */ React23.createElement("article", {
    className: "docs-container relative pb-8 w-full max-w-full flex min-w-0 pr-[calc(env(safe-area-inset-right)-1.5rem)]"
  }, /* @__PURE__ */ React23.createElement("main", {
    className: "mx-auto max-w-4xl px-6 md:px-8 pt-4 z-10 min-w-0 w-full"
  }, /* @__PURE__ */ React23.createElement(MDXTheme, null, children), navLinks), toc));
};
var Layout = ({
  filename,
  pageMap,
  meta,
  titleText,
  headings,
  children
}) => {
  const { route, locale } = useRouter8();
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
  const isRTL = useMemo3(() => {
    if (!config.i18n)
      return config.direction === "rtl";
    const localeConfig = config.i18n.find((l) => l.locale === locale);
    return localeConfig && localeConfig.direction === "rtl";
  }, [config.i18n, locale]);
  const [menu, setMenu] = useState6(false);
  if (activeType === "nav") {
    return /* @__PURE__ */ React23.createElement(React23.Fragment, null, /* @__PURE__ */ React23.createElement(Head, {
      title,
      locale,
      meta
    }), /* @__PURE__ */ React23.createElement(MenuContext.Provider, {
      value: {
        menu,
        setMenu,
        defaultMenuCollapsed: !!config.defaultMenuCollapsed
      }
    }, /* @__PURE__ */ React23.createElement("div", {
      className: cn8("nextra-container main-container flex flex-col", {
        rtl: isRTL,
        page: true
      })
    }, /* @__PURE__ */ React23.createElement(Navbar, {
      isRTL,
      flatDirectories,
      flatPageDirectories
    }), /* @__PURE__ */ React23.createElement(ActiveAnchor, null, /* @__PURE__ */ React23.createElement("div", {
      className: "max-w-[90rem] w-full mx-auto"
    }, /* @__PURE__ */ React23.createElement("div", {
      className: "flex flex-1 h-full"
    }, /* @__PURE__ */ React23.createElement(Sidebar, {
      directories: flatPageDirectories,
      flatDirectories,
      fullDirectories: directories,
      headings,
      isRTL,
      asPopover: true
    }), /* @__PURE__ */ React23.createElement(Body, {
      meta,
      navLinks: null
    }, children)))), config.footer ? /* @__PURE__ */ React23.createElement(footer_default, {
      menu: true
    }) : null)));
  }
  return /* @__PURE__ */ React23.createElement(React23.Fragment, null, /* @__PURE__ */ React23.createElement(Head, {
    title,
    locale,
    meta
  }), /* @__PURE__ */ React23.createElement(MenuContext.Provider, {
    value: {
      menu,
      setMenu,
      defaultMenuCollapsed: !!config.defaultMenuCollapsed
    }
  }, /* @__PURE__ */ React23.createElement("div", {
    className: cn8("nextra-container main-container flex flex-col", {
      rtl: isRTL
    })
  }, /* @__PURE__ */ React23.createElement(Navbar, {
    isRTL,
    flatDirectories,
    flatPageDirectories
  }), /* @__PURE__ */ React23.createElement(ActiveAnchor, null, /* @__PURE__ */ React23.createElement("div", {
    className: "max-w-[90rem] w-full mx-auto"
  }, /* @__PURE__ */ React23.createElement("div", {
    className: "flex flex-1 h-full"
  }, /* @__PURE__ */ React23.createElement(Sidebar, {
    directories: docsDirectories,
    flatDirectories,
    fullDirectories: directories,
    headings,
    isRTL
  }), /* @__PURE__ */ React23.createElement(Body, {
    meta,
    toc: /* @__PURE__ */ React23.createElement(ToC, {
      headings: config.floatTOC ? headings : null,
      filepathWithName
    }),
    navLinks: /* @__PURE__ */ React23.createElement(NavLinks, {
      flatDirectories: flatDocsDirectories,
      currentIndex: activeIndex,
      isRTL
    })
  }, children)))), config.footer ? /* @__PURE__ */ React23.createElement(footer_default, {
    menu: false
  }) : null)));
};
var src_default = (opts, config) => {
  const extendedConfig = Object.assign({}, default_config_default, config);
  return (props) => {
    return /* @__PURE__ */ React23.createElement(ThemeConfigContext.Provider, {
      value: extendedConfig
    }, /* @__PURE__ */ React23.createElement(ThemeProvider, {
      attribute: "class",
      disableTransitionOnChange: true
    }, /* @__PURE__ */ React23.createElement(RenderlesskitProvider, null, /* @__PURE__ */ React23.createElement(Layout, __spreadValues(__spreadValues({}, opts), props)))));
  };
};
export {
  src_default as default
};
