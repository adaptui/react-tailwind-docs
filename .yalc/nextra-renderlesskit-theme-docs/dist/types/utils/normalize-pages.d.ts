import { PageMapItem } from "nextra";
import defaultThemeContext from "../misc/theme-context";
export interface Item extends Omit<PageMapItem, "children"> {
    title: string;
    type: string;
    children?: Item[];
}
export interface PageItem extends Omit<PageMapItem, "children"> {
    title: string;
    type: string;
    children?: PageItem[];
    firstChildRoute?: string;
    hidden?: boolean;
}
export interface DocsItem extends Omit<PageMapItem, "children"> {
    title: string;
    type: string;
    children?: DocsItem[];
    firstChildRoute?: string;
}
export default function normalizePages({ list, locale, defaultLocale, route, docsRoot, pageThemeContext, }: {
    list: PageMapItem[];
    locale?: string;
    defaultLocale?: string;
    route: string;
    docsRoot?: string;
    pageThemeContext?: Record<keyof typeof defaultThemeContext, boolean>;
}): {
    activeType: undefined;
    activeIndex: number;
    activeThemeContext: Record<"footer" | "navbar" | "sidebar" | "toc" | "pagination" | "full", boolean>;
    directories: Item[];
    flatDirectories: Item[];
    docsDirectories: DocsItem[];
    flatDocsDirectories: DocsItem[];
    pageDirectories: PageItem[];
    flatPageDirectories: PageItem[];
};
