import { style } from "@vanilla-extract/css";

export const bottomBar = style({
  display: "flex",
  bottom: "88px",
  left: "0px",
  position: "fixed",
  width: "100vw",
  textAlign: "center",
  zIndex: "9999",
  height: "50px",
  backgroundColor: "black",
});

export const content = style({
  paddingTop: "45px",
});

export const marignBox = style({
  padding: "0.5vw",
  width: "99vw",
});

export const num = style({
  float: "left",
  paddingRight: "10px",
});

export const textContent = style({
  textAlign: "left",
  margin: "20px",
  marginTop: "30px",
  marginBottom: "100px",
});

export const title = style({
  height: "45px",
  padding: "10px",
  borderRadius: "20px 20px 0 0",
  borderLeft: "1px solid black",
  borderRight: "1px solid black",
  borderTop: "5px solid black",
  display: "flex",
  alignItems: "center",
});

export const writinggetBox = style({
  height: "80vh",
  border: "1px solid black",
  overflow: "auto",
});

export const leftBtn = style({
  float: "left",
  color: "white",
  padding: "5px",
});
