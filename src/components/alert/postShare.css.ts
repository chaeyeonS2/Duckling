import { style } from "@vanilla-extract/css";

export const container = style({
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

export const imageBox = style({
  width: "33px",
  height: "33px",
});

export const text = style({
  paddingTop: "5px",
  color: "var(--white,#fff)",
  fontFamily: "Pretendard",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
});
