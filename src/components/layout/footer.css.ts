import { style } from "@vanilla-extract/css";

export const footer = style({
  minHeight: "88px",
  display: "flex",
  backgroundColor: "#454545",
  zIndex: 100,
});

export const footerBtn = style({
  flex: 1,
  textAlign: "center",
  alignSelf: "center",
});

export const icon = style({
  color: "white",
  selectors: {
    [`${footerBtn}[aria-checked=true] &`]: { color: "#BDFF6B" },
  },
});
