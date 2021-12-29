import React from "react";
import {
  Popover as ReakitPopover,
  PopoverArrow,
  PopoverDisclosure,
  usePopoverState,
} from "reakit/Popover";
import {
  Box,
  Button,
  InfoCircleIcon,
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

type PopoverTypes = {
  children: React.ReactNode;
  content: React.ReactNode;
  label?: string;
};
const Popover: React.FC<PopoverTypes> = ({ children, content, label }) => {
  const popover = usePopoverState({ placement: "top" });
  return (
    <>
      <PopoverDisclosure
        as={Button}
        size="sm"
        variant="subtle"
        className="mx-2 text-sm"
        {...popover}
      >
        {children}
      </PopoverDisclosure>
      <ReakitPopover
        {...popover}
        aria-label={label || ""}
        className="max-w-xs px-3 py-3 text-sm text-gray-800 bg-white border-none rounded-md shadow-xl outline-none"
      >
        <PopoverArrow size="12px" style={{ fill: "white" }} {...popover} />
        {content}
      </ReakitPopover>
    </>
  );
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
                  <Popover content={description}>
                    <InfoCircleIcon aria-label="Prop description" />
                  </Popover>
                )}
              </Box>
              <Box as="td" className={tdStyles}>
                <code className="text-gray-800">
                  {themeKey ? "union" : Boolean(typeSimple) ? typeSimple : type}
                </code>
                {!!(typeSimple || themeKey) && (
                  <Popover
                    content={
                      <code className={typeStyles}>
                        {themeKey
                          ? Object.keys(get(theme, themeKey)).join(" | ")
                          : type}
                      </code>
                    }
                  >
                    <InfoCircleIcon aria-label="See full type" />
                  </Popover>
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
