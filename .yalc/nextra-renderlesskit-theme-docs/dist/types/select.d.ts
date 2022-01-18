import React from "react";
interface MenuOption {
    key: string;
    name: React.ReactElement | string;
}
interface MenuProps {
    selected: MenuOption;
    onChange: (option: MenuOption) => void;
    options: MenuOption[];
}
export default function Menu({ options, selected, onChange }: MenuProps): JSX.Element;
export {};
