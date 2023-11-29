import { style } from "@vanilla-extract/css";

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

export const btnOk = style({
  width: "80px",
  height: "30px",
  backgroundColor: "white",
  border: "0px",
  color: "#000",

  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "100%",
});
