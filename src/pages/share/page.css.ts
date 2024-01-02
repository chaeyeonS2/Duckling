import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  width: "100vw",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
});

export const canvasContainer = style({
  boxShadow: "2px 2px",
  border: "1px solid #000",
  width: "288px",
  height: "480px",
});

export const captureButton = style({
  width: "288px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

export const modalContainer = style({
  position: "absolute",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,.6)",
});

export const modalBody = style({
  width: "354px",
  padding: "32px 0",
  color: "white",
  backgroundColor: "black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "32px",
});

export const modalImage = style({
  backgroundColor: "white",
  width: "184px",
  height: "312px",
});

export const modalButtonGroup = style({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
});

export const button = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  color: "black",
});
