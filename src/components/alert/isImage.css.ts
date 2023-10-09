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

export const btnBox = style({
  width: "100%",
  paddingTop: "2px",
});

export const btnOk = style({
  width: "80px",
  height: "30px",
  backgroundColor: "white",
  border: "0px",
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "100%",
});

export const image = style({
  width: "33px",
  height: "33px",
});

export const imageBox = style({
  height: "33px",
  width: "100%",
  paddingTop: "21px",
});

export const text1 = style({
  paddingTop: "15px",
  color: "var(--white,#fff)",
  fontFamily: "Pretendard",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
  margin: "0",
  textAlign: "center",
});

export const text2 = style({
  paddingTop: "2%",
  color: "var(--white,#fff)",
  fontFamily: "Pretendard",
  fontSize: "11px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  margin: "0",
  textAlign: "center",
});

export const textBox = style({
  width: "100%",
  height: "40%",
  alignItems: "center",
});
