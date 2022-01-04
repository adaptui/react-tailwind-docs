import React from "react";
import {
  Box,
  Button,
  ErrorIcon,
  Tooltip,
  TooltipWrapper,
  useTheme,
} from "@renderlesskit/react-tailwind";
import { get } from "lodash";

import { RegionTable } from "./RegionTable";

type PropDef = {
  name: string;
  themeKey?: string;
  required?: boolean;
  default?: string | boolean;
  type: string;
  typeSimple: string;
  description?: string;
};

type PropsTableProps = {
  data: PropDef[];
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

const PropsTable: React.FC<PropsTableProps> = ({
  data,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}) => {
  const theme = useTheme();
  const hasAriaLabel = !!(ariaLabel || ariaLabelledBy);

  const tdStyles = "border-0 border-b-0 border-gray-500";
  const thStyles = `px-2 py-2 text-gray-800 ${tdStyles}`;
  const typeStyles = "bg-blue-100 text-blue-800 px-2 py-1";

  return (
    <RegionTable
      className="w-full border-collapse p-left"
      aria-label={hasAriaLabel ? ariaLabel : "Component Props"}
      aria-labelledby={ariaLabelledBy}
    >
      <thead>
        <tr className="bg-transparent">
          <Box as="th" className={thStyles}>
            <p>Prop</p>
          </Box>
          <Box as="th" className={thStyles}>
            <p>Type</p>
          </Box>
          <Box as="th" className={thStyles}>
            <p>Default</p>
          </Box>
        </tr>
      </thead>
      <tbody>
        {data.map(
          (
            {
              name,
              themeKey,
              type,
              typeSimple,
              required,
              default: defaultValue,
              description,
            },
            i,
          ) => (
            <tr className="bg-transparent" key={`${name}-${i}`}>
              <Box as="td" className={tdStyles}>
                <code>
                  {name}
                  {required ? "*" : null}
                </code>
                {description && (
                  <Tooltip content={description}>
                    <TooltipWrapper className="z-30" />
                    <Button
                      size="sm"
                      variant="subtle"
                      iconOnly={<ErrorIcon />}
                      className="ml-2"
                    />
                  </Tooltip>
                )}
              </Box>
              <Box as="td" className={tdStyles}>
                <code className="text-gray-800">
                  {themeKey ? "union" : Boolean(typeSimple) ? typeSimple : type}
                </code>
                {!!(typeSimple || themeKey) && (
                  <Tooltip
                    content={
                      <code className={typeStyles}>
                        {themeKey
                          ? Object.keys(get(theme, themeKey)).join(" | ")
                          : type}
                      </code>
                    }
                  >
                    <TooltipWrapper className="z-30" />
                    <Button
                      size="sm"
                      variant="subtle"
                      iconOnly={<ErrorIcon />}
                      className="ml-2"
                    />
                  </Tooltip>
                )}
              </Box>
              <Box as="td" className={tdStyles}>
                {!!defaultValue ? (
                  <code className="text-gray-800">{defaultValue}</code>
                ) : (
                  "-"
                )}
              </Box>
            </tr>
          ),
        )}
      </tbody>
    </RegionTable>
  );
};

export default PropsTable;
