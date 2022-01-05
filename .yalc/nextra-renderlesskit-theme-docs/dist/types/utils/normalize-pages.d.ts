import { PageMapItem } from "nextra";
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
export default function normalizePages({ list, locale, defaultLocale, route, docsRoot, }: {
    list: PageMapItem[];
    locale?: string;
    defaultLocale?: string;
    route: string;
    docsRoot?: string;
}): {
    activeType: undefined;
    activeIndex: number;
    directories: Item[];
    flatDirectories: Item[];
    docsDirectories: DocsItem[];
    flatDocsDirectories: DocsItem[];
    pageDirectories: PageItem[];
    flatPageDirectories: PageItem[];
};
