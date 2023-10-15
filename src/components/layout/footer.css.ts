import { style } from "@vanilla-extract/css";

export const footer = style({
  height: "88px",
  width: "100vw",
  display: "flex",
  position: "fixed",
  bottom: 0,
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
