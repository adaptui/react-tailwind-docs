import React from "react";
export declare type StaticCodeProps = {
    className?: string;
    highlight?: string;
    noCopy?: boolean;
};
export declare const StaticCode: React.FC<StaticCodeProps>;
export declare type CopyButtonProps = {
    code: string;
};
export declare const CopyButton: React.FC<CopyButtonProps>;
export declare type CodeBlockProps = {
    className?: string;
    live?: boolean;
    render?: boolean;
    noCopy?: boolean;
    noInline?: boolean;
};
export declare const CodeBlock: React.FC<CodeBlockProps>;
