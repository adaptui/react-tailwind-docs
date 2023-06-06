import { createIcon } from "@adaptui/react-tailwind";

export const CopyIcon = createIcon({
  displayName: "CopyIcon",
  viewBox: "0 0 24 24",
  path: (
    <>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4M21 14H11" />
      <path d="m15 10-4 4 4 4" />
    </>
  ),
  defaultProps: {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
  },
});
