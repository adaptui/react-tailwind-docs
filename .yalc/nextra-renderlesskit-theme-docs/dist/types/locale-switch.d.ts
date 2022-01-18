/// <reference types="react" />
import { DocsThemeConfig } from "./types";
interface LocaleSwitchProps {
    options: NonNullable<DocsThemeConfig["i18n"]>;
}
export default function LocaleSwitch({ options }: LocaleSwitchProps): JSX.Element;
export {};
