/// <reference types="react" />
import { Heading } from "nextra";
import { Item, PageItem } from "./utils/normalize-pages";
interface SideBarProps {
    directories: PageItem[];
    flatDirectories: Item[];
    fullDirectories: Item[];
    mdShow?: boolean;
    headings?: Heading[];
}
export default function Sidebar({ directories, flatDirectories, fullDirectories, mdShow, headings, }: SideBarProps): JSX.Element;
export {};
