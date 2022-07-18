import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import * as Ariakit from "ariakit";
import * as AdaptUICore from "@adaptui/react";
import {
  AdaptUIProvider,
  Checkbox,
  runIfFn,
  Select,
  useTheme as useRenderlessTheme,
} from "@adaptui/react-tailwind";
import * as AdaptUI from "@adaptui/react-tailwind";
import { get } from "lodash";
import { useTheme } from "next-themes";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/vsLight";
import { setup, tw } from "twind";
import * as colors from "twind/colors";

import CopyButton from "./CopyButton";
import useMounted from "./useMounted";

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

type TemplateFunctionProps = {
  booleanProps: string[];
  themeProps: string[];
  choiceProps: string[];
  spreadProps: string;
  props: Record<string, any>;
};

type TemplateFunction = (props: TemplateFunctionProps) => string;

type InteractiveCodeblockProps = {
  booleanProps: string[];
  themeProps: Record<string, string>;
  choiceProps: Record<string, string[]>;
  children?: TemplateFunction;
};

const wrapperStyles = "mt-2 flex items-center flex-wrap space-x-4";

export const InteractiveCodeblock = (props: InteractiveCodeblockProps) => {
  const {
    children = "",
    themeProps = {},
    choiceProps = {},
    booleanProps = [],
  } = props;

  const renderlessTheme = useRenderlessTheme();
  const [booleanStates, onBooleanStateChange] = React.useState<
    Record<string, boolean>
  >({});
  const [themeStates, setThemeStates] = React.useState<Record<string, string>>(
    {},
  );
  const [choiceStates, setChoiceState] = React.useState<Record<string, any>>(
    {},
  );

  const finalBooleanProps = Object.keys(booleanStates).filter(
    key => booleanStates[key],
  );
  const finalThemeProps = Object.keys(themeStates).map(key =>
    mapThemeProps(key, themeStates),
  );
  const finalChoiceProps = Object.keys(choiceStates).map(key =>
    mapChoiceProps(key, choiceStates),
  );

  const spreadProps = [finalBooleanProps, finalThemeProps, finalChoiceProps]
    .map(printProps)
    .join("")
    .trimEnd()
    .replace(/\s\s+/, " ");

  const code = runIfFn(children, {
    spreadProps,
    themeProps: finalThemeProps,
    choiceProps: finalChoiceProps,
    booleanProps: finalBooleanProps,
    props: { ...themeStates, ...booleanStates, ...choiceStates },
  }) as string;

  const { theme, systemTheme } = useTheme();
  const renderedTheme = theme === "system" ? systemTheme : theme;

  const scope = {
    React,
    ...AdaptUI,
    AdaptUICore,
    Ariakit,
    tw,
  };

  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <div className="mt-6">
      <AdaptUIProvider>
        <LiveProvider
          code={code}
          scope={scope}
          theme={renderedTheme === "dark" ? darkTheme : lightTheme}
        >
          <div className="mt-6 rounded-md border border-gray-500 bg-transparent">
            <LivePreview className="p-6" />
            <div className="relative">
              <LiveEditor className="dark:!bg-prime-300 rounded-md rounded-t-none !bg-slate-100 !font-mono text-sm leading-6 tracking-tighter dark:!bg-opacity-10" />
              <CopyButton code={code} />
            </div>
          </div>
          <LiveError className="mt-0 rounded-md rounded-t-none bg-red-100 text-xs text-red-500" />
        </LiveProvider>
      </AdaptUIProvider>
      <div className={wrapperStyles}>
        {booleanProps.map(name => {
          return (
            <Checkbox
              key={name}
              label={capitalizeFirstLetter(name as string)}
              value={booleanStates.loading}
              setValue={value => {
                onBooleanStateChange(prev => ({ ...prev, [name]: !!value }));
              }}
            />
          );
        })}
      </div>
      <div className={wrapperStyles}>
        {Object.keys(themeProps).map(name => {
          const themeKey = themeProps[name];
          return (
            <Select
              key={name}
              name={name}
              value={themeStates[name]}
              onChange={event =>
                setThemeStates(prev => ({
                  ...prev,
                  [name]: event.target.value,
                }))
              }
            >
              <option value="">Choose {name}</option>

              {Object.keys(get(renderlessTheme, themeKey) ?? []).map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          );
        })}
        {Object.keys(choiceProps).map(name => {
          const values = choiceProps[name];

          return (
            <Select
              key={name}
              name={name}
              value={choiceStates[name]}
              onChange={event =>
                setChoiceState(prev => ({
                  ...prev,
                  [name]: event.target.value,
                }))
              }
            >
              <option selected value="">
                Choose {name}
              </option>

              {values?.map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveCodeblock;

const mapThemeProps = (name: string, unions: Record<string, any>) => {
  return unions[name] && `${name}="${unions[name]}"`;
};
const mapChoiceProps = (name: string, unions: Record<string, any>) => {
  return unions[name] && `${name}={${unions[name]}}`;
};

const printProps = (props: string[]) => {
  return " " + props.filter(Boolean).join(" ");
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
