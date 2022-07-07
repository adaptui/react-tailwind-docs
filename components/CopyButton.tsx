import { Button } from "@adaptui/react-tailwind";
import { useClipboard } from "@chakra-ui/hooks";

export type CopyButtonProps = {
  code: string;
};

export const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <span className="absolute right-0 -top-2 -translate-x-2 translate-y-4 transform">
      <Button size="sm" onClick={onCopy}>
        {hasCopied ? "Copied!" : "Copy"}
      </Button>
    </span>
  );
};

export default CopyButton;
