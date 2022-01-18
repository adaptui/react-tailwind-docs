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

// src/loader.ts
import path4 from "path";
import grayMatter2 from "gray-matter";
import slash2 from "slash";

// src/content-dump.ts
import fs from "graceful-fs";
import path from "path";
import { promisify } from "util";
var { statSync, mkdirSync } = fs;
var assetDir = path.join(process.cwd(), "public", ".nextra");
var asset = {};
try {
  statSync(assetDir);
} catch (err) {
  mkdirSync(assetDir);
}
function addPage(_0) {
  return __async(this, arguments, function* ({
    fileLocale,
    route,
    title,
    data,
    structurizedData
  }) {
    if (!asset[fileLocale]) {
      asset[fileLocale] = {};
    }
    asset[fileLocale][route] = {
      title: title || data.title,
      data: structurizedData
    };
    const dataFile = path.join(assetDir, `data-${fileLocale}.json`);
    yield promisify(fs.writeFile)(dataFile, JSON.stringify(asset[fileLocale]));
  });
}

// src/utils.ts
import fs2 from "fs";
function getLocaleFromFilename(name2) {
  const localeRegex = /\.([a-zA-Z-]+)?\.(mdx?|jsx?|json)$/;
  const match = name2.match(localeRegex);
  if (match)
    return match[1];
  return void 0;
}
function removeExtension(name2) {
  const match = name2.match(/^([^.]+)/);
  return match !== null ? match[1] : "";
}
var parseJsonFile = (content, path5) => {
  let parsed = {};
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error(`Error parsing ${path5}, make sure it's a valid JSON 
` + err);
  }
  return parsed;
};
var existsSync = (f) => {
  try {
    fs2.accessSync(f, fs2.constants.F_OK);
    return true;
  } catch (_) {
    return false;
  }
};

// src/compile.ts
import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

// src/mdx-plugins/static-image.js
var relative = /^\.{1,2}\//;
function visit(node, type2, handler) {
  if (node.type === type2) {
    handler(node);
  }
  if (node.children) {
    node.children.forEach((n) => visit(n, type2, handler));
  }
}
function ASTNodeImport(name2, from) {
  return {
    type: "mdxjsEsm",
    value: `import ${name2} from "${from}"`,
    data: {
      estree: {
        type: "Program",
        body: [
          {
            type: "ImportDeclaration",
            specifiers: [
              {
                type: "ImportDefaultSpecifier",
                local: { type: "Identifier", name: name2 }
              }
            ],
            source: {
              type: "Literal",
              value: from,
              raw: `"${from}"`
            }
          }
        ],
        sourceType: "module"
      }
    }
  };
}
function remarkStaticImage() {
  return (tree, _file, done) => {
    const importsToInject = [];
    visit(tree, "image", visitor);
    tree.children.unshift(...importsToInject);
    tree.children.unshift(ASTNodeImport("$NextImageNextra", "next/image"));
    done();
    function visitor(node) {
      const url = node.url;
      if (url && relative.test(url)) {
        const tempVariableName = `$nextraImage${importsToInject.length}`;
        Object.assign(node, {
          type: "mdxJsxFlowElement",
          name: "$NextImageNextra",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "alt",
              value: node.alt || ""
            },
            {
              type: "mdxJsxAttribute",
              name: "placeholder",
              value: "blur"
            },
            {
              type: "mdxJsxAttribute",
              name: "src",
              value: {
                type: "mdxJsxAttributeValueExpression",
                value: tempVariableName,
                data: {
                  estree: {
                    type: "Program",
                    body: [
                      {
                        type: "ExpressionStatement",
                        expression: {
                          type: "Identifier",
                          name: tempVariableName
                        }
                      }
                    ],
                    sourceType: "module"
                  }
                }
              }
            }
          ],
          children: []
        });
        importsToInject.push(ASTNodeImport(tempVariableName, url));
      }
    }
  };
}

