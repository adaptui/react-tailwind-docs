import type { ReactElement, ReactNode } from "react";
import { AdaptUIProvider } from "@adaptui/react-tailwind";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "@/styles/global.css";
import "nextra-renderlesskit-theme-docs/style.css";

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
      <Component {...pageProps} />
    </AdaptUIProvider>,
  );
}
