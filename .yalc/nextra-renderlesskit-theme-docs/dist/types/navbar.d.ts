/// <reference types="react" />
import { Item, PageItem } from "./utils/normalize-pages";
interface NavBarProps {
    isRTL?: boolean | null;
    flatDirectories: Item[];
    items: PageItem[];
}
export default function Navbar({ flatDirectories, items }: NavBarProps): JSX.Element;
export {};