// src/mdx-plugins/get-headers.ts
function isHeading(node) {
  return node.type === "heading";
}
function visit2(node, handler) {
  if (isHeading(node)) {
    handler(node);
  }
  if (node.children) {
    node.children.forEach((n) => visit2(n, handler));
  }
}
function getFlattenedValue(node) {
  return node.children.map((child) => "children" in child ? getFlattenedValue(child) : "value" in child ? child.value : "").join("");
}
function remarkHeadings(headers) {
  const data = this.data();
  return (tree, _file, done) => {
    visit2(tree, (node) => {
      const heading = __spreadProps(__spreadValues({}, node), {
        value: getFlattenedValue(node)
      });
      const headingMeta = data.headingMeta;
      if (node.depth === 1) {
        headingMeta.hasH1 = true;
        if (Array.isArray(node.children) && node.children.length === 1) {
          const child = node.children[0];
          if (child.type === "text") {
            headingMeta.titleText = child.value;
          }
        }
      }
      headingMeta.headings.push(heading);
    });
    done();
  };
}

// src/mdx-plugins/structurize.js
import Slugger from "github-slugger";
var structurize_default = (structurizedData) => {
  const slugger = new Slugger();
  let activeSlug = "";
  let skip = false;
  let content = "";
  return function stripMarkdown() {
    return (node) => {
      walk(node);
      structurizedData[activeSlug] = content;
      return node;
    };
    function walk(node) {
      let result = "";
      const type2 = node.type;
      if (type2 === "heading")
        skip = true;
      if (["code", "table", "blockquote", "list", "mdxJsxFlowElement"].includes(type2)) {
        result += "\n";
        if (!skip)
          content += "\n";
      }
      if ("children" in node) {
        for (let i = 0; i < node.children.length; i++) {
          result += walk(node.children[i]);
        }
      } else if (["code", "text", "inlineCode", "tableCell"].includes(type2)) {
        result += node.value;
        if (!skip)
          content += node.value;
      }
      if ([
        "code",
        "table",
        "blockquote",
        "list",
        "listItem",
        "break",
        "mdxJsxFlowElement"
      ].includes(type2)) {
        result += "\n";
        if (!skip)
          content += "\n";
      }
      if (["tableCell"].includes(type2)) {
        result += "	";
        if (!skip)
          content += "	";
      }
      if (type2 === "heading")
        skip = false;
      if (type2 === "heading" && node.depth > 1) {
        structurizedData[activeSlug] = content;
        content = "";
        activeSlug = slugger.slug(result) + "#" + result;
      }
      return result;
    }
  };
};

// src/mdx-plugins/add-code-meta.js
function visit3(node, tagName, handler) {
  if (node.tagName === tagName) {
    handler(node);
    return;
  }
  if (node.children) {
    node.children.forEach((n) => visit3(n, tagName, handler));
  }
}
function parseCodeMeta() {
  return (tree) => {
    visit3(tree, "pre", (node) => {
      var _a, _b, _c;
      if (Array.isArray(node.children) && node.children.length === 1 && node.children[0].tagName === "code" && typeof node.children[0].properties === "object") {
        const meta = (_b = (_a = node.children[0].data) == null ? void 0 : _a.meta) != null ? _b : node.children[0].properties.metastring;
        if (meta) {
          const filename = (_c = meta.match(/filename="([^"]+)"/)) == null ? void 0 : _c[1];
          if (filename) {
            node.__nextra_filename__ = filename;
          }
        }
      }
    });
  };
}
function attachCodeMeta() {
  return (tree) => {
    visit3(tree, "span", (node) => {
      if (!("data-rehype-pretty-code-fragment" in node.properties))
        return;
      node.properties["data-nextra-code"] = "";
      if ("__nextra_filename__" in node) {
        node.properties["data-filename"] = node.__nextra_filename__;
      }
    });
  };
}

