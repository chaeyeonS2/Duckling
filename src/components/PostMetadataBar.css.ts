import { style } from "@vanilla-extract/css";

export const metadataContainer = style({
  display: "flex",
  gap: "15px",
});

export const metadata = style({
  display: "flex",
  alignItems: "center",
  gap: "3px",
  selectors: {
    "&[aria-selected='true']": {
      color: "#bdff6b",
    },
  },
});
