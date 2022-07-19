import { useClipboard } from "@chakra-ui/hooks";

import { CopyButton } from "./CopyButton";
import { Tooltip, TooltipProps } from "./Tooltip";

export type ClipboardCopyButtonProps = TooltipProps & {
  content: string;
};

export const ClipboardCopyButton: React.FC<ClipboardCopyButtonProps> = ({
  content,
  ...props
}) => {
  const { hasCopied, onCopy } = useClipboard(content);

  return (
    <Tooltip
      withArrow
      placement="left"
      anchor={<CopyButton hasCopied={hasCopied} onCopy={onCopy} />}
      content={hasCopied ? "Copied!" : "Copy"}
      {...props}
    />
  );
};
