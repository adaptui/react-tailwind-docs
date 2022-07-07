import React from "react";
import { Item } from "./utils/normalize-pages";
interface NavLinkProps {
    isRTL?: boolean | null;
    currentIndex: number;
    flatDirectories: Item[];
}
export declare const NavLinks: ({ flatDirectories, currentIndex, isRTL, }: NavLinkProps) => JSX.Element | null;
declare const Footer: React.FC<{
    menu?: boolean;
}>;
export default Footer;
