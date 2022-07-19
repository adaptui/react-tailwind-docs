import React, { forwardRef } from "react";
import { Button, ButtonProps } from "@adaptui/react-tailwind";

import { CopiedIcon, CopyIcon } from "./Icons";

export type CopyButtonProps = ButtonProps & {
  hasCopied: boolean;
  onCopy: () => void;
};

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  (props, ref) => {
    const { onCopy, hasCopied, ...rest } = props;

    return (
      <Button
        ref={ref}
        size="sm"
        onClick={onCopy}
        iconOnly={hasCopied ? <CopiedIcon /> : <CopyIcon />}
        {...rest}
      />
    );
  },
);
