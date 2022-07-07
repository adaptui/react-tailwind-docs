import { PageMapItem } from "nextra";
import defaultThemeContext from "../misc/theme-context";
export interface Item extends Omit<PageMapItem, "children"> {
    title: string;
    type: string;
    children?: Item[];
    hidden?: boolean;
    withIndexPage?: boolean;
}
export interface PageItem extends Omit<PageMapItem, "children"> {
    title: string;
    type: string;
    href?: string;
    newWindow?: boolean;
    children?: PageItem[];
    firstChildRoute?: string;
    hidden?: boolean;
    withIndexPage?: boolean;
}
export interface DocsItem extends Omit<PageMapItem, "children"> {
    title: string;
    type: string;
    children?: DocsItem[];
    firstChildRoute?: string;
    withIndexPage?: boolean;
}
export default function normalizePages({ list, locale, defaultLocale, route, docsRoot, underCurrentDocsRoot, pageThemeContext, }: {
    list: PageMapItem[];
    locale?: string;
    defaultLocale?: string;
    route: string;
    docsRoot?: string;
    underCurrentDocsRoot?: boolean;
    pageThemeContext?: typeof defaultThemeContext;
}): {
    activeType: string | undefined;
    activeIndex: number;
    activeThemeContext: import("../misc/theme-context").PageTheme;
    activePath: Item[];
    directories: Item[];
    flatDirectories: Item[];
    docsDirectories: DocsItem[];
    flatDocsDirectories: DocsItem[];
    pageDirectories: PageItem[];
    topLevelPageItems: PageItem[];
};
