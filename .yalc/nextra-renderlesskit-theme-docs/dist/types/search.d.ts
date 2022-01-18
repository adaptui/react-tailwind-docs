/// <reference types="react" />
import type { Item as NormalItem } from "./utils/normalize-pages";
interface SearchProps {
    directories: NormalItem[];
}
declare const Search: ({ directories }: SearchProps) => JSX.Element;
export default Search;
