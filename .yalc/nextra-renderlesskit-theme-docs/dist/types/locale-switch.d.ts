/// <reference types="react" />
import { DocsThemeConfig } from "./index";
interface LocaleSwitchProps {
    options: DocsThemeConfig["i18n"];
    isRTL?: boolean | null;
}
export default function LocaleSwitch({ options, isRTL }: LocaleSwitchProps): JSX.Element;
export {};
