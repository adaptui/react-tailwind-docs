import { Heading } from 'mdast';
import { ProcessorOptions } from '@mdx-js/mdx';
export interface LoaderOptions {
    theme: Theme;
    themeConfig: string;
    locales: string[];
    defaultLocale: string;
    unstable_stork: boolean;
    unstable_staticImage: boolean;
    mdxOptions: Pick<ProcessorOptions, 'rehypePlugins' | 'remarkPlugins'>;
}
export interface PageMapItem {
    name: string;
    route: string;
    locale?: string;
    children?: PageMapItem[];
    frontMatter?: Record<string, any>;
    meta?: Record<string, any>;
    active?: boolean;
}
export interface PageOpt {
    filename: string;
    route: string;
    meta: Record<string, any>;
    pageMap: PageMapItem[];
    titleText: string | null;
    headings?: Heading[];
    hasH1: boolean;
}
export { Heading };
export declare type Title = string | {
    [key: string]: string;
    title: string;
};
export declare type PageMapResult = [
    pageMap: PageMapItem[],
    route: string,
    title: Title
];
declare type Theme = string;
export declare type NextraConfig = {
    theme: Theme;
    themeConfig: string;
    unstable_stork?: boolean;
    unstable_staticImage?: boolean;
};
export declare type withNextra = (...args: [NextraConfig] | [theme: Theme, themeConfig: string]) => (nextConfig: Record<string, any>) => {};
export default withNextra;