// src/theme.json
var name = "css-variables";
var type = "light";
var colors = {
  "editor.foreground": "#000001",
  "editor.background": "#000002"
};
var tokenColors = [
  {
    settings: {
      foreground: "#000001"
    }
  },
  {
    scope: [
      "markup.deleted",
      "meta.diff.header.from-file",
      "punctuation.definition.deleted"
    ],
    settings: {
      foreground: "#ef6270"
    }
  },
  {
    scope: [
      "markup.inserted",
      "meta.diff.header.to-file",
      "punctuation.definition.inserted"
    ],
    settings: {
      foreground: "#4bb74a"
    }
  },
  {
    scope: [
      "keyword.operator.accessor",
      "meta.group.braces.round.function.arguments",
      "meta.template.expression",
      "markup.fenced_code meta.embedded.block"
    ],
    settings: {
      foreground: "#000001"
    }
  },
  {
    scope: "emphasis",
    settings: {
      fontStyle: "italic"
    }
  },
  {
    scope: ["strong", "markup.heading.markdown", "markup.bold.markdown"],
    settings: {
      fontStyle: "bold"
    }
  },
  {
    scope: ["markup.italic.markdown"],
    settings: {
      fontStyle: "italic"
    }
  },
  {
    scope: "meta.link.inline.markdown",
    settings: {
      fontStyle: "underline",
      foreground: "#000004"
    }
  },
  {
    scope: ["string", "markup.fenced_code", "markup.inline"],
    settings: {
      foreground: "#000005"
    }
  },
  {
    scope: ["comment", "string.quoted.docstring.multi"],
    settings: {
      foreground: "#000006"
    }
  },
  {
    scope: [
      "constant.numeric",
      "constant.language",
      "constant.other.placeholder",
      "constant.character.format.placeholder",
      "variable.language.this",
      "variable.other.object",
      "variable.other.class",
      "variable.other.constant",
      "meta.property-name",
      "meta.property-value",
      "support"
    ],
    settings: {
      foreground: "#000004"
    }
  },
  {
    scope: [
      "keyword",
      "storage.modifier",
      "storage.type",
      "storage.control.clojure",
      "entity.name.function.clojure",
      "entity.name.tag.yaml",
      "support.function.node",
      "support.type.property-name.json",
      "punctuation.separator.key-value",
      "punctuation.definition.template-expression"
    ],
    settings: {
      foreground: "#000007"
    }
  },
  {
    scope: "variable.parameter.function",
    settings: {
      foreground: "#000008"
    }
  },
  {
    scope: [
      "support.function",
      "entity.name.type",
      "entity.other.inherited-class",
      "meta.function-call",
      "meta.instance.constructor",
      "entity.other.attribute-name",
      "entity.name.function",
      "constant.keyword.clojure"
    ],
    settings: {
      foreground: "#000009"
    }
  },
  {
    scope: [
      "entity.name.tag",
      "string.quoted",
      "string.regexp",
      "string.interpolated",
      "string.template",
      "string.unquoted.plain.out.yaml",
      "keyword.other.template"
    ],
    settings: {
      foreground: "#000010"
    }
  },
  {
    scope: [
      "punctuation.definition.arguments",
      "punctuation.definition.dict",
      "punctuation.separator",
      "meta.function-call.arguments"
    ],
    settings: {
      foreground: "#000011"
    }
  },
  {
    name: "[Custom] Markdown links",
    scope: [
      "markup.underline.link",
      "punctuation.definition.metadata.markdown"
    ],
    settings: {
      foreground: "#000012"
    }
  },
  {
    name: "[Custom] Markdown list",
    scope: ["beginning.punctuation.definition.list.markdown"],
    settings: {
      foreground: "#000005"
    }
  },
  {
    name: "[Custom] Markdown punctuation definition brackets",
    scope: [
      "punctuation.definition.string.begin.markdown",
      "punctuation.definition.string.end.markdown",
      "string.other.link.title.markdown",
      "string.other.link.description.markdown"
    ],
    settings: {
      foreground: "#000007"
    }
  }
];
var theme_default = {
  name,
  type,
  colors,
  tokenColors
};

