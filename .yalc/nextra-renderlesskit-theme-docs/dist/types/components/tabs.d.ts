import React from "react";
declare type TabItem = {
    label: React.ReactElement;
    disabled?: boolean;
};
export declare function Tabs({ items, selectedIndex, defaultIndex, onChange, children, }: {
    items: React.ReactNode[] | TabItem[];
    selectedIndex?: number;
    defaultIndex?: number;
    onChange?: (index: number) => void;
    children: React.ReactNode;
}): JSX.Element;
export declare function Tab({ children }: {
    children: React.ReactNode;
}): JSX.Element;
export {};
