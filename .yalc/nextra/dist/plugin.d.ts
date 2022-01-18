import { PageMapItem } from './types';
import { Compiler } from 'webpack';
export declare function collectFiles(dir: string, route?: string, fileMap?: Record<string, any>): Promise<{
    items: PageMapItem[];
    fileMap: Record<string, any>;
}>;
export declare class PageMapCache {
    cache: {
        items: PageMapItem[];
        fileMap: Record<string, any>;
    } | null;
    constructor();
    set(data: {
        items: PageMapItem[];
        fileMap: Record<string, any>;
    }): void;
    clear(): void;
    get(): {
        items: PageMapItem[];
        fileMap: Record<string, any>;
    } | null;
}
export declare const pageMapCache: PageMapCache;
declare class NextraPlugin {
    apply(compiler: Compiler): void;
}
export { NextraPlugin };
