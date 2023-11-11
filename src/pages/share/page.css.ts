import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  width: "288px",
  margin: "45px auto",
});

export const canvasContainer = style({
  boxShadow: "2px 2px",
  border: "1px solid #000",
  width: "100%",
  height: "480px",
});

export const avatarCanvas = style({
  transform: "translateY(60px)",
});

export const captureButton = style({
  width: "100%",
  marginTop: "70px",
});
