/// <reference types="react" />
declare const defaultTheme: {
    projectLink: string;
    docsRepositoryBase: string;
    titleSuffix: string;
    nextLinks: boolean;
    prevLinks: boolean;
    search: boolean;
    darkMode: boolean;
    nextThemes: {
        defaultTheme: string;
        storageKey: string;
        forcedTheme: undefined;
    };
    defaultMenuCollapsed: boolean;
    footer: boolean;
    footerText: string;
    footerEditLink: string;
    gitTimestamp: string;
    logo: JSX.Element;
    head: JSX.Element;
    searchPlaceholder: ({ locale }: {
        locale?: string | undefined;
    }) => "搜索文档..." | "Search documentation...";
    unstable_searchResultEmpty: () => JSX.Element;
};
export default defaultTheme;
