import { style } from "@vanilla-extract/css";

export const alertlayout = style({
  width: "300px",
  height: "170px",
  backgroundColor: "black",
  position: "fixed",
  top: "45%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  textAlign: "center",
  color: "white",
});

export const btnBoxDelete = style({
  width: "100%",
  paddingTop: "2px",
});

export const btnNo = style({
  backgroundColor: "#bdff6b",
  width: "110px",
  height: "34px",
  border: "0px",
  margin: "10px",
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "100%",
});

export const btnOk = style({
  backgroundColor: "white",
  width: "110px",
  height: "34px",
  border: "0px",
  margin: "10px",
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "100%",
});

export const textBoxDelete = style({
  width: "100%",
  height: "50px",
  alignItems: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
});

export const textBoxDeleteText = style({
  marginTop: "5px",
});