// src/compile.ts
var createCompiler = (mdxOptions) => {
  const compiler = createProcessor(mdxOptions);
  compiler.data("headingMeta", {
    hasH1: false,
    headings: []
  });
  return compiler;
};
var rehypePrettyCodeOptions = {
  theme: theme_default,
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push("highlighted");
  }
};
function compileMdx(_0) {
  return __async(this, arguments, function* (source, mdxOptions = {}, nextraOptions = {
    unstable_staticImage: false,
    unstable_contentDump: false
  }) {
    let structurizedData = {};
    const compiler = createCompiler({
      jsx: true,
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [
        ...mdxOptions.remarkPlugins || [],
        remarkGfm,
        remarkHeadings,
        ...nextraOptions.unstable_staticImage ? [remarkStaticImage] : [],
        ...nextraOptions.unstable_contentDump ? [structurize_default(structurizedData)] : []
      ].filter(Boolean),
      rehypePlugins: [
        ...mdxOptions.rehypePlugins || [],
        parseCodeMeta,
        [rehypePrettyCode, rehypePrettyCodeOptions],
        attachCodeMeta
      ].filter(Boolean)
    });
    const result = yield compiler.process(source);
    return __spreadProps(__spreadValues({
      result: String(result)
    }, compiler.data("headingMeta")), {
      structurizedData
    });
  });
}

// src/page-map.ts
import path2 from "path";

// src/filter-route-locale.ts
function filterRouteLocale(pageMap, locale, defaultLocale) {
  const isDefaultLocale = !locale || locale === defaultLocale;
  const filteredPageMap = [];
  const fallbackPages = {};
  for (const page of pageMap) {
    if (page.children) {
      filteredPageMap.push(__spreadProps(__spreadValues({}, page), {
        children: filterRouteLocale(page.children, locale, defaultLocale)
      }));
      continue;
    }
    const localDoesMatch = !page.locale && isDefaultLocale || page.locale === locale || page.name === "meta.json";
    if (localDoesMatch) {
      fallbackPages[page.name] = null;
      filteredPageMap.push(page);
    } else {
      if (fallbackPages[page.name] !== null && (!page.locale || page.locale === defaultLocale)) {
        fallbackPages[page.name] = page;
      }
    }
  }
  for (const name2 in fallbackPages) {
    if (fallbackPages[name2]) {
      filteredPageMap.push(fallbackPages[name2]);
    }
  }
  return filteredPageMap;
}

// src/page-map.ts
var extension = /\.mdx?$/;
var metaExtension = /meta\.?([a-zA-Z-]+)?\.json/;
function findPagesDir(dir = process.cwd()) {
  if (existsSync(path2.join(dir, "pages")))
    return "pages";
  if (existsSync(path2.join(dir, "src/pages")))
    return "src/pages";
  throw new Error("> Couldn't find a `pages` directory. Please create one under the project root");
}
function getPageMap(currentResourcePath, pageMaps, fileMap, defaultLocale) {
  var _a, _b;
  const activeRouteLocale = getLocaleFromFilename(currentResourcePath);
  const pageItem = fileMap[currentResourcePath];
  const metaName = path2.dirname(currentResourcePath);
  const pageMeta = (_b = (_a = fileMap[`${metaName}/meta.${activeRouteLocale}.json`]) == null ? void 0 : _a.meta) == null ? void 0 : _b[pageItem.name];
  const title = (typeof pageMeta === "string" ? pageMeta : pageMeta == null ? void 0 : pageMeta.title) || pageItem.name;
  if (activeRouteLocale) {
    return [
      filterRouteLocale(pageMaps, activeRouteLocale, defaultLocale),
      fileMap[currentResourcePath].route,
      title
    ];
  }
  return [pageMaps, fileMap[currentResourcePath].route, title];
}

