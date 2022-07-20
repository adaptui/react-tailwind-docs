import { CopyCodeBlockButton } from "./Codeblock/CopyCodeBlockButton";

export const Pre = (props: { children?: React.ReactNode }) => {
  const { children, ...rest } = props;

  return (
    <div className="relative">
      <pre {...rest}>
        <>{children}</>
      </pre>
      <CopyCodeBlockButton code={"copy"} />
    </div>
  );
};
