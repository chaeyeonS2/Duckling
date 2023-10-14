import { style } from "@vanilla-extract/css";

export const focused = style({
  borderBottom: "5px solid black",
});

export const focusedText = style({
  color: "#000",

  fontSize: "22px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "100%",
  marginLeft: "5px",
});

export const header = style({
  position: "fixed",
  left: "0",
  top: "0",
  backgroundColor: "white",
  display: "flex",
  width: "100vw",
  height: "70px",
  zIndex: "9999",
});

export const tab = style({
  backgroundColor: "white",
  width: "50%",
  height: "100%",
  borderBottom: "5px solid #b5b5b5",
  display: "flex",
  alignItems: "center",
  paddingLeft: "15%",
});

export const tabText = style({
  color: "#b5b5b5",

  fontSize: "22px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "100%",
  marginLeft: "5px",
});
