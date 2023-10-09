import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  width: "100vw",
  height: "100vh",
  background: "#bdff6b",
  display: "flex",
  justifyContent: "center",
});

export const loadingImage = style({
  width: "90vw",
  height: "50%",
  marginTop: "20vh",
  objectFit: "contain",
});
