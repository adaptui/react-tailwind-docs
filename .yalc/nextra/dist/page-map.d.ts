import { PageMapItem } from './types';
export declare const extension: RegExp;
export declare const metaExtension: RegExp;
export declare function findPagesDir(dir?: string): string;
export declare function getPageMap(currentResourcePath: string, pageMaps: PageMapItem[], fileMap: Record<string, PageMapItem>, defaultLocale: string): any[];
