import { style } from "@vanilla-extract/css";

export const metadataContainer = style({
  display: "flex",
  gap: "15px",
});

export const input = style({});

export const metadata = style({
  display: "flex",
  alignItems: "center",
  gap: "3px",
  selectors: {
    [`${metadataContainer}:has(${input}:checked) &:nth-child(1)`]: {
      color: "#bdff6b",
    },
  },
});

export const candyIcon = style({ transform: "scale(1.5) rotate(-25deg)", stroke: "currentColor", strokeWidth: "0.5" });

export const candyNumber = style({ marginLeft: "4px" });
