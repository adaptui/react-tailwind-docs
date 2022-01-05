/// <reference types="react" />
import { Item, PageItem } from "./utils/normalize-pages";
interface NavBarProps {
    isRTL?: boolean | null;
    flatDirectories: Item[];
    flatPageDirectories: PageItem[];
}
export default function Navbar({ isRTL, flatDirectories, flatPageDirectories, }: NavBarProps): JSX.Element;
export {};
