import * as React from "react";
import {
  Tooltip as AdaptTooltip,
  TooltipProps as AdaptTooltipProps,
  TooltipWrapper,
} from "@adaptui/react-tailwind";

export type TooltipProps = AdaptTooltipProps & {};

export const Tooltip: React.FC<TooltipProps> = props => {
  return (
    <AdaptTooltip {...props}>
      <TooltipWrapper style={{ zIndex: 9999 }} />
    </AdaptTooltip>
  );
};
