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

// src/codeblock.tsx
import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import * as Renderlesskit from "@renderlesskit/react-tailwind";
import { RenderlesskitProvider } from "@renderlesskit/react-tailwind";
import { useClipboard } from "@chakra-ui/hooks";
import Highlight, {
  defaultProps
} from "prism-react-renderer";
import theme from "prism-react-renderer/themes/palenight";
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
var StaticCode = (props) => {
  const _a = props, { children, className, highlight, noCopy } = _a, rest = __objRest(_a, ["children", "className", "highlight", "noCopy"]);
  if (!className)
    return /* @__PURE__ */ React.createElement("code", __spreadValues({}, rest), children);
  const highlightedLines = highlight ? highlight.split(",").map(Number) : [];
  const language = className.replace(/language-/, "");
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative"
  }, /* @__PURE__ */ React.createElement(Highlight, __spreadProps(__spreadValues({}, defaultProps), {
    code: children.trim(),
    language,
    theme: THEME
  }), ({ className: className2, style, tokens, getLineProps, getTokenProps }) => /* @__PURE__ */ React.createElement("code", {
    className: className2,
    style: __spreadValues({}, style)
  }, tokens.map((line, i) => /* @__PURE__ */ React.createElement("div", __spreadProps(__spreadValues({
    key: i
  }, getLineProps({ line, key: i })), {
    style: highlightedLines.includes(i + 1) ? {
      background: "var(--c-highlight)",
      margin: "0 -1rem",
      padding: "0 1rem"
    } : {}
  }), line.map((token, key) => /* @__PURE__ */ React.createElement("span", __spreadValues({
    key
  }, getTokenProps({ token, key })))))))), !noCopy && /* @__PURE__ */ React.createElement(CopyButton, {
    code: children.trim()
  }));
};
var CopyButton = ({ code }) => {
  const { hasCopied, onCopy } = useClipboard(code);
  return /* @__PURE__ */ React.createElement("button", {
    className: "absolute right-0 px-4 py-1 text-xs text-gray-800 transform -translate-x-2 translate-y-4 bg-white rounded-md -top-2",
    onClick: onCopy
  }, hasCopied ? "COPIED!" : "COPY");
};
var transformer = (rawCode, language, noInline) => {
  const code = rawCode.replace(/((^|)import[^;]+[; ]+)+/gi, "").replace(/export default \(\) => {((.|\n)*)};/, "render(() => {$1});").replace(/export default \(\) => \(((.|\n)*)\);/, "render($1);").replace(/export default \(\) => ((.|\n)*);/, "render($1);").replace(/export default ((.|\n)*);/, "render($1);");
  return language === "jsx" && !noInline ? `<>${code}</>` : code;
};
var CodeBlock = (props) => {
  const _a = props, { code, className, live, render, noCopy, noInline } = _a, rest = __objRest(_a, ["code", "className", "live", "render", "noCopy", "noInline"]);
  const language = className == null ? void 0 : className.replace(/language-/, "");
  const [editorCode, setEditorCode] = React.useState(code.trim());
  React.useEffect(() => {
    console.log("%ccode", "color: #e57373", code);
    if (code)
      setEditorCode(code.trim());
  }, [code]);
  console.log("%ceditorCode", "color: #f200e2", editorCode);
  const scope = __spreadValues({
    React
  }, Renderlesskit);
  const liveProviderProps = __spreadValues({
    theme,
    language,
    code: editorCode,
    scope,
    noInline
  }, rest);
  console.log("%cliveProviderProps", "color: #731d1d", liveProviderProps);
  if (live) {
    return /* @__PURE__ */ React.createElement(RenderlesskitProvider, null, /* @__PURE__ */ React.createElement(LiveProvider, __spreadValues({
      transformCode: (rawCode) => transformer(rawCode, language, props.noInline)
    }, liveProviderProps), /* @__PURE__ */ React.createElement(LivePreview, {
      className: "p-6 bg-white border border-gray-600 rounded-md rounded-b-none"
    }), /* @__PURE__ */ React.createElement("div", {
      className: "relative"
    }, /* @__PURE__ */ React.createElement(LiveEditor, {
      className: "font-mono text-sm rounded-md rounded-t-none"
    }), /* @__PURE__ */ React.createElement(CopyButton, {
      code: editorCode
    })), /* @__PURE__ */ React.createElement(LiveError, {
      className: "mt-0 text-xs text-red-500 bg-red-100 rounded-md rounded-t-none"
    })));
  }
  if (render) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(RenderlesskitProvider, null, /* @__PURE__ */ React.createElement(LiveProvider, __spreadValues({
      transformCode: (rawCode) => transformer(rawCode, language, props.noInline)
    }, liveProviderProps), /* @__PURE__ */ React.createElement(LivePreview, {
      style: { fontFamily: "'Inter', sans-serif" }
    }))));
  }
  return /* @__PURE__ */ React.createElement(StaticCode, __spreadValues({
    noCopy,
    className
  }, props), editorCode);
};
export {
  CodeBlock,
  CopyButton,
  StaticCode
};
