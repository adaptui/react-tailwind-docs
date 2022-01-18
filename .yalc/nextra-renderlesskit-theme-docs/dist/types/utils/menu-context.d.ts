/// <reference types="react" />
interface MenuContextValue {
    menu: boolean;
    setMenu: (data: boolean) => any;
    defaultMenuCollapsed: boolean;
}
export declare const MenuContext: import("react").Context<MenuContextValue>;
export default function useMenuContext(): MenuContextValue;
export {};
