import { style } from "@vanilla-extract/css";

export const uploadContainer = style({
  width: "300px",
  height: "150px",
  backgroundColor: "black",
  position: "fixed",
  top: "45%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  color: "white",
  textAlign: "center",
});

export const loadingBar = style({
  width: "250px",
  height: "30px",
  marginLeft: "23px",
  marginTop: "40px",
});

export const textBoxUpload = style({
  marginTop: "15px",
  color: "var(--white,#fff)",
  fontFamily: "Pretendard",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
});
