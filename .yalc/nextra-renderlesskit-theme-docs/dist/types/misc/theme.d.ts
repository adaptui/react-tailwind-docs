import React from "react";
import { ButtonProps } from "@renderlesskit/react-tailwind";
import "intersection-observer";
declare const MDXTheme: ({ children }: {
    children?: React.ReactNode;
}) => JSX.Element;
export default MDXTheme;
export declare type CopyButtonProps = ButtonProps & {
    code: string;
};
export declare const CopyButton: React.FC<CopyButtonProps>;
