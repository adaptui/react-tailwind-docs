import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import * as Reakit from "reakit";
import * as Renderlesskit from "@renderlesskit/react-tailwind";
import { RenderlesskitProvider } from "@renderlesskit/react-tailwind";
import { useClipboard } from "@chakra-ui/hooks";
import { useTheme } from "next-themes";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/vsLight";
import { setup, tw } from "twind";
import * as colors from "twind/colors";

export type StaticCodeProps = {
  className?: string;
  highlight?: string;
  noCopy?: boolean;
};

setup({
  preflight: false, // do not include base style reset (default: use tailwind preflight)
  theme: {
    extend: {
      colors: {
        dark: "#111",
        oldGray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
        },
        transparent: "transparent",
        current: "currentColor",
        ...colors,
      },
    },
  }, // define custom theme values (default: tailwind theme)
  darkMode: "class", // use a different dark mode strategy (default: 'media')
});

export const StaticCode: React.FC<StaticCodeProps> = props => {
  const { children, className, highlight, noCopy, ...rest } = props;

  const { theme, systemTheme } = useTheme();
  const renderedTheme = theme === "system" ? systemTheme : theme;

  if (!className) return <code {...rest}>{children}</code>;

  const highlightedLines = highlight ? highlight.split(",").map(Number) : [];

  // https://mdxjs.com/guides/syntax-highlighting#all-together
  const language = className.replace(/language-/, "") as Language;

  return (
    <div className="relative">
      <Highlight
        {...defaultProps}
        code={(children as string).trim()}
        language={language}
        theme={renderedTheme === "dark" ? darkTheme : lightTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <code className={className} style={{ ...style }}>
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                style={
                  highlightedLines.includes(i + 1)
                    ? {
                        background: "var(--c-highlight)",
                        margin: "0 -1rem",
                        padding: "0 1rem",
                      }
                    : {}
                }
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        )}
      </Highlight>

      {!noCopy && <CopyButton code={(children as string).trim()} />}
    </div>
  );
};

export type CopyButtonProps = {
  code: string;
};

export const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <button
      className="absolute right-0 -top-2 -translate-x-2 translate-y-4 transform rounded-md bg-white px-4 py-1 text-xs text-gray-800"
      onClick={onCopy}
    >
      {hasCopied ? "Copied!" : "Copy"}
    </button>
  );
};

const transformer = (
  rawCode: string,
  language: Language,
  noInline?: boolean,
) => {
  const code = rawCode
    // remove imports
    .replace(/((^|)import[^;]+[; ]+)+/gi, "")
    // replace `export default => {*};` with `render(() => {*});`
    .replace(/export default \(\) => {((.|\n)*)};/, "render(() => {$1});")
    // replace `export default => (*);` with `render(*);`
    .replace(/export default \(\) => \(((.|\n)*)\);/, "render($1);")
    // replace `export default => *;` with `render(*);`
    .replace(/export default \(\) => ((.|\n)*);/, "render($1);")
    .replace(/export default ((.|\n)*);/, "render($1);");

  return language === "jsx" && !noInline ? `<>${code}</>` : code;
};

export type CodeblockProps = {
  className?: string;
  live?: boolean;
  render?: boolean;
  noCopy?: boolean;
  noInline?: boolean;
};

export const Codeblock: React.FC<CodeblockProps> = props => {
  const { children, className, live, render, noCopy, noInline, ...rest } =
    props;
  const code = children;
  const language = className?.replace(/language-/, "") as Language;
  const [editorCode, setEditorCode] = React.useState((code as string).trim());
  const { theme, systemTheme } = useTheme();
  const renderedTheme = theme === "system" ? systemTheme : theme;

  React.useEffect(() => {
    if (code) setEditorCode((code as string).trim());
  }, [code]);

  const scope = {
    React,
    ...Renderlesskit,
    Reakit,
    tw,
  };
  const liveProviderProps = {
    theme: renderedTheme === "dark" ? darkTheme : lightTheme,
    language,
    code: editorCode,
    scope,
    noInline,
    ...rest,
  };

  if (live) {
    return (
      <RenderlesskitProvider>
        <LiveProvider
          transformCode={rawCode =>
            transformer(rawCode, language, props.noInline)
          }
          {...liveProviderProps}
        >
          <div className="mt-6 rounded-md border border-gray-500 bg-transparent">
            <LivePreview className="p-6" />
            <div className="relative">
              <LiveEditor className="rounded-md rounded-t-none !bg-slate-100 !font-mono text-sm leading-6 tracking-tighter dark:!bg-prime-300 dark:!bg-opacity-10" />
              <CopyButton code={editorCode} />
            </div>
          </div>
          <LiveError className="mt-0 rounded-md rounded-t-none bg-red-100 text-xs text-red-500" />
        </LiveProvider>
      </RenderlesskitProvider>
    );
  }

  if (render) {
    return (
      <div>
        <RenderlesskitProvider>
          <LiveProvider
            transformCode={rawCode =>
              transformer(rawCode, language, props.noInline)
            }
            {...liveProviderProps}
          >
            <LivePreview style={{ fontFamily: "'Inter', sans-serif" }} />
          </LiveProvider>
        </RenderlesskitProvider>
      </div>
    );
  }

  return (
    <StaticCode noCopy={noCopy} className={className} {...props}>
      {editorCode}
    </StaticCode>
  );
};

export default Codeblock;
