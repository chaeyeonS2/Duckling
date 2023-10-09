import { style } from "@vanilla-extract/css";

export const footer = style({
  height: "88px",
  backgroundColor: "#454545",
  bottom: "0px",
  left: "0px",
  width: "100vw",
  position: "fixed",
});

export const footerBtn = style({
  flex: "1",
  border: "0px solid skyblue",
  backgroundColor: "rgba(0,0,0,0)",
  color: "rgba(0,0,0,0)",
});

export const footerBtnGroup = style({
  display: "flex",
  alignItems: "stretch",
  height: "100%",
});
