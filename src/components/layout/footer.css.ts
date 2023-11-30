import { style } from "@vanilla-extract/css";

export const footer = style({
  height: "88px",
  display: "flex",
  backgroundColor: "#454545",
});

export const footerBtn = style({
  flex: 1,
  textAlign: "center",
  alignSelf: "center",
});

export const icon = style({
  width: "30px",
  height: "30px",
  color: "white",
  selectors: {
    [`${footerBtn}[aria-checked=true] &`]: { color: "#BDFF6B" },
  },
});
