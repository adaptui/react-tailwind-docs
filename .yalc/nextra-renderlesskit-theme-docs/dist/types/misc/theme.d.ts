import React from "react";
import { ButtonProps } from "@renderlesskit/react-tailwind";
import "intersection-observer";
export declare const MDXTheme: React.FC<{}>;
export default MDXTheme;
export declare type CopyButtonProps = ButtonProps & {
    code?: string;
};
export declare const CopyButton: React.FC<CopyButtonProps>;
