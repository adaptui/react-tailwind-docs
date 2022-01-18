/// <reference types="react" />
import { Heading } from "nextra";
import { Item, PageItem } from "./utils/normalize-pages";
interface SideBarProps {
    directories: PageItem[];
    flatDirectories: Item[];
    fullDirectories: Item[];
    asPopover?: boolean;
    headings?: Heading[];
    isRTL?: boolean;
}
export default function Sidebar({ directories, flatDirectories, fullDirectories, asPopover, headings, }: SideBarProps): JSX.Element;
export {};
