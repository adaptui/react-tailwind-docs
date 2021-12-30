// src/bleed.tsx
import React from "react";
import cn from "classnames";
var Bleed = ({ full, children }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: cn("bleed relative mt-6 -mx-6 md:-mx-8 2xl:-mx-24", { full })
  }, children);
};
var bleed_default = Bleed;
export {
  bleed_default as default
};
