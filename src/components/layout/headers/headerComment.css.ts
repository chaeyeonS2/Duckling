import { style } from "@vanilla-extract/css";

export const btnClose = style({
  border: "0px solid skyblue",
  backgroundColor: "rgba(0,0,0,0)",
  color: "rgba(0,0,0,0)",
  marginRight: "5px",
  marginTop: "7px",
});

export const header = style({
  position: "fixed",
  left: "0",
  top: "0",
  width: "100vw",
  textAlign: "center",
  zIndex: "9999",
  height: "50px",
  backgroundColor: "black",
});

export const leftBtnDiv = style({
  float: "left",
  color: "white",
  padding: "5px",
});

export const num = style({
  float: "left",
  color: "white",
  padding: "5px",
  paddingRight: "10px",
});

export const rightBtnGroup = style({
  float: "right",
});
