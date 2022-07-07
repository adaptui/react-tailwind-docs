import React from "react";
import { PageOpt } from "nextra";
import { DocsThemeConfig } from "./types";
import "focus-visible";
import "./polyfill";
declare const createLayout: (opts: PageOpt, _config: DocsThemeConfig) => {
    ({ children }: {
        children: React.ReactChildren;
    }): React.ReactChildren;
    getLayout(page: any): JSX.Element;
};
export default createLayout;
