import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export const textInput = style({
  marginBottom: "10px",
});
