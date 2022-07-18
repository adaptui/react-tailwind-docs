import ClipboardCopyButton from "../ClipBoardCopyButton";

export type CopyCodeBlockButtonProps = {
  code: string;
};

export const CopyCodeBlockButton: React.FC<
  CopyCodeBlockButtonProps
> = props => {
  const { code } = props;

  return (
    <span className="absolute right-0 -top-2 -translate-x-2 translate-y-4 transform">
      <ClipboardCopyButton content={code} />
    </span>
  );
};

export default CopyCodeBlockButton;
