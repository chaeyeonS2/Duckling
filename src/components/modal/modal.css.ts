import { style } from "@vanilla-extract/css";

export const modalOverlay = style({
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  position: "relative",
});

export const alertlayout = style({
  width: "300px",
  backgroundColor: "black",
  position: "fixed",
  top: "45%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  textAlign: "center",
  color: "white",
  padding: "20px 18px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
});

export const image = style({
  width: "24px",
  height: "24px",
});

export const textBox = style({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
});

export const text1 = style({
  fontSize: "15px",
  fontWeight: "500",
});

export const text2 = style({
  fontSize: "11px",
  fontWeight: "400",
});

export const btnGroup = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  gap: "12px",
});

export const btnNo = style({
  backgroundColor: "#bdff6b",
  width: "80px",
  minHeight: "30px",
  border: "0px",
  color: "#000",

  fontSize: "14px",
  fontWeight: "600",
});

export const btnOk = style({
  backgroundColor: "white",
  width: "80px",
  minHeight: "30px",
  border: "0px",
  color: "#000",

  fontSize: "14px",
  fontWeight: "600",
});
