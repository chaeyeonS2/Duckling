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

// TODO: temp, modal style를 둘 곳을 정해야 함
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

// TODO: Icon 컴포넌트에서 크기를 prop로 받을까?
export const icon = style({
  width: "20px",
  height: "20px",
  color: "black",
});
