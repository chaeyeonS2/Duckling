import { style } from "@vanilla-extract/css";

export const header = style({
  padding: "18px",
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "5x",
});

export const headerButton = style({
  border: "0px solid skyblue",
  backgroundColor: "rgba(0,0,0,0)",
  selectors: {
    [`${header}[aria-disabled="true"] &:not([name=exit])`]: {
      color: "rgba(0,0,0,0)",
    },
  },
});
