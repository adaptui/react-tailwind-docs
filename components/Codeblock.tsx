import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import * as Ariakit from "ariakit";
import * as AdaptUICore from "@adaptui/react";
import * as AdaptUI from "@adaptui/react-tailwind";
import { AdaptUIProvider } from "@adaptui/react-tailwind";
import { useTheme } from "next-themes";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/vsLight";
import { setup, tw } from "twind";

import { colors } from "../utils/colors";

import CopyButton from "./CopyButton";

setup({
  preflight: false, // do not include base style reset (default: use tailwind preflight)
  theme: {
    extend: { colors },
  }, // define custom theme values (default: tailwind theme)
  darkMode: "class", // use a different dark mode strategy (default: 'media')
});

export type StaticCodeProps = {
  highlight?: string;
  noCopy?: boolean;
  children: string;
};

export const StaticCode: React.FC<StaticCodeProps> = props => {
  const { children, highlight, noCopy } = props;

  const { theme, systemTheme } = useTheme();
  const renderedTheme = theme === "system" ? systemTheme : theme;

  const highlightedLines = highlight ? highlight.split(",").map(Number) : [];

  return (
    <div className="relative">
      <Highlight
        {...defaultProps}
        language="jsx"
        code={(children as string).trim()}
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

export type CodeblockProps = {
  live?: boolean;
  render?: boolean;
  noCopy?: boolean;
  noInline?: boolean;
  children?: string;
};

export const Codeblock: React.FC<CodeblockProps> = props => {
  const { children, live, render, noCopy, noInline, ...rest } = props;
  const code = children;
  const [editorCode, setEditorCode] = React.useState((code as string).trim());
  const { theme, systemTheme } = useTheme();
  const renderedTheme = theme === "system" ? systemTheme : theme;

  const handleChange = (code: string) => {
    setEditorCode(code.trim());
  };

  const scope = {
    React,
    Ariakit,
    AdaptUICore,
    ...AdaptUI,
    tw,
  };
  const liveProviderProps = {
    theme: renderedTheme === "dark" ? darkTheme : lightTheme,
    code: editorCode,
    scope,
    noInline,
    ...rest,
  };

  if (live) {
    return (
      <AdaptUIProvider>
        <LiveProvider {...liveProviderProps}>
          <div className="mt-6 rounded-md border border-gray-500 bg-transparent">
            <LivePreview className="bg-white-900 p-6" />
            <div className="relative">
              <LiveEditor
                onChange={handleChange}
                className="dark:!bg-prime-300 rounded-md rounded-t-none !bg-slate-100 !font-mono text-sm leading-6 tracking-tighter dark:!bg-opacity-10"
              />
              <CopyButton code={editorCode} />
            </div>
          </div>
          <LiveError className="mt-0 rounded-md rounded-t-none bg-red-100 text-xs text-red-500" />
        </LiveProvider>
      </AdaptUIProvider>
    );
  }

  if (render) {
    return (
      <AdaptUIProvider>
        <LiveProvider {...liveProviderProps}>
          <LivePreview style={{ fontFamily: "'Inter', sans-serif" }} />
        </LiveProvider>
      </AdaptUIProvider>
    );
  }

  return (
    <StaticCode noCopy={noCopy} {...props}>
      {editorCode}
    </StaticCode>
  );
};

export default Codeblock;
