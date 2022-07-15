import React from "react";
import {
  Box,
  Button,
  ErrorIcon,
  Tooltip,
  TooltipProps,
  TooltipWrapper,
  useTheme,
} from "@adaptui/react-tailwind";
import { get } from "lodash";

import { RegionTable } from "./RegionTable";

const TooltipButton: React.FC = props => {
  return (
    <Button
      size="sm"
      variant="subtle"
      iconOnly={<ErrorIcon />}
      className="ml-2"
      {...props}
    />
  );
};

const CustomTooltip: React.FC<TooltipProps> = props => {
  return (
    <Tooltip as={TooltipButton} {...props}>
      <TooltipWrapper style={{ zIndex: 9999 }} />
    </Tooltip>
  );
};

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

export const PropsTable: React.FC<PropsTableProps> = ({
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
      className="p-left w-full border-collapse"
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
            }: PropDef,
            i,
          ) => (
            <tr className="bg-transparent" key={`${name}-${i}`}>
              <Box as="td" className={tdStyles}>
                <code>
                  {name}
                  {required ? "*" : null}
                </code>
                {description && <CustomTooltip content={description} />}
              </Box>
              <Box as="td" className={tdStyles}>
                <code className="text-gray-800">
                  {themeKey ? "union" : Boolean(typeSimple) ? typeSimple : type}
                </code>
                {!!(typeSimple || themeKey) && (
                  <CustomTooltip
                    content={
                      <code className={typeStyles}>
                        {themeKey
                          ? Object.keys(get(theme, themeKey) ?? []).join(" | ")
                          : type}
                      </code>
                    }
                  />
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
