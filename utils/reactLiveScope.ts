import * as React from "react";
import * as Ariakit from "ariakit";
import * as AdaptUICore from "@adaptui/react";
import * as AdaptUI from "@adaptui/react-tailwind";
import { setup, tw } from "twind";

import { colors } from "../utils/colors";

setup({
  preflight: false, // do not include base style reset (default: use tailwind preflight)
  theme: {
    extend: { colors },
  }, // define custom theme values (default: tailwind theme)
  darkMode: "class", // use a different dark mode strategy (default: 'media')
});

export const scope = {
  React,
  Ariakit,
  AdaptUICore,
  ...AdaptUI,
  tw,
};