// src/plugin.ts
import fs3 from "graceful-fs";
import util from "util";
import path3 from "path";
import slash from "slash";
import grayMatter from "gray-matter";
var { readdir, readFile } = fs3;
function collectFiles(_0) {
  return __async(this, arguments, function* (dir, route = "/", fileMap = {}) {
    const files = yield util.promisify(readdir)(dir, { withFileTypes: true });
    const items = (yield Promise.all(files.map((f) => __async(this, null, function* () {
      const filePath = path3.resolve(dir, f.name);
      const fileRoute = slash(path3.join(route, removeExtension(f.name).replace(/^index$/, "")));
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
        const fileContents = yield util.promisify(readFile)(filePath, "utf-8");
        const { data } = grayMatter(fileContents);
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
        const content = yield util.promisify(readFile)(filePath, "utf-8");
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

// src/loader.ts
var extension2 = /\.mdx?$/;
var isProductionBuild = process.env.NODE_ENV === "production";
var indexContentEmitted = /* @__PURE__ */ new Set();
function loader_default(source, callback) {
  return __async(this, null, function* () {
    this.cacheable(true);
    if (!isProductionBuild) {
      this.addContextDependency(path4.resolve(findPagesDir()));
    }
    const options = this.getOptions();
    let {
      theme,
      themeConfig,
      defaultLocale,
      unstable_contentDump,
      unstable_staticImage,
      mdxOptions,
      pageMapCache: pageMapCache2
    } = options;
    const { resourcePath } = this;
    const filename = resourcePath.slice(resourcePath.lastIndexOf("/") + 1);
    const fileLocale = getLocaleFromFilename(filename) || "default";
    if (!theme) {
      throw new Error("No Nextra theme found!");
    }
    let pageMapResult, fileMap;
    if (isProductionBuild) {
      const data2 = pageMapCache2.get();
      pageMapResult = data2.items;
      fileMap = data2.fileMap;
    } else {
      const data2 = yield collectFiles(path4.join(process.cwd(), findPagesDir()), "/");
      pageMapResult = data2.items;
      fileMap = data2.fileMap;
    }
    const [pageMap, route, title] = getPageMap(resourcePath, pageMapResult, fileMap, defaultLocale);
    let { data, content } = grayMatter2(source);
    let layout = theme;
    let layoutConfig = themeConfig || null;
    if (theme.startsWith(".") || theme.startsWith("/")) {
      layout = path4.resolve(theme);
    }
    if (layoutConfig) {
      layoutConfig = slash2(path4.resolve(layoutConfig));
    }
    if (isProductionBuild && indexContentEmitted.has(filename)) {
      unstable_contentDump = false;
    }
    const { result, titleText, headings, hasH1, structurizedData } = yield compileMdx(content, mdxOptions, {
      unstable_staticImage,
      unstable_contentDump
    });
    content = result;
    content = content.replace("export default MDXContent;", "");
    if (unstable_contentDump) {
      if (extension2.test(filename)) {
        yield addPage({
          fileLocale,
          route,
          title,
          data,
          structurizedData
        });
      }
      indexContentEmitted.add(filename);
    }
    const prefix = `import withLayout from '${layout}'
import { withSSG } from 'nextra/ssg'
${layoutConfig ? `import layoutConfig from '${layoutConfig}'` : ""}`;
    const suffix = `export default function NextraPage (props) {
    return withSSG(withLayout({
      filename: "${slash2(filename)}",
      route: "${slash2(route)}",
      meta: ${JSON.stringify(data)},
      pageMap: ${JSON.stringify(pageMap)},
      titleText: ${JSON.stringify(titleText)},
      headings: ${JSON.stringify(headings)},
      hasH1: ${JSON.stringify(hasH1)}
    }, ${layoutConfig ? "layoutConfig" : "null"}))({
      ...props,
      MDXContent,
      children: <MDXContent/>
    })
}`;
    return callback(null, prefix + "\n\n" + content + "\n\n" + suffix);
  });
}
export {
  loader_default as default
};
