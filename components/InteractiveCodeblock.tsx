import React from "react";
import {
  Checkbox,
  runIfFn,
  Select,
  useHasMounted,
  useTheme,
} from "@renderlesskit/react-tailwind";
import { get } from "lodash";
// @ts-ignore
import { CodeBlock } from "nextra-renderlesskit-theme-docs/codeblock";

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

const InteractiveCodeblock = (props: InteractiveCodeblockProps) => {
  const {
    children = "",
    themeProps = {},
    choiceProps = {},
    booleanProps = [],
  } = props;

  const theme = useTheme();
  const [booleanStates, onBooleanStateChange] = React.useState<
    Record<string, boolean>
  >({});
  console.log("%cbooleanStates", "color: #00a3cc", booleanStates);
  const [themeStates, setThemeStates] = React.useState<Record<string, string>>(
    {},
  );
  console.log("%cthemeStates", "color: #ff0000", themeStates);
  const [choiceStates, setChoiceState] = React.useState<Record<string, any>>(
    {},
  );
  console.log("%cchoiceStates", "color: #00e600", choiceStates);

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
  });

  const mounted = useHasMounted();

  if (!mounted) return null;

  return (
    <div className="mt-6">
      <CodeBlock live code={code} />
      <div className={wrapperStyles}>
        {booleanProps.map(name => {
          return (
            <Checkbox
              key={name}
              label={capitalizeFirstLetter(name as string)}
              state={booleanStates.loading}
              onStateChange={value => {
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

              {Object.keys(get(theme, themeKey)).map(size => (
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
