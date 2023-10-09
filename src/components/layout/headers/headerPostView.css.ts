import { style } from "@vanilla-extract/css";

export const header = style({
  position: "fixed",
  left: "0",
  top: "0",
  height: "40px",
  width: "100vw",
  textAlign: "center",
  zIndex: "9999",
});

export const leftBtnGroup = style({
  display: "inline-block",
  float: "left",
  marginTop: "10px",
});

export const rightBtnGroup = style({
  display: "inline-block",
  float: "right",
  marginTop: "10px",
});

export const headerButton = style({
  border: "0px solid skyblue",
  backgroundColor: "rgba(0,0,0,0)",
  color: "rgba(0,0,0,0)",
  marginLeft: "5x",
});
