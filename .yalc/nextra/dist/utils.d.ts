export declare function getLocaleFromFilename(name: string): string | undefined;
export declare function removeExtension(name: string): string;
export declare function getFileName(resourcePath: string): string;
export declare const parseJsonFile: (content: string, path: string) => Record<string, any>;
export declare const existsSync: (f: string) => boolean;
