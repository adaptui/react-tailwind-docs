/// <reference types="react" />
interface HeadProps {
    title: string;
    locale?: string;
    meta: Record<string, any>;
}
export default function Head({ title, locale, meta }: HeadProps): JSX.Element;
export {};
