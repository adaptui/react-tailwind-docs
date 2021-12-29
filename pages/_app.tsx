import { RenderlesskitProvider } from "@renderlesskit/react-tailwind";
import type { AppProps } from "next/app";

import "@/styles/global.css";
import "nextra-theme-docs/style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RenderlesskitProvider>
      <Component {...pageProps} />
    </RenderlesskitProvider>
  );
}
