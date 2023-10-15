import { style } from "@vanilla-extract/css";

export const btnClose = style({
  border: "0px solid skyblue",
  backgroundColor: "rgba(0,0,0,0)",
  color: "rgba(0,0,0,0)",
  marginRight: "10px",
  marginTop: "5px",
});

export const header = style({
  background: "transparent",
  position: "fixed",
  left: "0",
  top: "0",
  height: "30px",
  width: "100vw",
  textAlign: "center",
  zIndex: "9999",
});

export const headerBtn = style({
  border: "0px solid skyblue",
  backgroundColor: "rgba(0,0,0,0)",
  color: "rgba(0,0,0,0)",
  marginLeft: "5x",
});

export const leftBtnGroup = style({
  float: "left",
  marginTop: "10px",
});

export const rightBtnGroup = style({
  float: "right",
  marginTop: "10px",
});
