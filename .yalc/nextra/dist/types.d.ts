import { Heading as MDASTHeading } from 'mdast';
import { ProcessorOptions } from '@mdx-js/mdx';
export interface LoaderOptions {
    theme: Theme;
    themeConfig: string;
    locales: string[];
    defaultLocale: string;
    unstable_staticImage: boolean;
    unstable_contentDump: boolean;
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
export declare type Heading = MDASTHeading & {
    value: string;
};
export interface PageOpt {
    filename: string;
    route: string;
    meta: Record<string, any>;
    pageMap: PageMapItem[];
    titleText: string | null;
    headings?: Heading[];
    hasH1: boolean;
}
export declare type PageMapResult = [
    pageMap: PageMapItem[],
    route: string,
    title: string
];
declare type Theme = string;
export declare type NextraConfig = {
    theme: Theme;
    themeConfig: string;
    unstable_contentDump: boolean;
    unstable_staticImage?: boolean;
};
export declare type withNextra = (...args: [NextraConfig] | [theme: Theme, themeConfig: string]) => (nextConfig: Record<string, any>) => {};
export default withNextra;
