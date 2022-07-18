import { Button } from "@adaptui/react-tailwind";
import { useClipboard } from "@chakra-ui/hooks";

import { CopiedIcon, CopyIcon } from "./Icons";

export type ClipboardCopyButtonProps = {
  content: string;
};

export const ClipboardCopyButton: React.FC<ClipboardCopyButtonProps> = ({
  content,
}) => {
  const { hasCopied, onCopy } = useClipboard(content);

  return (
    <Button
      size="sm"
      onClick={onCopy}
      iconOnly={hasCopied ? <CopiedIcon /> : <CopyIcon />}
    />
  );
};

export default ClipboardCopyButton;
