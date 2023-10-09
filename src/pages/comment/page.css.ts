import { style } from "@vanilla-extract/css";

export const bottomSheetContent = style({
  height: "100%",
});

export const commentButton = style({
  border: "1px solid #000",
  background: "#e3e3e3",
  width: "60px",
});

export const commentBox = style({
  width: "92%",
  height: "fit-content",
  paddingLeft: "4%",
  paddingRight: "4%",
  paddingTop: "2%",
  paddingBottom: "3%",
});

export const commentGetLayout = style({
  height: "80%",
  overflow: "auto",
});

export const commentTop = style({
  display: "flex",
  alignItems: "center",
  marginBottom: "2%",
});

export const content = style({
  paddingTop: "50px",
  height: "90vh",
  paddingBottom: "88px",
});

export const profileImg = style({
  float: "left",
  width: "35px",
  height: "35px",
  borderRadius: "100%",
  backgroundColor: "#d9d9d9",
  backgroundSize: "cover",
});

export const userName = style({
  float: "left",
  display: "flex",
  alignItems: "center",
  width: "auto",
  height: "50px",
  marginLeft: "20px",
  fontSize: "20px",
});

export const writeComment = style({
  height: "9%",
  display: "flex",
  bottom: "88px",
  left: "0px",
  width: "100vw",
  position: "fixed",
});

export const commentInput = style({
  display: "flex",
  height: "100%",
});

export const commentInputTextarea = style({
  padding: "10px",
  width: "80vw",
  border: "1px solid #000",
  background: "#fff",
});
