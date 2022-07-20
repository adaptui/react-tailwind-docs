import * as React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { AdaptUIProvider } from "@adaptui/react-tailwind";
import { useTheme } from "next-themes";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/vsLight";

import { scope } from "../../utils";

import { CopyCodeBlockButton } from "./CopyCodeBlockButton";
import { transformer } from "./transformer";

export type CodeblockProps = {
  code: string;
  noCopy?: boolean;
  noInline?: boolean;
  children?: React.ReactNode | any;
};

export const Codeblock = (props: CodeblockProps) => {
  const { code, noCopy, noInline, children, ...rest } = props;
  const _code = children?.props?.children?.props?.children ?? code;

  const [editorCode, setEditorCode] = React.useState(_code.trim());
  const handleChange = React.useCallback((code: string) => {
    setEditorCode(code.trim());
  }, []);

  const { theme } = useTheme();

  const liveProviderProps = {
    theme: theme === "dark" ? darkTheme : lightTheme,
    code: editorCode,
    scope,
    noInline,
    ...rest,
  };

  return (
    <AdaptUIProvider>
      <LiveProvider
        transformCode={rawCode => transformer(rawCode, noInline)}
        {...liveProviderProps}
      >
        <div className="mt-6 rounded-md border border-[#ededed] bg-transparent">
          <LivePreview className="rounded-t-md bg-white-900 p-6" />
          <div className="relative">
            <LiveEditor
              onChange={handleChange}
              className="dark:!bg-prime-300 rounded-b-md !bg-slate-100 !font-mono text-sm leading-6 tracking-tighter dark:!bg-opacity-10"
            />
            <CopyCodeBlockButton code={editorCode} />
          </div>
        </div>
        <LiveError className="mt-2 rounded-md bg-red-100 text-xs text-red-800" />
      </LiveProvider>
    </AdaptUIProvider>
  );
};

export * from "./CopyCodeBlockButton";
