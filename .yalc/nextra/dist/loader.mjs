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
import path3 from "path";
import gracefulFs2 from "graceful-fs";
import grayMatter from "gray-matter";
import slash from "slash";

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
  for (const name in fallbackPages) {
    if (fallbackPages[name]) {
      filteredPageMap.push(fallbackPages[name]);
    }
  }
  return filteredPageMap;
}

// src/stork-index.ts
import path from "path";
import gracefulFs from "graceful-fs";
import cp from "child_process";
import { promisify } from "util";
import download from "download";
var { promises: fs, statSync, mkdirSync } = gracefulFs;
var execFile = promisify(cp.execFile);
var isProduction = process.env.NODE_ENV === "production";
var files = {};
var escapeQuote = (str) => typeof str === "string" ? str.replace(/"/g, '\\"') : str.title.replace(/"/g, '\\"');
var getStemmingLanguage = (locale) => {
  if (locale.toLowerCase().startsWith("en")) {
    return "English";
  }
  return "None";
};
var getPlainText = (content) => __async(void 0, null, function* () {
  return content;
});
function addStorkIndex(_0) {
  return __async(this, arguments, function* ({
    fileLocale,
    route,
    title,
    data,
    content
  }) {
    if (!isProduction)
      return;
    if (!files[fileLocale])
      files[fileLocale] = {
        toml: `[input]
minimum_indexed_substring_length = 2
title_boost = "Ridiculous"
stemming = "${getStemmingLanguage(fileLocale)}"

`
      };
    if (!files[fileLocale][route]) {
      const plainText = yield getPlainText(content);
      files[fileLocale][route] = true;
      files[fileLocale].toml += `[[input.files]]
`;
      files[fileLocale].toml += `title = "${escapeQuote(data.title || title)}"
`;
      files[fileLocale].toml += `url = "${escapeQuote(route)}"
`;
      files[fileLocale].toml += `contents = "${escapeQuote(plainText.replace(/\n/g, "\\n"))}"
`;
      files[fileLocale].toml += `filetype = "PlainText"`;
      files[fileLocale].toml += `
`;
      const assetDir = path.join(process.cwd(), "public");
      const tomlFile = path.join(assetDir, `index-${fileLocale}.toml`);
      try {
        statSync(assetDir);
      } catch (err) {
        mkdirSync(assetDir);
      }
      yield fs.writeFile(tomlFile, files[fileLocale].toml);
    }
  });
}

// src/utils.ts
import fs2 from "fs";
import path2 from "path";
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
function getFileName(resourcePath) {
  return removeExtension(path2.basename(resourcePath));
}
var parseJsonFile = (content, path4) => {
  let parsed = {};
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error(`Error parsing ${path4}, make sure it's a valid JSON 
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
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";

// src/static-image.js
var relative = /^\.{1,2}\//;
function visit(node, type, handler) {
  if (node.type === type) {
    handler(node);
  }
  if (node.children) {
    node.children.forEach((n) => visit(n, type, handler));
  }
}
function ASTNodeImport(name, from) {
  return {
    type: "mdxjsEsm",
    value: `import ${name} from "${from}"`,
    data: {
      estree: {
        type: "Program",
        body: [
          {
            type: "ImportDeclaration",
            specifiers: [
              {
                type: "ImportDefaultSpecifier",
                local: { type: "Identifier", name }
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

// src/get-headers.ts
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
function getHeaders(headers) {
  return () => (tree, _file, done) => {
    visit2(tree, (node) => headers.push(node));
    done();
  };
}

// src/compile.ts
function compileMdx(_0) {
  return __async(this, arguments, function* (source, mdxOptions = {}, nextraOptions = {
    unstable_staticImage: false
  }) {
    let headings = [];
    const result = yield compile(source, {
      jsx: true,
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [
        ...mdxOptions.remarkPlugins || [],
        remarkGfm,
        remarkMdxCodeMeta,
        getHeaders(headings),
        ...nextraOptions.unstable_staticImage ? [remarkStaticImage] : []
      ].filter(Boolean),
      rehypePlugins: [...mdxOptions.rehypePlugins || []].filter(Boolean)
    });
    if (Array.isArray(headings) && headings.length > 0) {
      const h1 = headings.find((v) => v.depth === 1);
      if (h1 && Array.isArray(h1.children) && h1.children.length === 1) {
        const child = h1.children[0];
        if (child.type === "text") {
          return {
            result: String(result),
            titleText: child.value,
            headings,
            hasH1: true
          };
        }
      }
      return {
        result: String(result),
        headings,
        hasH1: h1 ? true : false
      };
    }
    return {
      result: String(result),
      hasH1: false
    };
  });
}

// src/loader.ts
var { promises: fs3 } = gracefulFs2;
var extension = /\.mdx?$/;
var metaExtension = /meta\.?([a-zA-Z-]+)?\.json/;
function findPagesDir(dir = process.cwd()) {
  if (existsSync(path3.join(dir, "pages")))
    return "pages";
  if (existsSync(path3.join(dir, "src/pages")))
    return "src/pages";
  throw new Error("> Couldn't find a `pages` directory. Please create one under the project root");
}
function getPageMap(currentResourcePath) {
  return __async(this, null, function* () {
    const activeRouteLocale = getLocaleFromFilename(currentResourcePath);
    let activeRoute = "";
    let activeRouteTitle = "";
    function getFiles(dir, route) {
      return __async(this, null, function* () {
        const files2 = yield fs3.readdir(dir, { withFileTypes: true });
        let dirMeta = {};
        const items = (yield Promise.all(files2.map((f) => __async(this, null, function* () {
          const filePath = path3.resolve(dir, f.name);
          const fileRoute = slash(path3.join(route, removeExtension(f.name).replace(/^index$/, "")));
          if (f.isDirectory()) {
            if (fileRoute === "/api")
              return null;
            const children = yield getFiles(filePath, fileRoute);
            if (!children || !children.length)
              return null;
            return {
              name: f.name,
              children,
              route: fileRoute
            };
          } else if (extension.test(f.name)) {
            const locale = getLocaleFromFilename(f.name);
            if (filePath === currentResourcePath) {
              activeRoute = fileRoute;
            }
            const fileContents = yield fs3.readFile(filePath, "utf-8");
            const { data } = grayMatter(fileContents);
            if (Object.keys(data).length) {
              return {
                name: removeExtension(f.name),
                route: fileRoute,
                frontMatter: data,
                locale
              };
            }
            return {
              name: removeExtension(f.name),
              route: fileRoute,
              locale
            };
          } else if (metaExtension.test(f.name)) {
            const content = yield fs3.readFile(filePath, "utf-8");
            const meta = parseJsonFile(content, filePath);
            const locale = f.name.match(metaExtension)[1];
            if (!activeRouteLocale || locale === activeRouteLocale) {
              dirMeta = meta;
            }
            return {
              name: "meta.json",
              meta,
              locale
            };
          }
        })))).map((item) => {
          if (!item)
            return;
          if (item.route === activeRoute) {
            activeRouteTitle = dirMeta[item.name] || item.name;
          }
          return __spreadValues({}, item);
        }).filter(Boolean);
        return items;
      });
    }
    return [
      yield getFiles(path3.join(process.cwd(), findPagesDir()), "/"),
      activeRoute,
      activeRouteTitle
    ];
  });
}
function analyzeLocalizedEntries(currentResourcePath, defaultLocale) {
  return __async(this, null, function* () {
    const filename = getFileName(currentResourcePath);
    const dir = path3.dirname(currentResourcePath);
    const filenameRe = new RegExp("^" + filename + ".[a-zA-Z-]+.(mdx?|jsx?|tsx?|json)$");
    const files2 = yield fs3.readdir(dir, { withFileTypes: true });
    let hasSSR = false, hasSSG = false, defaultIndex = 0;
    const filteredFiles = [];
    for (let i = 0; i < files2.length; i++) {
      const file = files2[i];
      if (!filenameRe.test(file.name))
        continue;
      const content = yield fs3.readFile(path3.join(dir, file.name), "utf-8");
      const locale = getLocaleFromFilename(file.name);
      const exportSSR = /^export .+ getServerSideProps[=| |\(]/m.test(content);
      const exportSSG = /^export .+ getStaticProps[=| |\(]/m.test(content);
      hasSSR = hasSSR || exportSSR;
      hasSSG = hasSSG || exportSSG;
      if (locale === defaultLocale)
        defaultIndex = filteredFiles.length;
      filteredFiles.push({
        name: file.name,
        locale,
        ssr: exportSSR,
        ssg: exportSSG
      });
    }
    return {
      ssr: hasSSR,
      ssg: hasSSG,
      files: filteredFiles,
      defaultIndex
    };
  });
}
function loader_default(source) {
  return __async(this, null, function* () {
    const callback = this.async();
    this.cacheable();
    this.addContextDependency(path3.resolve(findPagesDir()));
    const options = this.getOptions();
    const {
      theme,
      themeConfig,
      locales,
      defaultLocale,
      unstable_stork,
      unstable_staticImage,
      mdxOptions
    } = options;
    const { resourcePath, resourceQuery } = this;
    const filename = resourcePath.slice(resourcePath.lastIndexOf("/") + 1);
    const fileLocale = getLocaleFromFilename(filename) || "default";
    const rawEntry = resourceQuery.includes("nextra-raw");
    if (!theme) {
      throw new Error("No Nextra theme found!");
    }
    if (locales && !rawEntry) {
      const { files: files2, defaultIndex, ssr, ssg } = yield analyzeLocalizedEntries(resourcePath, defaultLocale);
      const i18nEntry = `	
import { useRouter } from 'next/router'	

${files2.map((file, index) => `import Page_${index}${file.ssg || file.ssr ? `, { ${file.ssg ? "getStaticProps" : "getServerSideProps"} as page_data_${index} }` : ""} from './${file.name}?nextra-raw'`).join("\n")}

export default function I18NPage (props) {	
  const { locale } = useRouter()	
  ${files2.map((file, index) => `if (locale === '${file.locale}') {
    return <Page_${index} {...props}/>
  } else `).join("")} {	
    return <Page_${defaultIndex} {...props}/>	
  }
}

${ssg || ssr ? `export async function ${ssg ? "getStaticProps" : "getServerSideProps"} (context) {
  const locale = context.locale
  ${files2.map((file, index) => `if (locale === '${file.locale}' && ${ssg ? file.ssg : file.ssr}) {
    return page_data_${index}(context)
  } else `).join("")} {	
    return { props: {} }
  }
}` : ""}
`;
      return callback(null, i18nEntry);
    }
    let [pageMap, route, title] = yield getPageMap(resourcePath);
    if (locales) {
      const locale = getLocaleFromFilename(filename);
      if (locale) {
        pageMap = filterRouteLocale(pageMap, locale, defaultLocale);
      }
    }
    let { data, content } = grayMatter(source);
    if (unstable_stork) {
      if (extension.test(filename)) {
        yield addStorkIndex({
          fileLocale,
          route,
          title,
          data,
          content
        });
      }
    }
    let layout = theme;
    let layoutConfig = themeConfig || null;
    if (theme.startsWith(".") || theme.startsWith("/")) {
      layout = path3.resolve(theme);
    }
    if (layoutConfig) {
      layoutConfig = slash(path3.resolve(layoutConfig));
    }
    const prefix = `
import withLayout from '${layout}'
import { withSSG } from 'nextra/ssg'
${layoutConfig ? `import layoutConfig from '${layoutConfig}'` : ""}

`;
    const { result, titleText, headings, hasH1 } = yield compileMdx(content, mdxOptions, {
      unstable_staticImage
    });
    content = result;
    content = content.replace("export default MDXContent;", "const _mdxContent = <MDXContent/>;");
    const suffix = `

export default function NextraPage (props) {
    return withSSG(withLayout({
      filename: "${slash(filename)}",
      route: "${slash(route)}",
      meta: ${JSON.stringify(data)},
      pageMap: ${JSON.stringify(pageMap)},
      titleText: ${JSON.stringify(titleText)},
      headings: ${JSON.stringify(headings)},
      hasH1: ${JSON.stringify(hasH1)}
    }, ${layoutConfig ? "layoutConfig" : "null"}))({
      ...props,
      children: _mdxContent
    })
}`;
    return callback(null, prefix + "\n" + content + "\n" + suffix);
  });
}
export {
  loader_default as default
};
