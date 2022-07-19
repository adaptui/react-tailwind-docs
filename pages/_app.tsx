import type { ReactElement, ReactNode } from "react";
import { AdaptUIProvider } from "@adaptui/react-tailwind";
import { MDXProvider } from "@mdx-js/react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { mdxComponents } from "utils";

import "@/styles/global.css";
import "@/styles/nextra.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(
    <AdaptUIProvider>
      <MDXProvider components={mdxComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </AdaptUIProvider>,
  );
}
