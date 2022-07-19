import { ClipboardCopyButton } from "../ClipBoardCopyButton";

export type CopyCodeBlockButtonProps = {
  code: string;
};

export const CopyCodeBlockButton: React.FC<
  CopyCodeBlockButtonProps
> = props => {
  const { code } = props;

  return (
    <span className="absolute right-2 top-2">
      <ClipboardCopyButton content={code} />
    </span>
  );
};
